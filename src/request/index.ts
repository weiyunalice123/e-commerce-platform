import axios from 'axios'
const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/5ded0d69c3ebaf891398dfadb90dbe5f/e-commerce-platform",
    timeout: 8000,
    headers: {
        "Content-type": "application/json;charset=utf-8"
    }
})

//请求拦截
//请求发出去之前需要拦截，并且添加一些配置
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if(localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    const code:string = res.data.code
    if(code !== '0000') {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    console.log(err)
})

export default service