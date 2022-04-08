// 头部模块
import React, { useState, useEffect } from "react";
import {
  Layout,
  Dropdown,
  Menu,
  Avatar,
  Badge,
  Drawer,
  message,
  Popconfirm,
  Button,
  Modal
} from "antd";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  RedoOutlined,
  UserDeleteOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import "./TopHeader.css";
// import http from "../../util/request";
import Notice from "../Notice/Notice"; //消息列表组件
import { getHMS } from "../../util/api"; //事件处理函数

const { Header } = Layout;
// const NoticeContext = createContext();
// export {NoticeContext}

export default function TopHeader(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isSpain, setisSpain] = useState(false);
  const [isModalRestartVisible, setisModalRestartVisible] = useState(false);
  const [isModalCloseVisible, setisModalCloseVisible] = useState(false);
  const [size, setSize] = useState();

  const [noticeList, setNoticeList] = useState([]); //消息列表
  const [noticeListNum, setNoticeListNum] = useState(); //消息未读数量

  // 用户名
  const [currentUser, setcurrentUser] = useState("");
  useEffect(() => {
    //此处最终更改为像后端发送请求
    //-------------------------------
    let res = {
      noticeList: [
        //传入的消息列表信息，其中createdTime为毫秒数
        {
          id: 1,
          title: "Title1", //消息标题
          content: "来自西伯利亚的暖流袭击了阿拉善沙漠", //消息内容
          read: false, //是否已读
          createdTime: 1234657981234 //创建时间
        },
        {
          id: 2,
          title: "Title2",
          content: "阿拉善沙漠的水流到了叶尼塞河",
          read: false,
          createdTime: 2234657981234
        },
        {
          id: 3,
          title: "Title3",
          content: "西红柿首付",
          read: true,
          createdTime: 3234657981234
        },
        {
          id: 4,
          title: "Title3",
          content: "西红柿首穷",
          read: true,
          createdTime: 3234657981774
        }
      ]
    };
    let num = 0; //统计未读个数
    res.noticeList.map(item => {
      item.time = getHMS(item.createdTime); //生成时间
      num += !item.read;
    });
    res.noticeList.sort((a, b) => {
      //排序，将未读的排在前面
      if (a.read === b.read) {
        return b.createdTime - a.createdTime;
      } else {
        return a.read - b.read;
      }
    });
    //-------------------------------
    setNoticeListNum(num);
    setNoticeList(res.noticeList);

    // http
    //   .post("/api/commands/current-user")
    //   .then(res => {
    //     console.log(res, "res1111111111");

    //     if (res.status >= 200 && res.status <= 300) {
    //       console.log(res.data);
    //       setcurrentUser(res.data);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

  }, []); // eslint-disable-l ine  rea ct-hooks/exhaustive-deps

  // 控制菜单栏伸缩标识
  const changeCollapsed = () => {
    setCollapsed(!collapsed);
    props.getMsg(collapsed);
  };
  // 注销token
  const concellToken = () => {
    // http
    //   .post("/api/logout")
    //   .then(res => {
    //     console.log(res);
    //     localStorage.removeItem("token");
    //     window.location.reload(true);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  // const goPerCenter = () => {
  //   // props.history.push("/perCenter");
  //   console.log(props);
  // };

  //处理消息阅读事件
  const subNoticeListNum = e => {
    //增加http请求
    console.log(e);
    console.log(noticeList);
    if (!noticeList[e].read) {
      noticeList[e].read = true;
      noticeList.sort((a, b) => {
        if (a.read === b.read) {
          return b.createdTime - a.createdTime;
        } else {
          return a.read - b.read;
        }
      });
      console.log(noticeList);
      setNoticeList(noticeList);
      setNoticeListNum(noticeListNum - 1); //未读数量减一
    }
  };
  const showDrawer = () => {
    setSize("large");
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const getUser = () => {
    let usersData = { page: "", page_size: "" };
    // http
    //   .get("/api/users", usersData)
    //   .then(res => {
    //     console.log(res.status, "res.status");
    //     if (res.response.status === 403) {
    //       localStorage.removeItem("token");
    //       window.location.reload(true);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error, "error");
    //   });
  };

  // 重启
  const handleRestart = () => {
    const inform = { isSpan: true, title: "设备正在重启！" };
    props.getSpin(inform);
    // http
    //   .post("/api/commands/reboot")
    //   .then(res => {
    //     const inform = { isSpan: true, title: "设备正在重启！" };
    //     props.getSpin(inform);
    //     var timer = setInterval(() => {
    //       getUser();
    //     }, 2000);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     message.error("设备重启失败！");
    //   });
  };
  const handelRestartCancle = () => {
    message.warning("已取消重启该设备！");
    setisModalRestartVisible(false);
  };
  const handelRestart = () => {
    setisModalRestartVisible(true);
  };

  // 关机
  const handleClose = () => {
    // http
    //   .post("/api/commands/shutdown")
    //   .then(res => {
    //     const inform = { isSpan: true, title: "设备已关机！" };
    //     props.getSpin(inform);
    //     localStorage.removeItem("token");
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     message.error("设备关机失败！");
    //   });
  };
  const handelCloseCancle = () => {
    message.warning("已取消关闭该设备！");
    setisModalCloseVisible(false);
  };
  const handleCloseEquip = () => {
    setisModalCloseVisible(true);
  };
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/perCenter/userInform/perCenter">
          <div>
            <UserOutlined style={{ marginRight: "10px" }} />
            个人中心
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item>
        {/* onClick={handleRestart} */}

        <div onClick={handelRestart}>
          <RedoOutlined style={{ marginRight: "10px" }} />
          重启
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={handleCloseEquip}>
          <LogoutOutlined style={{ marginRight: "10px" }} />
          关机
        </div>
      </Menu.Item>
      <Menu.Item danger onClick={concellToken}>
        <UserDeleteOutlined style={{ marginRight: "10px" }} />
        退出账户
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-background headerBox"
      style={{ padding: "0 16px" }}
    >
      {/* 控制菜单栏伸缩按钮图标 */}
      {collapsed ? (
        <div className="iconCollapsed" onClick={changeCollapsed}>
          <MenuFoldOutlined style={{ fontSize: "20px" }} />
        </div>
      ) : (
        <div className="iconCollapsed" onClick={changeCollapsed}>
          <MenuUnfoldOutlined style={{ fontSize: "20px" }} />
        </div>
      )}

      {/* 用户头像 */}
      <div style={{ display: "flex" }} className="trigger ">
        <Dropdown overlay={menu}>
          <div>
            <Avatar size="large" icon={<UserOutlined />} />
            <span> {currentUser}</span>
          </div>
        </Dropdown>
        {/* <span onClick={showDrawer}>
          <Badge
            count={noticeListNum}
            style={{ transform: "translate(-38px,-10px)" }}
            size="small"
          >
            <NotificationOutlined
              style={{
                marginLeft: "50px",
                marginRight: "50px",
                fontSize: "17px",
              }}
            />
          </Badge>
        </span> */}
      </div>
      <Drawer
        title="消息通知"
        placement="right"
        onClose={onClose}
        visible={visible}
        size={size}
      >
        {noticeList.map((item, index) => (
          <Notice
            subNoticeListNum={subNoticeListNum}
            noticeList={item}
            ind={index}
          />
        ))}
      </Drawer>
      {/* 重启设备 */}
      <Modal
        title="重启设备"
        visible={isModalRestartVisible}
        onOk={handleRestart}
        onCancel={handelRestartCancle}
      >
        <h3>您确定是否重启该设备？</h3>
      </Modal>
      <Modal
        title="关闭设备"
        visible={isModalCloseVisible}
        onOk={handleClose}
        onCancel={handelCloseCancle}
      >
        <h3>您确定是否关闭该设备？</h3>
      </Modal>
    </Header>
  );
}
