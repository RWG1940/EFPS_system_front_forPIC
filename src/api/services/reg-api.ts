import apiClient from '../index'

// 注册用户
export const regUser = async (user: any) => {
  return apiClient.post('/reg', user)
};