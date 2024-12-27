<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{total}} 条记录</span>
          <el-button icon="el-icon-plus" size="small" type="primary" round @click="handleClick({id:'1'},'add')">添加面经</el-button>
        </div>
      </template>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="stem" label="标题" width="500"></el-table-column>
        <el-table-column prop="creator" label="作者"></el-table-column>
        <el-table-column prop="likeCount" label="点赞"></el-table-column>
        <el-table-column prop="views" label="浏览数"></el-table-column>
        <el-table-column prop="createdAt" label="更新时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <i class="el-icon-view" @click="handleClick(scope.row,'see')" style="font-size: 20px; margin-right: 10px; cursor: pointer;"></i>
            <i
              class="el-icon-edit-outline"
              @click="handleClick(scope.row,'change')"
              style="font-size: 20px;  margin-right: 10px; cursor: pointer;"
            ></i>
            <i class="el-icon-delete" @click="handleClick(scope.row,'del')" style="font-size: 20px; cursor: pointer;"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="changeCurrent"
        background
        layout="prev, pager, next"
        :total="total"
        :page-count="pageTotal"
        :current-page="current"
      ></el-pagination>
    </el-card>
    <el-drawer :before-close="handleClose" :title="drawerTitle" :visible.sync="table" direction="rtl" size="50%">
      <el-form ref="form" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem" placeholder="输入面经标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor v-model="form.content" @blur="$refs.form.validateField('content')"></quill-editor>
        </el-form-item>
        <el-form-item v-if="type !== 'see'">
          <el-button type="primary" @click="updateMianjing">确认</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
// 引入获取面经列表接口、删除面经接口、获取面经详情接口、更新面经内容接口、创建面经内容接口
import { getMianjingAPI, delMianjingListAPI, getMianjingShowAPI, updateMianJingAPI, addMianJingAPI } from '@/api/mianjing'
// 引入富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'article-page',
  components: {
    quillEditor
  },
  data() {
    return {
      tableData: [],
      current: 1,
      pageTotal: 0,
      list: [],
      total: 0,
      table: false,
      type: '',
      form: {
        id: '',
        stem: '',
        content: ''
      },
      rules: {
        stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入面经内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleClick({ id }, type) {
      this.type = type
      if (type === 'see') {
        this.rules = {}
        this.table = true
        this.getMianjingShow(id)
      } else if (type === 'change') {
        this.rules = {
          stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
          content: [{ required: true, message: '请输入面经内容', trigger: 'blur' }]
        }
        this.table = true
        this.form.id = id
        this.getMianjingShow(id)
      } else if (type === 'add') {
        this.rules = {
          stem: [{ required: true, message: '请输入面经标题', trigger: 'blur' }],
          content: [{ required: true, message: '请输入面经内容', trigger: 'blur' }]
        }
        this.table = true
      } else {
        this.delMianjingList(id)
      }
    },
    async getMianjingShow(id) {
      try {
        const res = await getMianjingShowAPI(id)
        this.form.stem = res.data.stem
        this.form.content = res.data.content
      } catch (err) {
        if (err.response) {
          this.$message.error(err.response.data.message)
        } else {
          this.$message.error('网络异常，请稍后重试')
        }
      }
    },
    async addMianJing(from) {
      try {
        await addMianJingAPI(from)
        this.$message.success('创建成功')
        this.handleClose()
        this.getMianjing()
      } catch (err) {
        if (err.response) {
          this.$message.error(err.response.data.message)
        } else {
          this.$message.error('网络异常，请稍后重试')
        }
      }
    },
    async delMianjingList(id) {
      try {
        await delMianjingListAPI(id)
        this.$message.success('删除成功')
        this.getMianjing()
      } catch (err) {
        if (err.response) {
          this.$message.error(err.response.data.message)
        } else {
          this.$message.error('网络异常，请稍后重试')
        }
      }
    },
    async getMianjing() {
      try {
        const res = await getMianjingAPI({ current: this.current })
        this.pageTotal = res.data.pageTotal
        this.list = res.data.rows
        this.total = res.data.total
      } catch (err) {
        if (err.response) {
          this.$message.error(err.response.data.message)
        } else {
          this.$message.error('网络异常，请稍后重试')
        }
      }
    },
    changeCurrent(e) {
      this.current = e
      this.getMianjing()
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
      // delete this.form.id
      this.form = {
        stem: '',
        content: ''
      }
      this.table = false
    },
    async updateMianjing() {
      if (this.type === 'change') {
        try {
          this.$refs.form.validate(async valid => {
            if (valid) {
              await updateMianJingAPI(this.form)
              this.$message.success('修改成功')
              this.handleClose()
              this.getMianjing()
            } else {
              // console.log('error submit!!')
              this.$message.error('内容不能为空!')
              return false
            }
          })
        } catch (err) {
          if (err.response) {
            this.$message.error(err.response.data.message)
          } else {
            this.$message.error('网络异常，请稍后重试')
          }
        }
      } else {
        // this.addMianJing({ stem: this.form.stem, content: this.form.content })
        this.$refs.form.validate(valid => {
          if (valid) {
            this.addMianJing({ stem: this.form.stem, content: this.form.content })
          } else {
            // console.log('error submit!!')
            this.$message.error('内容不能为空!')
            return false
          }
        })
      }
    }
  },
  created() {
    this.getMianjing()
  },
  computed: {
    drawerTitle() {
      return this.type === 'see' ? '查看面经' : '修改面经'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
.el-table_1_column_6 {
  .cell {
    font-size: 20px !important;
  }
}
</style>
