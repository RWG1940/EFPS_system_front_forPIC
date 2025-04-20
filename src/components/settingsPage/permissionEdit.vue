<template>
    <userEdit :visible="visible" header="修改权限" @update:visible="handleEditVisibleChange">
        <template #main>
            <el-scrollbar height="520px" style="margin-bottom: 10px;">
                <t-form ref="form" :data="store.permissionEditFormData" :rules="store.PERMISSION_EDIT_FORM_RULES" :label-width="0"
                    @submit="handleEditFormSubmit" @reset="cancelButton">

                    <t-form-item name="mId">
                        <t-input-adornment prepend="权限ID">
                            <t-input v-model="store.permissionEditFormData.mId" clearable disabled />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="mName">
                        <t-input-adornment prepend="权限名">
                            <t-input v-model="store.permissionEditFormData.mName" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="mUrl">
                        <t-input-adornment prepend="地址值">
                            <t-input v-model="store.permissionEditFormData.mUrl" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="mSign">
                        <t-input-adornment prepend="权限标志">
                            <t-input v-model="store.permissionEditFormData.mSign" clearable />
                        </t-input-adornment>
                    </t-form-item>
                   
                </t-form>
            </el-scrollbar>
        </template>
        <template #footer>
            <t-button theme="primary" @click="submitBtn" block>提交</t-button>
            <t-button theme="default" @click="resetBtn" block style="margin-left: 10px;">取消</t-button>
        </template>
    </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue';
import { usePermissionStore } from '@/stores/permissions-store';
import { ref } from 'vue';
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const form = ref<FormInstanceFunctions>();
const store = usePermissionStore();
const props = defineProps<{
    visible: boolean;
}>();
//  通知父组件(table) 事件
const emit = defineEmits(['update:visible', 'permissionEdited']);

// visible更新后通知父组件 通知面板原本就能控制visible值
const handleEditVisibleChange = () => {
    emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
    emit('update:visible')
}
// 提交用户数据
const handleEditFormSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updatePermissions(store.permissionEditFormData).then(() => {
            emit('permissionEdited')
            form.value?.reset();
        })
    } else {
        console.log('Validate Errors: ', firstError, validateResult);
        if (firstError) {
            MessagePlugin.warning(firstError);
        } else {
            MessagePlugin.warning('验证失败');
        }
    }
};

const submitBtn = () => {
    form.value?.submit();
}
const resetBtn = () => {
    form.value?.reset();
}

</script>
<style scoped></style>