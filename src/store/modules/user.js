import axios from "axios";
import { name } from '../../utils/constants'

const state = () => ({
    isAuthorized: null,
    userData: null,
    failedLogin: null
});

const mutations = {
    setUserData(state, payload) {
        state.userData = payload
    },
    setFailedLogin(state, payload) {
        state.failedLogin = payload
    },
    setIsAuthorized(state, payload) {
        state.isAuthorized = payload
    }
};

const actions = {
    async getUserData({ commit }, payload) {
        const { username, password } = payload
        // https://dummyjson.com/users koristi ove kredencijale
        await axios.post('api/auth/login', {
            username: username,
            password: password
        }, { withCredentials: true })
            .then(response => {
                commit('setUserData', response.data)
                commit('setIsAuthorized', true)
                sessionStorage.setItem(name.user, JSON.stringify(response.data))
            })
            .catch(error => {
                commit('setFailedLogin', true)
                console.log(error)
            })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
