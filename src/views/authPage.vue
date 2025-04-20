<template>
    <div style="padding: 20px;">
        <t-progress theme="circle" :percentage="percentage" size="small" />
        <h2>正在检查权限...</h2>
        <h1>目标地址: {{ store.aimRoutePath }}</h1>
        <h1 id="info" style="color: red;"></h1>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRouteStore } from "@/stores/routes-store";

const router = useRouter();
const store = useRouteStore();
const percentage = ref(0);

onMounted(() => {
    const interval = setInterval(() => {
        let roleId = parseInt(sessionStorage.getItem('userRoleId') as string)
        if (store.aimRoutePath == 'command-control/areaControl') {
            if (roleId == 1 || roleId == 2 || roleId == 3 ) { 
                if (percentage.value < 100) {
                    percentage.value += 20;
                } else {
                    clearInterval(interval);
                    router.replace('/' + store.aimRoutePath);
                }
            } else {
                percentage.value = 0
                document.getElementById('info')!.innerHTML = '您没有权限访问该页面！'
                clearInterval(interval);
            }
        }
        if (store.aimRoutePath == 'command-control/towerControl') {
            if (roleId == 1 || roleId == 2 || roleId == 4 ) {
                if (percentage.value < 100) {
                    percentage.value += 20;
                } else {
                    clearInterval(interval);
                    router.replace('/' + store.aimRoutePath);
                }
            } else {
                percentage.value = 0
                document.getElementById('info')!.innerHTML = '您没有权限访问该页面！'
                clearInterval(interval);

            }
        } 
        if (store.aimRoutePath == 'command-control/releaseGroundControl') {
            if (roleId == 1 || roleId == 2 || roleId == 5 ) {
                if (percentage.value < 100) {
                    percentage.value += 20;
                } else {
                    clearInterval(interval);
                    router.replace('/' + store.aimRoutePath);
                }
            } else {
                percentage.value = 0
                document.getElementById('info')!.innerHTML = '您没有权限访问该页面！'
                clearInterval(interval);

            }
        } 

    }, 100);
});
</script>
  
<style scoped></style>
  