<template>
  <!-- 修改用户信息 -->
  <userEdit :visible="visible" header="用户资料修改" @update:visible="handleEditVisibleChange">
    <template #main>
      <el-scrollbar height="520px" style="margin-bottom: 10px;padding: 15px;">
        <div style="display: flex;margin-left:50px;">
          <p style="margin-right: 10px;">头像：</p>
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
        <t-form ref="form" :data="store.userDataFormData" :rules="store.USERDATA_FORM_RULES" :label-width="100"
          @submit="saveButton">

          <t-form-item name="emp.eUsername" label="账号：">
            <t-input v-model="store.userDataFormData.emp.eUsername" disabled clearable />
          </t-form-item>

          <t-form-item name="emp.ePassword" label="密码：">
              <t-input v-model="confirmPwd" type="password" placeholder="请输入后确认" clearable />
              <t-button style="margin-left: 5px;" :theme="confirmPwd.length > 2 ? 'primary':'info'" size="medium" @click="store.userDataFormData.emp.ePassword = confirmPwd">确认</t-button>
          </t-form-item>


          <t-form-item name="emp.eName" label="姓名：">
              <t-input v-model="store.userDataFormData.emp.eName" clearable />
          </t-form-item>

          <t-form-item name="emp.eId" label="身份证号：">
              <t-input v-model="store.userDataFormData.emp.eId" clearable />
          </t-form-item>

          <t-form-item name="emp.ePhone" label="手机号：">
              <t-input v-model="store.userDataFormData.emp.ePhone" clearable />
          </t-form-item>

          <t-form-item name="role.rId" label="角色：">
              <t-select v-model="store.userDataFormData.role.rId" clearable>
                <t-option :value="item.rId" :label="item.rInfo" v-for="(item, index) in roleStore.roleList"
                  :key="index"></t-option>
              </t-select>
          </t-form-item>

          <t-form-item name="emp.eDeptid" label="部门：">
              <t-select v-model="store.userDataFormData.emp.eDeptid" clearable>
                <t-option :value="item.id" :label="item.dName" v-for="(item, index) in deptStore.tableData"
                  :key="index"></t-option>
              </t-select>
          </t-form-item>

          <t-form-item name="emp.eIsenabled" label="是否启用：">
              <t-select v-model="store.userDataFormData.emp.eIsenabled" clearable>
                <t-option :value="item.value" :label="item.label" v-for="(item, index) in store.options4"
                  :key="index"></t-option>
              </t-select>
          </t-form-item>

          <t-form-item name="emp.eAge" label="年龄：" >
              <t-input v-model="store.userDataFormData.emp.eAge" clearable />
          </t-form-item>

          <t-form-item name="emp.eGender" label="性别：" >
              <t-select v-model="store.userDataFormData.emp.eGender" clearable>
                <t-option :value="item.value" :label="item.label" v-for="(item, index) in store.options2"
                  :key="index"></t-option>
              </t-select>
          </t-form-item>
        </t-form>
      </el-scrollbar>
    </template>
    <template #footer>
      <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
      <t-button theme="primary" @click="submitButton" block>提交</t-button>
    </template>
  </userEdit>
</template>

<script lang="ts" setup>
import userEdit from './userEdit.vue'
import { useUserStore } from "@/stores/user-store";
import { useDeptStore } from "@/stores/dept-store";
import { useRoleStore } from "@/stores/role-store";
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { updateUser } from '@/api/services/user-api';


const store = useUserStore()
const deptStore = useDeptStore()
const roleStore = useRoleStore()
const confirmPwd = ref('')
const form = ref<FormInstanceFunctions>();
const props = defineProps<{
  visible: boolean;
}>();
const emit = defineEmits(['update:visible']);

const handleEditVisibleChange = () => {
  emit('update:visible');
}
const submitButton = async () => {
  if (confirmPwd.value == '') {
    store.userDataFormData.emp.ePassword = 'N';
  }
  form.value?.submit();
}

const cancelButton: FormProps['onReset'] = () => {
  store.avatarPath = null
  store.file1 = store.Nullfile1;
  form.value?.reset();
  store.handlePageChange()
  emit('update:visible')
}

const saveButton: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
  
  if (validateResult === true) {
    await handleUpdateUser().then(() => {
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

const handleUpdateUser = async () => {
  store.userDataFormData.emp.eAvatarpath = store.avatarPath

  await updateUser(store.userDataFormData).then(() => {
    MessagePlugin.success('用户修改成功');
    store.file1 = store.Nullfile1;
    store.avatarPath = null
    store.handlePageChange();
  })
};
</script>

<style scoped></style>
