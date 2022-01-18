import React, { Component , FC} from 'react'
import { connect } from 'react-redux'
import {Layout, Row} from "antd";
import LoginForm from "../components/LoginForm";

const Login:FC = () => {
    return (
      <Layout>
        <Row
          className={"h100"}
          justify={"center"}
          align={"middle"}
        >
            <LoginForm/>
        </Row>
      </Layout>
    )
}

export default Login
// const mapStateToProps = (state) => ({
  
// })

// const mapDispatchToProps = {
  
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login)
