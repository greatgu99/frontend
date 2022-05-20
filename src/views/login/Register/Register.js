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
import "./Register.css";
import axios from "axios"
import logo from "../../../asset/image/logo.jpg";
import { validatePasswd, validateAccount } from "../../../util/api";
// 加密
// import { Encrypt } from "../../../util/secret";

export default function Register(props) {
  // const phoneFormRef = React.createRef();
  const accountFormRef = React.createRef();
  const [isLoading, setisLoading] = useState(false);

  // const validatePasswdAgain = (rule,value) =>{
  //   if (value){
  //     accountFormRef.current.validateFields().then(value => {
  //       if (value.password !== value.passwordagin){
  //         return Promise.reject(
  //           "请与输入的密码保持一致"
  //         );
  //       } else {
  //         return Promise.resolve()
  //       }
  //     })
  //   } else {
  //     return Promise.resolve()
  //   }
    
  // }

  const goBackToLogin= ()=>{
    props.history.push({
      pathname:"/Login",
    });
  }


  // 账号密码登录
  const accountRegister = () => {
    accountFormRef.current.validateFields().then(value => {
      console.log(value);

      //   // 添加token,跳转到首页
      //   // 调用登录接口，成功存储token到sessionStorage
      // const encryptionPasswd = Encrypt(value.password);
      setisLoading(true);
      // props.history.push("/");
      // window.location.reload(true);
      axios.post("http://124.220.22.44/api/backend/login",{
        action: "register",
        data:{
          username: value.account, 
          password: value.password 
        }
      })
      .then(res=>{
        if (res.data.result == false){
          message.error("用户名已存在，请更换用户名！");
        }
        setisLoading(false);
        props.history.push("/");
        window.location.reload(true);
      })
      .catch(error => {
        console.log(error);
      });
    });
  };

  return (
    <div
      className="bgUrl"
      style={{
        height: "100%",
        overflow: "hidden"
      }}
    >
      <div className="formContainer">
        <img width={100} src={logo} className="logoImg" alt="显示失败!" />

        <div className="registertitle" style={{
          marginBottom:"20px"
        }}>用户注册</div>

        <Form name="normal_register" className="register-form" ref={accountFormRef}>
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
            name="passwordagain"
            rules={[
              {
                required: true,
                message: "请再次输入你的密码!"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不相同!"));
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请再次输入密码"
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
                marginLeft: "120px",
                marginBottom:"12px"
              }}
              type="primary"
              htmlType="submit"
              className="register-form-button"
              onClick={accountRegister}
              loading={isLoading}
            >
              注册
            </Button>
            <Button
              style={{
                width: "220px",
                marginLeft: "120px"
              }}
              type="primary"
              onClick={goBackToLogin}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
