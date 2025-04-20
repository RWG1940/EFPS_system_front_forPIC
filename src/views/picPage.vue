<template>
  <div class="pic-page">
    <t-card title="🔍以图搜图">
      <t-space direction="vertical" size="large">
        <!-- 图源管理 -->
        <transition name="m-trans" appear>
        <t-card title="搜索设置" bordered>
          <t-space direction="vertical">
            1.图片源配置
            <t-input v-model="tableName" placeholder="请输入部门向量数据库表名" style="width: 300px" />

            2.搜索结果数量：
            <t-input-number v-model="topK" :min="1" :max="100" />

          </t-space>
        </t-card>
      </transition>

        <!-- 上传区域 -->
        <t-upload v-model="fileList" :action="null" :auto-upload="false" :max="1" accept="image/*"
          @change="handleUploadChange" theme="image" tips="点击或拖拽图片到这里" />


        <t-row> <t-button @click="handleSearch" :loading="loading">开始搜索</t-button></t-row>



        <!-- 搜索结果 -->
        <div v-if="searchResults.length > 0" class="search-results">
          <t-divider>搜索结果</t-divider>
          <t-loading :loading="loading">
            <t-space break-line>
              <t-card v-for="(result, index) in searchResults" :key="index" :bordered="true" theme="poster2"
                class="result-card">
       
                <template #cover>
                  <img :src="getImageUrl(result.path)" :alt="'搜索结果' + (index + 1)" class="result-image" />

                </template>
                <template #footer>
                  <p class="similarity">相似度: {{ formatSimilarity(result.distance) }}</p>
                  <t-button style="margin-left: 40px;margin-top: 5px;" size="small" theme="info">商品详情</t-button>
                </template>
              </t-card>
            </t-space>
          </t-loading>
        </div>
      </t-space>
    </t-card>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { picSearchApi } from '@/api/picSearch';
import type { UploadFile } from 'tdesign-vue-next';

const fileList = ref<UploadFile[]>([]);
const topK = ref(10);
const loading = ref(false);
const searchResults = ref<Array<{ path: string; distance: number }>>([]);

// 表名
const tableName = ref('');

const handleUploadChange = (files: UploadFile[]) => {
  if (files.length > 0) {
    const file = files[0];
    if (!file.raw) {
      MessagePlugin.error('文件上传失败');
      return;
    }
  }
};

const handleSearch = async () => {
  if (fileList.value.length === 0) {
    MessagePlugin.warning('请先选择要搜索的图片');
    return;
  }
  if (!tableName.value) {
    MessagePlugin.warning('请输入部门向量数据库表名');
    return;
  }

  const file = fileList.value[0].raw;
  if (!file) {
    MessagePlugin.error('文件获取失败');
    return;
  }

  loading.value = true;
  try {
    const response = await picSearchApi.searchImage(file, topK.value, tableName.value);
    console.log('Search response:', response);

    if (Array.isArray(response)) {
      searchResults.value = response.map(item => ({
        path: item[0],
        distance: item[1]
      }));
    } else {
      MessagePlugin.error('搜索结果格式错误');
    }
  } catch (error) {
    MessagePlugin.error('搜索失败');
    console.error('搜索错误:', error);
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (path: string) => {
  return `http://127.0.0.1:5000/data?image_path=${path}`;
};

const formatSimilarity = (distance: number) => {
  // 将距离转换为相似度百分比（这里使用简单的转换方法，可以根据实际需求调整）
  // 由于距离值可能大于1，我们需要调整计算方法
  const similarity = Math.max(0, Math.min(100, (2 - distance) * 100));
  return similarity.toFixed(2) + '%';
};


</script>
  
<style lang="less" scoped>
.pic-page {
  padding: 20px;

  .search-results {
    margin-top: 20px;
  }

  .result-card {
    width: 200px;
    margin: 10px;
  }

  .result-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .similarity {
    text-align: center;
    margin: 0;
    font-size: 14px;
    color: var(--td-text-color-secondary);
  }
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
</style> 