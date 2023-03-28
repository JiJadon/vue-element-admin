<template>
  <div style="margin-top: 50px">
    <el-form :model="value"
             ref="goodsDetailForm"
             label-width="120px"
             class="form-inner-container"
             size="small">
      <el-form-item label="商品图片" prop="image">
        <el-upload
          action="http://localhost:8888/goods/upload"
          :on-success="handleUploadSuccess"
          accept="image/png,image/gif,image/jpg,image/jpeg"
          :show-file-list="false"
        >
          <el-image :src="value.image" style="width: 260px;height: 220px"></el-image>
        </el-upload>
      </el-form-item>
      <!--TODO-->
      <el-form-item label="商品相册">
        <el-upload
          list-type="picture-card"
          action=""
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!--TODO 引入WangEdit-->
      <el-form-item label="详情">

      </el-form-item>
      <el-form-item>
        <el-button size="medium" @click="handlePrev">上一步，填写商品信息</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  name: "goodsDetail",
  data() {
    return {
      detail: '',
    }
  },
  computed: {
    goodsId() {
      return this.value.id;
    },
    // //商品的主图和画册图片
    // selectProductPics: {}
  },
  created() {
    this.handleShowGoodsDetail(this.value.id)
  },
  methods: {
    handlePrev() {
      this.$emit('prevStep')
    },
    handleFinishCommit() {
      this.$emit('finishCommit', this.isEdit);
    },
    handleUploadSuccess(res, file) {
      this.value.image = res.data.url
    },
    handleShowGoodsDetail(id) {

    }
  },
}

</script>

<style scoped>

</style>
