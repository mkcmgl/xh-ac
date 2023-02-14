import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token1'
const AcTokenKey = 'Admin-Token'
const mirTokenKey = 'Admin-Token2'
const pcTokenKey = 'Admin-Token3'
const spvTokenKey = 'Admin-Token4'

export function getToken() {
  return Cookies.get(pcTokenKey)
}

export function setToken(token) {
  return Cookies.set(pcTokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(AcTokenKey)
  Cookies.remove(mirTokenKey)
  Cookies.remove(spvTokenKey)
  return Cookies.remove(pcTokenKey)
}
export function removeOrtherToken() {
  Cookies.remove(mirTokenKey)
  Cookies.remove(AcTokenKey)
  Cookies.remove(spvTokenKey)
}
