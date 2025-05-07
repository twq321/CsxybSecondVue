<template>
  <div class="about">
    <h1 style="padding: 0;margin:0">普通用户管理界面</h1> 
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="ID" prop="userId" />
      <el-table-column label="头像">
        <template #default="scope">
          <img
            :src="'http://csxybnode.tangwanqing.top:30000'+scope.row.avatar"
            alt="头像"
            style="width: 40px; height: 40px; border-radius: 50%;"
          />
        </template>
        </el-table-column>
      <el-table-column label="用户名" prop="userName" />
      <el-table-column label="登录账号" prop="loginText" />
      <el-table-column align="right">
        <template #header>
          <el-input
              v-model="search"
              style="min-width: 270px"
              placeholder="请输入关键词..."
              class="input-with-select"
                    >
                <template #prepend>
                  <el-select v-model="select" placeholder="筛选" style="width: 90px">
                    <el-option label="用户ID" value="userId" />
                    <el-option label="用户名" value="userName" />
                  </el-select>
                </template>
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
        </template>
        <template #default="scope">
          <el-tooltip :content="'用户状态:' + (scope.row.status==1?'良好':'封禁中')" placement="top">
            <el-switch
              v-model="scope.row.status"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
            />
          </el-tooltip>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            详细信息
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    v-model:current-page="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[5, 10, 15, 20,25]"
    :size="size"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-dialog
    v-model="dialogVisible"
    title="用户信息"
    width="800px"
    :before-close="handleClose"
    align-center
  >
    <el-form :model="userData" label-width="100px">
      <el-form-item label="头像" class="avatar-item">
        <el-avatar :src="'http://csxybnode.tangwanqing.top:30000'+userData.userAvatar" size="large" />
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="userData.userId" disabled />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="userData.userName" :disabled="!isEditing" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="userData.email" :disabled="!isEditing" />
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="userData.phoneNumber" :disabled="!isEditing" />
      </el-form-item>

      <el-form-item label="登录账号">
        <el-input v-model="userData.geXin" :disabled="!isEditing" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userData.password" :disabled="!isEditing" />
      </el-form-item>
      <el-form-item label="权限">
        <el-select v-model="userData.type" :disabled="!isEditing" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in optionsType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="userData.status" :disabled="!isEditing" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in optionsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input v-model="userData.geXin" :disabled="!isEditing" />
      </el-form-item>
      <el-form-item label="粉丝">
        <el-input v-model="userData.Fans" disabled />
      </el-form-item>
      <el-form-item label="关注">
        <el-input v-model="userData.Guanzhu" disabled />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button v-if="!isEditing" @click="isEditing = true" style="background-color: hwb(6 11% 18%);color:#fff">编辑</el-button>
      <el-button v-else type="primary" @click="handleSave">提交</el-button>
    </template>
  </el-dialog>
  </div> 
</template>
<script setup>
import { computed, ref, reactive,onMounted} from 'vue'
import axios from 'axios'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const select=ref('')
const total=ref(0)
const dialogVisible = ref(false)
const isEditing = ref(false)
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const size = ref('default') // or 'small'
const disabled = ref(false)
const background = ref(true)
const params = new URLSearchParams({
  pageSize: pageSize4.value,
  pageNum:  currentPage4.value,
  userType: 'regular',
  userName: ''
});
onMounted(async () => {
try {
  const resTotal = await axios.get('/csxyb_server_war/GetUserTotalSizeServlet',{
      params: {
        userType: 'regular'
      }
    })
    const resUserList=await axios.post('/csxyb_server_war/FindUserServlet',params)
  total.value=Number(resTotal.data.totalSize)
  console.log('页面加载时获取的数据:', total.value)
  tableData.value=resUserList.data.data
  console.log(tableData.value)
} catch (err) {
  console.error('获取数据失败:', err)
}
})
const handleClose = (done) => {
  isEditing.value = false
  done()
}
const handleSave = () => {
  console.log('保存的用户数据：', userData)
  ElMessage.success('保存成功')
  dialogVisible.value = false
  isEditing.value = false
}
const handleStatusChange=(userChangestatus)=>{
  console.log(userChangestatus)
}
const optionsType = [
  {
    value: 'regular',
    label: '普通用户',
  },
  {
    value: 'admin',
    label: '管理员',
  },
  {
    value: 'root',
    label: '超级管理员',
    disabled:true
  }
]
const optionsStatus = [
  {
    value: 1,
    label: '良好',
  },
  {
    value: 0,
    label: '封禁中',
  }
  
]




const handleSizeChange = (newSize) => {
console.log('每页条数变化为:', newSize)
const changePageSize = new URLSearchParams({
  pageSize: newSize,
  pageNum:  currentPage4.value,
  userType: 'regular',
  userName: ''
});
axios.post('/csxyb_server_war/FindUserServlet',changePageSize)
.then(res=>{
  tableData.value=res.data.data
})
.catch(err=>{
  console.log(err)
})
}

const handleCurrentChange = (newPage) => {
console.log('当前页码变化为:', newPage)
const changePageNum = new URLSearchParams({
  pageSize: pageSize4.value,
  pageNum:  newPage,
  userType: 'regular',
  userName: ''
});
axios.post('/csxyb_server_war/FindUserServlet',changePageNum)
.then(res=>{
  tableData.value=res.data.data
})
.catch(err=>{
  console.log(err)
})
}


// 搜索关键词
const search = ref('')

// 表格数据
const tableData = ref([])

// 过滤后的数据
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
const userData=reactive({
    userId:'',
    userName:'',
    userAvatar:'',
    status:'',
    loginText:'',
    email:'',
    geXin:'',
    password:'',
    phoneNumber:'',
    Fans:'',
    Guanzhu:'',
    type:''
  })
// 编辑操作
const handleEdit = (index, row) => {
  console.log(index, row)
  userData.userId = row.userId
  userData.userName = row.userName
  userData.userAvatar = row.avatar
  userData.status = row.status
  userData.loginText = row.loginText
  userData.email = row.email
  userData.geXin = row.remark
  userData.password = row.password
  userData.phoneNumber  = row.phoneNumber
  userData.Fans = row.fans
  userData.Guanzhu = row.following
  userData.type = row.type
  dialogVisible.value=true
  isEditing.value = false
}

// 删除操作
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>

<style scoped>
.about{
  height: 70vh;
 
}
.el-switch{
margin: auto 20px;
}
.el-button{
margin: auto 10px;
}
.avatar-item {
  align-items: center !important; /* 垂直居中 label 和内容 */
  display: flex !important;
}
.avatar-item .el-form-item__label {
  margin-bottom: 0;

}
</style>
