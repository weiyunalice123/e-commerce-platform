<template>
    <div class="login-box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <h2>商城后台管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="ruleForm.password"
                    type="password"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { loginData } from '../type/login.ts'
import { login } from '../request/api.ts';
import { useRouter } from 'vue-router';

const ruleForm = reactive(new loginData())

const rules = reactive({
    username: [
    { 
        required: true, 
        message: '请输入账号', 
        trigger: 'blur' 
    },
    { 
        min: 5, 
        max: 10, 
        message: '账号的长度是5到10之间', 
        trigger: 'blur' 
    }],
    password: [
    { 
        required: true, 
        message: '请输入密码', 
        trigger: 'blur' 
    },
    { 
        min: 6, 
        max: 10, 
        message: '密码的长度是6到10之间', 
        trigger: 'blur' 
    },
  ]

})

//ref会返回一个带有value属性的对象，并且给它设置了泛型
const ruleFormRef = ref<FormInstance>()

const router = useRouter()//指向全局路由

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    //对表单内容进行验证，valid是布尔类型，如果是true验证成功，发送登录请求，反之验证失败
    formEl.validate((valid, fields) => {
        if (valid) {
            login(ruleForm).then((res:any) => {
                //将token进行保存
                localStorage.setItem('token', res.data.token)

                //页面跳转
                router.push('/')
            });
            console.log('submit!')
        } else {
            console.log('error submit!', fields);
            return false;
        }
    })
}

const resetForm = () => {
    ruleForm.username = ''
    ruleForm.password = ''
}
</script>

<style scoped>
    .login-box {
        width: 100%;
        height: 100%;
        background-image: url('../assets/login.PNG');
        background-size:cover;
        overflow: hidden;
    }
    .login-box h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 20px;
    }
</style>