<template>
    <div class="wrap">
        <t-row :gutter="20">
            <transition name="m-trans" appear>
                <t-col :span="12">
                    <div class="msg">
                        <p class="title"><t-icon name="notification">
                            </t-icon> 已发布的公告
                            <t-tooltip content="新增一条公告">
                                <t-button size="small" @click="handleAddVisibleChange" theme="warning"><t-icon
                                        name="add"></t-icon></t-button>
                            </t-tooltip>
                            <t-tooltip content="删除过期的公告">
                                <t-popconfirm theme="default" content="您确定要删除24小时之前的公告吗" :visible="visible1" :confirm-btn="{
                                    content: '确认',
                                    theme: 'warning',
                                    onClick: () => {
                                        deleteExpiredNoticesData()
                                        visible1 = false
                                    }
                                }" :cancel-btn="{
                                    content: '我再想想',
                                    theme: 'default',
                                    variant: 'outline',
                                    onClick: () => { visible1 = false }
                                }">
                                    <t-button size="small" style="margin-left: 5px;" @click="visible1 = true"
                                        theme="warning"><t-icon name="delete-time"></t-icon></t-button>
                                </t-popconfirm>
                            </t-tooltip>
                        </p>
                        <div style="padding: 10px;">
                            <el-scrollbar height="300px" style="border-radius: 5px;">
                                <t-notification v-for="(message, index) in noticesDataPublished" :key="index"
                                    :title="message.header" :message="message.content" :content="message.content"
                                    theme="warning" :footer="formatDate(message.createtime || '')"
                                    style="width: 100%;margin-bottom: 5px;" :max-line="2" />
                            </el-scrollbar>
                        </div>
                    </div>
                </t-col>
            </transition>
            <transition name="m1-trans" appear>
                
                <t-col :span="12">
                    <div class="msgTable">
                        <p class="title"><t-icon name="root-list">
                            </t-icon> 所有公告
                            <t-tooltip content="新增一条公告">
                                <t-button size="small" theme="default" @click="handleAddVisibleChange"><t-icon
                                        name="add"></t-icon></t-button>
                            </t-tooltip>
                            <t-tooltip content="删除选中的公告">
                                <t-button size="small" theme="default" style="margin-left: 5px;"
                                    @click="noticesStore.deleteSelectedData()"><t-icon name="delete"></t-icon></t-button>
                            </t-tooltip>
                        </p>
                        <t-card style="margin: 10px;">
                            <el-table :data="filterTableData" height="380"
                                @selection-change="noticesStore.handleSelectionChange" stripe border>
                                <el-table-column type="selection" width="40" />
                                <el-table-column prop="header" label="标题" width="250"
                                    show-overflow-tooltip></el-table-column>
                                <el-table-column prop="content" label="内容" width="300"
                                    show-overflow-tooltip></el-table-column>
                                <el-table-column prop="createtime" label="创建时间" width="120" show-overflow-tooltip
                                    column-key="createtime" sortable>
                                    <template #default="scope">
                                        {{ formatDate(scope.row.createtime) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="updatetime" label="更新时间" width="120" show-overflow-tooltip
                                    column-key="updatetime" sortable>
                                    <template #default="scope">
                                        {{ formatDate(scope.row.updatetime) }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="status" label="状态" width="80" :filters="[
                                    { text: '已发布', value: 1 },
                                    { text: '未发布', value: 0 },

                                ]"
                                    :filter-method="(value: number, row: NoticesData) => { return row.status === value }"
                                    filter-placement="bottom-end">
                                    <template #default="scope">
                                        <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" size="small">
                                            {{ scope.row.status == 1 ? '已发布' : '未发布' }}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="author" label="作者" width="80"
                                    show-overflow-tooltip></el-table-column>
                                <el-table-column fixed="right" min-width="120">
                                    <template #header>
                                        <el-input v-model="noticesStore.search" size="small" placeholder="搜索" />
                                    </template>
                                    <template #default="scope">
                                        <t-button size="small" theme="default"
                                            @click="() => { noticeEditFormData = scope.row; handleEditVisibleChange() }">编辑</t-button>
                                        <t-button size="small" theme="danger" style="margin-left: 5px;"
                                            @click="noticesStore.deleteData([scope.row.id])">删除</t-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <t-pagination
                                v-model="noticesStore.currentPage"
                                v-model:pageSize="noticesStore.pageSize"
                                :total="noticesStore.data.length"
                                size="small"
                                theme="simple"
                                @page-size-change="onPageSizeChange"
                                @current-change="onCurrentChange"
                            />
                        </t-card>
                    </div>
                </t-col>
            </transition>
        </t-row>
        <addNotice :visible="addVisible" @update:visible="handleAddVisibleChange" />
        <editNotice :visible="editVisible" @update:visible="handleEditVisibleChange" />

    </div>
</template>
<script setup lang="ts">
import { useNoticesStore,noticeEditFormData,deleteExpiredNoticesData,noticesDataPublished,filterTableData } from '@/stores/notices-store';
import { formatDate } from '@/utils/moment'
import addNotice from '../components/noticesPage/addNotice.vue'
import editNotice from '../components/noticesPage/editNotice.vue'
import { ref, onMounted } from 'vue';
import type{ NoticesData } from '@/types/noticesTypes'

const noticesStore = useNoticesStore()
const addVisible = ref(false)
const editVisible = ref(false)
const visible1 = ref(false)
const handleAddVisibleChange = () => {
    addVisible.value = !addVisible.value
}
const handleEditVisibleChange = () => {
    editVisible.value = !editVisible.value
}
const onPageSizeChange = (pageSize: number) => {
    noticesStore.pageSize = pageSize
    noticesStore.fetchPageData()
}
const onCurrentChange = (page: number) => {
    noticesStore.currentPage = page
    noticesStore.fetchPageData()
}
onMounted(() => {
    noticesStore.fetchPageData()
})
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

.msg {
    background-color: rgb(255, 166, 0, 0.5);
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    transition-duration: 0.5s;
}

.msg:hover {
    background-color: rgb(255, 166, 0, 0.7);
    transition-duration: 0.5s;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.001);
}

.title {
    margin: 15px;
    margin-bottom: 0px;
    font-weight: bold;
    font-size: large;
    color: rgb(255, 255, 255);
}

.msgTable {
    display: flex;
    background-color: rgba(141, 141, 141, 0.5);
    margin-top: 10px;
    border-radius: 8px;
    flex-direction: column;
    height: 500px;
    transition-duration: 0.5s;
}

.msgTable:hover {
    background-color: rgba(141, 141, 141, 0.8);
    transition-duration: 0.5s;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    transform: scale(1.001);

}

.m-trans-enter-from,
.m-trans-leave-to {
    transform: translateX(-100px) scale(0.5) rotateY(-20deg) rotateX(20deg);
    opacity: 0;
}

.m-trans-enter-active,
.m-trans-leave-active {
    transition: all 0.5s ease;
}

.m1-trans-enter-from,
.m1-trans-leave-to {
    transform: translateX(150px) scale(0.5) rotateY(20deg) rotateX(-20deg);
    opacity: 0;
}

.m1-trans-enter-active,
.m1-trans-leave-active {
    transition: all 0.6s ease;
}
</style>
  