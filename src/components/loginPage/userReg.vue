<template>
    <div class="reg">
    <t-form ref="form" :data="store.regFormData" :rules="store.REG_FORM_RULES" :label-width="0" @submit="store.regOnSubmit">
            <t-form-item name="account">
                <t-input v-model="store.regFormData.account" clearable placeholder="账号">
                    <template #prefix-icon>
                        <user-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item name="password">
                <t-input v-model="store.regFormData.password" type="password" clearable placeholder="密码">
                    <template #prefix-icon>
                        <lock-on-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item name="eid">
                <t-input v-model="store.regFormData.eid" clearable placeholder="身份证号">
                    <template #prefix-icon>
                        <verify-icon />
                    </template>
                </t-input>
            </t-form-item>
            <t-form-item name="phone">
                <t-input v-model="store.regFormData.phone" clearable placeholder="手机号">
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
                <t-button theme="primary" type="submit" block>注册</t-button>
            </t-form-item>
        </t-form>
</div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store'
import SIdentify from '@/components/loginPage/Sidentify.vue'
import { ref} from 'vue'

const identifyCodeVisible = ref(false)
const store = useUserStore()

</script>
<style scoped>
.reg {
    padding: 40px;
    width: 200px;
    height: 200px;
    margin-bottom: 30px;
}   
</style>
