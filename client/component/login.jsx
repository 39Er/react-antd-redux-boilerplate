'use strict';

import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import '../asserts/css/login.css';

import fetchJson from '../lib/fetchUtil';
import { error } from '../lib/modal';

const FormItem = Form.Item;

const LoginForm = (props) => {
  let handleLogin = (event) => {
    event.preventDefault();
    props.form.validateFields((err, formData) => {
      if (err) {
        return;
      }
      fetchJson('/login', {
        body: formData,
      }).then((data) => {
        if (data.statusCode === '200') {
          props.history.push('/');
        } else {
          error(data.statusCode, 'Error ', data.message);
        }
      }).catch((e) => {
        error(e.status, 'Server Error ', e.statusText);
      });
    });
  };
  let getDefaultUsername = () => {
    let username = document.cookie.indexOf('username') > -1 ?
      document.cookie.split(';')[0].split('=')[1] : '';
    return username;
  };
  const { getFieldDecorator } = props.form;
  return (
    <Form
      onSubmit={(event) => { handleLogin(event); }}
      className="login-form"
    >
      <FormItem>
        {getFieldDecorator('username', {
          initialValue: getDefaultUsername(),
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
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>Remember me</Checkbox>,
        )}
        <a className="login-form-forgot" href="">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
          </Button>
        Or <a href="/register">register now!</a>
      </FormItem>
    </Form>
  );
};

const Login = Form.create()(LoginForm);
export default Login;

