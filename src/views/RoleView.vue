<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onAddRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data.roleList" border style="width: 100%">
        <el-table-column prop="roleId" label="ID" width="180" />
        <el-table-column prop="roleName" label="角色" width="180"/>
        <el-table-column prop="authority" label="操作">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="changeAuthority(scope.row)"
            >
              修改权限
            </el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { getRoleList } from '../request/api.ts'
import { roleListData, RoleList } from '../type/role.ts'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const data = reactive(new roleListData())

onMounted(() => {
  getRoleListData() 
})

//请求角色列表数据
const getRoleListData = () => {
  getRoleList().then((res: any) => {
    data.roleList = res.data
  })
}

//添加角色事件
const onAddRole = () => {
    ElMessageBox.prompt('请输入角色名称', '添加角色', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(({ value }) => {
      //正常点击确认button时需要将添加的数据发送给api
      //并且调用角色列表api重新拿数据
      if(value) {
        data.roleList.push({
          roleId: data.roleList.length + 1,
          roleName: value,
          authority: []
       })
      }
      ElMessage({
        type: 'success',
        message: `${value}角色添加成功`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })
}

const changeAuthority = (row: RoleList) => {
  //路由跳转带参方法一，这种参数会在url上，不太友好
  router.push({
    path: '/authority',
    query: {
      id: row.roleId,
      authority: row.authority.join(',')
    }
  })
  //路由跳转带参方法二，name是路由的名字,一般不推荐这种方法，
  //因为页面刷新的时候，params会丢失,在高版本的vue-router中已经移除了params这个参数
  /*router.push({
    name: 'authority',
    params: {
      id: row.roleId,
      authority: row.authority
    }
  })*/
}
</script>