import React, { useState, useEffect } from "react";
import { Modal, Button, Divider } from "antd";
import "./Notice.css";
// import {NoticeContext} from "../layOut/TopHeader.js"

export default function Notice(props) {
  const [noticeContent, setNoticeContent] = useState(
    Object({
      title: "",
      content: "",
    })
  );
  const [visible, setVisible] = useState(false);
  // const noticeContentt = useContext(NoticeContext)
  useEffect(() => {
    console.log(props.noticeList);
    setNoticeContent(props.noticeList);
  }, [props]);

  function handleClickNotice() {
    // console.log(e)
    // -------------------------------------------------
    // 此处请求一下点击，标记为已读

    // if (!noticeContent.read){
    //   setNoticeContent({...noticeContent,read:true})
    console.log("你倒是动啊");
    props.subNoticeListNum(props.ind);

    setVisible(false);
  }
  return (
    <div>
      <div
        className="btn"
        onClick={() => {
          setVisible(true);
        }}
      >
        <div
          style={{
            color: noticeContent.read ? "#666" : "",
            fontWeight: noticeContent.read ? "" : "bold",
          }}
        >
          <p style={{ fontSize: "17px" }}>{noticeContent.title}</p>
          <p>
            {noticeContent.content.length > 11
              ? noticeContent.content.slice(0, 10) + "..."
              : noticeContent.content}
          </p>
          <p style={{ fontSize: "12px" }}>{noticeContent.time}</p>
        </div>
        {!noticeContent.read ? <div className="circle"></div> : <></>}
      </div>
      <Divider />
      <Modal
        itle="Modal"
        centered
        visible={visible}
        onCancel={() => handleClickNotice()}
        footer={[
          <Button key="back" onClick={() => handleClickNotice()} type="primary">
            确定
          </Button>,
        ]}
      >
        <h2>{noticeContent.title}</h2>
        <p style={{ fontSize: "15px" }}>{noticeContent.content}</p>
        <p style={{ fontSize: "13px" }}>{noticeContent.time}</p>
      </Modal>
    </div>
  );
}
