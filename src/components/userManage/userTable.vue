<template>
  <el-table :data="store.tableData" stripe border style="width: 175vh" height="55vh"
    @selection-change="store.handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="emp.eAvatarpath" label="头像" width="80">
      <template #default="scope">
        <t-avatar :image="scope.row.emp.eAvatarpath" size="40px" />
      </template>
    </el-table-column>
    <el-table-column fixed prop="emp.id" label="ID" sortable width="70" />
    <el-table-column fixed prop="emp.eName" label="姓名" width="100" show-overflow-tooltip>
      <template #default="scope"><el-tag effect="plain">{{ scope.row.emp.eName }}</el-tag></template>
    </el-table-column>
    <el-table-column label="状态" width="80" show-overflow-tooltip :filters="[
      { text: '在线', value: '1' },
      { text: '离线', value: '0' },
    ]" :filter-method="(value: string, row: UserData) => { return row.isOnline == value }"
      filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.row.isOnline == '1' ? 'success' : 'info'" effect="dark" round size="small">{{
          scope.row.isOnline == '1' ?
          '在线' : '离线'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eUsername" label="账号" width="120" show-overflow-tooltip>
    </el-table-column>
    <el-table-column prop="emp.ePassword" label="密码" width="80" show-overflow-tooltip>
      <template #default="scope">
        <el-popover trigger="hover" placement="top-start" v-model:visible="showPasswordState[scope.row.emp.id]"
          width="auto">
          <template #reference>
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ showPasswordState[scope.row.emp.id] ? scope.row.emp.ePassword :
                maskedPassword
              }}</span>
            </div>
          </template>
          <div>{{ scope.row.emp.ePassword }}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eIsenabled" label="帐号状态" width="100" :filters="[
      { text: '启用', value: 1 },
      { text: '禁用', value: 0 }
    ]" :filter-method="(value: number, row: UserData) => { return row.emp.eIsenabled === value }"
      filter-placement="bottom-end">
      <template #default="scope"><el-tag :type="scope.row.emp.eIsenabled == '0' ? 'danger' : 'success'">{{
        scope.row.emp.eIsenabled == '0' ? '禁用' : '启用'
      }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="emp.ePhone" label="手机号" width="120" show-overflow-tooltip>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon>
            <Iphone color="green" />
          </el-icon>
          <span style="margin-left: 10px">{{ scope.row.emp.ePhone }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eId" label="证件号" width="120" show-overflow-tooltip />
    <el-table-column prop="role.rInfo" label="角色" width="120" :filters="roleFilters"
      :filter-method="(value: number, row: UserData) => { return row.role.rId === value }" filter-placement="bottom-end"
      show-overflow-tooltip>
      <template #default="scope"><el-tag :type="scope.row.role.rId == 1 ? 'danger' :
        scope.row.role.rId == 2 ? 'warning' : 'info'">{{ scope.row.role.rInfo
  }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="dept.dName" label="部门" width="120" show-overflow-tooltip :filters="deptFilters"
      :filter-method="(value: number, row: UserData) => { return row.dept.id === value }" filter-placement="bottom-end">
    </el-table-column>
    <el-table-column prop="emp.eAge" label="年龄" width="60" />
    <el-table-column prop="emp.eGender" label="性别" width="80" dark
      :filters="[{ text: '男', value: '1' }, { text: '女', value: '0' }]"
      :filter-method="(value: string, row: UserData) => { return row.emp.eGender == value }"
      filter-placement="bottom-end">
      <template #default="scope"><el-tag effect="dark" round
          :type="scope.row.emp.eGender == '1' ? 'primary' : 'danger'">{{
            scope.row.emp.eGender == '1' ? '♂' : '♀'
          }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="emp.eCreatetime" label="入职日期" width="120" show-overflow-tooltip sortable>
      <template #default="scope">
        {{ formatDate(scope.row.emp.eCreatetime) }}
      </template>
    </el-table-column>
    <el-table-column prop="emp.eUpdatetime" label="更新日期" width="120" show-overflow-tooltip sortable>
      <template #default="scope">
        {{ formatDate(scope.row.emp.eUpdatetime) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{ row }">
        <t-row :gutter="5">
          <t-col>
            <t-button theme="default" size="small" @click="handleEditClick(row)">修改</t-button>
          </t-col>
          <t-col>
            <t-button theme="danger" size="small" @click="handleDeleteClick(row.emp.id)">删除</t-button>
          </t-col>
        </t-row>
      </template>
    </el-table-column>
  </el-table>
  <userDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
  <userDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" />

  <userEdit v-model:visible="confirmVisible" header="确认删除？" top="250px" theme="warning">
    <template #main>
      <p style="margin-left: 50px;">此操作将不可逆</p>
    </template>
    <template #footer>

      <t-button @click="handleCancel" theme="default">取消</t-button>
      <t-button @click="handleDelete(delId)">确认</t-button>
    </template>
  </userEdit>
</template>

<script lang="ts" setup>
import { ref, onMounted,onUnmounted } from 'vue';
import { formatDate } from "@/utils/moment";
import userDataEdit from './userDataEdit.vue';
import userDataAdd from './userDataAdd.vue';
import userEdit from './userEdit.vue';
import { useUserStore } from "@/stores/user-store";
import type { UserData } from "@/stores/user-store"
import { useRoleStore } from "@/stores/role-store";
import { useDeptStore } from "@/stores/dept-store";


const store = useUserStore()
const roleStore = useRoleStore()
const deptStore = useDeptStore()
const deptFilters = ref()
const roleFilters = ref()
const delId = ref()
const confirmVisible = ref(false)
// 定义密码显示状态对象
const showPasswordState = ref<{ [key: number]: boolean }>({});
// 掩码密码的字符串
const maskedPassword = '已加密';

const props = defineProps<{
  addVisible: boolean;
}>();

const emit = defineEmits(['update:addVisible']);

const editVisible = ref(false);

const handleDeleteClick = (id: number) => {
  confirmVisible.value = true
  delId.value = id
}

const handleCancel = () => {
  confirmVisible.value = false
}

const handleAddVisibleChange = () => {
  emit('update:addVisible');
};
const handleEditVisibleChange = () => {
  editVisible.value = false;
}

const handleEditClick = (row: any) => {
  store.userDataFormData = { ...row };
  editVisible.value = true;

};

const handleDelete = async (id: number) => {
  store.handleDelete(id)
  confirmVisible.value = false;
};

onMounted(async () => {
  await roleStore.getRoleListAll().then(() => {
    roleFilters.value = roleStore.roleList.map(role => ({ text: role.rInfo, value: role.rId }))
  })
  await deptStore.getAllDeptData().then(() => {
    deptFilters.value = deptStore.tableData.map(dept => ({ text: dept.dName, value: dept.id }))
  })

})


</script>

<style scoped></style>
