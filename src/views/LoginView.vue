<template>
  <div class="login-form">
    <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="rules"
    label-width="80px"
  >
    <el-form-item label="账号" prop="login_name">
      <el-input v-model="loginForm.login_name" autocomplete="off" />
    </el-form-item>

    <el-form-item label="密码" prop="pwd">
      <el-input v-model="loginForm.pwd" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
  
</template>

  
<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import qs from 'qs'
import { useStore } from 'vuex'
// 表单引用
const loginFormRef = ref(null)
const router = useRouter()
const store=useStore()
// 表单数据
const loginForm = reactive({
  login_name: '',
  pwd: ''
})

// 校验规则
const rules = {
  login_name: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 提交方法
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      axios.post('/csxyb_server_war/UserLoginServlet',
      qs.stringify(loginForm), // 把对象序列化为表单格式
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
  })
      .then(res=>{
        if(res.data.status==200){
          alert('登录成功！')
          console.log(res.data.loginUser)
          localStorage.setItem('userData', res.data.loginUser)
          store.commit('userData/setData',res.data.loginUser)
          router.push('/index')
        }
        else{
          alert('用户名或密码错误！')
        }
      })
      .catch(err=>{
        console.log('错误原因：',err)
      })
      console.log('登录成功', loginForm)
    } else {
      console.log('登录失败')
    }
  })
}

// 重置方法
const resetForm = () => {
  loginFormRef.value.resetFields()
}
</script>

  
  <style scoped>
  .login-form {
    background-color: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    width: 30vw;
  }
  </style>
  