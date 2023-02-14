import { passwordLogin, phoneLogin, bidLogin, logout, getInfo, getUserDigitalInfo } from '@/api/login/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { encrypt, decrypt } from "@/utils/jsencrypt";

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    userInfo: {

    },
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_USERINFO: (state, info) => {
      state.userInfo = info
      //解密后**替代
      if(state.userInfo.phonenumber){
        state.userInfo.phonenumber = decrypt(state.userInfo.phonenumber)
        let newStr = String(state.userInfo.phonenumber.slice(3, 6))
        state.userInfo.phonenumber = state.userInfo.phonenumber.replace(newStr, '****')
      }
     if(state.userInfo.email){
      state.userInfo.email= decrypt(state.userInfo.email)
      let newStr = state.userInfo.email.slice(3, 8)
      state.userInfo.email = state.userInfo.email.replace(newStr, '******')
     }
    }
  },
  actions: {
    // 密码登录
    passwordLogin({ commit }, userInfo) {
      let username = encrypt(userInfo.username.trim())
      let password = encrypt(userInfo.password)
      let code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        passwordLogin(username, password, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手机登录
    phoneLogin({ commit }, userInfo) {
      const phoneNumber = encrypt(userInfo.phoneNumber.trim())
      const receiveCode = encrypt(userInfo.receiveCode)
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        phoneLogin(phoneNumber, receiveCode, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // BID登录
    bidLogin({ commit }, userInfo) {
      const privateKey = encrypt(userInfo.privateKey.trim())
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        bidLogin(privateKey, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user
          const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/profile.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.userName)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取用户数字信息
    GetUserDigitalInfo({ commit, state }) {
      getUserDigitalInfo().then(res => {
        commit('SET_USERINFO', res.data)
      })
    },
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
