<template>
    <userEdit :visible="visible" header="编辑路由" @update:visible="handleEditVisibleChange">
        <template #main>
            <el-scrollbar height="520px" style="margin-bottom: 10px;">
                <t-form ref="form" :data="store.routeEditFormData" :rules="store.ROUTE_EDIT_FORM_RULES" :label-width="0"
                    @submit="handleEditFormSubmit" @reset="cancelButton">
                    <t-form-item name="id">
                        <t-input-adornment prepend="路由id">
                            <t-input v-model="store.routeEditFormData.id" clearable disabled />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="parentRouteId">
                        <t-input-adornment prepend="父路由">
                            <t-input v-model="store.routeEditFormData.parentrouteid" clearable placeholder="父路由的id" />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="alias">
                        <t-input-adornment prepend="别名">
                            <t-input v-model="store.routeEditFormData.alias" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="name">
                        <t-input-adornment prepend="路由组件">
                            <t-input v-model="store.routeEditFormData.name" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="value">
                        <t-input-adornment prepend="路由地址">
                            <t-input v-model="store.routeEditFormData.value" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="type">
                        <t-input-adornment prepend="路由类型">
                            <t-select v-model="store.routeEditFormData.type" clearable>
                                <template v-for="(item, index) in store.ROUTE_TYPE_OPTIONS" :key="index">
                                    <t-option :value="item.value" :label="item.label" />
                                </template>
                            </t-select>
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="icon">
                        <t-input-adornment prepend="图标">
                            <t-input v-model="store.routeEditFormData.icon" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="discription">
                        <t-input-adornment prepend="描述">
                            <t-input v-model="store.routeEditFormData.discription" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="sort">
                        <t-input-adornment prepend="排序">
                            <t-input v-model="store.routeEditFormData.sort" clearable placeholder="数字越小越靠前" />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="state">
                        <t-input-adornment prepend="状态">
                            <t-select v-model="store.routeEditFormData.state" clearable>
                                <template v-for="(item, index) in store.ROUTE_STATE_OPTIONS" :key="index">
                                    <t-option :value="item.value" :label="item.label" />
                                </template>
                            </t-select>
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="redirect">
                        <t-input-adornment prepend="重定向">
                            <t-input v-model="store.routeEditFormData.redirect" clearable />
                        </t-input-adornment>
                    </t-form-item>
                </t-form>
            </el-scrollbar>
        </template>
        <template #footer>
            <t-button theme="default" variant="base" @click="cancelButton">取消</t-button>
            <t-button theme="primary" variant="base" @click="submitBtn">提交</t-button>
        </template>
    </userEdit>
</template>
<script lang="ts" setup>
import userEdit from '../userManage/userEdit.vue';
import { useRouteStore } from '@/stores/routes-store';
import { ref } from 'vue';
import type { FormInstanceFunctions, FormProps } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';

const form = ref<FormInstanceFunctions>();
const store = useRouteStore();
const props = defineProps<{
    visible: boolean;
}>();
//  通知父组件(table) 事件
const emit = defineEmits(['update:visible', 'routeEdited']);

// visible更新后通知父组件 通知面板原本就能控制visible值
const handleEditVisibleChange = () => {
    emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
    form.value?.reset();
    emit('update:visible')
}
const submitBtn: FormProps['onSubmit'] = () => {
    form.value?.submit();
};
// 提交用户数据
const handleEditFormSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.updateRoutes(store.routeEditFormData).then(() => {
            emit('routeEdited')
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
<style scoped></style>