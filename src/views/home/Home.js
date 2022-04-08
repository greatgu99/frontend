// 首页
import React, { useState, useEffect, useRef } from "react";
import { Card, Descriptions, Divider, Progress, Carousel, Button } from "antd";

// import { formatSeconds, timeLocale } from "../../util/api";
// import http from "../../util/request";
// import io from "socket.io-client";

import "./Home.css"; //图表下方dot样式

// import EchartsCPU from "../../components/echarts/echartsCPU";
// import EchartsMemory from "../../components/echarts/echartsMemory";
// import EchartsNetWork from "../../components/echarts/echartsNetwork";
// import EchartsHardDisk from "../../components/echarts/echartsHardDisk";
import Echarts1 from "../../components/echarts/Echarts1";
import Echarts2 from "../../components/echarts/Echarts2";

export default function Home() {
  const [network, setnetwork] = useState([]);
  const [cpudata, setcpudata] = useState([]);
  const [memory, setmemory] = useState([]);
  const [uptime, setuptime] = useState([]);
  const [nowtime, setnowtime] = useState([]);
  const [top_disks, settop_disks] = useState([]);
  const [currentUser, setcurrentUser] = useState("");

  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   // setInterval(function() {
  //   var socket_uptime = io("wss://192.168.10.183/sysinfo");
  //   socket_uptime.on("uptime", function(data) {
  //     console.log(data);

  //     const getTime = formatSeconds(data.data);
  //     setuptime(getTime);
  //   });
  //   return () => {
  //     socket_uptime.disconnect();
  //   };
  //   // }, 1000);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 获取本机系统时间
  // useEffect(() => {
  //   setInterval(function() {
  //     var myDate = new Date();
  //     const local = myDate.toLocaleString();
  //     setnowtime(local);
  //   }, 1000);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   var socket_net = io("wss://192.168.10.183/network_widget");
  //   socket_net.on("network", function(data) {
  //     setnetwork(data.data.results);
  //   });
  //   return () => {
  //     socket_net.disconnect();
  //   };
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   var socket_CPU = io("wss://192.168.10.183/cpu_widget");
  //   socket_CPU.on("cpudata", function(data) {
  //     console.log(data.data.results, "cpudata");
  //     setcpudata(data.data.results);
  //   });
  //   return () => {
  //     socket_CPU.disconnect();
  //   };
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   var socket_memory = io("wss://192.168.10.183/memory_widget");
  //   socket_memory.on("memory", function(data) {
  //     // console.log(data.data.results, "memory");
  //     setmemory(data.data.results);
  //   });
  //   return () => {
  //     socket_memory.disconnect();
  //   };
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   var socket_disk = io("wss://192.168.10.183/disk_widget");
  //   socket_disk.on("top_disks", function(data) {
  //     console.log(data.data, "top_disks");
  //     settop_disks(data.data);
  //   });
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   http
  //     .post("/api/commands/current-user")
  //     .then(res => {
  //       console.log(res, "res1111111111");

  //       if (res.status >= 200 && res.status <= 300) {
  //         console.log(res.data);
  //         setcurrentUser(res.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // 调用组件
  // const cpuEcharts = obj => {
  //   return obj.map(item => {
  //     return (
  //       <div>
  //         <EchartsCPU cpudata={item}></EchartsCPU>
  //       </div>
  //     );
  //   });
  // };
  // const hardDiskEcharts = obj => {
  //   return obj.map(item => {
  //     return (
  //       <div>
  //         <EchartsHardDisk top_disks={item}></EchartsHardDisk>
  //       </div>
  //     );
  //   });
  // };

  const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    justifyContent:"center",
    alignItem:"center"
  };

  
  return (
    <div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        // marginLeft: "80px",
        marginTop: "20px",
        height: "700px",
        overflow: "auto",
        width:"100%"
      }}>
        <div style={{
          width:"100%",
          paddingBottom:"20px"
        }}>
          <Card title="Default size card" style={{ width: "100%" }}>
            <Echarts1></Echarts1>
          </Card>
        </div>

        <div style={{
          width:"100%",
          paddingBottom:"20px"
        }}>
          <Card title="Default size card" style={{ width: "100%" }}>
            <Echarts2></Echarts2>
          </Card>
        </div>

        <div style={{
          width:"100%",
          paddingBottom:"20px"
        }}>
          <Card title="Default size card" style={{ width: "100%"}}>
            <Carousel autoplay>
              <div style={{display:"flex",height:"100%"}}>
                <div style={contentStyle}>1</div>
              </div>
              <div style={{display:"flex",height:"100%"}}>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div style={{display:"flex",height:"100%"}}>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div style={{display:"flex",height:"100%"}}>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Card>
        </div>

      </div>
    </div>
  );
}
