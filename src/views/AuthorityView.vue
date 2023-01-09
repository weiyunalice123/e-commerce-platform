<template>
  <div>
    <el-tree
    :data="data.authorityList"
    ref="treeRef"
    show-checkbox
    node-key="roleId"
    :default-expanded-keys="[2, 3]"
    :default-checked-keys="data.authority"
    :check-strictly="true"
    :props="{
      children: 'roleList',
      label: 'name',
    }"
  />
  <el-button type="primary" @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { reactive, onMounted, ref } from 'vue'
import { Authority } from '../type/authority.ts'
import { getAuthorityList } from '../request/api.ts'
import { ElTree } from 'element-plus'

const route = useRoute()
let id = route.query.id
let authority = route.query.authority && route.query.authority.split(',')
const data = reactive(new Authority(id, authority))

const treeRef = ref(ElTree);

onMounted(() => {
  getAuthorityListData()
})

//获取权限列表数据
const getAuthorityListData = () => {
  getAuthorityList().then((res: any) => {
    data.authorityList = res.data
  })
}

//修改权限事件
const changeAuthority = () => {
  data.treeRef = treeRef;
  console.log(treeRef.value.getCheckedKeys().sort((a: number, b: number) => a - b))
  //正常情况需要把改变后的数据发给后台API，并且要再次调用权限列表API
}
</script>

<style scoped>
  .el-button {
    margin-top: 20px;
  }
</style>