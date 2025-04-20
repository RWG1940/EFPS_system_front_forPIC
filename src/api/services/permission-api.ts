import apiClient from '../index'

export const getPermissions = async () => {
  return apiClient.get('/permission')
};
export const addPermission = async (permission: any) => {
  return apiClient.post('/permission', permission)
};
export const updatePermission = async (permission: any) => {
  return apiClient.put('/permission', permission)
};
export const deletePermission = async (ids: number[]) => {
  return apiClient.delete('/permission', {
    params: { ids: ids.join(',') }
  })
};
// 获取分页后的权限
export const getPermissionPage = async (page: number, pageSize: number) => {
  return apiClient.get('/permission/pages', {
    params: { page, pageSize }
  })
};

// 查找权限
export const searchPermission = async (route: any) => {
  return apiClient.post('/permission/search', route)
};



