<template>
  <div class="user-box">
    <div class="search-box">
      <el-form :inline="true" :model="data.searchUserData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="data.searchUserData.nickName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select  v-model="data.searchUserData.role" placeholder="请选择">
            <el-option 
              label="全部" 
              :value="0" 
            />
            <el-option 
              v-for="item in data.roleList"
              :label="item.roleName" 
              :key="item.roleId"
              :value="item.roleId" 
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-table-wrapper">
      <el-table 
        :data="data.userList" 
        border 
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="nickName" label="姓名" width="240" />
        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-button
              link
              v-for="item in scope.row.role"
              :key="item.role"
              size="small"
            >
              {{item.roleName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="editUser(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="data.isShow" title="编辑用户信息">
    <el-form :model="data.active">
      <el-form-item label="姓名" label-width="140px">
        <el-input v-model="data.active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="140px">
        <el-select multiple v-model="data.active.role" placeholder="请选择角色">
          <el-option               
            v-for="item in data.roleList"
            :label="item.roleName" 
            :key="item.roleId"
            :value="item.roleId"  
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="updateUser">更改</el-button>
        <el-button @click="data.isShow = false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, watch } from 'vue';
import { getUserList, getRoleList } from '../request/api.ts'
import { userListData, UserList } from '../type/user.ts'

let data = reactive(new userListData())

onMounted(() => {
  getUserListData()
  getRoleListData()
})

//请求用户列表数据
const getUserListData = () => {
  getUserList().then((res: any) => {
    data.userList = res.data
  })
}

//请求角色列表数据
const getRoleListData = () => {
  getRoleList().then((res: any) => {
    data.roleList = res.data
  })
}

//搜索按钮事件
//正常情况搜索时需要调用用户列表api
const onSubmit = () => {
  let userListArr: UserList[] = []
  if (data.searchUserData.role || data.searchUserData.nickName) {  
    if(data.searchUserData.nickName) {
      userListArr = data.userList.filter((item: any) => item.nickName.includes(data.searchUserData.nickName))
    }
    if(data.searchUserData.role) {
      userListArr = (data.searchUserData.nickName ? userListArr : data.userList).filter((item: any) => {
        return item.role.find((v: any) => v.role == data.searchUserData.role)
      })
    }
  } else {
    userListArr = data.userList;
  }
  data.userList = userListArr;
}

//编辑button事件
const editUser = (row: UserList) => {
  data.isShow = true
  data.active = {
    id: row.id,
    nickName: row.nickName,
    username: row.username,
    role: row.role.map((item: any) => item.role || item.roleId)
  }
}

//更改button事件
//正常情况点击更改button时需要将修改后的数据发送给api，并且再次调用用户列表api
const updateUser = () => {
  data.isShow = false
  let obj: any = data.userList.find((item: any) => item.id == data.active.id);
  obj.nickName = data.active.nickName;
  obj.role = data.roleList.filter((item: any) => data.active.role.includes(item.roleId))
  data.userList.array.forEach((item: UserList, i: number) => {
    if(item.id === obj.id) {
      data.userList[i] = obj
      return
    }
  })
}

//监听输入框数据
watch([() => data.searchUserData.nickName, () => data.searchUserData.role], () => {
  if(data.searchUserData.nickName == '' && data.searchUserData.role == 0) {
    getUserListData()
  }
})
</script>