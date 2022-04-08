// 验证码
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import http from "../util/request";

export default function VerificationCode(props) {
  let timeChange;
  const [time, setTime] = useState(60);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnContent, setBtnContent] = useState("获取验证码");
  useEffect(() => {
    clearInterval(timeChange);
    return () => clearInterval(timeChange);
  }, []);

  useEffect(() => {
    if (time > 0 && time < 60) {
      setBtnContent(`${time}s后重发`);
    } else {
      clearInterval(timeChange);
      setBtnDisabled(false);
      setTime(60);
      setBtnContent("获取验证码");
    }
  }, [time]);

  // 点击获取验证码
  const handleClick = () => {
    const phoneRegex = /^[1][3,4,5,7,8,9][0-9]{9}$/;

    if (phoneRegex.test(props.phone)) {
      timeChange = setInterval(() => setTime(t => --t), 1000);
      setBtnDisabled(true);
      //   点击获取手机号值
      console.log(props.phone, "phone");
      console.log(phoneRegex.test(props.phone), "phone2222");

      let codeData = { mobile: props.phone };
      http
        .post("/api/v1/accounts/send-code", codeData)
        .then(res => {
          if (res.status >= 200 && res.status <= 300) {
            message.success("验证码获取成功！");

            alert(res.data.data.code);
          } else {
            message.error("验证码获取失败！");
            console.log(res.error);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      message.warning("请输入正确的手机号码！");
    }
  };
  return (
    <div>
      <Button
        style={{
          width: "100px"
        }}
        onClick={handleClick}
        disabled={btnDisabled}
      >
        {!btnDisabled ? "获取验证码" : time + "s"}
      </Button>
    </div>
  );
}
