<template>
    <div class="full-image image-overlay" style="background-image: url('../../public/images/home.jpg');"></div>
    <main class="main">
        <navbar />
        <div class="profile">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium">
                    User Profile
                </h3>
                <p class="mt-1 text-sm">
                    This is some information about the user.
                </p>
            </div>
            <div class="border-t px-4 py-5 sm:p-0">
                <dl class="sm:divide-y">
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium">
                            Korisničko ime
                        </dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            {{ userData?.username }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium">
                            Email adresa
                        </dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            {{ userData?.email }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium">
                            Ime
                        </dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            {{ userData?.firstName }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium">
                            Prezime
                        </dt>
                        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                            {{ userData?.lastName }}
                        </dd>
                    </div>
                    <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium">
                            Slika
                        </dt>
                        <dd class="mt-1 max-w-24 text-sm sm:mt-0 sm:col-span-2 ml-auto mr-auto">
                            <img :src="userData?.image" alt="korisnička slika">
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './Navbar.vue'
export default {
    components: { Navbar },
    computed: {
        ...mapState('user', ['userData'])
    }
}
</script>

<style>

</style>