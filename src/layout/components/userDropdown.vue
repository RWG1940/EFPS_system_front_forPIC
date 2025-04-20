<template>
  <t-space class="dropdown">
    <t-dropdown :options="homeStore.options" @click="clickHandler">
      <t-button variant="text">
        {{ userStore.myData.emp.eName }}
        <template #suffix><chevron-down-icon size="16" /></template>
      </t-button>
    </t-dropdown>
  </t-space>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useHomeStore } from "@/stores/home-store";
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { useUserStore } from "@/stores/user-store";
import type { DropdownProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';


const userStore = useUserStore()
const homeStore = useHomeStore()


// 下拉框点击事件
const clickHandler: DropdownProps['onClick'] = (data) => {
  if (data.value == 2) {
    MessagePlugin.success('已退出登录');
    userStore.logout()
  } else if (data.value == 1){
    homeStore.myInfoVisible = true
  }
};
onMounted(() => {
  // 从token读取登陆用户信息
  homeStore.getMyInfo()
})
</script>
  