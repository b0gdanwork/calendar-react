import React, {FC} from 'react';
import {Layout, Menu} from "antd";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar:FC = () => {

  const {auth, user} = useTypedSelector(state => state.authReducer)
  const {logout} = useActions()

  const logoutClick = () => {
    logout()
  }

  return (
    <Layout.Header>
        { auth ?
          <>
            <div style={{color: 'white'}}>
              {user.username}
            </div>
            <Menu
              mode="horizontal"
              theme="dark"
              selectable={false}
            >
              <Menu.Item
                key={0}
                onClick={logoutClick}
              >Выйти</Menu.Item>
            </Menu>
          </>
          :
          <>
            <Menu
              theme="dark"
              mode="horizontal"
              selectable={false}
            >
              <Menu.Item
                key={1}
              >Войти</Menu.Item>
            </Menu>
          </>

        }
    </Layout.Header>
  );
};

export default Navbar;