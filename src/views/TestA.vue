<template>
  <div class="login">
    <div class="form">
      <h2 class="title">注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model.trim="username"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <div class="group" style="text-align: center;">
          <button type="submit" class="button">立即注册</button>
        </div>
        <div class="group">
          <a href="#" @click.prevent="jump">其他注册</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 定义响应式数据
const username = ref('');
const password = ref('');
const router = useRouter();

// 定义注册处理方法
const handleRegister = async () => {
  // 用户名验证：只能包含中文、字母、数字，长度2-20位
  const usernamePattern = /^[\u4e00-\u9fa5a-zA-Z0-9]{2,20}$/;
  // 密码验证：必须为8-20位，支持字母和数字
  const passwordPattern = /^[a-zA-Z0-9]{8,20}$/;

  // 验证用户名
  if (!usernamePattern.test(username.value)) {
    alert('注册失败：用户名只能包含中文、字母或数字，且长度为2-20位');
    return;
  }

  // 验证密码
  if (!passwordPattern.test(password.value)) {
    alert('注册失败：密码必须为8-20位，支持字母和数字');
    return;
  }

  try {
    // 发起注册请求
    const response = await axios.post('http:/localhost:8081/test/login', {
      username: username.value,
      password: password.value,
    });

    // 根据后端返回的结果处理
    if (response.data.success) {
      alert('注册成功！');
      router.push('/login'); // 注册成功后跳转到登录页面
    } else {
      alert(`注册失败：${response.data.message}`);
    }
  } catch (error) {
    console.error('注册失败', error);
    alert('注册失败，请稍后再试');
  }
};

// 跳转到其他页面
const jump = () => {
  router.push('/TestC');
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: #f5f5f5;
  background-size: cover; /* 确保图片覆盖整个区域 */
  background-position: center;
}

.form {
  background: white;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 400px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  width: 80%;
  padding: 10px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #0095e6;
}
</style>