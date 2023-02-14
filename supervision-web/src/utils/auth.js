import Cookies from 'js-cookie'

const opkenKey = 'Admin-Token1'
const AcTokenKey = 'Admin-Token'
const mirTokenKey = 'Admin-Token2'
const psTokenKey = 'Admin-Token3'
const spvTokenKey = 'Admin-Token4'

export function getToken() {
  return Cookies.get(spvTokenKey)
}

export function setToken(token) {
  return Cookies.set(spvTokenKey, token)
}

export function removeToken() {
  Cookies.remove(opkenKey)
  Cookies.remove(mirTokenKey)
  Cookies.remove(AcTokenKey)
  Cookies.remove(psTokenKey)
  return Cookies.remove(spvTokenKey)
}
