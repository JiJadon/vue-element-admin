<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleGetGoodsList(1)"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetData()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <!--TODO 条件查询-->
        <el-form :inline="true" :model="queryCond" class="demo-form-inline">
          <el-form-item label="输入搜索:">
            <el-input v-model="queryCond.name" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类:">
            <el-cascader
              placeholder="试试搜索商品分类"
              :value="selectCategory"
              :options="options"
              :props="props"
              :show-all-levels="false"
              @change="handleCategoryChange"
              filterable
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品状态:">
            <el-select v-model="queryCond.status" filterable clearable placeholder="请选择商品状态">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button type="default" class="btn-add" @click="handleToAdd()" size="small">添加商品</el-button>
    </el-card>
    <el-card class="filter-container" shadow="never">
      <el-table
        :data="goodsList"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="单位">
                <span>{{ props.row.unite }}</span>
              </el-form-item>
              <el-form-item label="商品库存">
                <span>{{ props.row.stock }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
              <el-form-item label="商品状态">
                <el-tag type="success" v-if="props.row.status === 1">上架</el-tag>
                <el-tag type="danger" v-else>下架</el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品编号"
          prop="goodsNo"
        >
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
        >
        </el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.image"
              :preview-src-list="srcList"
              @click="handleGetGoodsImg(scope.row.id)"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="商品价格"
          prop="price"
        >
        </el-table-column>
        <el-table-column
          label="商品销量"
          prop="sales"
        >
        </el-table-column>
        <el-table-column
          label="商品库存"
          prop="stock"
        >
        </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <div>
            <span v-if="scope.row.status===1">
            上架:
             <el-button type="success" icon="el-icon-open" circle
                        @click="handleDisable(scope.row.id)"
             ></el-button>
          </span>
              <span v-else>
            下架:
            <el-button type="info" icon="el-icon-turn-off" circle
                       @click="handleEnable(scope.row.id)"
            ></el-button>
          </span>
            </div>
            <!--TODO-->
            <!--          <div style="margin-top: 4px">-->
            <!--             <span v-if="scope.row.status===1">-->
            <!--           新品:-->
            <!--             <el-button type="success" icon="el-icon-open" circle-->
            <!--                        @click="handleDisable(scope.row.id)"-->
            <!--             ></el-button>-->
            <!--          </span>-->
            <!--            <span v-else>-->
            <!--            新品:-->
            <!--            <el-button type="info" icon="el-icon-turn-off" circle-->
            <!--                       @click="handleEnable(scope.row.id)"-->
            <!--            ></el-button>-->
            <!--          </span>-->
            <!--          </div>-->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleToEdit(scope.row.id)" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)" size="mini">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleGetGoodsList"
        :current-page="current"
        :page-size="size"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>


<script>
import goods from '@/api/goods'

export default {
  data() {
    return {
      formLabelWidth: '100px',
      formVisible: false,
      goods: {},
      goodsList: [],
      srcList: [],
      current: 1,//当前页
      size: 5,//每页显示数目
      total: 0,
      queryCond: {},
      status: [
        {value: 1, label: '上架'},
        {value: 2, label: '下架'},
      ],
      options: [],
      selectCategory: '',
      props: {
        label: 'name',
        value: 'ID',
      },
    }
  },
  created() {
    this.handleLoadCategory1()
    this.handleGetGoodsList(1)
  },
  methods: {
    handleToEdit(id) {
      this.$router.push({path: '/goods/updateGoods', query: {id: id}})
    },
    handleToAdd() {
      this.$router.push({path: '/goods/addGoods'})
    },
    handleCategoryChange(val) {
      console.log(val)
    },
    handleLoadCategory1() {
      goods.loadCategory1().then(res => {
        this.options = res.data.listCategory1
      })
    },
    handleGetGoodsList(current = 1) {
      this.current = current
      goods.GoodsList(this.queryCond, this.current, this.size).then(res => {
        this.goodsList = res.data.goodsList
        this.total = res.data.total
      })
    },
    handleGetGoodsImg(id) {
      goods.GoodsImg(id).then(res => {
        this.srcList = []
        this.srcList = res.data.srcList
      })
    },
    handleDelete() {

    },
    handleDisable(id) {
      goods.disable(id).then(res => {
        this.$message({
          showClose: true,
          center: true,
          message: res.message,
          type: 'success',
        })
        this.handleGetGoodsList()
      })
    },
    handleEnable(id) {
      goods.enable(id).then(res => {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          center: true
        })
        this.handleGetGoodsList()
      })
    },
    handleResetData() {
      this.queryCond = {}
      this.handleGetGoodsList(1)
    },
    handleRemove(file, fileList) {

    },
    handleCancel() {
      this.formVisible = false
    },
    handleUploadSuccess(res, file) {
      this.goods.image = res.data.url
    },
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.btn-add {
  float: right;
}

.operate-container {
  margin-top: 10px;
}
</style>

