import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/user/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/user/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
