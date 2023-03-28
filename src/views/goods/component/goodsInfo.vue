<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="goodsInfoForm" label-width="120px" class="form-inner-container"
             size="small">
      <el-form-item label="商品分类" prop="Category3Id">
        <el-cascader :options="options"
                     :value="selectCategory"
                     :props="props"
                     :show-all-levels="false"
                     size="small"
                     clearable
                     filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="value.name" autocomplete="off" class="input-style"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.number="value.price" autocomplete="off" class="input-style"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="stock">
        <el-input v-model.number="value.stock" autocomplete="off" class="input-style"></el-input>
      </el-form-item>

      <el-form-item label="计量单位" prop="unite">
        <el-input v-model="value.unite" autocomplete="off" class="input-style"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" class="input-style" v-model="value.desc"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="info" size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="medium" @click="handleNext('goodsInfoForm')">下一步，填写商品详情</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import goods from "@/api/goods";

export default {
  name: "goodsInfo",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: '100px',
      goods: {},
      hasEditCreated: false,
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        ],
        stock: [
          {required: true, message: '请输入库存', trigger: 'blur'},
        ],
      },
      options: [],
      selectCategory: '',
      props: {
        label: 'name',
        value: 'ID',
      }
    }
  },
  computed: {
    //商品的编号
    goodsId() {
      return this.value.id;
    }
  },
  watch: {
    goodsId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated()
    },
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length === 2) {
        this.value.category3Id = newValue[1];

      } else {
        this.value.category3Id = null;
      }
    }
  },
  created() {
    this.selectCategory = this.value.category3Id
    this.handleLoadCategory1()
  },
  methods: {
    handleLoadCategory1() {
      goods.loadCategory1().then(res => {
        this.options = res.data.listCategory1
      })
    },
    //处理编辑逻辑
    handleEditCreated() {
      this.hasEditCreated = true;
    },
    handleNext(formName) {
      this.$emit('nextStep')
    },

    cancel() {

    },
  }
}
</script>

<style scoped>
.form-inner-container {
  width: 700px;
}

.input-style {
  width: 500px;
}
</style>
