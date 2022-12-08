import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenKeyOP = 'op-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}


export function setTokenOp(token) {
  return Cookies.set(TokenKeyOP, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
