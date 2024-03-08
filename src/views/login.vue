<template>
    <div>
        <h2 class="text-center nicon text-5xl mt-6">Selamat Datang</h2>

        <p class="text-center text-2xl nicon mt-4">
            "Aplikasi ini akan mempermudah anda membuat Sppd di Tahun 2024"</p>
    </div>

    <form class="flex justify-center my-12 ">
        <div class="card w-96 bg-base-100 shadow-xl">
            <h1 class="text-center nicon text-5xl mt-10">Login</h1>
            <figure class="px-10 pt-5">
                <div>
                    <!-- USERNAME -->
                    <label class="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input v-model="username" type="text" class="grow" placeholder="Username" />
                    </label>
                    <!-- PASSWORD -->
                    <label class="input input-bordered flex items-center gap-2 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                            class="w-4 h-4 opacity-70">
                            <path fill-rule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clip-rule="evenodd" />
                        </svg>
                        <input v-model="password" v-bind:type="lihatPassword" class="grow" value="masukan_password" />
                    </label>
                    <input type="checkbox" @click="togglePassword" class="mr-2 toggle toggle-success mt-2 toggle-xs" />
                    <span class="text-sm align-text-top">Lihat Password</span>
                </div>
            </figure>
            <!-- button -->
            <div class="card-body items-center text-center">
                <div class="card-actions">
                    <button type="submit" class="btn btn-outline" @click.prevent="login">LOGIN</button>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import router from '@/router'
export default {
    data() {
        return {
            showPassword: false,
            username: '',
            password: '',
        }
    },

    // METHOD
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword
        },
        login() {
            if (this.username !== 'user') {
                this.UserError = true
                this.username = ''
            } else if (this.password !== 'spenuh2024') {
                this.PassError = true
                this.password = ''
            }

            if (!this.UserError && !this.PassError) {
                localStorage.setItem('isAuth', 'xxxXXXxxx')
                location.href = "/"
            }
        }

    },



    // COMPUTED
    computed: {
        lihatPassword() {
            return this.showPassword ? "text" : "password"
        }
    }
}
</script>