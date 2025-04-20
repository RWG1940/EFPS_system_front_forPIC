<template>
    <div class="roleRoute-table">
        <t-row style="width: 150px;">
            角色：
            <t-select v-model="roleName" placeholder="请选择角色" size="small" @change="handleChange" clearable>
                <t-option v-for="item in roleStore.roleList" :key="item.rId" :value="item.rId" :label="item.rInfo">{{
                    item.rInfo }}</t-option>
            </t-select>
        </t-row>
        <t-row style="margin-top: 10px;">
            角色所对应的路由：
        </t-row>
        <t-row>
            <t-card>
                <t-tag style="margin: 5px;" shape="round" v-for="rr in roleRoutesList" :key="rr.id"
                    :theme="rr.roType == 'LINK' ? 'primary' : 'success'" variant="light" size="medium" closable
                    @close="handleDel(rr.id, rr.roId)">{{ rr.roName }}
                </t-tag>
                <t-tag style="margin: 10px;" @click="handleAdd()" size="medium" theme="warning" shape="round">
                    <add-icon />
                    添加路由
                </t-tag>
            </t-card>
        </t-row>
        <t-dialog v-model:visible="dialogVisibleAdd" header="添加路由" width="30%">
            <t-select v-model="newRoleRoute.roId" placeholder="选择路由" clearable multiple>
                <t-option label="全选" :check-all="true" />
                <t-option v-for="item in routeStore.allRoutes" :key="item.id" :value="item.id" :label="item.alias">{{
                    item.alias }}</t-option>
            </t-select>
            <template #footer>
                <t-button theme="primary" @click="async () => {
                    await roleRouteStore.addRoleRouteItem(newRoleRoute.rId,newRoleRoute.roId).then(() => {
                        dialogVisibleAdd = false,
                            handleChange(),
                            newRoleRoute.roId = []
                    })
                }">确定</t-button>
                <t-button theme="default" @click="()=>{dialogVisibleAdd = false,newRoleRoute.roId = []}">取消</t-button>
            </template>
        </t-dialog>

    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { useRoleStore } from "../../stores/role-store";
import { useRoleRouteStore } from "../../stores/roleRoute-store";
import { useRouteStore } from "../../stores/routes-store";

const roleStore = useRoleStore();
const roleRouteStore = useRoleRouteStore();
const routeStore = useRouteStore();
const roleName = ref();
const roleRoutesList = ref();
const newRoleRoute = ref({
    rId: '',
    roId: [],
});
const dialogVisibleAdd = ref(false);

const handleChange = async () => {
    await routeStore.getAllRoutes();
    if (roleName.value == undefined) {
        roleRoutesList.value = [];
        return;
    }
    await roleRouteStore.getRoleRoutesList(roleName.value);
    roleRouteStore.roleRoutesList.forEach(rr => {
        routeStore.allRoutes.forEach(ro => {
            if (rr.roId == ro.id) {
                rr.roName = ro.alias;
                rr.roType = ro.type;
            }
        })
    })
    roleRoutesList.value = roleRouteStore.roleRoutesList;
}

const handleDel = async (id: number, roId: number) => {
    if (roId == 1) {
        MessagePlugin.warning('主页不能删除');
        return;
    }
    const confirmDia = DialogPlugin({
        theme: 'warning',
        header: '删除路由',
        body: '确定要删除该路由吗？',
        onConfirm: async () => {
            await roleRouteStore.deleteRoleRouteById(id);
            await handleChange();
            confirmDia.destroy();
        },
    });
}
const handleAdd = async () => {
    if (roleName.value == undefined) {
        MessagePlugin.warning('请先选择角色');
        return;
    }
    newRoleRoute.value.rId = roleName.value;
    await routeStore.getAllRoutes();
    dialogVisibleAdd.value = true;
}
</script>
<style lang="scss" scoped>
.roleRoute-table {
    padding: 15px;
}
</style>