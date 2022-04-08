// 左侧菜单栏

import React, { useState, useEffect } from "react";
import { Layout, Menu, Progress, Button, Tooltip } from "antd";
import "./SideMenu.css";
// import http from "../../util/request";

import logo from "../../asset/image/logo_small.jpg";
import { withRouter } from "react-router-dom";
import {
  BlockOutlined,
  BankOutlined,
  UserOutlined,
  HddOutlined,
  LaptopOutlined,
  FundProjectionScreenOutlined,
  ProfileOutlined,
  MessageOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  CloudServerOutlined,
  SearchOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;

//模拟数组结构
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <BankOutlined />
  },
  {
    key: "/diagnose",
    title: "疾病咨询",
    icon: <SearchOutlined />
  },
  {
    key: "/history",
    title: "就诊记录",
    icon: <ProfileOutlined />
  },
  {
    key: "/perCenter",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/perCenter/userLists",
        title: "用户管理"
      },
      {
        key: "/perCenter/permissions",
        title: "权限管理"
      },
      {
        key: "/perCenter/userInform/perCenter",
        title: "个人中心"
      }
    ]
  },

  // {
  //   key: "/storage",
  //   title: "存储管理",
  //   icon: <HddOutlined />,
  //   children: [
  //     {
  //       key: "/storage/hardDiskStorage",
  //       title: "硬盘管理"
  //     },
  //     {
  //       key: "/storage/storagePool",
  //       title: "存储池管理"
  //     },
  //     {
  //       key: "/service/sharedDirectory",
  //       title: "共享目录"
  //     },
  //     {
  //       key: "/service/services",
  //       title: "文件服务",
  //       children: [
  //         {
  //           key: "/service/services/SambaServices",
  //           title: "Samba"
  //         },
  //         {
  //           key: "/service/services/NFSService",
  //           title: "NFS"
  //         },
  //         {
  //           key: "/service/services/SFTPService",
  //           title: "SFTP"
  //         }
  //         // {
  //         //   key: "/service/services/AFPServices",
  //         //   title: "AFP"
  //         // }
  //       ]
  //     }
  //   ]
  // },

  // {
  //   key: "/equipManage/networkCard",
  //   title: "网络管理",
  //   icon: <GlobalOutlined />,
  //   children: [
  //     {
  //       key: "/equipManage/networkCard/netCards",
  //       title: "网卡管理"
  //     },
  //     {
  //       key: "/equipManage/networkCard/connectManage",
  //       title: "连接管理"
  //     }
  //   ]
  // },
  // {
  //   key: "/equipManage/equip",
  //   title: "设备管理",
  //   icon: <LaptopOutlined />
  // },
  // {
  //   key: "/service/servicesList",
  //   title: "服务管理",
  //   icon: <CloudServerOutlined />
  // },
  {
    key: "/service/message",
    title: "消息通知",
    icon: <MessageOutlined />
  }
  // {
  //   key: "/logManage",
  //   title: "日志管理",
  //   icon: <ProfileOutlined />
  // }
];

function SideMenu(props) {
  const [path, setPath] = useState();
  const { pathname } = props.location;

  // 获取菜单路由
  const menuChange = e => {
    console.log(e, "e");
    const menuKey = e.key;
    setPath(menuKey);
  };

  // 刷新页面时菜单栏根据路由显示点击样式
  useEffect(() => {
    const menuKey = "/home";
    setPath(menuKey);
  }, []); // eslint-disable-line

  useEffect(() => {
    const menuKey = pathname;
    setPath(menuKey);
  }, [pathname]); // eslint-disable-line

  // useEffect(() => {
  //   http.get("progress").then(res => {
  //     if (res.status === 200) {
  //       console.log(res, "res");
  //       setCapacityData(res.data);
  //     } else {
  //       console.log("数据获取错误!");
  //     }
  //   });
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // 建立菜单栏结构
  const renderMenu = menuList => {
    return menuList.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => {
            console.log(item.key);

            props.history.push(item.key);
          }}
        >
          {item.title}
        </Menu.Item>
      );
    });
  };

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.getCollapsedMSg}
        className="SiderBox"
        style={{
          height: "100%",
          borderRight: 0,
          backgroundColor: "white"
          // overFlow: "auto"
        }}
      >
        <div className="logo">
          {props.getCollapsedMSg ? (
            <div
              className="logoSmall"
              onClick={() => props.history.push("/home")}
            >
              ADS
            </div>
          ) : (
            <div>
              <img
                src={logo}
                style={{
                  width: "80%",
                  height: "80%",
                  cursor: "pointer"
                }}
                onClick={() => props.history.push("/home")}
                alt="图标无法显示"
              ></img>
            </div>
          )}
        </div>

        {/* selectedKeys={path}
      因为有三级选项，selectedKeys无法使用，刷新后菜单栏收缩但点击选中效果在。
      openKeys={path} */}
        <Menu
          theme="light"
          mode="inline"
          onClick={menuChange}
          selectedKeys={path}
          defaultSelectedKeys={"/home"}
          style={{
            height: "800px",
            overFlow: "auto"
          }}
          // defaultOpenKeys={"/fileManage"}
        >
          {renderMenu(menuList)}
        </Menu>
      </Sider>
    </div>
  );
}
export default withRouter(SideMenu);
