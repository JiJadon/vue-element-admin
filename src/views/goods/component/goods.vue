<template>
  <el-card shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品详情"></el-step>
    </el-steps>
    <goods-info class="form-container"
                v-show="showStatus[0]"
                v-model="goods"
                :is-edit="isEdit"
                @nextStep="nextStep"
    >
    </goods-info>
    <goods-detail
      v-show="showStatus[1]"
      v-model="goods"
      :is-edit="isEdit"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    >
    </goods-detail>
  </el-card>
</template>

<script>

import GoodsInfo from "@/views/goods/component/goodsInfo";
import GoodsDetail from "@/views/goods/component/goodsDetail";
import goods from "@/api/goods";

export default {
  name: "goods",
  components: {GoodsInfo, GoodsDetail},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      active: 0,
      showStatus: [true, false],
      goods: {}
    }
  },
  created() {
    if (this.isEdit) {
      if (this.$route.query) {
        goods.GoodsInfo(this.$route.query.id).then(res => {
          this.goods = res.data.goods
        })
      }
    }
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    finishCommit(isEdit) {
      this.$confirm('是否要提交该产品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (isEdit) {
          this.goods.id = this.$route.query.id
          goods.GoodsUpdate(this.goods).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            });
            this.$router.back();
          });
        } else {
          goods.AddGoods(this.goods).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            });
            location.reload();
          });
        }
      })
    }
  }
}
</script>

<style>
.form-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 720px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}
</style>


