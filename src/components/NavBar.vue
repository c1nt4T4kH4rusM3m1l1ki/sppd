<template>
    <div class="grid grid-cols-3 mt-3">
        <div class="grid grid-cols-4">
            <div>
                <label class="btn btn-circle shadow-md" for="my_modal_6">
                    <img src="./icon/power-on.png">
                </label>
                <logout />
            </div>
            <div class="col-span-3"></div>
        </div>

        <div class="col-span-2 flex justify-end">
            <ul class="menu lg:menu-horizontal bg-stone-200 shadow-sm shadow-stone-200/50  rounded-xl ">
                <li class="font-bold">
                    <RouterLink to="/">
                        <home-icon /> DASHBOARD
                    </RouterLink>
                </li>

                <li class="font-bold">
                    <RouterLink to="/nama-pegawai">
                        <human-icon /> NAMA PEGAWAI
                    </RouterLink>
                </li>

                <li>




                    <div class="jam">
                        <span>{{ jam }}:</span>
                        <span>{{ menit }}:</span>
                        <span>{{ detik }}</span>
                    </div>



                </li>


            </ul>
        </div>

    </div>
</template>


<script>
import { RouterLink } from 'vue-router';
import HomeIcon from './icon/HomeIcon.vue'
import humanIcon from './icon/humanIcon.vue'
import logout from './modal/logout.vue'

export default {
    name: 'NavBar',
    components: {
        'home-icon': HomeIcon,
        'human-icon': humanIcon,
        'logout': logout
    },
    data() {
        return {
            waktu: new Date(),
        }
    },
    mounted() {
        setInterval(() => {
            this.waktu = new Date();
        }, 1000);
    },
    computed: {
        jam() {
            return this.waktu.getHours().toString().padStart(2, '0');
        },
        menit() {
            return this.waktu.getMinutes().toString().padStart(2, '0');
        },
        detik() {
            return this.waktu.getSeconds().toString().padStart(2, '0');
        },
    }
}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap');

.jam {
    font-family: "Kode Mono", monospace;
    font-size: large;
    font-weight: bold;
    font-style: normal;
    border: 1px dotted black;
}
</style>