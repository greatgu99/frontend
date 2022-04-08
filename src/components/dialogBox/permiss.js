//共享目录访问权限页面
// 参数：子传父 传sharedDirectory
// {
// perms1: ["r","w","x"],
// perms2: ["r","w","x"],,
// perms3: ["r","w","x"],
//  }
import React, { forwardRef, useEffect, useState } from "react";
import { Form, Input, Checkbox, Row, Select } from "antd";
import http from "../../util/request";
const { Option } = Select;
const permiss = forwardRef((props, ref) => {
  const [userAdminTrue, setuserAdminTrue] = useState([]);
  const [groupsList, setgroupsList] = useState([]);
  const [isLoading_user, setisLoading_user] = useState(true);
  const [isLoading_group, setisLoading_group] = useState(true);
  useEffect(() => {
    let usersData = {
      page: 1,
      page_size: 20000
    };
    // 获取用户信息
    http
      .get("/api/users", {
        params: usersData
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const userData = res.data.results;
          const users = [];
          userData.map(item => {
            if (item.id !== null || item.username === "root") {
              users.push(item);
            }
          });
          setuserAdminTrue(users);
          setisLoading_user(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // 获取组信息
    http
      .get("/api/groups", {
        params: usersData
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const groupsData = res.data.results;
          const groups = [];
          groupsData.map(item => {
            if (item.id !== null || item.groupname === "root") {
              groups.push(item);
            }
          });
          setgroupsList(groups);
          setisLoading_group(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  // const [perms1, setperms1] = useState("");
  // const [perms2, setperms2] = useState("");
  // const [perms3, setperms3] = useState("");

  const options = [
    { label: "读", value: "r" },
    { label: "写", value: "w" },
    { label: "执行", value: "x" }
  ];

  const groupOptions = groupsList.map(d => (
    <Option key={d.groupname}>{d.groupname}</Option>
  ));
  const userOptions = userAdminTrue.map(d => (
    <Option key={d.username}>{d.username}</Option>
  ));
  // const perms1Change = checkedValues => {
  //   setperms1(checkedValues);
  //   props.getMsgPermiss({
  //     perms1: checkedValues,
  //     perms2: perms2,
  //     perms3: perms3
  //   });
  // };
  // const perms2Change = checkedValues => {
  //   setperms2(checkedValues);
  //   props.getMsgPermiss({
  //     perms1: perms1,
  //     perms2: checkedValues,
  //     perms3: perms3
  //   });
  // };
  // const perms3Change = checkedValues => {
  //   setperms3(checkedValues);
  //   props.getMsgPermiss({
  //     perms1: perms1,
  //     perms2: perms2,
  //     perms3: checkedValues
  //   });
  // };
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
            name="owner"
            label="共享目录所属者"
            rules={[
              {
                required: true,
                message: "请选择共享目录所属者!"
              }
            ]}
          >
            {/* onChange={handleChange} */}

            <Select loading={isLoading_user}>{userOptions}</Select>
          </Form.Item>
          <Form.Item
            name="group"
            label="共享目录所属组"
            rules={[
              {
                required: true,
                message: "请选择共享目录所属组!"
              }
            ]}
          >
            <Select loading={isLoading_group}>{groupOptions}</Select>
          </Form.Item>

          <Form.Item
            name="perms1"
            label="所属者权限"
            rules={[
              {
                required: true,
                message: "请选择共享目录的访问权限!"
              }
            ]}
          >
            <Checkbox.Group options={options}></Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="perms2"
            label="所属组权限"
            rules={[
              {
                required: true,
                message: "请选择共享目录的访问权限!"
              }
            ]}
          >
            <Checkbox.Group options={options}></Checkbox.Group>
          </Form.Item>

          <Form.Item
            name="perms3"
            label="其他人权限"
            rules={[
              {
                required: true,
                message: "请选择共享目录的访问权限!"
              }
            ]}
          >
            <Checkbox.Group options={options}></Checkbox.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default permiss;
