<template>
    <div class="full-image image-overlay" style="background-image: url('../../public/images/product-page-image.jpg');"></div>
    <main class="main">
        <navbar />
        <section class="grid grid-cols-1 mt-8 place-items-center">
            <button type="button" class="plp-back" @click="goToPLP">
                <span class="icon-arrow-right"></span>
                <span class="ml-2">Nazad</span>
            </button>
            <div class="card mt-8" v-if="product">
                <span class="price text-2x1">Brend: {{ product.brand }}</span>
                <img class="rounded-t-lg" :src="product.images[0]" alt="thumbnail" />
                <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight">{{ product.title }}</h5>
                    <span class="block price text-2x1 mt-2">Ocena: {{ product.rating }}</span>
                    <span class="block price text-2x1 mt-4">Cena: {{ product.price }}</span>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import store from '../store';
import { name, path } from '../utils/constants'
import Navbar from './Navbar.vue';
export default {
    components: { Navbar },
    data() {
        return {
            product: null
        }
    },
    mounted() {
        this.product = JSON.parse(sessionStorage.getItem(name.pdp))
    },
    methods: {
        goToPLP() {
            sessionStorage.setItem(name.path, path.plp)          
            store.commit('route/setPath', path.plp)
        }
    }
}
</script>

<style>

</style>