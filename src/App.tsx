import React, {FC} from 'react'
import AppRoute from "./components/AppRoute";
import Navbar from "./components/Navbar";
import {Layout} from "antd";

const App:FC = () => {
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