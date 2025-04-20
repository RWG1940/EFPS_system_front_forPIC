<template>
  <div>
    <t-drawer v-model:visible="visible" header="消息" :close-btn="true" :footer="false">
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid orange;">公告消息
        </t-col>
      </t-row>
      <t-row style="margin-top: 5px;">
        <el-scrollbar v-if="noticesDataPublished.length > 0" height="300px" style="border-radius: 5px;">
          <t-notification v-for="(message, index) in noticesDataPublished" :key="index"
            :title="message.header" :content="message.content" theme="warning"
            :footer="formatDate(message.createtime || '')" class="notice-item" />
        </el-scrollbar>
        <t-card v-else="sysMsgStore.data.length = 0">
          <p style="color: gray;">无消息😊</p>
        </t-card>
      </t-row>

   

      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid rgb(255, 0, 0);">警报
        </t-col>
      </t-row>
    </t-drawer>
    <t-icon class="t-menu__operations-icon" name="notification" @click="handleClick" />

  </div>
</template>
  
<script lang="ts" setup>
import { MessagePlugin } from 'tdesign-vue-next';
import type { DrawerProps, ButtonProps } from 'tdesign-vue-next';
import { ref, onMounted } from 'vue';
import { useNoticesStore,noticesDataPublished } from '@/stores/notices-store'
import { formatDate } from '@/utils/moment'
import { useHomeStore } from "@/stores/home-store";


const noticesStore = useNoticesStore()
const homeStore = useHomeStore()
onMounted(() => {
  noticesStore.fetchAllData()
  homeStore.getMyInfo()


})

const visible = ref(false);
const handleClick: ButtonProps['onClick'] = () => {
  visible.value = true;
  homeStore.myInfoVisible = false;

};

</script>
<style scoped>
.notice-item {
  width: 260px;
  margin-bottom: 5px;
  transition: all 0.3s ease-in-out;
}

.notice-item:hover {
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.514);
  transition: all 0.3s ease-in-out;
  transform: scale(0.95);
}</style>