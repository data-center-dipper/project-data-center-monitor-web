<template>
  <div class="login flex w-full h-screen">
    <div
      class="left-wrap relative w-[50vw] h-full p-[20px] overflow-hidden bg-[#f3f4fb] bg-cover m-auto"
    >
      <div class="left-view">
        <div class="logo relative z-[100] flex items-center">
          <div class="flex items-center gap-1">
            <span>Kafka监控平台</span>
            <img
              class="w-[20px] h-[20px]"
              src="../../assets/logo.svg"
              alt="logo"
            />
          </div>
          <h1 class="title font-[26px] font-bold text-[#333] ml-2">
            高效监控您的Kafka集群
          </h1>
        </div>
        <img
          class="left-bg absolute top-0 left-0 w-full h-full object-cover"
          src="../../assets/img/login/lf_bg.png"
          alt="背景图"
        />
        <div class="left-img relative z-[10] w-[500px] mx-auto mt-[15vh]">
          <Lottie :animation-data="Kafka"></Lottie>
        </div>
        <div class="text-wrap absolute bottom-[20px] w-full text-center">
          <h1 class="">实时监控</h1>
          <p>随时了解Kafka集群状态</p>
        </div>
      </div>
    </div>
    <div class="right-wrap relative flex-1 h-full">
      <div
        class="top-right-wrap fixed top-[30px] right-[30px] z-[100] flex items-center jusify-end"
      >
        <el-dropdown>
          <qx-icon icon="language" size="2x"></qx-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="lang-btn-item">
                <el-dropdown-item command="zh">
                  <span class="menu-txt">简体中文</span>
                </el-dropdown-item>
              </div>
              <div class="lang-btn-item">
                <el-dropdown-item command="en">
                  <span class="menu-txt">English</span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div
        class="login-wrap absolute inset-0 w-[440px] h-[610px] px-1.5 mx-auto my-auto overflow-hidden bg-cover rounded-md"
      >
        <div class="form box-border h-full py-40 w-full">
          <h3 class="title -ml-px text-3xl font-semibold text-gray-500">
            登录
          </h3>
          <p class="sub-title mt-[10px] text-[#666]">
            请输入您的账号和密码以访问监控系统
          </p>
          <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            @keyup.enter="handleSubmit"
            style="margin-top: 25px"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="请输入用户名"
                size="large"
                v-model.trim="formData.username"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                size="large"
                v-model.trim="formData.password"
                type="password"
                radius="8px"
                autocomplete="off"
              />
            </el-form-item>
            <div
              class="forget-password flex items-center justify-between text-[#666]"
            >
              <el-checkbox v-model="formData.rememberPassword"
                >记住密码</el-checkbox
              >
              <router-link to="/forget-password">忘记密码？</router-link>
            </div>

            <div style="margin-top: 30px">
              <el-button
                class="login-btn w-full border-none"
                size="large"
                type="primary"
                @click="handleSubmit"
              >
                登录
              </el-button>
            </div>

            <div class="footer mt-[20px] text-sm text-gray-500">
              <p>
                没有账号？
                <router-link to="/register">立即注册</router-link>
              </p>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import Lottie from '@/components/Lottie/src/index.vue'
import Kafka from '@/assets/lottie/kafka.json'
import QxIcon from '@/components/Icon/src/index.vue'

const router = useRouter()

const formRef = ref<FormInstance>()
const formData = reactive({
  username: '',
  password: '',
  rememberPassword: true,
})

const rules = computed<FormRules>(() => ({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}))

const onPass = () => {}

const handleSubmit = async () => {
  if (!formRef.value) return

  await router.push('/dashboard')
  showLoginSuccessNotice()
}

const showLoginSuccessNotice = () => {
  setTimeout(() => {
    ElNotification({
      title: '登录成功',
      type: 'success',
      showClose: false,
      duration: 2500,
      zIndex: 10000,
      message: ``,
    })
  }, 300)
}
</script>

<style scoped>
@media only screen and (max-width: 1200px) {
  .login .left-wrap .left-img {
    width: 480px;
    margin-top: 10vh;
  }

  .login .left-wrap .text-wrap {
    bottom: 40px;
  }
}

@media only screen and (max-width: 1024px) {
  .login {
    width: 100%;
    height: 100vh;
  }

  .login .left-wrap {
    display: none;
  }

  .login .right-wrap {
    margin: auto;
  }

  .login .right-wrap .login-wrap {
    position: relative;
    width: 440px;
    height: auto;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .login .right-wrap .login-wrap .form {
    margin-top: 10vh;
  }
}

@media only screen and (max-width: 768px) {
  .login {
    position: fixed;
    top: 0;
  }

  .login .right-wrap {
    box-sizing: border-box;
    width: 100% !important;
    padding: 0 30px;
    margin: auto;
  }

  .login .right-wrap .login-wrap {
    width: 100%;
  }

  .login .right-wrap .login-wrap .form {
    margin-top: 12vh;
  }

  .login .right-wrap .login-wrap .form .input-wrap .input-label {
    display: none;
  }

  .login .right-wrap .login-wrap .form .input-wrap,
  .login .right-wrap .login-wrap .form .drag-verify {
    margin-top: 20px;
  }
}
</style>
