import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Descriptions,
  Divider,
  Progress,
  Carousel,
  Button,
  Tag,
} from "antd";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import http from "../../util/request";
import "./Diagnose.css"; //图表下方dot样式

export default function Diagnose(props) {
  const [symptomList, setSymptomList] = useState([]);
  const [searchedSymptomList, setSearchedSymptomList] = useState([]);
  const [chosenSymptomList, setchosenSymptomList] = useState([]);
  const [tip, setTip] = useState("请搜索您的病症");
  const [searchValue,setSearchValue] = useState("");
  const { Search } = Input;
  const onSearch = (value) => {
    console.log(value);
    let tempSearchedSymptomList = [];
    for (let i = 0; i < symptomList.length; i++) {
      if (symptomList[i].symptomName.indexOf(value) != -1) {
        tempSearchedSymptomList.push(symptomList[i]);
      }
    }
    setSearchedSymptomList([...tempSearchedSymptomList]);
    setTip("暂无您所需要的病症");
  };

  const cardStyle = {
    width: "48%",
    marginTop: "20px",
    marginRight: "2%",
    height: "200px",
    // marginLeft:"1%"
  };
  const tagStyle = {
    fontSize: "15px",
    // height:"36px",
    padding: "6px",
  };
  function log(e) {
    console.log(e);
  }

  const navigateToDialogue= ()=>{
    console.log(1);
    // if ()
    props.history.push({
      pathname:"/Dialogue",
      state:{
        chosenSymptomList
      }
    });
  }
  const chooseSymptom = (symptomName) => {
    console.log(symptomName)
    let i=0
    for(;i<symptomList.length;i++){
      if (symptomList[i].symptomName == symptomName){
        break;
      }
    }
    console.log(symptomList[i])
    setchosenSymptomList([...chosenSymptomList,JSON.parse(JSON.stringify(symptomList[i]))])
    setSearchedSymptomList([])
    setSearchValue("")
    setTip("请搜索您的病症")
  }
  const testSymptomList = [
    { symptomName: "abc", symptomDescription: ""},
    { symptomName: "aabc", symptomDescription: ""},
    { symptomName: "bc", symptomDescription: ""},
    { symptomName: "cjlkajskld", symptomDescription: "" },
    { symptomName: "qweqwe", symptomDescription: "" },
    { symptomName: "we", symptomDescription: "" },
  ];
  useEffect(() => {
    let requestData = {
      action: "get_all_symptom",
    };
    console.log("请求")
    http
      .get("/backend/symptom", requestData)
      .then(res => {
        console.log("!!!!!!!!!!!")
        console.log(res);
        setSymptomList(res.symptom_list)
      })
      .catch(error => {
        console.log(error);
      });
    // setSymptomList(testSymptomList);
  }, []);

  return (
    <div>
      <h3>您已选择的病症：</h3>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {chosenSymptomList.length == 0?(
          <div style={{
            marginTop:"20px",
            fontSize:"15px",
            color:'#999'
            // marginLeft:"20px"
          }}>尚未选择任何症状</div>
        ):(
          chosenSymptomList.map((item,index)=>(
            <Tag closable onClose={log} style={tagStyle}>
              {item.symptomName}
            </Tag>
          ))
        )}

      </div>
      <h3 style={{
        marginBottom:"18px"
      }}>请输入您的症状进行搜索</h3>
      <Search
        style={{ width: "98%" }}
        placeholder="请输入您的症状进行搜索"
        onSearch={onSearch}
        enterButton
        value={searchValue}
        onChange={(e)=>{setSearchValue(e.target.value)}}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent:"space-around",
          // paddingTop:"20px",
          flexWrap: "wrap",
        }}
      >
        {searchedSymptomList.length == 0 ? (
          <div style={{
            marginTop:"20px",
            fontSize:"15px",
            color:'#999'
          }}>{tip}</div>
        ) : (
          searchedSymptomList.map((item,index) => (
            <Card title={<div>{item.symptomName}</div>} style={cardStyle}>
              {item.symptomDescription == "" ? (
                <div>暂无疾病描述</div>
              ) : (
                <p>{item.symptomDescription}</p>
              )}
              <div>
              <div
                style={{
                  position:"absolute",
                  bottom:"15px",
                  right:"15px"
                }}
              >
                <Button onClick={()=>chooseSymptom(item.symptomName)}>选择该病症</Button>
              </div>
              </div>
            </Card>
          ))
        )}
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <Button type="primary" size="large" onClick={navigateToDialogue} disabled={chosenSymptomList.length==0}>
          开始诊断
        </Button>
      </div>
    </div>
  );
}
