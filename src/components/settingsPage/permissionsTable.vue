<template>
    <div class="permissions-table">
        <t-row :gutter="10" style="margin-bottom: 10px;">
            <t-col :span="1"><t-input v-model="permission.mId" placeholder="id"></t-input></t-col>
            <t-col :span="1"><t-input v-model="permission.mName" placeholder="权限名称"></t-input></t-col>
            <t-col :span="1"><t-input v-model="permission.mUrl" placeholder="权限地址"></t-input></t-col>
            <t-col :span="1"><t-input v-model="permission.mSign" placeholder="权限标志"></t-input></t-col>
            <t-row>
                <t-button theme="primary" @click="store.searchPermissions(permission!)">
                    <p><t-icon name="search"></t-icon>搜索</p>

                </t-button>
                <t-button theme="default" style="margin-left: 10px;" @click="resetSearch">
                    <p><t-icon name="refresh"></t-icon>重置</p>
                </t-button>
                <t-tooltip content="增行">
                    <t-button theme="default" style="margin-left: 10px;" shape="circle" @click="addVisible = true">
                        <t-icon name="add"></t-icon>
                    </t-button>
                </t-tooltip>
                <t-tooltip content="删行">
                    <t-popconfirm content="确认删除吗" @confirm="handleDeletePermissions()" theme="danger" placement="bottom">
                        <t-button theme="default" style="margin-left: 10px;" shape="circle">
                            <t-icon name="delete"></t-icon>
                        </t-button>
                    </t-popconfirm>
                </t-tooltip>
            </t-row>

        </t-row>
        <el-table :data="store.permissionsTableData" style="width: 173vh;height: 300px;" stripe border
            @selection-change="store.handleSelectionChange">
            <el-table-column type="selection" width="55" fixed />
            <el-table-column fixed prop="mId" label="ID" width="70" sortable></el-table-column>
            <el-table-column prop="mName" label="权限名称" width="250" show-overflow-tooltip>
                <template #default="scope">
                    <el-tag>{{ scope.row.mName == '' ? '' : scope.row.mName }}</el-tag> 
                </template>
            </el-table-column>
            <el-table-column prop="mUrl" label="权限地址" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mSign" label="权限标志" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <t-popconfirm content="确认删除吗" @confirm="store.deletePermissions([scope.row.id])" theme="danger">
                        <el-button size="small" type="danger">删除</el-button>
                    </t-popconfirm>
                </template>
            </el-table-column>   
        </el-table>
        <t-pagination style="margin-top: 10px;" v-model="store.currentPage" v-model:pageSize="store.pageSize"
            :total="store.total" show-jumper @page-size-change="onPageSizeChange" @current-change="onCurrentChange" />
    </div>
    <permissionsAdd v-model:visible="addVisible" @update:visible="handleAddVisibleChange" @permission-added="store.getPage()" />
    <permissionsEdit v-model:visible="editVisible" @update:visible="handleEditVisibleChange"
        @permission-updated="store.getPage()" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { usePermissionStore } from '../../stores/permissions-store'
import { MessagePlugin } from 'tdesign-vue-next';
import permissionsAdd from './permissionAdd.vue';
import permissionsEdit from './permissionEdit.vue';

const store = usePermissionStore()
const addVisible = ref(false)
const editVisible = ref(false)
const permission = ref({
    mId: null,
    mName: null,
    mUrl: null,
    mSign: null
})
const resetSearchPermission = ref({
    mId: null,
    mName: null,
    mUrl: null,
    mSign: null
})
onMounted(() => {
    store.getPage()
})
const onPageSizeChange = (size: number) => {
    store.pageSize = size
    store.getPage()
};

const onCurrentChange = (index: number) => {
    store.currentPage = index
    store.getPage()
};
const resetSearch = async () => {
    resetSearchPermission.value = {
        mId: null,
        mName: null,
        mUrl: null,
        mSign: null
    };
    permission.value = resetSearchPermission.value;
    await store.getPage();
};
// 删除按钮回调
const handleDeletePermissions = async () => {
    if (store.selectedIds.length > 0) {
        await store.deletePermissions(store.selectedIds)
    } else {
        MessagePlugin.warning('请选择要删除的项目')
    }
};
const handleAddVisibleChange = (visible: boolean) => {
    addVisible.value = visible
};
const handleEditVisibleChange = (visible: boolean) => {
    editVisible.value = visible
};
const handleEdit = (row: any) => {
    store.permissionEditFormData = { ...row };
    editVisible.value = true
};
</script>
<style scoped>
.permissions-table {
    padding: 15px;
}
</style>