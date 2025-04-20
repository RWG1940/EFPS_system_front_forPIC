<template>
  <div class="wrap">
    <t-row :gutter="10">
      <t-col :span="2">
        <t-input v-model="store.searchUserData.emp.id" placeholder="id" clearable></t-input>
      </t-col>
      <t-col :span="2">
        <t-input v-model="store.searchUserData.emp.eUsername" placeholder="账号" clearable></t-input>
      </t-col>
      <t-col :span="1">
        <t-input v-model="store.searchUserData.emp.eName" placeholder="姓名" clearable></t-input>
      </t-col>
      <t-col :span="2">
        <t-input v-model="store.searchUserData.emp.ePhone" placeholder="手机号" clearable></t-input>
      </t-col>
      <t-col :span="2">
        <t-input v-model="store.searchUserData.emp.eId" placeholder="证件号" clearable></t-input>
      </t-col>
      <t-col :span="1">
        <t-select v-model="store.searchUserData.emp.eDeptid" placeholder="部门" clearable>
          <t-option v-for="item in storeDept.tableData" :key="item.id" :value="item.id" :label="item.dName">{{ item.dName
          }}</t-option>
        </t-select>
      </t-col>
      <t-col :span="1">
        <t-select v-model="store.searchUserData.role.rId" placeholder="角色" clearable>
          <t-option v-for="item in storeRole.roleList" :key="item.rId" :value="item.rId" :label="item.rInfo">{{ item.rInfo
          }}</t-option>
        </t-select>
      </t-col>

      <t-col :span="1">
        <t-select v-model="store.searchUserData.emp.eIsenabled" placeholder="状态" clearable>
          <t-option value="1" label="启用">启用</t-option>
          <t-option value="0" label="禁用">禁用</t-option>
        </t-select>
      </t-col>

      <t-col :span="1">
        <t-select v-model="store.searchUserData.emp.eGender" placeholder="性别" clearable>
          <t-option value="1" label="男">男</t-option>
          <t-option value="0" label="女">女</t-option>
        </t-select>
      </t-col>

      <t-col :span="3.5">
        <t-date-range-picker :value="[store.createTime1, store.createTime2]" placeholder="入职日期范围" enable-time-picker
          allow-input clearable @pick="onPick" @change="onChange" />
      </t-col>
      <t-col :span="1">
        <t-button @click="store.searchUser();">
          <template #icon><search-icon /></template>
          搜索
        </t-button>
      </t-col>
      <t-col :span="1">
        <t-button theme="primary" variant="outline" @click="store.searchUserDataRefresh()">
          <template #icon><refresh-icon /></template>
          重置
        </t-button>
      </t-col>
      <t-col :span="0.5">
        <t-tooltip content="增行">
          <t-button theme="default" shape="circle" @click="addButton">
            <template #icon><add-icon /></template>
          </t-button>
        </t-tooltip>
      </t-col>
      <t-col :span="0.5">
        <t-tooltip content="删行">
          <t-button theme="default" shape="circle" @click="store.handleBatchDelete()">
            <template #icon><delete-icon /></template>
          </t-button>
        </t-tooltip>
      </t-col>
    </t-row>
    <div class="table">
      <userTable v-model:addVisible="addVisible" @update:addVisible="handleUpdateAddVisible" />
      <pagination class="pag" />
    </div>
  </div>
</template>
<script setup lang="ts">
import userTable from '../components/userManage/userTable.vue'
import { ref, onMounted } from "vue";
import pagination from "@/components/userManage/pagination.vue";
import { useUserStore } from "@/stores/user-store";
import { useDeptStore } from "@/stores/dept-store";
import { useRoleStore } from "@/stores/role-store";
import type { DateRangePickerProps } from 'tdesign-vue-next';

const store = useUserStore()
const storeDept = useDeptStore()
const storeRole = useRoleStore()

const onPick: DateRangePickerProps['onPick'] = (value: any, context) => {
  store.createTime1 = value[0]
  store.createTime2 = value[1]
}
const onChange: DateRangePickerProps['onChange'] = (value: any, context) => {
  store.createTime1 = value[0]
  store.createTime2 = value[1]
};
onMounted(() => {
  store.handlePageChange()
});

const addVisible = ref(false)
const addButton = () => {
  store.cleanUserData();
  addVisible.value = true
}
const handleUpdateAddVisible = () => {
  addVisible.value = false;
};

</script>
<style lang="scss" scoped>
.wrap {
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 98%;
}

.table {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pag {
  margin-top: 20px;
}

.t-col {
  margin-top: 10px;
}
</style>
