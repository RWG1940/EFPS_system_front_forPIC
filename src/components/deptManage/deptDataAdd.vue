<template>
  <!-- 新增部门信息 -->
  <userEdit :visible="visible" header="添加部门" @update:visible="handleAddVisibleChange">
    <template #main>
      <div style="display: flex;">
        <p style="margin-right: 10px;">部门图片</p>
        <t-upload ref="uploadRef1" v-model="store.file1" :image-viewer-props="store.imageViewerProps"
          :size-limit="store.sizeLimit" :action=store.avatarUrl theme="image" tips="上传头像大小不超过500KB" accept="image/*"
          :disabled="store.disabled" :auto-upload="store.autoUpload" :show-image-file-name="store.showImageFileName"
          :upload-all-files-in-one-request="store.uploadAllFilesInOneRequest" :locale="{
            triggerUploadText: {
              image: '请选择图片',
            },
          }" @fail="store.handleFail">
        </t-upload>
      </div>
      <t-form ref="form" :data="store.deptAddFormData" :rules="store.DEPT_FORM_RULES" :label-width="0" @submit="submitButton"
        style="margin-top: 10px;">
        <t-form-item name="dName">
          <t-input-adornment prepend="部门名">
            <t-input v-model="store.deptAddFormData.dName" showClearIconOnEmpty placeholder="请输入内容" />
          </t-input-adornment>
        </t-form-item>
      </t-form>
    </template>
    <template #footer>
      
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="addButton">提交</t-button>
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { useDeptStore } from "@/stores/dept-store";
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

const store = useDeptStore()
const form = ref<FormInstanceFunctions>();
const props = defineProps<{
  visible: boolean;
}>();
//  通知父组件(table) 事件
const emit = defineEmits(['update:visible', 'deptAdded']);

// visible更新后通知父组件 通知面板原本就能控制visible值
const handleAddVisibleChange = () => {
  emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
  form.value?.reset();
  store.avatarPath = null
  store.file1 = store.Nullfile1;
  emit('update:visible')
}

const addButton = async () => {
  form.value?.submit();
}

const submitButton: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    await store.handleAddDept().then(() => {
      form.value?.reset();
      emit('update:visible')
    })
  } else {
    if (firstError) {
      MessagePlugin.warning(firstError);
    } else {
      MessagePlugin.warning('验证失败');
    }
  }
};



</script>
<style scoped></style>