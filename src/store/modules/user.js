// 引入获取用户信息接口
import { getUserInfoAPI } from "@/api/user";

export default {
  namespaced: true,
  // 数据
  state: {
    userInfo: {},
    token: localStorage.getItem("mj-pc-token"),
  },
  // 计算方法
  getters: {},
  // 同步处理方法
  mutations: {
    // 保存用户信息
    setUserInfo(state, val) {
      state.userInfo = val;
    },
    updateToken(state, val) {
      state.token = val;
      localStorage.setItem("mj-pc-token", val);
    },
  },
  // 异步处理方法
  actions: {
    // 获取用户信息并保存
    async getUserInfo(store) {
      try {
        const data = await getUserInfoAPI();
        store.commit("setUserInfo", data.data);
      } catch (err) {
        if (err.response) {
          this.$message.error(err.response.data.message);
        } else {
          this.$message.error("网络异常，请稍后重试");
        }
      }
    },
  },
};
