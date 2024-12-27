<template>
  <div class="layout-page">
    <el-container style="border: 1px solid #eee" router>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- <el-menu>
          <el-submenu index="1">黑马面经</el-submenu>
        </el-menu>-->
        <!-- <div class="logo">黑马面经</div> -->
        <el-row class="tac">
          <el-col :span="12">
            <div class="logo">
              <h5>黑马面经</h5>
            </div>

            <el-menu
              router
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              background-color="rgb(49, 58, 71) "
              text-color="rgb(106, 115, 128)"
              active-text-color="#fff"
            >
              <el-menu-item index="/">
                <i class="el-icon-pie-chart"></i>
                <span slot="title">数据看板</span>
              </el-menu-item>
              <el-menu-item index="/article">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">面经管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="headBox">
            <el-image style="width: 35px; height: 35px; border-radius: 50%;" :src="userInfo.avatar"></el-image>
            <span style="font-size: 16px; color: rgb(125, 127, 129); margin-left: 20px;">{{userInfo.name}}</span>
            <i
              @click="dialogVisible = true"
              class="el-icon-switch-button"
              style="cursor:pointer; margin-right: 15px; font-size: 25px; color: rgb(173, 173, 173);  margin-left: 20px;"
            ></i>
          </div>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="15%">
          <span>确定要退出登录吗?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false ,logout()">确 定</el-button>
          </span>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// 引入退出登录接口
import { logoutUserAPI } from '@/api/user'

export default {
  name: 'LayoutIndex',
  data() {
    return { dialogVisible: false }
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    ...mapMutations('user', ['setUserInfo']),
    async logout() {
      try {
        await logoutUserAPI()
        this.setUserInfo({})
        this.$store.commit('user/updateToken', '')
        // localStorage.clear('mj-pc-token')
        this.$router.push('/login')
        this.$message.success('退出成功.')
      } catch (err) {
        if (err.response) {
          this.$message.error(err.response.data.message)
        } else {
          this.$message.error('网络异常，请稍后重试')
        }
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}
.el-container {
  height: 100vh;
}
.el-aside {
  color: #fff;
  background: rgb(49, 58, 71) !important;
  height: 100vh;
}
.logo {
  text-align: center;
  // padding: 20px 0;
  font-size: 25px;
}
.el-col-12 {
  width: 100% !important;
}
.headBox {
  display: flex;
  /* flex-direction: row; */
  justify-content: right;
  flex-wrap: nowrap;
  align-items: center;
}
</style>
