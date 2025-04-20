import apiClient from '../index';

// 获取所有用户数据
export const fetchUserData = async () => {
  return apiClient.get('/emps');
};

// 获取分页后的用户数据
export const fetchUserDataPages = async (page: number, pageSize: number) => {
  return apiClient.get('/emps/pages', {
      params: { page, pageSize }
    })
};

// 更新用户信息
export const updateUser = async (user: any) => {
  return apiClient.put(`/emps/${user.emp.id}`, user);
};

// 删除用户
export const deleteUser = async (id: number) => {
  return apiClient.delete(`/emps/${id}`);
};

// 添加用户
export const addUser = async (user: any) => {
  return apiClient.post('/emps', user);
};

// 查询用户
export const fetchUserDataBySearch = async (user: any) => {
  return apiClient.post('/emps/search', user);
};

// 批量删除用户
export const deleteUsers = async (ids: number[]) => {
  return apiClient.delete('/emps/batch', {
      params: { ids: ids.join(',') }
    });
};
