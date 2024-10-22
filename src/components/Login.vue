<template>
    <div class="login-image" style="background-image: url('../../public/images/firmbee-com-SpVHcbuKi6E-unsplash.jpg')"></div>
    <section class="login">
        <form class="login-form" @submit.prevent="handleLogin">
            <h2>Prijava</h2>
            <p>Unesite vaše kredencijale</p>
            <div class="login-form-control">
                <label for="username">Korisničko ime *</label>
                <input type="text" id="username" v-model="loginForm.username" @input="validateInput('username', ['required'])" class="input"/>
                <p class="form-error" v-if="errors.username">{{ errors.username }}</p>
            </div>
            <div class="login-form-control">
                <label for="password">Lozinka *</label>
                <div class="login-form-control-password">
                    <input id="password" :type="getType" v-model="loginForm.password" @input="validateInput('password', ['required', 'minLength'])" class="input"/>
                    <span class="password-eye" :class="getIcon" @click="showPassword = !showPassword"></span>
                </div>
                <p class="form-error" v-if="errors.password">{{ errors.password }}</p>
            </div>
            <button type="submit" ref="submitBtn" class="btn-submit" :class="{ disabled: isDisabledButton }" :disabled="isDisabledButton">Potvrdi</button>
            <p class="form-error mt-4" v-if="failedLogin">{{ loginError }}</p>
        </form>
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from '../store';
import { name, path } from '../utils/constants'
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '' // Inače bi vrednost bila heš, zbog sistema implementacije je string
            },
            errors: {
                username: '',
                password: ''
            },
            loginError: '',
            isDisabledButton: true,
            showPassword: false
        }
    },
    computed: {
        ...mapState('user', ['failedLogin']),
        getIcon() {
            return this.showPassword ? 'icon-eye' : 'icon-eye-blocked'
        },
        getType() {
            return this.showPassword ? 'text' : 'password'
        }
    },
    methods: {
        ...mapActions('user', ['getUserData']),
        async handleLogin() {
            store.commit('user/setFailedLogin', false)
            await this.getUserData(this.loginForm)

            if (this.failedLogin)
                this.loginError = 'Korisničko ime ili lozinka nisu ispravni'
            else {
                sessionStorage.setItem(name.path, path.plp)          
                store.commit('route/setPath', path.plp)
            }
        },
        validateInput(field, type, minLength = 6) {
            if (type.indexOf('required') !== -1 && !this.loginForm[field]) {
                this.errors[field] = `Polje ${field} je obavezno.`
            }
            else if (type.indexOf('minLength') !== -1 && this.loginForm[field].length < minLength) {
                this.errors[field] = `Unos u ${field} mora imati najmanje ${minLength} karaktera.`
            }
            else {
                this.errors[field] = ''
            }

            this.disableButton()
        },
        disableButton() {
            const hasAllValues = Object.values(this.loginForm).every(input => input)

            if (hasAllValues)
                this.isDisabledButton = !Object.values(this.errors).every(error => !error) && hasAllValues
        }
    }
}
</script>

<style>
</style>