<template>
  <t-layout class="t-layout1">
    <rheader />
    <t-layout class="t-layout2">
      <sideBar />
      <t-layout>
        <content />
      </t-layout>
    </t-layout>
  </t-layout>
</template>
  
<script setup lang="ts">
import sideBar from "@/layout/sideBar.vue";
import rheader from "@/layout/header.vue";
import content from "@/layout/content.vue";
</script>
<style scoped>
.t-layout1 {
  height: 100vh;
  width: 100%;
}

.t-layout2 {
  display: flex;
  flex-direction: row;
}
</style>