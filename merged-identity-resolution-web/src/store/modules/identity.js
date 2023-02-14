const state = {
    //标识注册详情
    resolveDetail:JSON.parse(sessionStorage.getItem('resolveDetail')),
    //标识模板详情
    templateDetail: JSON.parse(sessionStorage.getItem('templateDetail')),
}
const mutations = {
    SET_RESOLVE_DETAIL: (state, data) => {
        sessionStorage.setItem('resolveDetail',JSON.stringify(data))
        state.resolveDetail = data
    },
    SET_TEMPLATE_DETAIL: (state, data) => {
        sessionStorage.setItem('templateDetail',JSON.stringify(data))
        state.templateDetail = data
    }
}
const actions = {
    setResolveDetail({ commit }, data) {
        commit('SET_RESOLVE_DETAIL', data)
    },
    settemplateDetail({ commit }, data) {
        commit('SET_TEMPLATE_DETAIL', data)
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}