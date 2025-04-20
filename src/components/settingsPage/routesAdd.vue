<template>
    <userEdit :visible="visible" header="添加路由" @update:visible="handleAddVisibleChange">
        <template #main>
            <el-scrollbar height="520px" style="margin-bottom: 10px;">
                <t-form ref="form" :data="store.routeAddFormData" :rules="store.ROUTE_ADD_FORM_RULES" :label-width="0"
                    @submit="handleAddFormSubmit" @reset="cancelButton">

                    <t-form-item name="parentRouteId">
                        <t-input-adornment prepend="父路由">
                            <t-input v-model="store.routeAddFormData.parentrouteid" clearable placeholder="父路由的id" />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="alias">
                        <t-input-adornment prepend="别名">
                            <t-input v-model="store.routeAddFormData.alias" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="name">
                        <t-input-adornment prepend="路由组件">
                            <t-input v-model="store.routeAddFormData.name" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="value">
                        <t-input-adornment prepend="路由地址">
                            <t-input v-model="store.routeAddFormData.value" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="type">
                        <t-input-adornment prepend="路由类型">
                            <t-select v-model="store.routeAddFormData.type" clearable>
                                <template v-for="(item, index) in store.ROUTE_TYPE_OPTIONS" :key="index">
                                    <t-option :value="item.value" :label="item.label" />
                                </template>
                            </t-select>
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="icon">
                        <t-input-adornment prepend="图标">
                            <t-input v-model="store.routeAddFormData.icon" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="discription">
                        <t-input-adornment prepend="描述">
                            <t-input v-model="store.routeAddFormData.discription" clearable />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="sort">
                        <t-input-adornment prepend="排序">
                            <t-input v-model="store.routeAddFormData.sort" clearable placeholder="数字越小越靠前" />
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="state">
                        <t-input-adornment prepend="状态">
                            <t-select v-model="store.routeAddFormData.state" clearable>
                                <template v-for="(item, index) in store.ROUTE_STATE_OPTIONS" :key="index">
                                    <t-option :value="item.value" :label="item.label" />
                                </template>
                            </t-select>
                        </t-input-adornment>
                    </t-form-item>
                    <t-form-item name="redirect">
                        <t-input-adornment prepend="重定向">
                            <t-input v-model="store.routeAddFormData.redirect" clearable />
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
const emit = defineEmits(['update:visible', 'routeAdded']);

// visible更新后通知父组件 通知面板原本就能控制visible值
const handleAddVisibleChange = () => {
    emit('update:visible');
};
const cancelButton: FormProps['onReset'] = () => {
    emit('update:visible')
}
// 提交用户数据
const handleAddFormSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        await store.addRoutes(store.routeAddFormData).then(() => {
            emit('routeAdded')
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