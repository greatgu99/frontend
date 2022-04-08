//编辑共享目录压缩格式页面
// 参数：子传父 传sharedDirectory
// btn: false/true,
// dirSize: 1024 KB
import React, { forwardRef } from "react";

import { Form, Select } from "antd";
const { Option } = Select;

const editShareDirZip = forwardRef((props, ref) => {
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
          <Form.Item name="compression_algo" label="压缩方式">
            <Select
              // defaultValue="no"
              // onChange={handleChangeUnit}
              style={{
                flex: "1"
              }}
            >
              <Option value="no">no</Option>
              <Option value="zlib">zlib</Option>
              <Option value="lzo">lzo</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default editShareDirZip;
