<template>
    <input type="checkbox" id="my_modal_6" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box">
            <h3 class="font-bold text-lg text-center">Hello!</h3>
            <p class="py-4 text-red-500 text-xl text-center">Apakah Anda Yakin Ingin Keluar ?</p>
            <div class="modal-action">
                <label for="my_modal_6" class="btn btn-error" @click="Logout">Ya</label>
                <label for="my_modal_6" class="btn btn-warning">TIDAK</label>
            </div>
        </div>
    </div>
</template>
<script>
import router from '@/router';

export default {
    name: 'logout',
    data() {
        return {

        }
    },
    methods: {
        Logout() {
            localStorage.removeItem("isAuth"); // Hapus nilai autentikasi
            location.href = "/login";
        }

    },
}
</script>