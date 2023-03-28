import request from "@/utils/request";

export default {
  GetMemberList(current, pageSize) {
    return request({
      url: `/member/list/${current}/${pageSize}`,
      method: 'get'
    })
  }
}
