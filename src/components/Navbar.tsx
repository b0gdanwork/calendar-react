import React, {FC} from 'react';
import {Layout, Row, Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Navbar:FC = () => {
  const router = useNavigate()
  const auth = useTypedSelector(state => state.authReducer.auth)
  return (
    <Layout.Header>
        { auth ?
          <>
            <div style={{color: 'white'}}>
              Богдан4ик
            </div>
            <Menu
              mode="horizontal"
              theme="dark"
              selectable={false}
            >
              <Menu.Item>Выйти</Menu.Item>
            </Menu>
          </>
          :
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
            >
              <Menu.Item>Войти</Menu.Item>
            </Menu>
          </>

        }
    </Layout.Header>
  );
};

export default Navbar;