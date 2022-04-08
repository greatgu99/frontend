// 服务列表页面配置Smb页面

import React, { useState, forwardRef, useEffect } from "react";

import { Form, Input, Select } from "antd";
const { Option } = Select;
const addConnect = forwardRef((props, ref) => {
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
            name="workgroup"
            label="工作组名称"
            // tooltip="限30个字符，字母开头，支持大小写英文字母，及数字."
            rules={[
              {
                required: true,
                message: "请输入工作组名称!"
              }
              //     ,
              //   {
              //     validator: validateAccount
              //   }
            ]}
          >
            <Input allowClear placeholder="请输入工作组名称!" maxLength={30} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default addConnect;
