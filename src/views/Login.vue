<template>
  <div class="login-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>黑马面经运营后台</span>
      </div>
      <el-form label-position="top" label-width="auto" :model="user" ref="user" :rules="relus">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('user')">登录</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入登录接口
import { loginUser } from '@/api/user.js'

export default {
  name: 'login-page',
  data() {
    return {
      user: {
        username: 'admin',
        password: 'admin'
      },
      relus: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const res = await loginUser(this.user)
            // console.log(res)
            // localStorage.setItem('mj-pc-token', res.data.token)
            this.$store.commit('user/updateToken', res.data.token)
            // 跳转到首页
            this.$router.push('/')
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
          } catch (err) {
            // 判断有没有返回错误消息
            if (err.response) {
              this.$message({
                showClose: true,
                message: err.response.data.message,
                type: 'error'
              })
            } else {
              this.$message({
                showClose: true,
                message: '网络异常，请稍后重试',
                type: 'error'
              })
            }
          }
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      // this.user = {
      //   username: '',
      //   password: ''
      // }
    }
  }
}
</script>

<style lang="sass" scoped>
.login-page
  height: 100vh
  background: url(@/assets/login-bg.svg) no-repeat center / cover

  .clearfix:before,
  .clearfix:after
    display: table
    content: ""

  .clearfix:after
    clear: both

  .box-card
    width: 480px

  .el-card
    margin: auto
    position: relative
    top: 50%
    transform: translateY(-50%)
    > :first-child
      text-align: center
      background-color: rgb(114, 124, 246)
      color: rgb(247, 255, 255)
      font-size: 20px
      padding: 30px
    > :last-child
      padding: 20px 40px
      > :last-child
        > :last-child
          display: flex
          justify-content: center
</style>
