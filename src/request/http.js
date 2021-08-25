import axios from "axios";
import qs from "qs";
// import store from "../store";
// import router from "../router";
// import { Message } from "element-ui";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//初始化进度条
NProgress.configure({
  showSpinner: false,
  trickle: false,
  minimum: 0.3,
});

//创建请求
const http = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
});

//http请求处理
http.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    NProgress.start();

    config.method === "post"
      ? (config.data = qs.stringify({ ...config.data }))
      : (config.params = { ...config.params });
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

//http响应处理
http.interceptors.response.use(
  (response) => {
    // Do something before response is sent
    NProgress.done()
    return response;
  },
  (error) => {
    // Do something with response error
    NProgress.done()
    return Promise.reject(error);
  }
);

export default http
