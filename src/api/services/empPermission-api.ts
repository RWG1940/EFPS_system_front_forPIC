import apiClient from '../index'

export const getEmpPermission = async (eId:number) => {
  return apiClient.get(`/empPermission/${eId}`)
};

export const addEmpPermission = async ( eId:number,mId:number[]) => {
  return apiClient.post(`/empPermission`,{eId,mId})
};
export const deleteEmpPermission = async (id: number) => {
  return apiClient.delete(`/empPermission/${id}`)
};







