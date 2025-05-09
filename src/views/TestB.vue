<template>
  <div class="login">
    <div class="form">
      <h2 class="title">欢迎来到用户系统</h2>
      <form @submit.prevent="handLogin">
        <div class="group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model.trim="username" placeholder="请输入用户名" />
        </div>
        <div class="group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model.trim="password" placeholder="请输入密码" />
        </div>
        <div class="group">
          <button type="submit" class="button">登录</button>
        </div>
        <div class="group">
          <p>
            没有账号？
            <a href="#" @click.prevent="goZhuce">立即注册</a>
          </p>
        </div>
        <div class="group">
          <p>
            试试语音登录？
            <a href="#" @click.prevent="YUYIN">语音登录</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handLogin = async () => {
      if (username.value === '' || password.value === '') {
        alert('用户名和密码不能为空');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8084/api/login', {
          username: username.value,
          password: password.value
        });

        if (response.data.success) {
          alert('登录成功！');
          // 登录成功后可以跳转到其他页面
          router.push('/dashboard');
        } else {
          alert('用户账号或密码错误，请重新输入');
        }
      } catch (error) {
        console.error('登录失败:', error);
        alert('登录失败，请稍后再试');
      }
    };

    const goZhuce = () => {
      router.push('/TestA');
    };
    const YUYIN = () => {
      router.push('/TestC');
    };

    return {
      username,
      password,
      handLogin,
      goZhuce,
      YUYIN,
    };
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background-color: #f5f5f5;
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
}

.login-button:hover {
  background-color: #45a049;
}
</style>