// 身份验证

import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input } from "antd";

import VerificationCode from "./verificationCode";
import { validateTelphone } from "../util/api";

const IdVerification = forwardRef((props, ref) => {
  // console.log(props.formFlag, "dasdas");
  const [phone, setphone] = useState("");

  // 获取手机号
  const inputChangePhone = e => {
    setphone(e.target.value);
  };

  return (
    <div>
      <Form ref={ref} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item name="telphone" label=" 手机号">
          <div style={{ marginLeft: "20px" }}>{"13666666666"}</div>
        </Form.Item>
        <Form.Item
          name="verificationCode"
          label="验证码"
          rules={[
            {
              required: true,
              message: "请输入验证码!"
            }
          ]}
        >
          <div
            style={{
              display: "flex"
            }}
          >
            <Input
              allowClear
              showCount
              maxLength={6}
              placeholder="请输入验证码!"
              style={{
                flex: "2",
                marginRight: "25px",
                marginLeft: "15px"
              }}
            />
            <VerificationCode
              style={{
                flex: "1"
              }}
              phone={"13666666666"}
            ></VerificationCode>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
});
export default IdVerification;
