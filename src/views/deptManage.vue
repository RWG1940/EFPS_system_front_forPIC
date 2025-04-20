<template>
  <div class="wrap">
    <t-row :gutter="10">
      <t-col :span="2">
        <t-input v-model="store.searchData.id" placeholder="id" clearable></t-input>
      </t-col>
      <t-col :span="2">
        <t-input v-model="store.searchData.dName" placeholder="部门名" clearable></t-input>
      </t-col>
      <t-col :span="3">
        <t-date-range-picker :value="[store.createTime1, store.createTime2]" placeholder="创建日期范围" @pick="onPick" @change="onChange"
 enable-time-picker />
      </t-col>
      <t-col :span="1">
        <t-button @click="store.searchDept()"><template #icon><search-icon /></template>搜索
        </t-button>
      </t-col>
      <t-col :span="1">
        <t-button theme="primary" variant="outline" @click="store.searchDeptDataRefresh()"><template #icon><refresh-icon /></template>重置
        </t-button>
      </t-col>
      <t-col :span="0.5">
        <t-tooltip content="增行">
          <t-button @click="addButton()" theme="default" shape="circle"><template #icon><add-icon /></template></t-button>
        </t-tooltip>
      </t-col>
      <t-col :span="0.5">
        <t-tooltip content="删行">
          <t-button @click="store.handleBatchDelete()" theme="default" shape="circle"><template
              #icon><delete-icon /></template></t-button>
        </t-tooltip>
      </t-col>
    </t-row>
    <div class="table">
      <deptTable v-model:addVisible="addVisible" @update:addVisible="handleUpdateAddVisible" />
      <pagination class="pag" />
    </div>
  </div>
</template>
<script setup lang="ts">
import deptTable from '../components/deptManage/deptTable.vue'
import { ref, onMounted } from "vue";
import pagination from "@/components/deptManage/pagination.vue";
import { useDeptStore } from "@/stores/dept-store";
import type { DateRangePickerProps } from 'tdesign-vue-next';

const store = useDeptStore()

// 组件挂载后加载部门数据ByToken
onMounted(() => {
  store.handlePageChange()
});
const onPick: DateRangePickerProps['onPick'] = (value: any, context) => {
  store.createTime1 = value[0]
  store.createTime2 = value[1]
}
const onChange: DateRangePickerProps['onChange'] = (value: any, context) => {
  store.createTime1 = value[0]
  store.createTime2 = value[1]
};
//新增用户面板的可视化以及回调
const addVisible = ref(false)
const addButton = () => {
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
  