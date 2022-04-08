// 创建存储池页面

import React, { forwardRef, useEffect, useState } from "react";

import { Form, Input, Radio, message, Checkbox, Row, Col } from "antd";
import http from "../../util/request";
import qs from "qs";
import { validateAccount } from "../../util/api";

const addPools = forwardRef((props, ref) => {
  const [hardDisksList, sethardDisksList] = useState([]);
  const [hardDisksOptions, sethardDisksOptions] = useState([]);
  const [poolsLeavels, setpoolsLeavels] = useState(null);
  const [hardDisksId, sethardDisksId] = useState([]);
  const [hardDisksName, sethardDisksName] = useState();

  useEffect(() => {
    let hardDisksData = {
      page: 1,
      page_size: 20000
    };
    // 获取硬盘信息
    http
      .get("/api/disks", {
        params: hardDisksData
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          console.log(res.data.results);

          const hardDisksData = res.data.results;
          const hardDisks = [];
          hardDisksData.map(item => {
            if (item.pool_name === null && item.btrfs_uuid === null) {
              hardDisks.push(item);
            }
          });
          sethardDisksList(hardDisks);
        }
      })
      .catch(error => {
        console.log(error);
      });
    hardDiskradio();
    console.log(hardDisksOptions);
  }, [props.poolsList]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    hardDiskradio();
    console.log(hardDisksOptions, "sadas");
  }, [hardDisksList]); // eslint-disable-line react-hooks/exhaustive-deps

  // 处理硬盘数据
  const hardDiskradio = () => {
    var harddiskBox = [];
    hardDisksList.map(item => {
      harddiskBox.push({
        label: item.name,
        value: item.id
      });
    });
    sethardDisksOptions(harddiskBox);
  };

  // 级别更改
  const levelChange = e => {
    const poolLeavelChange = e.target.value;

    setpoolsLeavels(poolLeavelChange);
    var hardDisksSize_level = [];
    var hardDisksName_level = [];
    // 判断当本地拿到的硬盘数据的id中存在与选中的相同的，返回硬盘大小
    hardDisksList.map(item => {
      hardDisksId.map(obj => {
        if (item.id === obj) {
          hardDisksSize_level.push(item.size);
          hardDisksName_level.push(item.name);
        }
      });
    });
    sethardDisksName(hardDisksName_level);
    // 计算存储池可用空间
    if (hardDisksId.length === 0) {
      message.warning("请选择硬盘！");
    } else {
      http
        .get(
          `/api/pools/usage_bound?raid_level=${poolLeavelChange}&${qs.stringify(
            {
              disk_sizes: hardDisksSize_level
            },
            { arrayFormat: "brackets" }
          )}`
        )
        .then(res => {
          if (res.status >= 200 && res.status <= 300) {
            console.log(res);
            if (res.data === 0) {
              props.getMsg({ isTrue: true, hardDiskName: hardDisksName });
              message.error("选择硬盘容量不足！");
            } else {
              props.getMsg({ isTrue: false, hardDiskName: hardDisksName });
              message.success("硬盘容量充足！");
            }
          } else {
            console.log("***");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // 硬盘选择更改
  const hardDisksChange = checkedValues => {
    sethardDisksId(checkedValues);
    var hardDisksSize = [];
    var hardDisksName = [];

    // 判断当本地拿到的硬盘数据的id中存在与选中的相同的，返回硬盘大小
    hardDisksList.map(item => {
      checkedValues.map(obj => {
        if (item.id === obj) {
          hardDisksSize.push(item.size);
          hardDisksName.push(item.name);
        }
      });
    });
    sethardDisksName(hardDisksName);

    // 计算存储池可用空间
    if (poolsLeavels === null) {
      message.warning("请选择存储池级别！");
    } else {
      http
        .get(
          `/api/pools/usage_bound?raid_level=${poolsLeavels}&${qs.stringify(
            {
              disk_sizes: hardDisksSize
            },
            { arrayFormat: "brackets" }
          )}`
        )
        .then(res => {
          if (res.status >= 200 && res.status <= 300) {
            console.log(res);
            if (res.data === 0) {
              props.getMsg({ isTrue: true, hardDiskName: hardDisksName });
              message.error("选择硬盘容量不足！");
            } else {
              props.getMsg({ isTrue: false, hardDiskName: hardDisksName });
              message.success("硬盘容量充足！");
            }
          } else {
            console.log("***");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
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
            name="hardDisksName"
            label="存储池名称"
            tooltip="限30个字符，字母开头，包含大小写英文字母数字及下划线."
            rules={[
              {
                required: true,
                message: "请输入存储池名称!"
              },
              {
                validator: validateAccount
              }
            ]}
          >
            <Input
              allowClear
              placeholder="请输入新建存储池名称!"
              maxLength={30}
            />
          </Form.Item>
          <Form.Item
            name="poolsLevel"
            label="存储池级别"
            rules={[
              {
                required: true,
                message: "请选择存储池级别!"
              }
            ]}
          >
            {/* onChange={this.onChange} */}
            <Radio.Group value={"single"} onChange={levelChange}>
              <Row>
                <Col span={8}>
                  <Radio value={"single"}>single</Radio>
                </Col>
                <Col span={8}>
                  <Radio value={"raid0"}>raid0</Radio>
                </Col>
                <Col span={8}>
                  <Radio value={"raid1"}>raid1</Radio>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <Radio value={"raid5"}>raid5</Radio>
                </Col>
                <Col span={8}>
                  <Radio value={"raid6"}>raid6</Radio>
                </Col>
                <Col span={8}>
                  <Radio value={"raid10"}>raid10</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="hardDisks"
            label="硬盘"
            rules={[
              {
                required: true,
                message: "请选择硬盘!"
              }
            ]}
          >
            {hardDisksOptions.length === 0 ? (
              "暂无可用硬盘，需要格式化硬盘！！！"
            ) : (
              <Checkbox.Group
                options={hardDisksOptions}
                onChange={hardDisksChange}
              ></Checkbox.Group>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
export default addPools;
