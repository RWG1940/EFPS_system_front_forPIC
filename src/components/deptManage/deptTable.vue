<template>
  <el-table :data="store.tableData" stripe border style="width: 175vh" height="61vh"
    @selection-change="store.handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="dAvatarpath" label="部门图" width="80">
      <template #default="scope">
        <t-avatar :image="scope.row.dAvatarpath" size="40px" shape="round" />
      </template>
    </el-table-column>
    <el-table-column fixed prop="id" label="ID" sortable width="90" column-key="id"/>
    <el-table-column fixed prop="dName" label="部门" width="150" show-overflow-tooltip>
      <template #default="scope"><el-tag effect="plain">{{ scope.row.dName }}</el-tag></template>
    </el-table-column>
    <el-table-column prop="dTotal" label="部门人数" width="120" show-overflow-tooltip />
    <el-table-column prop="dCreatetime" label="创建日期" width="170" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.dCreatetime) }}
      </template>
    </el-table-column>
    <el-table-column prop="dUpdatetime" label="更新日期" width="170" show-overflow-tooltip>
      <template #default="scope">
        {{ formatDate(scope.row.dUpdatetime) }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="{ row }">
        <div style="display: flex;">
          <el-button type="default" size="small" @click="handleEditClick(row)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDeleteClick(row.id)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <deptDataEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
  <deptDataAdd :visible="addVisible" @update:visible="handleAddVisibleChange" @userAdded="store.handlePageChange" />
  <!-- 确认面板 -->
  <userEdit v-model:visible="confirmVisible" header="确认删除？" top="250px" theme="warning">
    <template #main>
      <p style="margin-left: 50px; text-shadow: 1px 1px 10px rgb(255, 0, 0); ">此操作将不可逆</p>
    </template>
    <template #footer>
      <t-button @click="handleCancel" theme="default">取消</t-button>
      <t-button @click="handleDelete(delId)">确认</t-button>
    </template>
  </userEdit>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { formatDate } from "@/utils/moment";
import deptDataEdit from '@/components/deptManage/deptDataEdit.vue';
import deptDataAdd from '@/components/deptManage/deptDataAdd.vue';
import userEdit from '@/components/userManage/userEdit.vue';
import { useDeptStore } from "@/stores/dept-store";

const store = useDeptStore()

const delId = ref()
const confirmVisible = ref(false)
// 父组件传来的值 代理 这里是用来控制 添加部门面板
const props = defineProps<{
  addVisible: boolean;
}>();

const emit = defineEmits(['update:addVisible']);

// 修改面板控制值
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

// 修改按钮回调
const handleEditClick = (row: any) => {
  store.deptEditFormData = { ...row };
  editVisible.value = true;

};

// 删除按钮回调
const handleDelete = async (id: number) => {
  store.handleDelete(id)
  confirmVisible.value = false;
};

</script>

<style scoped>

</style>
