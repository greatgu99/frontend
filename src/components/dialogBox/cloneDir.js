//克隆目录页面

import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input } from "antd";
import { validateAccount } from "../../util/api";

const cloneDir = forwardRef((props, ref) => {
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
            name="newName"
            label="共享目录名称"
            tooltip="限30个字符，字母开头，包含大小写英文字母数字及下划线."
            rules={[
              {
                required: true,
                message: "请输入新的共享目录名称!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input allowClear placeholder="请输入新的共享目录名称!" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default cloneDir;
