import React from 'react';
import IndexRouter from "./router/IndexRouter";
import './App.css';
import "moment/locale/zh-cn";
import locale from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
function App(props) {
  
  return (
    // AntD全局配置
    <ConfigProvider locale={locale}>
      <IndexRouter></IndexRouter>
    </ConfigProvider>
  );
  
}

export default App;

