/**
 * 网络请求配置
 */
import axios from "axios";
// import { getCookie } from "../util/api";

const instance = axios.create({
  baseURL: "http://124.220.22.44/api",
  timeout: 100000
});
/**
 * http request 拦截器
 */

// instance.interceptors.request.use(
//   config => {
//     let csrftoken = getCookie("csrftoken");
//     // config.data = JSON.stringify(config.data);
//     // 修改请求头信息
//     if (config.type == "change") {
//       config.headers["Content-Type"] = "application/x-www-form-urlencoded";
//     } else {
//       config.headers["Content-Type"] = "application/json";
//     }
//     if (csrftoken) {
//       config.headers["X-CSRFToken"] = csrftoken;
//     }

//     // console.log(config, "2");
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// /**
//  * http response 拦截器
//  */

// instance.interceptors.response.use(
//   response => {
//     if (response.data.errCode === 2) {
//       console.log("过期");
//     }
//     return response;
//   },
//   error => {
//     console.log("请求出错1：", error.response);
//     if (error.response.status === 403) {
//       localStorage.removeItem("token");
//       window.location.reload(true);
//     }
//     return error;
//   }
// );

export default instance;
