import apiClient from '../index';

// 获取所有部门数据
export const fetchDeptData = async () => {
  return apiClient.get('/depts');
};
// 获取分页后的dept数据 By Token
export const fetchDeptDataPages = async (page: number, pageSize: number) => {
  return apiClient.get('/depts/pages', {
    params: { page, pageSize},
  })
}

// 更新部门信息
export const updateDept = async (dept: any) => {
  return apiClient.put(`/depts/${dept.id}`, dept);
};
// 删除用户
export const deleteDept = async (id: number) => {
  return apiClient.delete(`/depts/${id}`);
};
// 添加用户
export const addDept = async (dept: any) => {
  return apiClient.post('/depts', dept);
};

// 查询部门
export const fetchDeptDataBySearch = async (dept:any) => {
  return apiClient.post('/depts/search', dept);
};
// 批量删除部门
export const deleteDepts = async (ids: number[]) => {
  return apiClient.delete('/depts/batch', {
      params: { ids: ids.join(',') }
    })
};


