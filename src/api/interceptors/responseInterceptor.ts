import { MessagePlugin } from "tdesign-vue-next";
import { useRouter } from "vue-router";


// 响应拦截器
export const responseInterceptor = async (response: any) => {
  // 获取响应数据
  const data = response.data;
  // 调试输出
  console.log('响应数据:', data);
  // 获取响应状态码
  const code = data.code || 1;
  const message = data.message || '后台未知错误';
  if (code != 1) {
    MessagePlugin.error(message);
    return Promise.reject(message);
  }
  return response;
}
// 响应拦截器-报错
export const responseInterceptorError = async (error: any) => {
  let errMsg = "";
  const ERROR_MESSAGE = error.message;
  if (ERROR_MESSAGE == "Network Error"){
    errMsg += "网络错误，请检查网络连接";
  } else if (ERROR_MESSAGE.includes("timeout")){
    errMsg += "请求超时，请重试";
  } else if (ERROR_MESSAGE.includes("500")){
    errMsg += "服务器错误，请联系管理员";
  } else if (ERROR_MESSAGE.includes("401")){
    errMsg += "登陆状态失效，请重新登陆";
    localStorage.removeItem('token');
  } else {
    errMsg += ERROR_MESSAGE;
  }
  MessagePlugin.error(errMsg);
  return Promise.reject(error);
}
