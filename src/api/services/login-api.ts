import apiClient from '../index';

// 手动登录
export const userLogin = async (user: any) => {
  return apiClient.post('/login', user)

};

// token登录
export const userLoginBytoken = async () => {
  return apiClient.post('/login/auto-login')
};

// 退出登录
export const userLogout = async () => {
  return apiClient.post('/login/logout')
};



