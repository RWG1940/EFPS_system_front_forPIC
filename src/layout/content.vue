<template>
  <tags />
  <div style="position: relative; height: 580px">
    <t-list class="rwg" style="position: relative; height: 100%; overflow-y: scroll">
      <t-content style="margin-top: -10px;">
        <transition name="m-trans" appear>
          <router-view></router-view>
        </transition>
      </t-content>
      <rfooter />
    </t-list>

    <p style="display: flex;justify-content: center;margin: 0;color: grey;font-size: small;">
      <t-breadcrumb style="position: absolute;left: 10px;">
        <t-icon name="system-location"></t-icon>当前位置：
        <t-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path" :replace="true">{{
          item.name }}</t-breadcrumb-item>
      </t-breadcrumb>
      Powered By Seller
    </p>
    <my-info />
    <t-back-top container=".rwg" :visible-height="200" style="position: absolute" :offset="['24px', '80px']"
      :duration="500" shape="circle"></t-back-top>
  </div>
</template>
<script lang="ts" setup>
import myInfo from "@/layout/components/myInfo.vue";
import { ref } from "vue";
import tags from "@/layout/components/tags.vue";
import rfooter from "@/layout/footer.vue";


</script>
<style scoped>
.m-trans-enter-active,
.m-trans-leave-active {
  transition: all 0.5s ease-out;
}

.m-trans-enter-from,
.m-trans-leave-to {
  opacity: 0;
  transform: perspective(1000px) rotateX(10deg) rotateY(10deg) translateX(200px);
}

.rwg {
  background-color: rgb(255, 255, 255, 0);
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 5px;
}
</style>