import apiClient from '../index'

export const getRoutes = async () => {
  return apiClient.get('/dynamic-route')
};
export const addRoute = async (route: any) => {
  return apiClient.post('/dynamic-route', route)
};
export const updateRoute = async (route: any) => {
  return apiClient.put('/dynamic-route', route)
};
export const deleteRoute = async (ids: number[]) => {
  return apiClient.delete('/dynamic-route', {
    params: { ids: ids.join(',') }
  })
};
// 获取分页后的路由
export const getRoutePage = async (page: number, pageSize: number) => {
  return apiClient.get('/dynamic-route/pages', {
    params: { page, pageSize }
  })
};

// 查找路由
export const searchRoute = async (route: any) => {
  return apiClient.post('/dynamic-route/search', route)
};



