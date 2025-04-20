<template>
    <div class="empPermission-table">
        <t-row style="width: 150px;">
            用户：
            <t-select v-model="empName" placeholder="请选择用户" size="small" @change="handleChange" clearable>
                <t-option v-for="item in empStore.tableData" :key="item.emp.id" :value="item.emp.id"
                    :label="item.emp.eName">{{
                        item.emp.eName }}</t-option>
            </t-select>
        </t-row>
        <t-row style="margin-top: 10px;">
            用户所对应的权限：
        </t-row>
        <t-row>
            <t-card>
                <t-tag style="margin: 5px;" shape="round" v-for="ep in empPermissionList" :key="ep.id" variant="light"
                    size="medium" closable @close="handleDel(ep.id, ep.mId)">{{ ep.mName }}
                </t-tag>
                <t-tag style="margin: 10px;" @click="handleAdd()" size="medium" theme="warning" shape="round">
                    <add-icon />
                    添加权限
                </t-tag>
            </t-card>
        </t-row>
        <t-dialog v-model:visible="dialogVisibleAdd" header="添加权限" width="30%">
            <t-select v-model="newEmpPermission.mId" placeholder="选择权限" clearable multiple>
                <t-option label="全选" :check-all="true" />
                <t-option v-for="item in permissionStore.allPermissions" :key="item.mId" :value="item.mId" :label="item.mName">{{
                    item.mName }}</t-option>
            </t-select>
            <template #footer>
                <t-button theme="primary" @click="async () => {
                    await empPermissionStore.addEmpPermissionItem(newEmpPermission.eId, newEmpPermission.mId).then(() => {
                        dialogVisibleAdd = false,
                            handleChange(),
                            newEmpPermission.mId = []
                    })
                }">确定</t-button>
                <t-button theme="default"
                    @click="() => { dialogVisibleAdd = false, newEmpPermission.mId = [] }">取消</t-button>
            </template>
        </t-dialog>

    </div>
</template>
<script lang="ts" setup>
import { ref, watch , onMounted} from "vue";
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { usePermissionStore } from "../../stores/permissions-store";
import { useEmpPermissionStore } from "../../stores/empPermission-store";
import { useUserStore } from "../../stores/user-store";

const empPermissionStore = useEmpPermissionStore();
const permissionStore = usePermissionStore();
const empStore = useUserStore();

const empName = ref();
const empPermissionList = ref();
const newEmpPermission = ref({
    eId: '',
    mId: [],
});
const dialogVisibleAdd = ref(false);

const handleChange = async () => {
    await permissionStore.getAllPermissions();
    if (empName.value == undefined) {
        empPermissionList.value = [];
        return;
    }
    await empPermissionStore.getEmpPermissionList(empName.value);
    empPermissionStore.empPermissionList.forEach((ep: any) => {
        permissionStore.allPermissions.forEach((p: any) => {
            if (ep.mId == p.mId) {
                ep.mName = p.mName;
            }
        })
    })
    empPermissionList.value = empPermissionStore.empPermissionList;
}

const handleDel = async (id: number, mId: number) => {
    const confirmDia = DialogPlugin({
        theme: 'warning',
        header: '删除权限',
        body: '确定要删除该权限吗？',
        onConfirm: async () => {
            await empPermissionStore.deleteEmpPermissionById(id);
            await handleChange();
            confirmDia.destroy();
        },
    });
}
const handleAdd = async () => {
    if (empName.value == undefined) {
        MessagePlugin.warning('请先选择用户');
        return;
    }
    newEmpPermission.value.eId = empName.value;
    await permissionStore.getAllPermissions();
    dialogVisibleAdd.value = true;
}
onMounted(() => {
    empStore.getAllUserData();
})

</script>
<style lang="scss" scoped>
.empPermission-table {
    padding: 15px;
}
</style>