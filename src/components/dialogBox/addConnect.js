// 新建网络连接页面
// 参数：
// netcardList：网卡信息，获取里面的网卡设备名用来做新建连接时的设备选择

import React, { useState, forwardRef, useEffect } from "react";

import { Form, Input, Select } from "antd";
import { validateAccount } from "../../util/api";
const { Option } = Select;
const addConnect = forwardRef((props, ref) => {
  const [isipaddr, setisipaddr] = useState(false);

  useEffect(() => {
    return () => {
      console.log(222);

      setisipaddr(false);
    };
  }, []);
  const methodChange = value => {
    console.log(value);
    if (value === "manual") {
      setisipaddr(true);
    } else {
      setisipaddr(false);
    }
  };
  const options = props.netcardList.map(d => (
    <Option key={d.name}>{d.name}</Option>
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
        >
          <Form.Item
            name="conntecName"
            label="网络连接名称"
            tooltip="限30个字符，字母开头，支持大小写英文字母数字及下划线."
            rules={[
              {
                required: true,
                message: "请输入网络连接名称!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input
              allowClear
              placeholder="请输入新建网络连接名称!"
              maxLength={30}
            />
          </Form.Item>
          <Form.Item
            name="ctype"
            label="连接类型"
            rules={[
              {
                required: true,
                message: "请选择连接类型!"
              }
            ]}
          >
            <Select placeholder="请选择连接类型!">
              <Option value="ethernet">ethernet</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="deviceName"
            label="设备名称"
            rules={[
              {
                required: true,
                message: "请输入网络设备名称!"
              }
            ]}
          >
            <Select placeholder="请选择网络设备!">{options}</Select>
          </Form.Item>
          <Form.Item
            name="method"
            label="IP方式"
            tooltip="当IP方式为manual时，必传，格式为：ip/netmask。如：'192.168.56.211/24'"
            rules={[
              {
                required: true,
                message: "请选择IP方式!"
              }
            ]}
          >
            <Select onChange={methodChange} placeholder="请选择IP方式!">
              <Option value="auto">dhcp</Option>
              <Option value="manual">manual</Option>
            </Select>
          </Form.Item>
          {isipaddr ? (
            <div>
              <Form.Item
                name="ipaddr"
                label="IP地址"
                rules={[
                  {
                    required: isipaddr,
                    message: "请输入IP地址!"
                  }
                ]}
              >
                <Input allowClear placeholder="请输入IP地址!" maxLength={30} />
              </Form.Item>
              <Form.Item name="gateway" label="网关">
                <Input allowClear placeholder="请输入IP网关!" maxLength={30} />
              </Form.Item>
              <Form.Item name="dns_servers" label="DNS">
                <Input allowClear placeholder="请输入DNS!" maxLength={30} />
              </Form.Item>
              <Form.Item name="search_domains" label="搜索域">
                <Input
                  allowClear
                  placeholder="请输入IP搜索域!"
                  maxLength={30}
                />
              </Form.Item>
            </div>
          ) : (
            ""
          )}
        </Form>
      </div>
    </div>
  );
});
export default addConnect;
