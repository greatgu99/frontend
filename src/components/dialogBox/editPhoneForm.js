// 身份验证

import React, { forwardRef, useState } from "react";
import { Form, Input } from "antd";

import { validateTelphone } from "../../util/api";

const EditPhoneForm = forwardRef((props, ref) => {
  // console.log(props.formFlag, "dasdas");
  const [phone, setphone] = useState("");

  // 获取手机号
  const inputChangePhone = e => {
    setphone(e.target.value);
  };
  return (
    <div>
      <Form
        ref={ref}
        labelCol={{
          span: 4
        }}
        labelAlign="left"
        wrapperCol={{
          span: 18
        }}
      >
        <Form.Item
          name="telphone"
          label="手机号"
          rules={[
            {
              required: true,
              message: "请输入手机号!"
            },
            {
              validator: validateTelphone
            }
          ]}
        >
          <Input
            allowClear
            showCount
            maxLength={11}
            placeholder="请输入手机号!"
            defaultValue={props.telPhone}
            onChange={inputChangePhone}
          />
        </Form.Item>
      </Form>
    </div>
  );
});
export default EditPhoneForm;
