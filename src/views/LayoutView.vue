<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="myheader">
        <div style="display: flex;justify-content:center;align-items: center;">
          <img :src="require('@/assets/csxyb.png')" alt="logo" style="height: 80px;width:80px;margin-right:10px;">
          长师校园帮后台管理系统
        </div>
        <div>
          管理界面
        </div>
        
          <div class="txname">
          <el-dropdown
            placement="bottom-end"
            @command="handleCommand"
          >
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="changePassword">更改密码</el-dropdown-item>
                <el-dropdown-item command="changeName">更改名字</el-dropdown-item>
                <el-dropdown-item command="changeSignature">修改个性签</el-dropdown-item>
                <el-dropdown-item command="changeAvatar">修改头像</el-dropdown-item>
                <el-dropdown-item command="changeLoginName">更改登录账号名</el-dropdown-item>
                <el-dropdown-item command="changeEmail">修改/注册邮箱</el-dropdown-item>
                <el-dropdown-item command="changePhone">修改/注册手机号</el-dropdown-item>
                <el-dropdown-item command="switchAccount">切换账户</el-dropdown-item>
                <el-dropdown-item command="deleteAccount">注销账号</el-dropdown-item>
                <el-dropdown-item command="/TestC">语音注册</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
            <!-- trigger slot -->
            
                 <el-avatar :size="50" :src="'http://csxybnode.tangwanqing.top:30000'+userData.avatar" />
            </el-dropdown>
                <h5 style="margin-left:10px">{{userData.userName}}</h5>
            </div>
          <el-dialog
            title="更改密码"
            v-model="dialogs.changePassword"
            width="500px"
          >
            <!-- 你的更改密码表单 -->
            <el-form :model="Changeform.password" label-width="100px">
              <el-form-item label="旧密码">
                <el-input v-model="Changeform.password.old" type="password" />
              </el-form-item>
              <el-form-item label="新密码">
                <el-input v-model="Changeform.password.new" type="password" />
              </el-form-item>
              <el-form-item label="重复新密码">
                <el-input v-model="Changeform.password.confirm" type="password" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changePassword')">取消</el-button>
              <el-button type="primary" @click="submitChangePassword">确定</el-button>
            </template>
          </el-dialog>
      
          <!-- 弹窗示例：更改名字 -->
          <el-dialog
            title="更改名字"
            v-model="dialogs.changeName"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="修改个性签"
            v-model="dialogs.changeSignature"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="更改登录账号"
            v-model="dialogs.changeLoginName"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="修改/注册邮箱"
            v-model="dialogs.changeEmail"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="修改/注册手机号"
            v-model="dialogs.changePhone"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="修改头像"
            v-model="dialogs.changeAvatar"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="切换账户"
            v-model="dialogs.switchAccount"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
            title="注销账户"
            v-model="dialogs.deleteAccount"
            width="500px"
          >
            <el-form :model="Changeform.name" label-width="80px">
              <el-form-item label="新名字">
                <el-input v-model="Changeform.name.value" />
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="closeDialog('changeName')">取消</el-button>
              <el-button type="primary" @click="submitChangeName">确定</el-button>
            </template>
          </el-dialog>
          <el-dialog
          title="提示"
          v-model="dialogs.logout"
          width="500px"
        >
          <h1>是否退出登录</h1>
          <template #footer>
            <el-button @click="closeDialog('changeName')">取消</el-button>
            <el-button type="primary" @click="submitChangeName">确定</el-button>
          </template>
        </el-dialog>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu unique-opened active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose" router="true">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Avatar />
                </el-icon>
                <span>用户列表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin">管理员</el-menu-item>
                <el-menu-item index="/userList">普通用户</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Goods />
                </el-icon>
                <span>商品列表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/goodsList/all">全部</el-menu-item>
                <el-menu-item index="/goodsList/shuma">数码</el-menu-item>
                <el-menu-item index="/goodsList/dianqi">电器</el-menu-item>
                <el-menu-item index="/goodsList/book">书籍</el-menu-item>
                <el-menu-item index="/goodsList/live">生活类</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item >水印设置</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main ref="mainRef">
          
       <!-- 这里面就是和尺寸一致的区域了 -->
       <el-watermark :content="[userData.userName,userData.loginText]">
        <div :style="{ width: mainW + 'px', height: mainH + 'px' }">
         
         <router-view/>
         </div>
       </el-watermark>
     
          
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, onMounted, onBeforeUnmount, nextTick,reactive } from 'vue'
import { useStore } from 'vuex'

const store=useStore()
const userData=store.getters['userData/getData']


// 对话框显隐状态
const dialogs = reactive({
  changePassword: false,
  changeName: false,
  changeSignature: false,
  changeAvatar: false,
  changeLoginName: false,
  changeEmail: false,
  changePhone: false,
  switchAccount: false,
  deleteAccount: false,
  logout: false,
  yiyun:false
})

// 表单数据
const Changeform= reactive({
  password: {
    old: '',
    new: '',
    confirm: '',
  },
  userName: {
    value: '',
  },
  userTxImg:{
    value:''
  },
  phoneNumber:{
  
  }
})

// 处理下拉命令，打开对应对话框
function handleCommand(command) {
  if (command in dialogs) {
    dialogs[command] = true
  } else {
    router.push(command)
    console.warn('未知命令：', command)
  }
}

// 关闭对话框
function closeDialog(key) {
  dialogs[key] = false
}

// 提交更改密码
function submitChangePassword() {
  if (form.password.new !== form.password.confirm) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  // TODO: 调用 API 更改密码
  ElMessage.success('密码已更新')
  closeDialog('changePassword')
}

// 提交更改名字
function submitChangeName() {
  if (!form.name.value) {
    ElMessage.error('请输入新名字')
    return
  }
  // TODO: 调用 API 更改名字
  ElMessage.success(`名字已更新为 ${form.name.value}`)
  username.value = form.name.value
  closeDialog('changeName')
}







const mainRef = ref(null)
const mainW = ref(0)
const mainH = ref(0)
let observer = null

onMounted(() => {
  nextTick(() => {
    const el = mainRef.value?.$el || mainRef.value

    observer = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect
            if (mainW.value !== width || mainH.value !== height) {
              mainW.value = width
              mainH.value = height
            }
          }
        }, 0) // 延迟到下一个事件循环，确保布局稳定
      })
    })

    if (el) {
      observer.observe(el)
    }
  })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>


<style>
/* 关键：设置所有父元素高度为 100% */
html,
body,
#app,
.common-layout, .el-container{
  height: 100%;
  margin: 0;
}



/* 添加样式可视化区域 */
.el-header {
  background-color: #0a79e9;
  color: white;
  text-align: center;
  line-height: 60px;
}

.myheader {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.el-aside {
  background-color: #163049;
  color: white;
  text-align: center;
}

.el-main {
  display: flex;
  padding: 0 !important;

}
.shuiyin{
  height: 100%;
  width: 100%;
}
.txname{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>