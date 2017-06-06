'use strict';

import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import '../asserts/css/login.css';

import fetchJson from '../lib/fetchUtil';
import { error } from '../lib/modal';

const FormItem = Form.Item;

const RegisterForm = (props) => {
  let handleRegister = (event) => {
    event.preventDefault();
    props.form.validateFields((err, formData) => {
      if (err) {
        return console.log('login error:' + err);
      }
      return fetchJson('/register', {
        body: formData,
      }).then((data) => {
        if (data.statusCode === '200') {
          window.location.href = '/login';
        } else {
          error(data.statusCode, 'Error ', data.message);
        }
      }).catch((e) => {
        error(e.status, 'Server Error ', e.statusText);
      });
    });
  };
  const { getFieldDecorator } = props.form;
  return (
    <Form
      onSubmit={(event) => { handleRegister(event); }}
      className="login-form"
    >
      <FormItem>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            placeholder="Username"
          />,
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Register
          </Button>
        Or <a href="/login">I have account!</a>
      </FormItem>
    </Form>
  );
};

const Register = Form.create()(RegisterForm);
export default Register;

