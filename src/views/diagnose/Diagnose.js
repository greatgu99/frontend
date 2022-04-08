import React, { useState, useEffect, useRef } from "react";
import { Card, Descriptions, Divider, Progress, Carousel, Button, Tag} from "antd";
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

import "./Diagnose.css"; //图表下方dot样式



export default function Diagnose(props){
  const { Search } = Input;
  const onSearch = value => console.log(value);
  const cardStyle = {
    width: "48%",
    marginTop:"20px",
    marginRight:"2%",
    height:"200px"
    // marginLeft:"1%"
  }
  const tagStyle = {
    fontSize:"15px",
    // height:"36px",
    padding:"6px"
  }
  function log(e) {
    console.log(e);
  }
  function navigateToDialogue(){
    console.log(1)
    props.history.push('/Dialogue')
  }
  return (
    <div>
      <h3>
        您已选择的病症：
      </h3>
      <div style={{
        marginTop:"20px",
        marginBottom:"20px"
      }}>
        <Tag closable onClose={log} style={tagStyle}>
          急性上呼吸道感染
        </Tag>
        <Tag closable onClose={log}  style={tagStyle}>
          头疼
        </Tag>
        <Tag closable onClose={log}  style={tagStyle}>
          流鼻涕
        </Tag>
      </div>
      <h3>请输入您的症状进行搜索</h3>
      <Search style={{width:"98%"}} placeholder="请输入您的症状进行搜索" onSearch={onSearch} enterButton />
      <div style={{
        display:"flex",
        flexDirection:"row",
        // justifyContent:"space-around",
        // paddingTop:"20px",
        flexWrap:"wrap"
      }}>
        <Card title="疾病" style={cardStyle}>
          <p>疾病描述</p>
          <p>疾病描述</p>
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>
            <div></div>
            <Button>选择该病症</Button>
          </div>
        </Card>
        <Card title="疾病" style={cardStyle}>
          <p>疾病描述</p>
          <p>疾病描述</p>
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>
            {/* <div>123123</div> */}
            <div></div>
            <Button>选择该病症</Button>
          </div>
        </Card>
        <Card title="疾病" style={cardStyle}>
          <p>疾病描述</p>
          <p>疾病描述</p>
          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>
            <div></div>
            <Button>选择该病症</Button>
          </div>
        </Card>
      </div>
      <div style={{
        width:"100%",
        textAlign:"center",
        marginTop:"20px"
      }}>
      <Button type="primary" size="large" onClick={navigateToDialogue}>开始诊断</Button>
      </div>
    </div>
  )
}