'use strict';

const User = require('../model/user');
const logger = require('../../commonUtil').logger;
const { passwordEncrypt, encrypt } = require('../lib/passwordEncrypt');

exports.login = async function login(req, res) {
  try {
    let user = await User.findOne({
      username: req.body.username,
    }).exec();
    console.log(user);
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
    return res.send({
      statusCode: '200',
      result: 'login success',
    });
  } catch (e) {
    logger.error(e);
    let statusCode = e.statusCode ? e.statusCode : '500';
    let message = e.message ? e.message : e.toString();
    return res.send({
      statusCode: statusCode,
      message: message,
    });
  }
};

exports.register = async function register(req, res) {
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
    logger.error(e.toString());
    let statusCode = e.statusCode ? e.statusCode : '500';
    let message = e.message ? e.message : e.toString();
    return res.send({
      statusCode: statusCode,
      message: message,
    });
  }
};
