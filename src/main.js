import { createApp } from 'vue'

import './css/vars.css'

import './css/components/navbar.css'
import './css/components/form.css'
import './css/components/switcher.css'
import './css/components/aside.css'

import './css/icons.css'

import './style.css' // main

import App from './App.vue'
import store from './store/index';

createApp(App).use(store).mount('#app')
