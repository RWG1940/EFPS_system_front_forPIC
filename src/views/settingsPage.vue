<template>
  <div class="wrap">
    <div class="header">
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid blue;">路由设置
        </t-col>
      </t-row>
      <t-row>
        <routesTable />
      </t-row>
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid blue;">角色设置
        </t-col>
      </t-row>
      <t-row>
        <rolesTable />
      </t-row>
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid blue;">角色-路由设置
        </t-col>
      </t-row>
      <t-row>
        <roleRoutesTable />
      </t-row>
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid blue;">权限设置
        </t-col>
      </t-row>
      <t-row>
        <permissionsTable />
      </t-row>
      <t-row>
        <t-col style="font-weight: bold;border-bottom: 5px solid blue;">用户-权限设置
        </t-col>
      </t-row>
      <t-row>
        <EmpPermissionsTable />
      </t-row>
     
    </div>
  </div>
</template>
<script setup lang="ts">
import routesTable from '@/components/settingsPage/routesTable.vue'
import rolesTable from '@/components/settingsPage/rolesTable.vue'
import roleRoutesTable from '@/components/settingsPage/roleRoutesTable.vue'
import permissionsTable from '@/components/settingsPage/permissionsTable.vue'
import EmpPermissionsTable from '@/components/settingsPage/empPermissionsTable.vue';

</script>
<style lang="scss" scoped>
.wrap {
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 98%;
}
</style>
  