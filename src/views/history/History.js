import React, { useState, useEffect } from "react";
import { Form, Button, Input, message, Tabs, Checkbox } from "antd";
import { Table, Tag, Space, Modal } from "antd";
import "./History.css";
import axios from "axios";
import { use } from "echarts";

export default function History(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [explicitSymptomList1, setExplicitSymptomList1] = useState([]);
  const [explicitSymptomList2, setExplicitSymptomList2] = useState([]);
  const [implicitSymptomList1, setImplicitSymptomList1] = useState([]);
  const [implicitSymptomList2, setImplicitSymptomList2] = useState([]);
  const [modalNum, setModalNum] = useState(0);
  const [diseaseTagList, setDiseaseTagList] = useState([]);
  useEffect(() => {
    axios
      .post("http://124.220.22.44/api/backend/history", {
        action: "gethistory",
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log(res.data);
        // let res={}
        // res.data=[]
        // res.data.push({explicit_symptom:{abc:true,qwe:true},implicit_symptom:{sdf:false,dfg:false},disease_tag:'qwe',date:'998'})
        // res.data.push({explicit_symptom:{def:true,wer:true},implicit_symptom:{sdf:false,dfg:false},disease_tag:'qwe',date:'998'})
        let t1 = [],
          t2 = [],
          t3 = [],
          t4 = [],
          t5 = {},
          t6 = [],
          t7 = [];

        for (let i = 0; i < res.data.length; i++) {
          let tt1 = [],
            tt2 = [];
          for (let j in res.data[i].explicit_symptom) {
            // console.log(j,)
            tt1.push(j);
            if (res.data[i].explicit_symptom[j]) {
              tt2.push("True");
            } else {
              tt2.push("False");
            }
          }
          t1.push(tt1);
          t6.push(tt2);
          tt1 = [];
          tt2 = [];
          for (let j in res.data[i].implicit_symptom) {
            tt1.push(j);
            if (res.data[i].implicit_symptom[j]) {
              tt2.push("True");
            } else {
              tt2.push("False");
            }
          }
          t2.push(tt1);
          t7.push(tt2);
          t3.push(res.data[i].disease_tag);
          t5 = {};
          t5.key = i;
          t5.index = i + 1;
          t5.details = i;
          t5.data = res.data[i].date;
          t5.result = res.data[i].disease_tag;
          t4.push(t5);
        }
        setExplicitSymptomList1(t1);
        setImplicitSymptomList1(t2);
        console.log(t6);
        setExplicitSymptomList2(t6);
        setImplicitSymptomList2(t7);
        setDiseaseTagList(t3);
        console.log(t4);
        setData(t4);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showModal = (res) => {
    setIsModalVisible(true);
    setModalNum(res);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "诊断日期",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "诊断结果",
      dataIndex: "result",
      key: "result",
    },
    {
      title: "详情",
      key: "details",
      dataIndex: "details",
      render: (item) => (
        <>
          <Button type="primary" onClick={() => showModal(item)}>
            查看详情
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          width: "100%",
        }}
      >
        <Table columns={columns} dataSource={data} />
        <Modal
          title="诊断详情"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[]}
        >
          <h2>explicit symtpom:</h2>
          {explicitSymptomList1[modalNum] != undefined ? (
            explicitSymptomList1[modalNum].map((item, index) => {
              return (
                <p>
                  {explicitSymptomList1[modalNum][index] +
                    ": " +
                    explicitSymptomList2[modalNum][index]}
                </p>
              );
            })
          ) : (
            <></>
          )}
          <h2>implicit symtpom:</h2>
          {implicitSymptomList1[modalNum] != undefined ? (
            implicitSymptomList1[modalNum].map((item, index) => {
              return (
                <p>
                  {implicitSymptomList1[modalNum][index] +
                    ": " +
                    implicitSymptomList2[modalNum][index]}
                </p>
              );
            })
          ) : (
            <></>
          )}
          <h2>disease tag:</h2>
          <p>{diseaseTagList[modalNum]}</p>
        </Modal>
      </div>
    </div>
  );
}