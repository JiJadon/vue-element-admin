<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <el-button @click="">添加一级分类</el-button>
        <el-button @click="">刷新列表</el-button>
      </div>
    </el-card>
    <el-card class="filter-container" shadow="never">
      <div class="custom-tree-container">
        <el-tree
          :data="data"
          :props="defaultProps"
          show-checkbox
          node-key="ID"
          :expand-on-click-node="false"
          :render-content="renderContent"
          :highlight-current="true"
        >
        </el-tree>
      </div>
    </el-card>

  </div>
</template>

<script>
import goods from "@/api/goods";

let id = 1000;

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      goods.loadCategory1().then(res => {
        this.data = res.data.listCategory1
      })
    },
    edit(data) {

    },
    append(data) {
      const newChild = {id: id++, label: 'testtest', children: []};
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    renderContent(h, {node, data, store}) {
      if (1) { //一二级分类
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={() => this.append(data)}>添加子分类</el-button>
              <el-button size="mini" type="text" on-click={() => this.edit(data)}>编辑</el-button>
              <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
            </span>
          </span>);
      } else { //三级分类
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={() => this.edit(data)}>编辑</el-button>
              <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>删除</el-button>
            </span>
          </span>);
      }
    }
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
