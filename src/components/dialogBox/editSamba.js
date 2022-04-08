// 编辑Samba服务页面

import React, { useState, useEffect, forwardRef } from "react";

import { Form, Input, Radio, Select } from "antd";
import { validateAccount } from "../../util/api";
import http from "../../util/request";
const { Option } = Select;
const { TextArea } = Input;

const editSamba = forwardRef((props, ref) => {
  // const [userAdminTrue, setuserAdminTrue] = useState([]);

  // useEffect(() => {
  //   let Data = {
  //     page: 1,
  //     page_size: 20000
  //   };

  //   // 获取用户信息
  //   http
  //     .get("/api/users", {
  //       params: Data
  //     })
  //     .then(res => {
  //       if (res.status >= 200 && res.status <= 300) {
  //         const userData = res.data.results;
  //         const users = [];
  //         userData.map(item => {
  //           if (item.id !== null) {
  //             users.push(item);
  //           }
  //         });
  //         setuserAdminTrue(users);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const userOptions = userAdminTrue.map(d => (
  //   <Option key={d.username}>{d.username}</Option>
  // ));

  return (
    <div>
      <div>
        <Form
          ref={ref}
          labelCol={{
            span: 9
          }}
          labelAlign="left"
          wrapperCol={{
            span: 14
          }}
        >
          {/* <Form.Item name="admin_users" label="管理员用户">
            <Select allowClear mode="multiple" placeholder="请选择管理员用户">
              {userOptions}
            </Select>
          </Form.Item> */}
          <Form.Item
            name="browsable"
            label="是否可浏览"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group value={"yes"}>
              <Radio value={"yes"}>是</Radio>
              <Radio value={"no"}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="guest_ok"
            label="是否允许guest访问"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group value={"yes"}>
              <Radio value={"yes"}>是</Radio>
              <Radio value={"no"}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="read_only"
            label="是否只读"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group value={"yes"}>
              <Radio value={"yes"}>是</Radio>
              <Radio value={"no"}>否</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="comment" label="说明">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default editSamba;
