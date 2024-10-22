import { createStore } from 'vuex';
import user from './modules/user';
import route from './modules/route';

export default createStore({
    modules: {
        user,
        route
    },
});