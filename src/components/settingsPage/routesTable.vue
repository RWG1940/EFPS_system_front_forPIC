<template>
    <div class="route-table">
        <t-row :gutter="10" style="margin-bottom: 10px;">
            <t-col :span="1"><t-input v-model="route.alias" placeholder="别名"></t-input></t-col>
            <t-col :span="1"><t-input v-model="route.id" placeholder="id"></t-input></t-col>
            <t-col :span="2"><t-input v-model="route.value" placeholder="路径"></t-input></t-col>
            <t-col :span="1"><t-input v-model="route.name" placeholder="组件名称"></t-input></t-col>
            <t-col :span="1"><t-input v-model="route.redirect" placeholder="重定向"></t-input></t-col>
            <t-col :span="1">
                <t-select v-model="route.type" placeholder="类型">
                    <t-option v-for="item in store.ROUTE_TYPE_OPTIONS" :key="item.value" :value="item.value"
                        :label="item.label">
                    </t-option>
                </t-select>
            </t-col>
            <t-col :span="1">
                <t-select v-model="route.state" placeholder="状态">
                    <t-option v-for="item in store.ROUTE_STATE_OPTIONS" :key="item.value" :value="item.value"
                        :label="item.label">
                    </t-option>
                </t-select></t-col>
            <t-col :span="3">
                <t-row>
                    <t-button theme="primary" @click="store.searchRoutes(route!)">
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
                        <t-popconfirm content="确认删除吗" @confirm="handleDeleteRoutes()" theme="danger" placement="bottom">
                            <t-button theme="default" style="margin-left: 10px;" shape="circle">
                                <t-icon name="delete"></t-icon>
                            </t-button>
                        </t-popconfirm>
                    </t-tooltip>
                </t-row>
            </t-col>
        </t-row>
        <el-table :data="store.routesTableData" style="width: 173vh;height: 300px;" stripe border
            @selection-change="store.handleSelectionChange">
            <el-table-column type="selection" width="55" fixed />
            <el-table-column fixed prop="id" label="ID" width="70" sortable></el-table-column>
            <el-table-column prop="parentrouteid" label="父路由ID" width="90"></el-table-column>
            <el-table-column prop="alias" label="别名" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="组件名称" width="120" show-overflow-tooltip>
                <template #default="scope">
                    {{ scope.row.name == '' ? '' : scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column prop="icon" label="图标" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="state" label="状态" width="80" :filters="[
                { text: '启用', value: 1 },
                { text: '禁用', value: 0 },
            ]" :filter-method="(value: number, row: RouteEntity) => { return row.state === value }"
                filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.state == 1 ? 'success' : 'danger'">{{ scope.row.state == 1 ? '启用' : '禁用'
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="60"></el-table-column>
            <el-table-column prop="value" label="路径" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="redirect" label="重定向" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="type" label="类型" width="80" :filters="[
                    { text: '菜单', value: 'MENU' },
                    { text: '页面', value: 'LINK' }
                ]" :filter-method="(value: string, row: RouteEntity) => { return row.type === value }"
                filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.type === 'MENU' ? 'primary' : 'warning'" effect="dark">{{ scope.row.type ===
                        'MENU' ? '菜单' :
                        '页面' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="discription" label="描述" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createuserid" label="创建用户ID" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="140" fixed="right">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <t-popconfirm content="确认删除吗" @confirm="store.deleteRoutes([scope.row.id])" theme="danger">
                        <el-button size="small" type="danger">删除</el-button>
                    </t-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <t-pagination style="margin-top: 10px;" v-model="store.currentPage" v-model:pageSize="store.pageSize"
            :total="store.total" show-jumper @page-size-change="onPageSizeChange" @current-change="onCurrentChange" />
    </div>
    <routesAdd v-model:visible="addVisible" @update:visible="handleAddVisibleChange" @route-added="store.getPage()" />
    <routesEdit v-model:visible="editVisible" @update:visible="handleEditVisibleChange" @route-updated="store.getPage()" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouteStore } from '../../stores/routes-store'
import type { RouteEntity } from '@/models/route';
import { MessagePlugin } from 'tdesign-vue-next';
import routesAdd from './routesAdd.vue';
import routesEdit from './routesEdit.vue';

const store = useRouteStore()
const addVisible = ref(false)
const editVisible = ref(false)
const route = ref({
    alias: null,
    id: null,
    name: null,
    redirect: null,
    state: null,
    type: null,
    value: null
})
const resetSearchRoute = ref({
    alias: null,
    id: null,
    name: null,
    redirect: null,
    state: null,
    type: null,
    value: null
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
//重置筛选
const resetSearch = async () => {
    resetSearchRoute.value = {
        alias: null,
        id: null,
        name: null,
        redirect: null,
        state: null,
        type: null,
        value: null
    };
    route.value = resetSearchRoute.value
    await store.getPage();
};
// 删除按钮回调
const handleDeleteRoutes = async () => {
    if (store.selectedIds.length > 0) {
        await store.deleteRoutes(store.selectedIds)
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
    store.routeEditFormData = { ...row };
    editVisible.value = true
};
</script>
<style scoped>
.route-table {
    padding: 15px;
}
</style>