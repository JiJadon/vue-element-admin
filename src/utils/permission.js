import store from '@/store'

export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    //需要的权限是一个数组
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
