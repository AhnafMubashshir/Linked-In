import {
    Button,
    Form,
    Input,
  } from 'antd';
  import React from 'react';
  import axios from 'axios';
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  const link = 'http://localhost:5050/users/login';

  const LoginPage = ({onLoginSuccess}) => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
      console.log('Received values of form: ', values);
  
      const response = await axios.post(`${link}`, {values});

      if(response.data.sign) {
        onLoginSuccess(response.data.userID);
      }
    };
  
    return (
      <Form
        {...formItemLayout}
        form={form}
        name="login"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    );
  };
  export default LoginPage;