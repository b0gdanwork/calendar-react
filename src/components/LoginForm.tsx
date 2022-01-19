import React, {FC} from 'react';
import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm:FC = () => {
  const dispatch = useDispatch()
  const {error, isLoading} = useTypedSelector(state => state.authReducer)
  const submit = () => {
    dispatch(AuthActionCreators.login("admin","1234"))
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={submit}
    >
      {error &&
        <div style={{color:"red"}}>
          {error}
        </div>
      }
      <Form.Item
        label="Имя"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;