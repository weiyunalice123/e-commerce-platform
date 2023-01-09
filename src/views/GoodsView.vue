<template>
  <div class="search-box">
    <el-form :inline="true" :model="data.searchData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="data.searchData.title" placeholder="输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="data.searchData.introduce" placeholder="输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="good-list">
    <div class="good-table-wrapper">
      <el-table :data="comList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="240" />
        <el-table-column prop="introduce" label="商品介绍" />
      </el-table>
    </div>
    <el-pagination 
      @size-change="sizeChange" 
      @current-change="currentChange" 
      background 
      layout="prev, pager, next" 
      :total="data.searchData.count * 2" 
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, watch } from 'vue';
import { getGoodsList } from '../request/api.ts'
import { initData, list } from '../type/goods.ts'
//let { searchData, listData} = reactive(new initData())
let data = reactive(new initData());

onMounted(() => {
  getGoodsListData()
})

//请求商品列表数据
const getGoodsListData = () => {
  //正常情况商品列表api会返回分页信息，后端分页
  getGoodsList().then((res: any) => {
    data.listData = res.data
    data.searchData.count = res.data.length
  })
}

//pageSize改变时触发
const sizeChange = (pageSize: number) => {
  data.searchData.pageSize = pageSize
}

//page改变时触发
//正常情况需要调用商品列表api
const currentChange = (page: number) => {
  data.searchData.page = page
}

//搜索按钮点击事件
//正常情况需要调用商品列表api
const onSubmit = () => {
  let arr: list[] = [];
  if(data.searchData.title || data.searchData.introduce) {
    if(data.searchData.title) {
        arr = data.listData.filter((item: list) => {
        return item.title.includes(data.searchData.title)
      })
    }

    if(data.searchData.introduce) {
        arr = data.listData.filter((item: list) => {
        return item.introduce.includes(data.searchData.introduce)
      })
    }
  } else {
    arr = data.listData
  }
  data.searchData.count = arr.length
  data.listData = arr;
}

//获取当前页的计算属性
const comList = computed({
  get() {
    return data.listData.slice((data.searchData.page-1)*data.searchData.pageSize, data.searchData.page*data.searchData.pageSize)
  },
  set() {}
})

//监听输入框的数据
watch([() => data.searchData.title, () => data.searchData.introduce], () => {
  //title或者introduce没值了，重新请求数据，将数据重置
  if(data.searchData.title == '' && data.searchData.introduce == '') {
    getGoodsListData()
  }
})
</script>

<style scoped>
  .good-table-wrapper {
    min-height: 350px;
  }
</style>