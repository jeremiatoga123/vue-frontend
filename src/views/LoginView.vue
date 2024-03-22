<script>

import { defineComponent } from 'vue'
import axios from 'axios';
import { useIndexStore } from '../store';

export default defineComponent({
    methods: {
        onLoginPressed() {
            // const API = `${import.meta.env.VITE_BASE_API}/login`;
            const params = {
                username: this.username,
                password: this.password
            }

            axios.post('/login', params).
                then((response) => response.data)
                .then((data) => {
                    console.log(data)
                    this.store.loadUser(data.user)
                    this.$cookies.set('token', { type: data.token_type, value: data.token.accessToken })
                    this.$router.push('/')
                }).catch((error) => {
                    alert(error.response.data.message)
                })
        },
    },
    setup() {
        const store = useIndexStore()
        return {
            store
        }
    },
    data() {
        return {
            username: null,
            password: null
        }
    },


})

</script>

<template>
    <section class="w-full h-screen bg-green-300 grid grid-cols-1 md:grid-cols-3">
        <div class="col-span-2 flex place-items-center justify-center bg-white rounded-b-3xl sm:rounded-r-3xl">
            <img src="@/assets/images/login.png" alt="">
        </div>
        <div class="flex justify-center sm:place-items-center mt-10 sm:mt-0">
            <div class="flex flex-col">
                <img src="@/assets/images/logo.png" class="w-10 h-10 mx-auto" alt="">
                <h1 class="text-4xl font-bold">Welcome Back</h1>
                <h4 class="mx-auto my-4">Please Login</h4>
                <input v-model="username" type="text" class=" bg-transparent outline-none py-3 focus:border-green-600 transition-all duration-500 border-b-2 border-black text-black placeholder-black
                    " placeholder="Username / Email">
                <input v-model="password" type="password" class=" bg-transparent outline-none py-3 focus:border-green-600 transition-all duration-500 border-b-2 border-black text-black placeholder-black
                    " placeholder="Password">
                <button class="bg-slate-700 w-full text-white py-1 px-4 font-bold rounded-full mt-4"
                    @click="onLoginPressed">Log In</button>
            </div>
        </div>
    </section>
</template>