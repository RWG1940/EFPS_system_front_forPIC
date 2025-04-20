<template>
    <div class="login">

        <t-form ref="form" :data="store.loginFormData" :rules="store.LOGIN_FORM_RULES" :label-width="0"
            @submit="store.loginOnSubmit">
            <t-form-item name="account">
                <t-input v-model="store.loginFormData.account" clearable placeholder="账号">
                    <template #prefix-icon>
                        <user-icon />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="password">
                <t-input v-model="store.loginFormData.password" type="password" clearable placeholder="密码">
                    <template #prefix-icon>
                        <lock-on-icon />
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

            <t-checkbox v-model="store.loginFormData.rememberMe">7天内记住密码</t-checkbox>
            <t-form-item>
                <t-button theme="primary" type="submit" block>登录</t-button>
            </t-form-item>
        </t-form>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user-store'
import { onMounted, ref } from 'vue';
import { LockOnIcon } from 'tdesign-icons-vue-next';
import SIdentify from '@/components/loginPage/Sidentify.vue'

const identifyCodeVisible = ref(false)
const store = useUserStore()

// 自动登录处理
onMounted(() => {
    if (localStorage.getItem('token') != null) {
        store.autoLogin()
    }
    store.identifyCode = ''
    store.makeCode(store.identifyCodes, 4)
});





</script>
<style scoped>
.login {
    padding: 40px;
    width: 200px;
    height: 240px;
}
</style>