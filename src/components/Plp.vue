<template>
    <div class="full-image image-overlay" style="background-image: url('../../public/images/product-page-image.jpg');"></div>
    <main class="main">
        <navbar />
        <div class="search-field mt-8">
            <input class="button" ref="search" type="text" placeholder="Pretraži..." @input="filterProducts">
        </div>
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 place-items-center">
            <div class="card" v-for="product in filteredProducts" :key="product.id">
                <a href="#" @click.prevent="goToPDP(product.id)">
                    <img class="rounded-t-lg" :src="product.thumbnail" alt="thumbnail" />
                </a>
                <div class="p-5">
                    <a href="#" @click.prevent="goToPDP(product.id)">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight">{{ product.title }}</h5>
                    </a>
                    <span class="price text-2x1">{{ product.price }}</span>
                </div>
            </div>
        </section>
        <section class="pagination mt-8">
            <button type="button" class="icon icon-arrow-right rotate-180" @click=previousPage></button>
            <button type="button" class="icon icon-arrow-right ml-8" @click=nextPage></button>
        </section>
    </main>
</template>

<script>
    import axios from 'axios'
    import Navbar from './Navbar.vue'
    import { name, path } from '../utils/constants'
    import store from '../store'
    export default {
        data() {
            return {
                products: [],
                filteredProducts: [],
                maxProductsPerPage: 6,
                skip: 0
            }
        },
        mounted() {
            this.getProducts()
        },
        components: { Navbar },
        methods: {
            getProducts() {
                axios.get(`https://dummyjson.com/products?limit=${this.maxProductsPerPage}&skip=${this.skip}`)
                    .then(response => {
                        this.products = response.data.products
                        this.filteredProducts = this.products
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            filterProducts() {
                if (!this.$refs.search.value)
                    this.filteredProducts = this.products

                this.filteredProducts = this.filteredProducts.filter(product => product.title.toLowerCase().includes(this.$refs.search.value))
            },
            previousPage() {
                if (this.skip === 0) return
                this.filteredProducts = []
                this.products = []
                this.skip -= this.maxProductsPerPage
                this.getProducts()
            },
            nextPage() {
                this.filteredProducts = []
                this.products = []
                this.skip += this.maxProductsPerPage
                this.getProducts()
            },
            goToPDP(productId) {
                const singleProduct = this.filteredProducts.find(product => product.id === productId)
                sessionStorage.setItem(name.pdp, JSON.stringify(singleProduct))
                sessionStorage.setItem(name.path, path.pdp)
                store.commit('route/setPath', path.pdp)
            }
        }
    }
</script>

<style>

</style>