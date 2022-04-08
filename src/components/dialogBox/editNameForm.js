// 身份验证

import React, { forwardRef, useState } from "react";
import { Form, Input } from "antd";

const EditNameForm = forwardRef((props, ref) => {
  // console.log(props.formFlag, "dasdas");
  const [name, setname] = useState("");

  // 获取昵称
  const inputChangeName = e => {
    setname(e.target.value);
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
          name="name"
          label="昵称"
          rules={[
            {
              required: true,
              message: "请输入昵称!"
            }
          ]}
        >
          <Input
            allowClear
            showCount
            maxLength={20}
            defaultValue={props.userName}
            placeholder="请输入昵称!"
            onChange={inputChangeName}
          />
        </Form.Item>
      </Form>
    </div>
  );
});
export default EditNameForm;
