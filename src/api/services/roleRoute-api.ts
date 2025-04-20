import apiClient from '../index'

export const getRoleRoutes = async (rId:number) => {
  return apiClient.get(`/roleRoutes/${rId}`)
};

export const addRoleRoute = async ( rId:number,roId:number[]) => {
  return apiClient.post(`/roleRoutes`,{rId,roId})
};
export const deleteRoleRoute = async (id: number) => {
  return apiClient.delete(`/roleRoutes/${id}`)
};







