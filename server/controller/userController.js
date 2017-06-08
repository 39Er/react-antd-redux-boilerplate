'use strict';

const User = require('../model/user');
const { logger } = require('../../global');
const { passwordEncrypt, encrypt } = require('../lib/passwordEncrypt');

module.exports.login = async function login(req, res) {
  try {
    let user = await User.findOne({
      username: req.body.username,
    }).exec();
    if (!user) {
      await Promise.reject({
        statusCode: '404',
        message: '用户不存在！',
      });
    }
    let encryptedPasswd = await encrypt(req.body.password, user.salt);
    if (encryptedPasswd !== user.password) {
      await Promise.reject({
        statusCode: '503',
        message: '密码不正确！',
      });
    }
    req.session.user = user;
    if (req.body.remember) {
      res.cookie('username', user.username, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
    return res.send({
      statusCode: '200',
      result: 'login success',
    });
  } catch (e) {
    logger.error(e);
    return res.send({
      statusCode: e.statusCode || '500',
      message: e.message || e.toString(),
    });
  }
};

module.exports.register = async function register(req, res) {
  try {
    let query = await User.findOne({
      username: req.body.username,
    }).exec();
    if (query) {
      await Promise.reject({
        statusCode: '501',
        message: '用户名已存在！',
      });
    }
    let encryptResult = await passwordEncrypt(req.body.password);
    let user = await User.create({
      username: req.body.username,
      password: encryptResult.epassword,
      salt: encryptResult.salt,
    });
    return res.send({
      statusCode: '200',
      username: user.username,
    });
  } catch (e) {
    logger.error(e);
    return res.send({
      statusCode: e.statusCode || '500',
      message: e.message || e.toString(),
    });
  }
};
