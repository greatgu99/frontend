// 新建共享目录页面
// 参数：子传父 传sharedDirectory
// btn: false/true,
// dirSize: 1024 KB
import React, { forwardRef, useState, useEffect } from "react";

import { Form, Input, Radio, message, Select } from "antd";
import { validateAccount, initSize } from "../../util/api";
import http from "../../util/request";
const { Option } = Select;

const addShareDir = forwardRef((props, ref) => {
  const [poolsList, setpoolsList] = useState([]);
  const [maxPoolSize, setmaxPoolSize] = useState(0);
  // 存储池单位
  const [poolSizeUnit, setpoolSizeUnit] = useState("GB");
  const [poolSize, setpoolSize] = useState("");

  useEffect(() => {
    getPoolsInform();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 获取存储池信息
  const getPoolsInform = () => {
    let poolsData = {
      page: 1,
      page_size: 20000
    };
    // 获取存储池信息
    http
      .get("/api/pools", {
        params: poolsData
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const poolsData = res.data.results;
          const pools = [];
          poolsData.map(item => {
            if (item.id !== null) {
              pools.push(item);
            }
          });
          setpoolsList(pools);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 获取存储池名称
  const getPoolsName = obj => {
    return obj.map(item => {
      const name_id = item.name + "_" + item.id;
      return <Radio value={name_id}>{item.name}</Radio>;
    });
  };

  // 判断是否在存储池容量内
  const dirSizeMax = e => {
    setpoolSize(e.target.value);
    // debugger;
    // 存储处理后为KB的数据
    var poolSizeInit = "";
    if (poolSizeUnit !== "") {
      if (poolSizeUnit === "KB") {
        poolSizeInit = e.target.value;
      } else if (poolSizeUnit === "MB") {
        poolSizeInit = e.target.value * 1024;
      } else if (poolSizeUnit === "GB") {
        poolSizeInit = e.target.value * 1048576;
      } else if (poolSizeUnit === "TB") {
        poolSizeInit = e.target.value * 1073741824;
      }
      if (poolSizeInit > maxPoolSize) {
        message.warning("存储池容量不足！");
        // setaddDirBtnTrue(true);
        props.getMsg({ btn: true, dirSize: poolSizeInit });
      } else {
        props.getMsg({ btn: false, dirSize: poolSizeInit });
      }
    }
  };

  // 存储池选择获取存储池大小
  const onChange = e => {
    const split_e = e.target.value.split("_");
    http
      .get(`/api/pools/${split_e[1]}`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          setmaxPoolSize(res.data.free);
          console.log(res.data.free, "res");
        } else {
          console.log("**");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // 获取输入框大小单位
  function handleChangeUnit(value) {
    setpoolSizeUnit(value);

    var poolSizeInits = "";
    if (poolSizeUnit !== "") {
      if (value === "KB") {
        poolSizeInits = poolSize;
      } else if (value === "MB") {
        poolSizeInits = poolSize * 1024;
      } else if (value === "GB") {
        poolSizeInits = poolSize * 1048576;
      } else if (value === "TB") {
        poolSizeInits = poolSize * 1073741824;
      }

      if (poolSizeInits > maxPoolSize) {
        message.warning("存储池容量不足！");
        props.getMsg({ btn: true, dirSize: poolSizeInits });
      } else {
        props.getMsg({ btn: false, dirSize: poolSizeInits });
      }
    }
  }
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
            name="shareName"
            label="共享目录名"
            tooltip="限30个字符，字母开头，包含大小写英文字母数字及下划线."
            rules={[
              {
                required: true,
                message: "请输入共享目录名!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input
              allowClear
              placeholder="请输入新建共享目录名!"
              maxLength={30}
            />
          </Form.Item>
          <Form.Item
            name="poolName"
            label="存储池"
            rules={[
              {
                required: true,
                message: "请选择按钮!"
              }
            ]}
          >
            <Radio.Group onChange={onChange}>
              {getPoolsName(poolsList)}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            style={{ position: "relative" }}
            name="shareDirSize"
            label="共享目录大小"
            rules={[
              {
                required: true,
                message: "请输入共享目录大小!"
              }
            ]}
          >
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "-126px",
                  top: "24px",
                  zIndex: "999",
                  fontSize: "12px"
                }}
              >
                {initSize(maxPoolSize)}
              </div>
              <div
                style={{
                  display: "flex"
                }}
              >
                <Input
                  style={{
                    flex: "3",
                    marginRight: "10px"
                  }}
                  onChange={dirSizeMax}
                  type="number"
                  allowClear
                  placeholder="请输入共享目录大小!"
                />
                <Select
                  defaultValue="GB"
                  onChange={handleChangeUnit}
                  style={{
                    flex: "1"
                  }}
                >
                  <Option value="KB">KB</Option>
                  <Option value="MB">MB</Option>
                  <Option value="GB">GB</Option>
                  <Option value="TB">TB</Option>
                </Select>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default addShareDir;
