import Cookies from 'js-cookie'

const opkenKey = 'Admin-Token1'
const AcTokenKey = 'Admin-Token'
const mirTokenKey = 'Admin-Token2'
const psTokenKey = 'Admin-Token3'
const spvTokenKey = 'Admin-Token4'

export function getToken() {
  return Cookies.get(mirTokenKey)
}

export function setToken(token) {
  return Cookies.set(mirTokenKey, token)
}

export function removeToken() {
  Cookies.remove(opkenKey)
  Cookies.remove(AcTokenKey)
  Cookies.remove(psTokenKey)
  Cookies.remove(spvTokenKey)
  return Cookies.remove(mirTokenKey)
}
export function removeOrtherToken() {
  Cookies.remove(opkenKey)
  Cookies.remove(psTokenKey)
  Cookies.remove(spvTokenKey)
}
