// 引入axios包，并创建一个axios实例
import axios from "axios";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

const http = axios.create({
    baseURL: '/auth',
    timeout: 5000
})

// 请求拦截
http.interceptors.request.use(
    (config) => {
        NProgress.start()
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
)
// 响应拦截
http.interceptors.response.use(
    (res) => {
        NProgress.done()
        return res.data
    },
    (error) => {
        NProgress.done()
        return Promise.reject(error);
    }
)

// 默认请求头
const defaultHeader = {
    'Content-Type': 'application/json;charset=utf-8',
    'token': '123456'
}

interface RequestParams {
    method: string;
    url: string;
    data?: any;
    headers?: object;
    responseType?: any;
}
export default ({ method, url, data, headers, responseType }: RequestParams) => {
    if (method == "get") {
        return http({
            method,
            url,
            params: data,
            headers: {
                ...defaultHeader,
                ...(headers ? headers : {})
            },
            responseType: responseType || ''
        });
    }
    if (method == "post") {
        return http({
            method,
            url,
            data,
            headers: {
                ...defaultHeader,
                ...(headers ? headers : {})
            },
            responseType: responseType || ''
        });
    }
}