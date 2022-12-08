import { login, phone, privateKey, logout, getInfo } from '@/api/login'
import { getToken, setToken,setTokenOp, removeToken } from '@/utils/auth'
import { encrypt } from '@/utils/jsencrypt';
import { getDidInfo } from '@/api/did'



const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        permissions: [],
        userData: {},
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
        SET_USERINFO: (state, userData) => {
            state.userData = userData
        }
    },

    actions: {
        // 登录
        OpSetToken({commit},opToken){
            console.log('??')
            setTokenOp(opToken)
            commit('SET_TOKEN', opToken)
        },
        Login({ commit }, userInfo) {
            console.log(userInfo)
            const username = encrypt(userInfo.username.trim())
            const password = encrypt(userInfo.password)
            const phoneNumber = encrypt(userInfo.phone)
            const code = userInfo.code
            const uuid = userInfo.uuid
            const receiveCode = userInfo.smsCde
            const key = encrypt(userInfo.privateKey)
            console.log(userInfo.activeName == 'three', 'three');
            return new Promise((resolve, reject) => {
                if (userInfo.activeName == 'first') {
                    login(username, password, code, uuid).then(res => {
                        setToken(res.token)
                        commit('SET_TOKEN', res.token)
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                } else if (userInfo.activeName == 'second') {
                    phone(phoneNumber, code, uuid, receiveCode).then(res => {
                        setToken(res.token)
                        commit('SET_TOKEN', res.token)
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                } else if (userInfo.activeName == 'three') {
                    console.log(userInfo.activeName == 'three', 'three');
                    privateKey(key, code, uuid).then(res => {
                        setToken(res.token)
                        commit('SET_TOKEN', res.token)
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                }

            })
        },
        //获取did用户信息
        GetDidInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getDidInfo().then(res => {
                    console.log(res)
                    commit('SET_USERINFO', res.data)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {

                    console.log('// 获取用户信息!!!', res)
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

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
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