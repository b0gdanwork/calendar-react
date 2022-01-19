import React, {FC, useState} from 'react';
import {Alert, Button, Form, Input} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const LoginForm:FC = () => {

  const {error, isLoading} = useTypedSelector(state => state.authReducer)

  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const {login} = useActions()

  const submit = () => {
    login(userName, userPassword)
  }

  return (
    <>
      {error &&
        <Alert
            description={error}
            type="error"
            closable
            style={{marginBottom:'15px'}}
        />
      }
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={submit}
      >

        <Form.Item
          label="Имя"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            value={userPassword}
            onChange={(e)=>{setUserPassword(e.target.value)}}
          />
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
    </>
  );
};

export default LoginForm;