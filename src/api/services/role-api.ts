import apiClient from '../index'

export const getRoles = async () => {
  return apiClient.get('/role')
};
export const addRole = async (role: any) => {
  return apiClient.post('/role', role)
};

export const deleteRole = async (id: number) => {
  return apiClient.delete('/role/' + id)
};

export const updateRole = async (role: any) => {
  return apiClient.put('/role', role)
};





