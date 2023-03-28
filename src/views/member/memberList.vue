<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="memberList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getMemberList"
      :current-page="current"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import member from "@/api/member";

export default {
  data() {
    return {
      memberList: [],
      multipleSelection: [],
      current: 1,
      pageSize: 10,
      total: 0,
    }
  },
  created() {
    this.getMemberList(1)
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getMemberList(current = 1) {
      this.current = current
      member.GetMemberList(this.current, this.pageSize).then(res => {
        this.memberList = res.data.memberList
        this.total = res.data.total
      })
    }
  }
}
</script>
