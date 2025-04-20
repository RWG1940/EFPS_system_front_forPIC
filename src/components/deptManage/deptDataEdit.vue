<template>
  <!-- 修改部门信息 -->
  <userEdit :visible="visible" header="部门资料修改" @update:visible="handleEditVisibleChange">
    <template #main>
      <div style="display: flex;">
        <p style="margin-right: 10px;">部门图片</p>
        <t-upload ref="store.uploadRef" v-model="store.file1" :image-viewer-props="store.imageViewerProps"
          :size-limit="store.sizeLimit" :action="store.avatarUrl" theme="image" tips="上传头像大小不超过5500KB" accept="image/*"
          :disabled="store.disabled" :auto-upload="store.autoUpload" :show-image-file-name="store.showImageFileName"
          :upload-all-files-in-one-request="store.uploadAllFilesInOneRequest" :locale="{
            triggerUploadText: {
              image: '请选择图片',
            },
          }" @success="store.handleSuccess" @fail="store.handleFail">
        </t-upload>
      </div>
      <t-form ref="form" :data="store.deptEditFormData" :rules="store.DEPT_FORM_RULES" :label-width="0"
        @submit="submitButton">
        <t-form-item label="部门名称" name="dName">
          <t-input v-model="store.deptEditFormData.dName" placeholder="请输入部门名称" />
        </t-form-item>
      </t-form>
    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton">取消</t-button>
      <t-button @click="addButton">保存</t-button>    
    </template>
  </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '@/components/userManage/userEdit.vue'
import { useDeptStore } from "@/stores/dept-store";
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { updateDept } from '@/api/services/dept-api';

const store = useDeptStore()
const form = ref<FormInstanceFunctions>();
const props = defineProps<{
  visible: boolean;
}>();
//  通知父组件(table) 事件
const emit = defineEmits(['update:visible', 'deptAdded']);

// visible更新后通知父组件 通知面板原本就能控制visible值
const handleEditVisibleChange = () => {
  emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
  store.avatarPath = null
  store.file1 = store.Nullfile1;
  form.value?.reset();
  store.handlePageChange()
  emit('update:visible')
}

const addButton = async () => {
  form.value?.submit();
}

const submitButton: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
  if (validateResult === true) {
    await handleEditDept().then(() => {
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

const handleEditDept = async () => {
  store.deptEditFormData.dAvatarpath = store.avatarPath
  await updateDept(store.deptEditFormData).then(() => {
    store.file1 = store.Nullfile1;
    store.avatarPath = null
    MessagePlugin.success('修改部门成功');
    store.handlePageChange();
  })
}

</script>
<style scoped></style>

