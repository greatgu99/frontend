// 登录界面

import React, { useState, useEffect } from "react";
import { Form, Button, Input, message, Tabs, Checkbox } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from "@ant-design/icons";
// import http from "../../../util/request";
import "./Login.css";
import axios from "axios"
import logo from "../../../asset/image/logo.jpg";
import { validatePasswd, validateAccount } from "../../../util/api";
// 加密
// import { Encrypt } from "../../../util/secret";

export default function Login(props) {
  // const phoneFormRef = React.createRef();
  const accountFormRef = React.createRef();
  const [isLoading, setisLoading] = useState(false);
  const [wrongAccountOrPassword,setWrongAccountOrPassword] = useState(true);
  // 账号密码登录
  const accountLogin = () => {
    accountFormRef.current.validateFields().then(value => {
      console.log(value);

      //   // 添加token,跳转到首页
      //   // 调用登录接口，成功存储token到sessionStorage
      // const encryptionPasswd = Encrypt(value.password);
      setisLoading(true);
      axios.post("http://124.220.22.44/api/backend/login",{
        action: "login",
        data:{
          username: value.account, 
          password: value.password 
        }
      })
      .then(res=>{
        if (res.data.result){
          localStorage.setItem("token", res.data.token);
          props.history.push("/");
          
          window.location.reload(true);
          message.success("登陆成功！");
        } else {
          message.error("登陆失败,账号信息输入错误！");
        }
        setisLoading(false);
        
      })
      .catch(error => {
        console.log(error);
        setisLoading(false);
      });
    });
  };

  const navigateToRegister= ()=>{
    props.history.push({
      pathname:"/Register",
    });
  }


  return (
    <div
      className="bgUrl"
      style={{
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div className="formContainer1">
        <img width={100} src={logo} className="logoImg" alt="显示失败!" />

        <div className="logintitle" style={{
          marginBottom:"20px"
        }}>自动诊断系统</div>

        <Form name="normal_login" className="login-form" ref={accountFormRef}>
          <Form.Item
            name="account"
            rules={[
              {
                required: true,
                message: "请输入账户!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入帐号"
              allowClear
              maxLength={30}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!"
              },
              {
                validator: validatePasswd
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              allowClear
              // onChange={inputChangePassWord}
            />
          </Form.Item>
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("请确认阅读并同意"))
              }
            ]}
          >
            <Checkbox>
              我已阅读并同意 <a href="">《自动诊断系统用户须知》</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                width: "220px",
                marginLeft: "120px"
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={accountLogin}
              loading={isLoading}
            >
              登录
            </Button>
            <div style={{
              marginTop:"12px",
              display:"flex",
              flexDirection:"row",
              justifyContent:"space-between",
              fontSize:"14px",
              color:"rgb(24,144,255)"
            }}>
              <div onClick={()=>navigateToRegister()}>注册用户</div>
              <div>忘记密码</div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
