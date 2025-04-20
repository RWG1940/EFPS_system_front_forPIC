<template>
  <t-header>
    <t-head-menu value="item1" height="120px">
      <template #logo>
        <img src="../assets/img/seller.png" style="{ width: '80px', height: '80px' }" />
        <transition name="h-trans" appear>
          <h1 style="color: blue;">Seller-pic-sys</h1>
        </transition>
        <t-loading size="small" :loading="content"></t-loading>
      </template>
      <template #operations>
        <el-button circle type="success" class="onlineCircle"></el-button>
        <p style="margin: 0;margin-right: 20px;">在线中</p>
        <t-avatar size="medium" style="margin-right: 5px;" :image="store.myData.emp.eAvatarpath"></t-avatar>
        <userDropdown />
        <newsDrawer />
      </template>
    </t-head-menu>
  </t-header>
</template>
<script setup lang="ts">
import userDropdown from "../layout/components/userDropdown.vue";
import newsDrawer from "./components/newsDrawer.vue";
import { useUserStore } from "@/stores/user-store";
import { onBeforeMount } from "vue";
import { content } from "@/utils/stateVariables";


const store = useUserStore()
onBeforeMount(() => {
  // 获取当前登录用户信息
  store.updateLoginUserData()
})
</script>
<style scoped>
.h-trans-enter-active,
.h-trans-leave-active {
  transition: all 0.5s ease-out;
}

.h-trans-enter-from,
.h-trans-leave-to {
  opacity: 0;
  transform: perspective(1000px) translateX(-200px) scale(0.5);
}

.onlineCircle {
  width: 1px;
  height: 1px;
  display: inline-block;
  /* 确保 div 可以像文本一样显示 */
  animation: fadeInOut 2s infinite;
  /* 设置动画名称、持续时间和循环次数 */
}

@keyframes fadeInOut {

  0%,
  100% {
    opacity: 0.5;
    scale: 0.6;
  }

  50% {
    opacity: 1;
    box-shadow: 1px 1px 5px rgb(155, 155, 155);
    scale: 0.7;
  }
}</style>