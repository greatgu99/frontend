//编辑共享目录大小页面
// 参数：子传父 传sharedDirectory
// btn: false/true,
// dirSize: 1024 KB
import React, { forwardRef, useState } from "react";

import { Form, Input, message, Select } from "antd";
import { initSizeMin, initSize, initUnitSize } from "../../util/api";
const { Option } = Select;

const editShareDirSize = forwardRef((props, ref) => {
  // 存储池单位
  const [poolSizeUnit, setpoolSizeUnit] = useState(props.dirUnitInit);
  const [poolSize, setpoolSize] = useState("");

  // 判断是否在存储池容量内，大小
  const dirSizeMax = e => {
    setpoolSize(e.target.value);
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
      if (poolSizeInit < 100) {
        message.warning("目录内容大小不能小于100KB！");
        // setaddDirBtnTrue(true);
        props.getMsgEdit({
          btn: true
          // dirSize: poolSizeInit
        });
      } else if (poolSizeInit > props.shareDirMaxSize) {
        message.warning(
          "目录内容大小不能大于" +
            initUnitSize(props.shareDirMaxSize).size +
            initUnitSize(props.shareDirMaxSize).unit
        );
        props.getMsgEdit({
          btn: true
          // dirSize: poolSizeInit
        });
      } else {
        props.getMsgEdit({
          btn: false
          // dirSize: poolSizeInit
        });
      }
    }
  };
  // 获取输入框大小单位，单位
  function handleChangeUnit(value) {
    setpoolSizeUnit(value);
    console.log(`selected ${value}`);

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

      if (poolSizeInits < 100) {
        message.warning("目录内容大小不能小于100KB!");
        props.getMsgEdit({
          btn: true
          // dirSize: poolSizeInits
        });
      } else if (poolSizeInits > props.shareDirMaxSize) {
        message.warning(
          "目录内容大小不能大于" +
            initUnitSize(props.shareDirMaxSize).size +
            initUnitSize(props.shareDirMaxSize).unit
        );
        props.getMsgEdit({
          btn: true
          // dirSize: poolSizeInits
        });
      } else {
        props.getMsgEdit({
          btn: false
          // dirSize: poolSizeInits
        });
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
            style={{
              position: "relative",
              marginBottom: "40px"
            }}
            // name="size"
            label="共享目录大小"
          >
            <div
              style={{
                position: "absolute",
                left: "-126px",
                top: "24px",
                zIndex: "999",
                fontSize: "12px",
                color: "#9195a3"
              }}
            >
              {initSizeMin(100)}
              {initSize(props.shareDirMaxSize)}
            </div>
            <Input.Group compact>
              <Form.Item
                name={["size", "dirSize"]}
                noStyle
                rules={[{ required: true, message: "Street is required" }]}
              >
                <Input
                  style={{ width: "70%" }}
                  onChange={dirSizeMax}
                  type="number"
                  allowClear
                  placeholder="请输入共享目录大小!"
                />
              </Form.Item>
              <Form.Item
                name={["size", "dirUnit"]}
                noStyle
                rules={[{ required: true, message: "Province is required" }]}
              >
                <Select
                  style={{ width: "30%" }}
                  defaultValue="MB"
                  onChange={handleChangeUnit}
                >
                  <Option value="KB">KB</Option>
                  <Option value="MB">MB</Option>
                  <Option value="GB">GB</Option>
                  <Option value="TB">TB</Option>
                </Select>
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default editShareDirSize;
