<template>
  <div class="goods-list">
    <h2 style="margin: 0;margin-bottom:10px">{{ labels[category] }}</h2>
    <el-input
      v-model="serch"
      style="max-width: 600px"
      placeholder="请输入关键词...."
      class="input-with-select"
    >
      <template #prepend>
        <el-button :icon="Search" />
      </template>
      <template #append>
        <el-select v-model="select" placeholder="筛选" style="width: 115px">
          <el-option label="用户ID" value="1" />
          <el-option label="商品名称" value="2" />
        </el-select>
      </template>
    </el-input>
    <el-row :gutter="[20, 20]" class="goods-row">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card class="goods-card" shadow="hover">
          <template #header>
            <span class="goods-title">{{ item.goodsText }}</span>
          </template>
          <img
            :src="`http://100.125.55.196:3000/${item.goodsTopImg}`"
            class="goods-img"
            alt="商品图"
          />
          <div class="goods-info">
            <div class="price">￥{{ item.goodsPrice ?? '—' }}</div>
          </div>

          <!-- 新增：违规按钮 -->
          <el-button
            class="violation-btn"
            type="danger"
            size="mini"
            @click="onViolation(item)"
            v-if="item.status==1"
          >
            下架
          </el-button>
          <el-button
            class="violation-btn"
            type="danger"
            size="mini"
            disabled
            v-else
          >
            已下架
          </el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[4, 8, 16]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Search } from '@element-plus/icons-vue'


const total = ref(0)
const currentPage4 = ref(1)
const pageSize4 = ref(4)
const size = ref('default')
const disabled = ref(false)
const background = ref(true)
const list = ref([])
const serch=ref('')
const select=ref('')
// 请求初始数据
onMounted(async () => {
  try {
    const resTotal = await axios.get('/csxyb_server_war/GetGoodsTotalSizeServlet', {
      params: { goodsName:serch.value }
    })
    const params = new URLSearchParams({
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      goodsName:serch.value
    })
    const resUserList = await axios.post('/csxyb_server_war/FindGoodsServlet', params)
    total.value = Number(resTotal.data.totalSize)
    list.value = resUserList.data.data
  } catch (err) {
    console.error('获取数据失败:', err)
  }
})

// 路由参数与分类标签
const route = useRoute()
const category = ref(route.params.category ?? 'all')
const labels = {
  all: '全部',
  shuma: '数码',
  dianqi: '电器',
  book: '书籍',
  live: '生活类'
}
watch(
  () => route.params.category,
  val => { 
  category.value = val ?? 'all'
  const changeType = new URLSearchParams({
    pageSize: pageSize4.value,
    pageNum: currentPage4.value,
    goodsType: labels[val],
    goodsName: serch.value
  })
  if(val!="all"){
    axios.get('/csxyb_server_war/GetGoodsTotalSizeByTypeServlet',{
      params: { goodsName:serch.value,goodsType:labels[val] }
    })
  .then(res=>{
    total.value = Number(res.data.totalSize)
  })
  .catch(err=>{
    console.log(err)
  })
  axios.post('/csxyb_server_war/FindGoodsByTypeServlet', changeType)
    .then(res => { list.value = res.data.data })
    .catch(err => { console.error(err) })
  }else{
    axios.get('/csxyb_server_war/GetGoodsTotalSizeServlet', {
      params: { goodsName:serch.value }
    }).then(res=>{
      total.value = Number(res.data.totalSize)
    }).catch(err=>{
      console.log(err)
    })
    const params2 = new URLSearchParams({
      pageSize: pageSize4.value,
      pageNum: currentPage4.value,
      goodsName:serch.value
    })
    axios.post('/csxyb_server_war/FindGoodsServlet', params2)
    .then(res=>{
      list.value = res.data.data
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
   }
)
let timer = null
watch(serch, (newVal) => {
  // 每次 search 改变，都先 clear 掉上一次未执行的定时器
  const newSerch = new URLSearchParams({
  pageSize: pageSize4.value,
  pageNum:  currentPage4.value,
  goodsName: newVal
});
  clearTimeout(timer)
  // 300ms 后再真正发请求
  timer = setTimeout(async () => {
    try {
  const resTotal = await axios.get('/csxyb_server_war/GetGoodsTotalSizeServlet',{
      params: {
        goodsName: newVal
      }
    })
    const resGoodsList=await axios.post('/csxyb_server_war/FindGoodsServlet',newSerch)
  total.value=Number(resTotal.data.totalSize)
  console.log('页面加载时获取的数据:', total.value)
  list.value=resGoodsList.data.data
  console.log(list.value)
} catch (err) {
  console.error('获取数据失败:', err)
}
  }, 300)
})


// 分页逻辑
const handleSizeChange = (newSize) => {
  const changePageSize = new URLSearchParams({
    pageSize: newSize,
    pageNum: currentPage4.value,
    goodsName: serch.value,
    goodsType: category.value
  })
  axios.post('/csxyb_server_war/FindGoodsServlet', changePageSize)
    .then(res => { list.value = res.data.data })
    .catch(err => { console.error(err) })
}

const handleCurrentChange = (newPage) => {
  const changePageNum = new URLSearchParams({
    pageSize: pageSize4.value,
    pageNum: newPage,
    goodsName: serch.value,
    goodsType: category.value
  })
  axios.post('/csxyb_server_war/FindGoodsServlet', changePageNum)
    .then(res => { list.value = res.data.data })
    .catch(err => { console.error(err) })
}

// 新增：违规按钮点击事件
const onViolation = (item) => {
  // 弹窗或接口调用等业务逻辑
  console.log('标记违规商品：', item)
  item.status=0
  // axios.post('/api/markViolation', { id: item.id })...
}
</script>

<style scoped>
.goods-list { padding: 16px; }
.goods-row { margin-top: 16px; }
.goods-card {
  position: relative; /* 新增：相对定位 */
  border-radius: 8px;
  overflow: hidden;
}
.goods-title {
  font-size: 16px;
  font-weight: bold;
}
.goods-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.goods-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.price {
  font-size: 18px;
  color: #f56c6c;
  font-weight: bold;
}
.violation-btn {
  position: absolute; /* 新增：绝对定位 */
  bottom: 8px;
  right: 8px;
}
</style>
