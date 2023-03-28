import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password,
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: {token}
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url: `/user/userList`,
    method: 'get'
  })
}

export function getUserInfo(id) {
  return request({
    url: `/user/userInfo/${id}`,
    method: 'get'
  })
}

export function updateUser(user) {
  return request({
    url: `/user/update`,
    method: 'put',
    data: user
  })
}

export function disableUser(id) {
  return request({
    url: `/user/disable/${id}`,
    method: 'put',
  })
}

export function enableUser(id) {
  return request({
    url: `/user/enable/${id}`,
    method: 'put',
  })
}

export function getProfile(id) {
  return request({
    url: `/user/profile/${id}`,
    method: 'get',
  })
}
