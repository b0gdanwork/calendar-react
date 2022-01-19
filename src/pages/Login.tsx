import React, {FC, useCallback, useEffect} from 'react'
import {Card, Layout, Row} from "antd"
import LoginForm from "../components/LoginForm"


const Login:FC = () => {
    return (
      <Layout>
        <Row
          className={"h100"}
          justify={"center"}
          align={"middle"}
        >
            <Card>
                <LoginForm/>
            </Card>
        </Row>
      </Layout>
    )
}

export default Login
