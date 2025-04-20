<template>
    <!-- 添加新公告 -->
    <userEdit :visible="visible" header="添加新公告" @update:visible="handleAddVisibleChange">
        <template #main>
            <t-form ref="form" :data="noticeAddFormData" :rules="noticeADD_FORM_RULES" :label-width="70"
                @submit="addNoticeSubmit">
                <t-form-item label="标题" name="header">
                    <t-input v-model="noticeAddFormData.header" placeholder="请输入标题" />
                </t-form-item>
                <t-form-item label="作者" name="author">
                    <t-input v-model="noticeAddFormData.author" placeholder="请输入作者" />
                </t-form-item>
                <t-form-item label="状态" name="status">
                    <t-select v-model="noticeAddFormData.status" placeholder="请选择状态">
                        <t-option v-for="item in noticeStatusOptions" :value="item.value" :label="item.label"
                            :key="item.value">
                        </t-option>
                    </t-select>
                </t-form-item>
                <t-form-item label="内容" name="content">
                    <t-textarea v-model="noticeAddFormData.content" placeholder="请输入文案" name="description"
                        :autosize="{ minRows: 1, maxRows: 100 }" />
                </t-form-item>


            </t-form>
        </template>
        <template #footer>
            <t-button theme="primary" type="submit" @click="addButton" block>提交</t-button>
            <t-button theme="default" @click="cancelButton" block style="margin-left: 10px;">取消</t-button>
        </template>
    </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue'
import { ref } from 'vue'
import { useNoticesStore,noticeAddFormData } from '@/stores/notices-store'
import { noticeADD_FORM_RULES,noticeStatusOptions } from '@/types/noticesTypes'
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';


const form = ref<FormInstanceFunctions>();
const store = useNoticesStore()
const props = defineProps<{
    visible: boolean;
}>();

const emit = defineEmits(['update:visible']);

const handleAddVisibleChange = () => {
    emit('update:visible');
};

const cancelButton = () => {
    form.value?.reset();
    handleAddVisibleChange();
};
const addButton = () => {
    form.value?.submit()
    handleAddVisibleChange();
};
const addNoticeSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addData(noticeAddFormData.value).then(() => {
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

</script>
<style lang="scss" scoped></style>