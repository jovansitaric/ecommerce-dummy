<template>
    <nav class="navbar">
        <img class="logo" src="../../public/images/panda-logo.png" alt="panda logo">
        <button v-if="!isLoggedIn" type="button" class="btn" @click="goToLogin">Log in</button>
        <template v-else>
            <span class="ml-auto mr-4">{{ userData?.firstName }}</span>
            <button type="button" class="avatar-button" @click.prevent="showDropdown = !showDropdown">
                <img class="logo" :src="getAvatar" alt="avatar">
            </button>
            <div class="dropdown-menu" :class="{ active: showDropdown }">
                <ul class="dropdown-menu-list">
                    <li>
                        <a href="#" @click.prevent="goToProfile">My Profile</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </template>
    </nav>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store/index';
import { name, path } from '../utils/constants'

export default {
    data() {
        return {
            showDropdown: false   
        }
    },
    computed: {
        ...mapState('route', ['path']),
        ...mapState('user', ['userData']),
        isLoggedIn() {
            return sessionStorage.getItem(name.user)
        },
        getAvatar() {
            return this.userData?.gender === 'female' ? '../../public/images/female-avatar.png' : '../../public/images/male-avatar.png'
        }
    },
    methods: {
        goToLogin() {
            sessionStorage.setItem(name.path, path.login)
            store.commit('route/setPath', path.login)
        },
        goToProfile() {
            sessionStorage.setItem(name.path, path.profile)
            store.commit('route/setPath', path.profile)
        },
        logout() {
            sessionStorage.removeItem(name.user)
            store.commit('user/setUserData', null)
            sessionStorage.setItem(name.path, path.home)
            store.commit('route/setPath', path.home)
        }
    },
}
</script>

<style>

</style>