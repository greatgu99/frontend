// 添加NFS服务页面

import React, { useState, useEffect, forwardRef } from "react";

import { Form, Input, Radio, Select } from "antd";
import http from "../../util/request";
const { Option } = Select;

const addNFS = forwardRef((props, ref) => {
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
    // 获取服务信息
    http
      .get("/api/shares", {
        params: Data
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const nfsList = res.data.results;
          const share = [];

          nfsList.map(item => {
            if (item.id !== null && item.name !== "home") {
              share.push(item);
            }
          });
          console.log(nfsList, "nfsList");
          console.log(props.nfsList, "props");
          console.log(share, "props");
          let shareFilter = share.filter(
            obj =>
              !props.nfsList.some(obj1 => obj1.exports[0].share === obj.name)
          );
          console.log(shareFilter, "shareFilter");

          setsharesList(shareFilter);
          setisLoading(false);
          setloadingTittle("请选择共享目录名称!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.nfsList]); // eslint-disable-line react-hooks/exhaustive-deps

  const options = sharesList.map(d => (
    <Option key={d.subvol_name}>{d.subvol_name}</Option>
  ));
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
export default addNFS;
