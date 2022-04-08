// 添加用户组页面

import React, { forwardRef } from "react";

import { Form, Input, Radio } from "antd";
import { validateAccount } from "../../util/api";

const addGroups = forwardRef((props, ref) => {
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
            name="groupsName"
            label="用户组名"
            tooltip="限30个字符，字母开头，包含大小写英文字母数字及下划线."
            rules={[
              {
                required: true,
                message: "请输入用户组名!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input
              allowClear
              placeholder="请输入新建用户组名!"
              maxLength={30}
            />
          </Form.Item>
          <Form.Item
            name="isAdmin"
            // label={
            //   // <div>
            //   //   <span style={{ color: "red" }}>{"*"}</span> 是否可管理
            //   // </div>
            // }
            label="是否可管理"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default addGroups;
