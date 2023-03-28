<template>
  <div>
    <el-table
      :data="userList"
      border
      align="center"
      header-align="center"
    >
      <el-table-column
        label="用户名"
        prop="username"
      >
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="name"
      >
      </el-table-column>
      <el-table-column label="手机号" prop="phone">
      </el-table-column>
      <el-table-column label="性别" prop="sex">
      </el-table-column>
      <el-table-column label="年龄" prop="age">
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="180px">
      </el-table-column>
      <el-table-column label="权限" prop="authority">
        <template slot-scope="scope">
          {{ scope.row.authority === 1 ? '超级管理员' : '普通管理员' }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===1" type="success" icon="el-icon-open" circle
                     @click="handleDisable(scope.row.id)"
          ></el-button>
          <el-button v-else type="info" icon="el-icon-turn-off" circle
                     @click="handleEnable(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="beforeEdit(scope.row.id)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-form-item prop="ID"></el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="真实姓名">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select v-model="user.sex">
            <el-option value="男" label="男"></el-option>
            <el-option value="女" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input v-model.number="user.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {disableUser, enableUser, getUserInfo, getUserList, updateUser} from '@/api/user'


export default {
  data() {
    return {
      userList: [],
      dialogFormVisible: false,
      user: {},
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      getUserList().then((res) => {
        this.userList = res.data.userList
      })
    },
    handleDisable(id) {
      disableUser(id).then(res => {
        this.$message({
          showClose: true,
          center: true,
          message: res.message,
          type: 'success',
        })
        this.getUserList()
      })
    },
    handleEnable(id) {
      enableUser(id).then(res => {
        this.$message({
          showClose: true,
          center: true,
          message: res.message,
          type: 'success',
        })
        this.getUserList()
      })
    },
    beforeEdit(id) {
      this.dialogFormVisible = true
      getUserInfo(id).then(res => {
        this.user = res.data.user
      })
    },
    handleEdit() {
      updateUser(this.user).then(res => {
        this.$message({
          showClose: true,
          center: true,
          type: 'success',
          message: res.message,
        })
        this.getUserList()
        this.dialogFormVisible = false
      })
    },
    handleDelete(index, row) {
    }
  }
}
</script>
