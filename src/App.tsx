import React, {FC, useEffect} from 'react'
import AppRoute from "./components/AppRoute";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

const App:FC = () => {
  const {setAuth, setUser} = useActions()
  useEffect(()=>{
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem("username" || "")} as IUser)
      setAuth(true)
    }
  }, [])

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRoute />
      </Layout.Content>
    </Layout>
  )
}

export default App