<template>
  <div style="border-top: 1px solid rgba(220, 220, 220, 0.765)">
    <transition name="m-trans" appear>
      <t-menu theme="light" default-value="" :collapsed="collapsed">
        <template v-for="route in menuRoutes" :key="route.name || route.path">
          <t-menu-item v-if="!route.children || route.children.length === 0" :value="route.path"
            @click="handleMenuClick(route.path)">
            <template #icon>
              <t-icon :name="route.meta?.icon || 'default-icon'" />
            </template>
            {{ route.name }}
          </t-menu-item>

          <t-submenu v-else :value="route.path" mode="popup">
            <template #title>
              <span>{{ route.name }}</span>
            </template>
            <template #icon>
              <t-icon :name="route.meta?.icon || 'default-icon'" />
            </template>

            <!-- 递归渲染子菜单 -->
            <template v-for="childRoute in route.children" :key="childRoute.name || childRoute.path">
              <t-menu-item v-if="!childRoute.children || childRoute.children.length === 0" :value="childRoute.path"
                @click="handleMenuClick(route.path + '/' + childRoute.path)">
                {{ childRoute.name }}
              </t-menu-item>

              <t-submenu v-else :value="childRoute.path" mode="popup">
                <template #title>
                  <span>{{ childRoute.name }}</span>
                </template>
                <template #icon>
                  <t-icon :name="childRoute.meta?.icon || 'default-icon'" />
                </template>
                <!-- 递归子菜单 -->
                <template v-for="subChildRoute in childRoute.children" :key="subChildRoute.id">
                  <t-menu-item :value="subChildRoute.path" @click="handleMenuClick(subChildRoute.path)">
                    {{ subChildRoute.name }}
                  </t-menu-item>
                </template>
              </t-submenu>
            </template>
          </t-submenu>
        </template>

        <template #operations>
          <t-button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
            <template #icon><t-icon :name="iconName" /></template>
          </t-button>
        </template>
      </t-menu>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useRouteStore } from '@/stores/routes-store';


const collapsed = ref(false);
const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'));
const rwg = ref('');

const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const router = useRouter();
const menuRoutes = router.getRoutes().find((route) => route.path === '/home')?.children;

const routeStore = useRouteStore();
const handleMenuClick = (path: string) => {
  routeStore.aimRoutePath = path;
  router.push('/home/' + path);
};
onMounted(() => {
  if (rwg.value == '') {
    //router.push('/home/dashboarda')
  }
});




</script>
<style scoped>
.m-trans-enter-active,
.m-trans-leave-active {
  transition: all 0.5s ease-out;
}

.m-trans-enter-from,
.m-trans-leave-to {
  opacity: 0;
  transform: perspective(1000px) translateX(-200px) scale(0.5);
}
</style>
