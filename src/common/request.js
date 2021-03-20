import axios from "axios";
import host from "./config";
import router from "../router/index";

const post = (url, data) => {
     console.log(data);
  const USER_INFO = JSON.parse(localStorage.getItem("is_userId"));
  const USER_TOKEN = USER_INFO == null ? '' : USER_INFO;
 
  const header = {
    'user-token': USER_TOKEN,
    // "Content-Type":"application/x-www-form-urlencoded"
  }
    data.user_id = USER_INFO

  return new Promise((resolve, reject) => {

    axios({
        method: 'post',
        url: host + url,
        data: data,
        headers: header
      })
      .then((res) => {
        let statusCode = res.status;
        let loginCode = res.data.code;
        if (statusCode == 200) {
          if (loginCode == -201) {
            router.push("/login");
          }
          resolve(res.data)
        } else {
          let errMessage = '';
          switch (statusCode) {
            case 400:
              errMessage = '请求错误(400)';
              break;
            case 401:
              errMessage = '未授权，请重新登录(401)';
              localStorage.removeItem("USER_INFO");

              break;
            case 403:
              errMessage = '拒绝访问(403)';
              break;
            case 404:
              errMessage = '请求出错(404)';
              break;
            case 408:
              errMessage = '请求超时(408)';
              break;
            case 500:
              errMessage = '服务器错误(500)';
              break;
            case 501:
              errMessage = '服务未实现(501)';
              break;
            case 502:
              errMessage = '网络错误(502)';
              break;
            case 503:
              errMessage = '服务不可用(503)';
              break;
            case 504:
              errMessage = '网络超时(504)';
              break;
            case 505:
              errMessage = 'HTTP版本不受支持(505)';
              break;
              //   case -201:
              //   errMessage = 'HTTP版本不受支持(505)';
              //   break;
            default:
              errMessage = "连接出错(" + statusCode + ")!";
              console.log(errMessage);

              break;
          }
        }

      })
      .catch((err) => {
        reject(err);
      });

  })
}

// cosnt 

const request = {
  post,
  host
}

export default request
