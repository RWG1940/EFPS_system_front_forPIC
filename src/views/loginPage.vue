<template>
  <div class="wrap">
    <transition name="l-trans" appear>
      <div class="content">
        <div class="header">
          <span>Seller-pic-sys</span>
        </div>
        <t-tabs v-model="value" theme="card" class="tab">
          <t-tab-panel value="first" label="登录">
            <transition name="c-trans" appear>
              <userLogin />
            </transition>
          </t-tab-panel>
          <t-tab-panel value="second" label="注册">
            <transition name="c-trans" appear>
              <el-scrollbar height="330px">
                <userReg />
              </el-scrollbar>
            </transition>
          </t-tab-panel>
          <t-tab-panel value="third" label="找回">
            <transition name="c-trans" appear>
              <el-scrollbar height="330px">
                <foundMe />
              </el-scrollbar>
            </transition>
          </t-tab-panel>
        </t-tabs>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import userLogin from '@/components/loginPage/userLogin.vue'
import userReg from '@/components/loginPage/userReg.vue'
import foundMe from '@/components/loginPage/foundMe.vue'


const value = ref('first');
</script>
<style scoped>
.wrap {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: right;
  background-image: url('../assets/img/loginPage/login-background.webp');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
}

.content {
  box-shadow: 1px 1px 5px rgb(151, 151, 151);
  border-radius: 5px;
  margin: 100px;
}

.header {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: aliceblue;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.header span {
  color: blue;
  font-size: xx-large;
  font-weight: bolder;
  text-shadow: 1px 1px 1px lightblue;
}

.tab {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: rgba(255, 255, 255, 0.737);
  backdrop-filter: blur(25px);
  height: 400px;
}


.l-trans-enter-from,
.l-trans-leave-to {
  transform: translateX(-100px) scale(0.1) rotateY(-20deg) rotateX(20deg);
  opacity: 0;
}

.l-trans-enter-active,
.l-trans-leave-active {
  transition: all 0.8s ease;
}

.c-trans-enter-from,
.c-trans-leave-to {
  transform:  scale(0.5) rotateY(-20deg) rotateX(20deg) translateY(300px);
  opacity: 0;
}

.c-trans-enter-active,
.c-trans-leave-active {
  transition: all 0.8s ease;
}
</style>