<template>
    <aside class="floating-menu" :class="{ active: isNavActive }">
        <p>Tema</p>
        <label for="theme" class="switch">
            <input type="checkbox" id="theme" v-model="isThemeChecked" @change="themeChange">
            <span class="slider round" :class="themeIcon"></span>
        </label>
        <button type="button" class="icon icon-arrow-right" @click="isNavActive = !isNavActive"></button>
    </aside>
</template>

<script>
import { name } from '../utils/constants'

export default {
    data() {
        return {
            isThemeChecked: false,
            theme: '',
            isNavActive: false
        }
    },
    computed: {
        themeIcon() {
            return this.theme === name.dark ? 'icon-moon' : 'icon-sun'
        },
        checkTheme() {
            return this.theme === name.dark ? name.dark : name.light
        },
        getTheme() {
            return localStorage.getItem(name.theme);
        }
    },
    mounted() {        
        this.setThemeAttribute(this.getTheme)
        this.theme = this.getTheme
        this.isThemeChecked = this.getTheme === name.dark ? true : false
    },
    methods: {
        themeChange() {
            !this.isThemeChecked
            this.theme = this.isThemeChecked ? name.dark : name.light
            localStorage.setItem(name.theme, this.checkTheme)
            this.setThemeAttribute()
        },
        setThemeAttribute(value) {
            document.documentElement.setAttribute(name.themeAttribute, value ? value : this.checkTheme)
        }
    }
}
</script>

<style>
    .icon-sun::before, .icon-moon::before {
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
    }
</style>