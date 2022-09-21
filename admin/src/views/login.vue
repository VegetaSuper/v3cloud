<template>
  <div class="login_container">
    <el-form class="login_form" :model="loginForm" ref="formRef" :rules="loginRules">
      <el-form-item prop="username">
        <el-input v-model.trim="loginForm.username" placeholder="用户名" clearable :prefix-icon="UserFilled"
          @keyup.enter.native="loginSubmit('formRef')" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" type="password" clearable show-password placeholder="密码"
          :prefix-icon="Lock" @keyup.enter.native="loginSubmit('formRef')" />
      </el-form-item>
      <div class="txt_r">
        <el-button @click="registerVisible = true">注册</el-button>
        <el-button type="primary" @click="loginSubmit('formRef')">登录</el-button>
      </div>
    </el-form>

    <el-dialog v-model="registerVisible" title="注册" width="500px" top="30vh" draggable :close-on-click-modal="false"
      @close="registerCancel('registerRef')">
      <el-form :model="registerForm" ref="registerRef" :rules="registerRules">
        <el-form-item prop="username">
          <el-input v-model.trim="registerForm.username" placeholder="用户名" clearable :prefix-icon="UserFilled"
            @keyup.enter.native="registerSubmit('registerRef')" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="registerForm.password" type="password" show-password clearable placeholder="密码"
            :prefix-icon="Lock" @keyup.enter.native="registerSubmit('registerRef')" />
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model.trim="registerForm.mobile" placeholder="手机号码" clearable :prefix-icon="Iphone"
            @keyup.enter.native="registerSubmit('registerRef')" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="registerCancel('registerRef')">取消</el-button>
        <el-button type="primary" @click="registerSubmit('registerRef')">注册</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import router from '@/router'
import { UserFilled, Lock, Iphone } from '@element-plus/icons-vue'
import { login, register } from '@/api/login'
const { ctx } = getCurrentInstance()

// 登录数据
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
// 登录表单规则
const loginRules = reactive({
  username: [
    { required: true, message: '请填写用户名', trigger: 'blur' },
    { max: 16, message: '用户名最长16个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
  ]
})
// 登录提交
const loginSubmit = (refName) => {
  ctx.$refs[refName].validate(async valid => {
    if (valid) {
      const res = await login(loginForm)
      ElMessage.success(res.msg)
      sessionStorage.setItem('token', res.token)
      router.push('/')
    }
  })
}

// 注册弹框状态
const registerVisible = ref(false)
// 注册数据
const registerForm = reactive({
  username: '',
  password: '',
  mobile: ''
})
// 注册表单规则
const registerRules = reactive({
  username: [
    { required: true, message: '请填写用户名', trigger: 'blur' },
    { max: 16, message: '用户名最长16个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
  ]
})

// 取消注册
const registerCancel = (refName) => {
  ctx.$refs[refName].resetFields()
  registerVisible.value = false
}
// 注册提交
const registerSubmit = (refName) => {
  ctx.$refs[refName].validate(async valid => {
    if (valid) {
      const res = await register(registerForm)
      ElMessage.success(res.msg)
      registerCancel(refName)
    }
  })
}


</script>

<style lang="scss" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(#00acee,
      #ff3040,
      #f1ff72,
      #e6a8e2);
  background-size: 200% 200%;
  animation: backgroundChange 4s ease alternate infinite;
}

.login_form {
  padding: 30px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 400px;
  background-color: #fff;
  box-shadow: 0px 0px 13px #ccc;
}

@keyframes backgroundChange {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 100%;
  }
}
</style>