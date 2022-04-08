// 添加新用户页面
// 参数：
// groupsList：用户组列表信息

import React, { forwardRef, useEffect, useState } from "react";

import { Form, Input, Select } from "antd";
import { validatePasswd, validateAccount } from "../../util/api";
const { Option } = Select;

const addUser = forwardRef((props, ref) => {
  // 新手引导
  const [stepsEnabled, setstepsEnabled] = useState(false);
  const [initialStep, setinitialStep] = useState(0);
  const [hintsEnabled, sethintsEnabled] = useState(true);
  const [steps, setsteps] = useState([
    {
      element: ".hello",
      intro: "Hello step"
    },
    {
      element: ".world",
      intro: "World step"
    },
    {
      element: ".world1",
      intro: "World1 step"
    }
  ]);
  const [hints, sethints] = useState([
    {
      element: ".hello",
      hint: "Hello hint",
      hintPosition: "middle-right"
    }
  ]);
  const options = props.groupsList.map(d => (
    <Option key={d.groupname}>{d.groupname}</Option>
  ));

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
          // onFinish={onFinish}
        >
          <Form.Item
            className="world"
            name="userName"
            label="用户名"
            tooltip="限30个字符，字母开头，包含大小写英文字母数字及下划线."
            rules={[
              {
                required: true,
                message: "请输入用户名!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input
              allowClear
              placeholder="请输入新建用户的用户名!"
              maxLength={30}
            />
          </Form.Item>
          <Form.Item
            className="world"
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
            <Input allowClear placeholder="请设置新建用户的密码!" />
          </Form.Item>
          <Form.Item
            name="group"
            label="分组"
            rules={[
              {
                required: true,
                message: "请输入用户分组!"
              }
            ]}
          >
            <Select allowClear placeholder="请选择用户分组!">
              {options}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default addUser;
