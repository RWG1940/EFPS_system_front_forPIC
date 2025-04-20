<template>
  <div class="t-suf-container">
    <t-drawer class="panel" v-model:visible="homeStore.myInfoVisible" :placement="placement" :mode="mode" :confirm-btn="{
      content: '修改个人资料', 
      onClick: handleEditClick
    }" header="个人中心" show-in-attached-element>
      <t-row>
        <t-col :span="1">
          <t-avatar :image="userStore.myData.emp.eAvatarpath" size="100px" />
        </t-col>
        <t-col :span="10">
          <t-row>
            <p style="font-size: xx-large;margin: 15px;">{{ userStore.myData.emp.eName }},</p>
            <p class="rwg" style="font-size: xx-large;margin: 15px;">欢迎回来~</p>
          </t-row>
          <t-row style="margin-left: 15px;">
            <el-col :span="2">
              <t-row>
                <p class="rwg">id：</p>
                <p>{{ userStore.myData.emp.id }}</p>
              </t-row>
            </el-col>
            <el-col :span="3">
              <t-row>
                <p class="rwg">部门：</p>
                <p>{{ userStore.myData.dept.dName }}</p>
              </t-row>
            </el-col>
            <el-col :span="4">
              <t-row>
                <p class="rwg">角色：</p>
                <p>{{ userStore.myData.role.rInfo }}</p>
              </t-row>
            </el-col>
            <el-col :span="6">
              <t-row>
                <p class="rwg">🎀您已来这：</p>
                <p style="font-weight: bold;">{{ calculateDays(userStore.myData.emp.eCreatetime || '') }}天</p>
              </t-row>
            </el-col>
          </t-row>
          <t-row>
          </t-row>
        </t-col>
      </t-row>
    </t-drawer>
    <myInfoEdit :visible="editVisible" @update:visible="handleEditVisibleChange" />
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { useHomeStore } from "@/stores/home-store";
import { useUserStore } from "@/stores/user-store";
import myInfoEdit from "@/layout/components/myInfoEdit.vue";

const userStore = useUserStore()
const homeStore = useHomeStore()
const placement = ref('bottom');
const mode = ref('push');
const editVisible = ref(false)

// myInfoEdit保存按钮的回调
const handleEditVisibleChange = () => {
  editVisible.value = false;
}
// 编辑按钮事件
const handleEditClick = () => {
  editVisible.value = true;
}

const calculateDays = (dateString: any) => {
  if (!dateString) return 0;
  const startDate = new Date(dateString) as any;
  const currentDate = new Date() as any;
  const diffTime = currentDate - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

</script>
<style scoped>
.rwg {
  color: blue;
  font-weight: bold;
}
</style>
  