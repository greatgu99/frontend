import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Descriptions,
  Divider,
  Progress,
  Carousel,
  Button,
  Tag,
  Radio,
  Table,
} from "antd";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
// import http from "../../util/request";
import axios from "axios";
import "./Dialogue.css"; //图表下方dot样式

export default function Dialogue(props) {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [num, setNum] = useState(0);
  const [explicit_inform_slot, setExplicit_inform_slot] = useState({});
  const [implicit_inform_slot, setImplicit_inform_slot] = useState({});
  const [result, setResult] = useState("");
  const [hasResult, setHasResult] = useState(false);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const submit = () => {
    if (value === null) {
      setShowWarning(true);
    } else {
      let implicit_inform_slott = { ...implicit_inform_slot, question: value };

      let requestData = {
        action: "diagnose",
        data: {
          explicit_inform_slot,
          implicit_inform_slott,
        },
        num: num + 1,
      };
      axios
        .post("http://124.220.22.44/api/backend/diagnose", requestData)
        .then((res) => {
          console.log(res);
          if (res.data.result == false) {
            setData([
              ...data,
              {
                key: data.length + 1,
                name: question,
                judge: value,
                description: "暂无描述",
              },
            ]);
            setQuestion(res.data.symptom);
            setValue(null);
            setShowWarning(false);
          } else {
            setHasResult(true);
            setData([
              ...data,
              {
                key: data.length + 1,
                name: question,
                judge: value,
                description: "暂无描述",
              },
            ]);
            axios
              .post("http://124.220.22.44/api/backend/history",{
                action:'addhistory',
                data: {
                  explicit_inform_slot,
                  implicit_inform_slot,
                  disease_tag:res.data.disease
                },
                token: localStorage.getItem("token"),
              })
            setResult(res.data.disease);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      //异步请求
      setImplicit_inform_slot({ ...implicit_inform_slot, [question]: value });
      setNum(num + 1);
    }
  };
  const columns = [
    {
      title: "症状名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "是否拥有该症状",
      dataIndex: "judge",
      key: "judge",
      render: (item) => (
        <>
          <div style={{ color: item ? "blue" : "red" }}>
            {item ? "是" : "否"}
          </div>
        </>
      ),
    },
    {
      title: "描述",
      key: "description",
      dataIndex: "description",
    },
  ];

  useEffect(() => {
    let explicit_inform_slott = {};
    let implicit_inform_slott = {};
    let data1 = [];
    for (let i = 0; i < props.location.state.chosenSymptomList.length; i++) {
      explicit_inform_slott[
        props.location.state.chosenSymptomList[i].symptomName
      ] = true;
      data1.push({
        key: i + 1,
        name: props.location.state.chosenSymptomList[i].symptomName,
        judge: true,
        description:
          props.location.state.chosenSymptomList[i].symptomDescription == ""
            ? "暂无描述信息"
            : props.location.state.chosenSymptomList[i].symptomDescription,
      });
    }
    setData([...data1]);
    console.log(data1);
    setExplicit_inform_slot({ ...explicit_inform_slott });
    console.log(explicit_inform_slott);

    //通过上个页面传入explicit_inform_slot
    let requestData = {
      action: "diagnose",
      data: {
        explicit_inform_slott,
        implicit_inform_slott,
      },
      num,
    };
    console.log(requestData);

    axios
      .post("http://124.220.22.44/api/backend/diagnose", requestData)
      .then((res) => {
        console.log(res);
        setQuestion(res.data.symptom);
      })
      .catch((error) => {
        console.log(error);
      });

    // setQuestion('头疼')
    //通过上个页面传过来
  }, []);

  return (
    <div>
      {hasResult == false ? (
        <>
          <div>请问您有如下症状嘛，有请选择是，没有请选择否</div>
          <Card
            title={question}
            style={{
              width: "100%",
              marginBottom: "40px",
              marginTop: "20px",
            }}
          >
            <Radio.Group
              onChange={onChange}
              value={value}
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              <Button type="primary" onClick={submit}>
                下一题
              </Button>
              {showWarning ? (
                <div
                  style={{
                    color: "red",
                    marginTop: "30px",
                  }}
                >
                  请选择是否拥有上述病症
                </div>
              ) : (
                <></>
              )}
            </div>
          </Card>
        </>
      ) : (
        <div
          style={{
            marginBottom: "40px",
            fontSize: "20px",
            fontWeight: "bolder",
          }}
        >
          疾病诊断结果为：{result}
        </div>
      )}
      <div>已选择的病症</div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
