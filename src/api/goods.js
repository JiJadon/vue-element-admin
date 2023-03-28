import request from '@/utils/request'

export default {
  GoodsList(queryCond, current, pageSize) {
    return request({
      url: `/goods/list/${current}/${pageSize}`,
      method: 'post',
      data: queryCond,
    })
  },
  GoodsImg(id) {
    return request({
      url: `/goods/imgs/${id}`,
      method: 'get'
    })
  },
  disable(id) {
    return request({
      url: `/goods/disable/${id}`,
      method: 'put'
    })
  },
  enable(id) {
    return request({
      url: `/goods/enable/${id}`,
      method: 'put'
    })
  },
  GoodsUpdate(goods) {
    return request({
      url: `/goods/update`,
      method: 'put',
      data: goods
    })
  },
  Category3List() {
    return request({
      url: `/goods/category3List`,
      method: 'get',
    })
  },
  GoodsInfo(id) {
    return request({
      url: `/goods/${id}`,
      method: 'get'
    })
  },
  AddGoods(goods) {
    return request({
      url: `/goods/create`,
      method: 'post',
      data: goods,
    })
  },
  Category3Update(category3) {
    return request({
      url: `/goods/category3/update`,
      method: 'put',
      data: category3,
    })
  },
  loadCategory1() {
    return request({
      url: `/goods/category1List`,
      method: 'get'
    })
  },
  loadCategory2(category1Id) {
    return request({
      url: `/goods/category2List/${category1Id}`,
      method: 'get'
    })
  },
  loadCategory3(category2Id) {
    return request({
      url: `/goods/category3List/${category2Id}`,
      method: 'get',
    })
  }
}

