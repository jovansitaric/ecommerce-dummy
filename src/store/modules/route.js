import { path } from '../../utils/constants'

const state = () => ({
    path: path.home,
});

const mutations = {
    setPath(state, payload) {
        state.path = payload
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
