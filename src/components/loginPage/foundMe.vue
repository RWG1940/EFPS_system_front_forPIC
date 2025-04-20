<template>
    <div class="foundMe">

        <t-form ref="form" :data="foundMeFormRef" :rules="FOUND_FORM_RULES" :label-width="0" @submit="foundSubmit">
            <t-form-item name="eUsername">
                <t-input v-model="foundMeFormRef.eUsername" clearable placeholder="账号">
                    <template #prefix-icon>
                        <user-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="eName">
                <t-input v-model="foundMeFormRef.eName" clearable placeholder="姓名">
                    <template #prefix-icon>
                        <user-circle-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="eId">
                <t-input v-model="foundMeFormRef.eId" clearable placeholder="身份证号">
                    <template #prefix-icon>
                        <verify-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="ePhone">
                <t-input v-model="foundMeFormRef.ePhone" clearable placeholder="手机号">
                    <template #prefix-icon>
                        <call-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="验证码">
                <t-input placeholder="请输入验证码" v-model="store.sidentifyMode" @click="identifyCodeVisible = true" width="30"
                    clearable></t-input>

            </t-form-item>
            <div @click="store.refreshCode" v-if="identifyCodeVisible">
                <t-row>
                    <t-col :span="4">
                        验证码：
                    </t-col>
                    <t-col :span="8">
                        <SIdentify :identifyCode="store.identifyCode"></SIdentify>
                    </t-col>
                </t-row>
            </div>


            <t-form-item>
                <t-button theme="primary" type="submit" block>找回</t-button>
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup lang="ts">
import { usefoundMeStore, foundMeFormRef } from '@/stores/foundMe-store'
import { useUserStore } from '@/stores/user-store';
import { onMounted, ref } from 'vue';
import SIdentify from '@/components/loginPage/Sidentify.vue'
import { FOUND_FORM_RULES } from '@/types/foundMeTypes'
import { MessagePlugin } from 'tdesign-vue-next';
import type { FormProps } from 'tdesign-vue-next';
import { foundMeApi } from '@/api/services/foundMe-api';

const store = useUserStore()
const foundMeStore = usefoundMeStore();
const identifyCodeVisible = ref(false)

onMounted(() => {
    store.identifyCode = ''
    store.makeCode(store.identifyCodes, 4)
});

const foundSubmit: FormProps['onSubmit'] = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        console.log(foundMeFormRef.value)
        await foundMeApi.update(foundMeFormRef.value).then(() => {
            identifyCodeVisible.value = false
            MessagePlugin.success('找回成功，您的密码重置为：1234')
        })
    } else {
        console.log('Validate Errors: ', firstError, validateResult);
        if (firstError) {
            MessagePlugin.warning(firstError);
        } else {
            MessagePlugin.warning('验证失败');
        }
    }
}


</script>
<style scoped>
.foundMe {
    padding: 40px;
    width: 200px;
    height: 220px;
}
</style>