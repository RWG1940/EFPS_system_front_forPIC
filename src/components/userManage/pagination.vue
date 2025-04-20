<template>
  <t-pagination v-model="store.current" v-model:pageSize="store.pageSize" :total="store.total" show-jumper
    @change="onChange" @page-size-change="onPageSizeChange" @current-change="onCurrentChange" />
</template>
  
<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'

const store = useUserStore()

const onPageSizeChange = (size: number) => {
  store.pageSize = size
  store.handlePageChange()
};

const onCurrentChange = (index: number) => {
  store.current = index
  store.handlePageChange()
};

const onChange = (pageInfo: any) => {
  console.log(pageInfo);
};
</script>
  