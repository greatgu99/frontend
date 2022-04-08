// 服务列表页面配置Ntpd页面

import React, { useState, forwardRef, useEffect } from "react";

import { Form, Input, Select } from "antd";
const { Option } = Select;
const editNtpd = forwardRef((props, ref) => {
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
            name="services"
            label="NTPD服务器"
            tooltip="多个上层NTP服务器需使用逗号','隔开.如：'0.cn.pool.ntp.org,1.cn.pool.ntp.org,2.cn.pool.ntp.org,3.cn.pool.ntp.org'"
            rules={[
              {
                required: true,
                message: "请输入NTPD服务器!"
              }
            ]}
          >
            <Input allowClear placeholder="请输入NTPD服务器!" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default editNtpd;
