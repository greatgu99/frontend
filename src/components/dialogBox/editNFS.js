// 编辑NFS服务页面

import React, { useState, useEffect, forwardRef } from "react";

import { Form, Input, Radio, Select } from "antd";
import http from "../../util/request";
const { Option } = Select;

const editNFS = forwardRef((props, ref) => {
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
          <Form.Item
            name="shares"
            label="共享目录"
            rules={[
              {
                required: true,
                message: "请选择共享目录名称!"
              }
            ]}
          >
            <Input readOnly />
          </Form.Item>
          <Form.Item
            name="host_str"
            label="主机IP"
            tooltip="* 表示允许所有客户端访问,ip地址; ip网段, ip/netmask."
            rules={[
              {
                required: true,
                message: "请输入主机IP!"
              }
            ]}
          >
            <Input allowClear placeholder="请输入主机IP!" />
          </Form.Item>
          <Form.Item
            name="mod_choice"
            label="读写操作"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group value={"rw"}>
              <Radio value={"rw"}>读写 </Radio>
              <Radio value={"ro"}>只读</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="sync_choice"
            label="是否异步"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group value={"async"}>
              <Radio value={"async"}>异步</Radio>
              <Radio value={"sync"}>同步</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default editNFS;
