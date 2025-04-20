<template>
  <div class="pic-set-page">
    <t-card title="图源管理"> <!-- 上传区域 -->
      <t-space direction="vertical" size="large" style="width: 100%">
        a.部门图源配置
        <t-form ref="form" :data="formData" :rules="rules" @submit="onSubmit">
          <t-form-item label="部门表名" name="tableName">
            <t-input v-model="formData.tableName" placeholder="请输入部门表名" style="width: 500px" />
          </t-form-item>
          <t-form-item label="上传路径" name="imagePath">
            <t-input v-model="formData.imagePath" placeholder="请输入上传/加载路径，例如: tmp/department-images"
              style="width: 500px" />
          </t-form-item>
          <t-form-item>
            <t-space>
              <t-upload v-model="formData.files" :action="null" :auto-upload="false" :multiple="true" accept="image/*"
                @change="handleUploadChange" theme="file" :size-limit="{ size: 5, unit: 'MB' }">
                <t-button>选择图片</t-button>
              </t-upload>
              <t-button theme="primary" type="submit" :loading="uploading">上传到图库</t-button>
              <t-button @click="handleLoadSource" :loading="grouploading">加载图源</t-button>
              <t-button theme="danger" @click="handleDropTable" :loading="dropping">清除部门图源配置</t-button>

            </t-space>
          
          </t-form-item>
        </t-form>

        b.部门图源查询
        <!-- 表格筛选区 -->
        <t-space align="center">
          <t-input v-model="searchTableName" placeholder="请输入要查询的部门表名" style="width: 300px" />
          <t-button @click="handleSearch">查询图源</t-button>
      
        </t-space>

        <!-- 图片配置展示区 -->
        <t-loading :loading="loading">
          <div v-if="imageList.length > 0" class="image-grid">
            <div v-for="(item, index) in imageList" :key="index" class="image-item" @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = -1">
              <img :src="getImageUrl(item.image_path)" :alt="'图片' + (index + 1)" class="preview-image"
                @error="handleImageError" />
              <div v-if="hoveredIndex === index" class="image-overlay">
                <p class="image-info">ID: {{ item.milvus_id }}</p>
                <t-button theme="danger" variant="text" @click="handleDelete(item)" :loading="item.deleting">
                  删除
                </t-button>
              </div>
            </div>
          </div>
          <t-empty v-else description="暂无图片数据" />
        </t-loading>

        <!-- 分页 -->
        <t-pagination v-if="total > 0" v-model="current" v-model:page-size="pageSize" :total="total"
          :page-size-options="[10, 20, 50]" show-total show-jumper @change="onPageChange" />
          
    
      </t-space>
      
    </t-card>
  </div>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { picSearchApi } from '@/api/picSearch';
import type { UploadFile } from 'tdesign-vue-next';

interface FormData {
  tableName: string;
  imagePath: string;
  files: UploadFile[];
}

const formData = reactive<FormData>({
  tableName: '',
  imagePath: '',
  files: []
});

const rules = {
  tableName: [{ required: true, message: '请输入部门表名', type: 'error' }],
  imagePath: [{ required: true, message: '请输入图源路径', type: 'error' }]
};

const uploading = ref(false);
const loading = ref(false);
const grouploading = ref(false)
const hoveredIndex = ref(-1);
const searchTableName = ref('');
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const imageList = ref<any[]>([]);
const dropping = ref(false)
const flieLoading = ref(false)
const imageFileList = ref<any[]>([]);
// 处理文件上传
const handleUploadChange = (files: UploadFile[]) => {
  const invalidFiles = files.filter(file => {
    if (!file.raw) return true;
    if (file.raw.size > 5 * 1024 * 1024) {
      MessagePlugin.warning(`文件 ${file.name} 大小超过5MB`);
      return true;
    }
    return false;
  });

  if (invalidFiles.length > 0) {
    formData.files = formData.files.filter(f => !invalidFiles.includes(f));
  }
};

