import { defineStore } from "pinia";
import { ref, toRaw, reactive } from "vue";
import { MessagePlugin } from 'tdesign-vue-next';
import { addEmpPermission, deleteEmpPermission,getEmpPermission } from '@/api/services/empPermission-api';



export interface EmpPermission {
  id: number;
  eId: number;
  mId: number;
  mName: string;
}
export const useEmpPermissionStore = defineStore('empPermission', () => {
    const empPermissionList = ref<EmpPermission[]>([]);

    // 获取eId对应的路由列表
    const getEmpPermissionList = async (eId:number) => {
      await getEmpPermission(eId).then((res:any) => {
        empPermissionList.value = res.data.result;
      })
    }
    // 删除用户权限
    const deleteEmpPermissionById = async (id: number) => {
      await deleteEmpPermission(id).then((res:any) => {
        MessagePlugin.success('删除成功');
      })
    }
    // 添加角色路由
    const addEmpPermissionItem = async (eId:any,mId:number[]) => {
      await addEmpPermission(eId,mId).then((res:any) => {
        MessagePlugin.success('添加成功');
      })
    }
    


 



  return {
    empPermissionList,
    getEmpPermissionList,
    deleteEmpPermissionById,
    addEmpPermissionItem,
    
    
  };
});
