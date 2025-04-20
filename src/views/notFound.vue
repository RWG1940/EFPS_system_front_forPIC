<template>
    <router-view v-slot="{ Component }">
      <component v-if="Component" :is="Component" />
      <div v-else>
            
        <t-row>
            <t-col :span="4"></t-col>
            <t-col :span="4">
              <t-row>
                <p style="font-size: 100px;color: blue;">404</p>
              </t-row>
              <t-row>
                <h1 style="margin: 0;">页面未找到，请检查路由设置。</h1>
              </t-row>
              <t-row style="margin-top: 20px;">
                <t-button theme="info"><router-link to="/">回到首页</router-link></t-button>
              </t-row>
            </t-col>
        </t-row>
        
      </div>
    </router-view>
  </template>
<script lang="ts" setup>

</script>
<style scoped>

</style>