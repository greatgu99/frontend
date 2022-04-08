// 用户开

import React, { forwardRef } from "react";

import { Form, Input } from "antd";
import { validatePasswd } from "../../util/api";

const changeAdmin = forwardRef((props, ref) => {
  return (
    <div>
      <div>
        <Form
          ref={ref}
          labelCol={{
            span: 7
          }}
          labelAlign="left"
          wrapperCol={{
            span: 14
          }}
        >
          <Form.Item
            name="passWord"
            label="用户密码"
            tooltip="请输入8-16个字符,字符中必须包含字母、数字、特殊字符."
            rules={[
              {
                required: true,
                message: "请输入用户密码!"
              },
              {
                validator: validatePasswd
              }
            ]}
          >
            <Input allowClear placeholder="请设置用户新的密码!" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default changeAdmin;
