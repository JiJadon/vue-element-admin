<template>
  <div>

    <el-form :model="user">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model.trim="user.name"/>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model.trim="user.username"/>
      </el-form-item>
      <el-form-item label="Email" :label-width="formLabelWidth">
        <el-input v-model.trim="user.email"/>
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model.trim="user.phone"/>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-input v-model.trim="user.sex"/>
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model.trim.number="user.age"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleEdit()">修改</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {updateUser} from "@/api/user";

export default {
  props: {
    user: {}
  },
  data() {
    return {
      formLabelWidth: '120px',
    }
  },
  methods: {
    handleEdit() {
      updateUser(this.user).then(res => {
        this.$message({
          type: 'success',
          message: res.message,
        })
      })
    }
  }
}
</script>
