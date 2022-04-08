// 添加Samba服务页面

import React, { useState, useEffect, forwardRef } from "react";

import { Form, Input, Radio, Select } from "antd";
import http from "../../util/request";
const { Option } = Select;
const { TextArea } = Input;

const addSamba = forwardRef((props, ref) => {
  const [sharesList, setsharesList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [loadingTittle, setloadingTittle] = useState("共享目录加载中。。。");

  useEffect(() => {
    let Data = {
      page: 1,
      page_size: 20000
    };
    setisLoading(true);
    setloadingTittle("共享目录加载中。。。");
    // 获取Samba服务信息
    http
      .get("/api/shares", {
        params: Data
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const sambasList = res.data.results;
          const share = [];

          sambasList.map(item => {
            if (item.id !== null && item.name !== "home") {
              share.push(item);
            }
          });
          let shareFilter = share.filter(
            obj => !props.sambasList.some(obj1 => obj1.share === obj.name)
          );

          setsharesList(shareFilter);
          setisLoading(false);
          setloadingTittle("请选择共享目录名称!");
        }
      })
      .catch(error => {
        console.log(error);
      });
    // 获取用户信息
    // http
    //   .get("/api/users", {
    //     params: Data
    //   })
    //   .then(res => {
    //     if (res.status >= 200 && res.status <= 300) {
    //       const userData = res.data.results;
    //       const users = [];
    //       userData.map(item => {
    //         if (item.id !== null) {
    //           users.push(item);
    //         }
    //       });
    //       setuserAdminTrue(users);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, [props.sambasList]); // eslint-disable-line react-hooks/exhaustive-deps

  const options = sharesList.map(d => <Option key={d.id}>{d.name}</Option>);
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
            name="shares"
            label="共享目录"
            rules={[
              {
                required: true,
                message: "请选择共享目录名称!"
              }
            ]}
          >
            <Select
              allowClear
              mode="multiple"
              placeholder={loadingTittle}
              loading={isLoading}
              // onChange={handleChange}
            >
              {options}
            </Select>
          </Form.Item>
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
          <Form.Item
            name="comment"
            label="说明"
            // rules={[
            //   {
            //     required: true,
            //     message: "请进行说明!"
            //   }
            // ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default addSamba;
