<template>
  <div class="home">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="../assets/logo.png"/>
          </el-col>
          <el-col :span="18">
            <h2>商城后台管理系统</h2>
          </el-col>
          <el-col :span="2">
            <el-button type="text" @click="logout">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
          <!--router属性开启路由模式，通过el-menu-item使用index属性实现路由跳转-->
            <el-menu-item :index="item.path" v-for="item in list" :key="item.path">
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!--设置路由出口-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const active = route.path
const list = router.getRoutes().filter((v) => v.meta.isShow)
const logout = () => {
  localStorage.removeItem("token")
  router.push('/login')
}
</script>
<style scoped>
  .el-header {
    height: 80px;
    line-height: 80px;
    background-color: #666;
    color: #fff;
  }
  .el-header img {
    height: 30px;
    vertical-align: middle;
  }
  .el-header h2 {
    text-align: center;
  }
  .el-aside .el-menu {
    height: calc(100vh - 80px);
  }
  .el-button--text {
    color: #fff;
  }
  .el-button--text:not(.is-disabled):hover,
  .el-button--text:not(.is-disabled):active,
  .el-button--text:not(.is-disabled):visited,
  .el-button--text:not(.is-disabled):focus {
    color: #d2d4d5;
  }
</style>