// 提交表单
const onSubmit = async ({ validateResult, firstError }: { validateResult: boolean, firstError: string }) => {
  if (validateResult === true) {
    if (formData.files.length === 0) {
      MessagePlugin.warning('请选择要上传的图片');
      return;
    }

    uploading.value = true;
    try {
      for (const file of formData.files) {
        if (!file.raw) continue;
        await picSearchApi.uploadImage(
          file.raw,
          null,
          formData.tableName.trim(),
          formData.imagePath.trim()
        );
      }
      MessagePlugin.success('上传成功');
      formData.files = [];
      // 刷新当前表的数据
      if (searchTableName.value === formData.tableName) {
        fetchImageList();
      }
    } catch (error) {
      MessagePlugin.error('上传失败');
      console.error('上传错误:', error);
    } finally {
      uploading.value = false;
    }
  } else {
    MessagePlugin.warning(firstError);
  }
};

// 获取图片列表
const fetchImageList = async () => {
  if (!searchTableName.value) {
    MessagePlugin.warning('请输入要查询的表名');
    return;
  }

  loading.value = true;
  try {
    const response = await picSearchApi.getAllData(searchTableName.value, current.value, pageSize.value);
    imageList.value = response.data;
    total.value = response.total;
  } catch (error) {
    MessagePlugin.error('获取数据失败');
    console.error('查询错误:', error);
  } finally {
    loading.value = false;
  }
};

// 处理查询
const handleSearch = () => {
  current.value = 1;
  fetchImageList();
};

// 处理分页变化
const onPageChange = () => {
  fetchImageList();
};

// 处理图片加载错误
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = '/placeholder.png';
};

// 获取图片URL
const getImageUrl = (path: string) => {
  return `http://127.0.0.1:5000/data?image_path=${encodeURIComponent(path)}`;
};

// 处理删除
const handleDelete = async (item: any) => {
  try {
    item.deleting = true;
    await picSearchApi.deleteById(searchTableName.value, item.milvus_id);
    MessagePlugin.success('删除成功');
    fetchImageList();
  } catch (error) {
    MessagePlugin.error('删除失败');
    console.error('删除错误:', error);
  } finally {
    item.deleting = false;
  }
};

// 处理加载图源
const handleLoadSource = async () => {
  // 确保图源路径和表名已经填写
  if (!formData.imagePath) {
    MessagePlugin.warning('请输入图源路径');
    return;
  }
  if (!formData.tableName) {
    MessagePlugin.warning('请输入部门向量数据库表名');
    return;
  }

  grouploading.value = true;
  try {
    await picSearchApi.loadImageSource(formData.imagePath, formData.tableName);
    MessagePlugin.success('图源加载成功');
    // 此处可以根据需要添加轮询进度的功能
  } catch (error) {
    MessagePlugin.error('加载图源失败');
    console.error('加载图源错误:', error);
  } finally {
    grouploading.value = false;
  }
};

// 处理清除表
const handleDropTable = async () => {
  if (!formData.tableName) {
    MessagePlugin.warning('请输入要清除的部门向量数据库表名');
    return;
  }

  dropping.value = true;
  try {
    await picSearchApi.dropTable(formData.tableName);
    MessagePlugin.success('清除成功');
    formData.tableName = '';
    formData.imagePath = '';
  } catch (error) {
    MessagePlugin.error('清除失败');
    console.error('清除错误:', error);
  } finally {
    dropping.value = false;
  }
};
const handleGallerySearch = async() => {

}
</script>

  
<style lang="less" scoped>
.pic-set-page {
  padding: 20px;

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  .image-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--td-radius-medium);
    overflow: hidden;
    border: 1px solid var(--td-component-border);

    &:hover {
      border-color: var(--td-brand-color);
    }
  }

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .image-info {
      margin: 0;
      font-size: 14px;
    }
  }
}

;
</style> 