<template>
    <home v-if="isPath(paths.home)" />
    <login v-if="isPath(paths.login)" />
    <plp v-if="isPath(paths.plp)" />
    <pdp v-if="isPath(paths.pdp)" />
    <profile v-if="isPath(paths.profile)" />
    <theme-toggle />
</template>

<script>
import { mapState } from 'vuex';
import { path, name } from './utils/constants';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import Plp from './components/Plp.vue';
import Pdp from './components/Pdp.vue';
import Profile from './components/Profile.vue';
import store from './store';

export default {
    data() {
        return {
            paths: {
                home: path.home,
                login: path.login,
                plp: path.plp,
                pdp: path.pdp,
                profile: path.profile,
            },
        };
    },
    computed: {
        ...mapState('route', ['path']),
        ...mapState('user', ['isAuthorized']),
        isPath() {
            return (path) => {
                return this.path === path
            };
        },
    },
    created() {
        if (sessionStorage.getItem(name.user))
            store.commit('user/setIsAuthorized', true)
        
        this.handleRoutes()
        this.getUserFromStorage()
    },
    components: {
        Login,
        ThemeToggle,
        Home,
        Plp,
        Pdp,
        Profile
    },
    methods: {
        handleRoutes() {
            if (!sessionStorage.getItem(name.path) && sessionStorage.getItem(name.path) === path.home)
                store.commit('route/setPath', path.home)
            if (sessionStorage.getItem(name.path) === path.login && !this.isAuthorized)
                store.commit('route/setPath', path.login)
            if (sessionStorage.getItem(name.path) === path.plp && this.isAuthorized)
                store.commit('route/setPath', path.plp)
            if (sessionStorage.getItem(name.path) === path.pdp && this.isAuthorized)
                store.commit('route/setPath', path.pdp)
            if (sessionStorage.getItem(name.path) === path.profile && this.isAuthorized)
                store.commit('route/setPath', path.profile)
        },
        getUserFromStorage() {
            if (sessionStorage.getItem(name.user))
                store.commit('user/setUserData', JSON.parse(sessionStorage.getItem(name.user)))
            else
                store.commit('user/setUserData', null)
        }
    },
};
</script>

<style scoped></style>
