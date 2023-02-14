import Cookies from 'js-cookie'

const AckenKey = 'Admin-Token'
const oPTokenKey = 'Admin-Token1'
const mirTokenKey = 'Admin-Token2'
const psTokenKey = 'Admin-Token3'
const spvTokenKey = 'Admin-Token4'
export function getToken() {
  return Cookies.get(AckenKey)
}

export function setToken(token) {
  return Cookies.set(AckenKey, token)
}

export function removeToken() {
  Cookies.remove(oPTokenKey)
  Cookies.remove(mirTokenKey)
  Cookies.remove(psTokenKey)
  Cookies.remove(spvTokenKey)
  return Cookies.remove(AckenKey)
}
export function removeOrtherToken() {
  Cookies.remove(oPTokenKey)
  Cookies.remove(mirTokenKey)
  Cookies.remove(psTokenKey)
  Cookies.remove(spvTokenKey)
}