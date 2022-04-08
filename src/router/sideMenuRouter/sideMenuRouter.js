// 左侧导航栏引入页面路由

import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../../views/home/Home";

import SideMenu from "../../components/layOut/SideMenu";
import TopHeader from "../../components/layOut/TopHeader";

import Nopermission from "../sideMenuRouter/nopermission/Nopermission";

import Diagnose from "../../views/diagnose/Diagnose"
import Dialogue from "../../views/diagnose/Dialogue"
// import Equip from "../../views/equipManage/equip";
// import NetCards from "../../views/equipManage/networkCard/netCards";
// import ConnectManage from "../../views/equipManage/networkCard/connectManage";

// import HardDiskStorage from "../../views/storage/hardDiskStorage";
// import StoragePool from "../../views/storage/storagePool";

// import PerCenter from "../../views/perCenter/userInform/perCenter";
// import Permissions from "../../views/perCenter/permissions";
// import Groups from "../../views/perCenter/groups";
// import UserLists from "../../views/perCenter/userLists";

// import SambaServices from "../../views/service/services/SambaServices";
// import NFSService from "../../views/service/services/NFSService";
// import SFTPService from "../../views/service/services/SFTPService";
// import AFPServices from "../../views/service/services/AFPService";

// import ServicesList from "../../views/service/servicesList";
// import Message from "../../views/service/message";
// import Plugs from "../../views/service/plugs";
// import SharedDirectory from "../../views/service/sharedDirectory";

// import ResourceMonitoring from "../../views/resourceMonitoring/resourceMonitoring";

// import LogManage from "../../views/logManage/logManage";

//css
import "./sideMenuRouter.css";

//antd
import { Layout, Spin, Alert } from "antd";
const { Content, Footer } = Layout;

export default function SideMenuRouter(props) {
  console.log(props.locale);

  const [isCollapsed, setISCollapsed] = useState(false);
  const [isSpin, setisSpin] = useState(false);
  const [isTitle, setisTitle] = useState("");

  const getCollapsed = msg => {
    setISCollapsed(msg);
  };
  const getSpin = msg => {
    console.log(msg);
    setisSpin(msg.isSpan);
    setisTitle(msg.title);
  };

  return (
    <div>
      <Spin spinning={isSpin} style={{ top: "230px" }}>
        {isSpin ? <Alert message={isTitle} type="info" showIcon /> : ""}

        <Layout>
          <SideMenu getCollapsedMSg={isCollapsed}></SideMenu>
          <Layout className="site-layout">
            <TopHeader getMsg={getCollapsed} getSpin={getSpin}></TopHeader>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px 40px",
                padding: 24,
                minHeight: 780,
                // overflow: "auto"
              }}
            >
              <Switch>
                {/* <Route path="/equipManage/equip" component={Equip} />
                <Route
                  path="/equipManage/networkCard/connectManage"
                  component={ConnectManage}
                />
                <Route
                  path="/equipManage/networkCard/netCards"
                  component={NetCards}
                />

                <Route
                  path="/storage/hardDiskStorage"
                  component={HardDiskStorage}
                />
                <Route path="/storage/storagePool" component={StoragePool} />

                <Route
                  path="/perCenter/userInform/perCenter"
                  component={PerCenter}
                />
                <Route path="/perCenter/permissions" component={Permissions} />
                <Route path="/perCenter/gropus" component={Groups} />
                <Route path="/perCenter/userLists" component={UserLists} />

                <Route
                  path="/service/services/SambaServices"
                  component={SambaServices}
                />
                <Route
                  path="/service/services/NFSService"
                  component={NFSService}
                />
                <Route
                  path="/service/services/SFTPService"
                  component={SFTPService}
                />
                <Route
                  path="/service/services/AFPServices"
                  component={AFPServices}
                />

                <Route path="/service/servicesList" component={ServicesList} />
                <Route path="/service/message" component={Message} />
                <Route path="/service/plugs" component={Plugs} />

                <Route
                  path="/resourceMonitoring"
                  component={ResourceMonitoring}
                />

                <Route path="/logManage" component={LogManage} />
                */}
                <Route path="/dialogue" component={Dialogue} />
                <Route path="/diagnose" component={Diagnose} />
                <Route path="/home" component={Home} />
                <Redirect from="/" to="/home" exact />
                {/* *匹配任意字符，匹配任何未匹配到的页面 */}
                <Route path="*" component={Nopermission} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center", padding: "0px 0 15px 0" }}>
              Automatic Diagnostic System ©2022 Created by Greatgu99
            </Footer>
          </Layout>
        </Layout>
      </Spin>
    </div>
  );
}
