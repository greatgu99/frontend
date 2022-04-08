// 新增用户或修改用户组件
// addOrEdit添加或编辑的标识
import { Form, Input } from "antd";

import React, { forwardRef } from "react";

const FileAddOrEdit = forwardRef((props, ref) => {
  console.log(props.addOrEdit, "addOrEdit");

  return (
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
          name="name"
          label="文件夹名称"
          rules={[
            {
              required: true,
              max: 20,
              message: "请输入文件夹名称!"
            }
          ]}
        >
          <Input allowClear maxLength={20} />
        </Form.Item>
      </Form>
    </div>
  );
});
export default FileAddOrEdit;
