<template>
    <div class="roles-table">
        当前角色：
        <t-row>
            <t-tag style="margin: 10px;" v-for="role in store.roleList" :key="role.rId"
                :theme="role.rId == 1 ? 'danger' : role.rId == 2 ? 'warning' : 'primary'" variant="light" size="large"
                closable @close="handleDel(role.rId)" @click="handleEdit(role)">{{ role.rInfo }}
            </t-tag>
            <t-tag style="margin: 10px;" @click="handleAdd()" size="large">
                <add-icon />
                添加角色
            </t-tag>
        </t-row>
        <!-- 添加角色dialog -->
        <t-dialog v-model:visible="dialogVisibleAdd" header="添加角色" width="30%">
            角色代号:<t-input v-model="newRole.rName" placeholder="请输入角色代号" clearable />
            角色名称:<t-input v-model="newRole.rInfo" placeholder="请输入角色名称" clearable />
            <template #footer>
                <t-button theme="primary" @click="async () => {
                    await store.addRoleItem(newRole).then(() => {
                        dialogVisibleAdd = false, newRole = {
                            rName: '',
                            rInfo: ''
                        }
                    })
                }">确定</t-button>
                <t-button theme="default" @click="() => {
                    dialogVisibleAdd = false, newRole = {
                        rName: '',
                        rInfo: ''
                    }
                }">取消</t-button>
            </template>
        </t-dialog>
        <!-- 编辑角色dialog -->
        <t-dialog v-model:visible="dialogVisibleEdit" header="编辑角色" width="30%">
            角色id:<t-input v-model="editRole.rId" disabled />
            角色代号:<t-input v-model="editRole.rName" placeholder="请输入角色代号" />
            角色名称:<t-input v-model="editRole.rInfo" placeholder="请输入角色名称" />
            <template #footer>
                <t-button theme="primary"
                    @click="() => { store.editRoleItem(editRole), dialogVisibleEdit = false }">确定</t-button>
                <t-button theme="default" @click="() => { dialogVisibleEdit = false, store.getRoleListAll() }">取消</t-button>
            </template>
        </t-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRoleStore } from "@/stores/role-store";
import { onMounted } from "vue";
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';


const store = useRoleStore();
const dialogVisibleAdd = ref(false);
const dialogVisibleEdit = ref(false);
const editRole = ref({
    rInfo: '',
    rName: '',
    rId: ''
})
const newRole = ref({
    rInfo: '',
    rName: ''
})


const handleDel = (id: any) => {
    if (id == 1) {
        MessagePlugin.warning('超级管理员角色不能删除');
        return;
    }
    if (id == 2) {
        MessagePlugin.warning('管理员角色不能删除');
        return;
    }
    const confirmDia = DialogPlugin({
        theme: 'warning',
        header: '警告',
        body: '你确定删除该角色?',
        confirmBtn: '确认',
        cancelBtn: '取消',
        onConfirm: () => {
            store.deleteRoleItem(id);
            confirmDia.destroy();
        },
        onClose: () => {
            confirmDia.destroy();
        },
    });
}
const handleAdd = () => {
    dialogVisibleAdd.value = true;
}
const handleEdit = (role: any) => {
    editRole.value = role;
    dialogVisibleEdit.value = true;
}

onMounted(() => {
    store.getRoleListAll();
})
</script>
<style lang="scss" scoped>
.roles-table {
    padding: 15px;
}
</style>