const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "", // 这个值 写错 空字符串，或者 './' 都可以

  // 下面的配置，作用是取消生成 xxx.map 文件
  productionSourceMap: false,

  // 配置排除哪些第三方包
  configureWebpack: {
    // 排除项
    externals: {
      // 键(第三方包名): 值(window对象中多了什么)
      axios: "axios",
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      echarts: "echarts",
      "element-ui": "ELEMENT",
      "vue-quill-editor": "VueQuillEditor",
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "面经";
      return args;
    });
  },
});
