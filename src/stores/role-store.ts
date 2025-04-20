import { defineStore } from "pinia";
import { ref, toRaw, reactive } from "vue";
import { MessagePlugin } from 'tdesign-vue-next';
import { getRoles, addRole, deleteRole, updateRole } from '@/api/services/role-api'

export interface Role {
  rId?: number;
  rInfo?: string;
  rName?: string;
}
export const useRoleStore = defineStore('role', () => {
    const roleList = ref<Role[]>([])
    
    const getRoleListAll = async () => {
      const res = await getRoles()
      roleList.value = res.data.result
    }
    const addRoleItem = async (role: Role) => {
      await addRole(role).then(() => {
        MessagePlugin.success('添加成功')
        getRoleListAll()
      })
    }
    const deleteRoleItem = async (id: number) => {
      await deleteRole(id).then(() => {
        MessagePlugin.success('删除成功')
        getRoleListAll()
      })
    }
    
    const editRoleItem = async (role: any) =>{
      await updateRole(role).then(() => {
        MessagePlugin.success('更新成功')
        getRoleListAll()
      })
    }
    

 



  return {
    roleList,
    getRoleListAll,
    addRoleItem,
    deleteRoleItem,
    editRoleItem
  };
});
