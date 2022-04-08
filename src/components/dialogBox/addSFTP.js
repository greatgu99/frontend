// 添加SFTP服务页面

import React, { useState, useEffect, forwardRef } from "react";

import { Form, Input, Radio, Select } from "antd";
import http from "../../util/request";
const { Option } = Select;

const addSFTP = forwardRef((props, ref) => {
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
        console.log(res);

        if (res.status >= 200 && res.status <= 300) {
          const nfsList = res.data.results;
          const share = [];

          nfsList.map(item => {
            if (
              item.id !== null &&
              item.name !== "home" &&
              item.owner !== "root"
            ) {
              share.push(item);
            }
          });
          console.log(nfsList, "nfsList");
          console.log(props.sftpList, "props");

          let shareFilter = share.filter(
            obj => !props.sftpList.some(obj1 => obj1.share === obj.name)
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
        </Form>
      </div>
    </div>
  );
});
export default addSFTP;
