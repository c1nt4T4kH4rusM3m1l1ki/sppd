<template>
    <nav-bar />
    <h1 class="text-center mt-10 text-xl font-bold" @click="redi">INPUT SPT BARU</h1>
    <form>
        <!-- Dasar dan Maksud -->
        <hr>
        <div class="flex justify-end">
            <RouterLink to="/" class="btn btn-sm btn-error  m-3 rounded-md shadow-sm"> Batal</RouterLink>
            <button class="btn btn-sm btn-accent m-3 rounded-md shadow-sm" v-on:click.prevent="postPegawai">Kirim</button>
        </div>

        <div class="container bg-emerald-400 rounded-t-xl grid grid-cols-2 p-4">
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Dasar Pelaksanaan:</label>
                <textarea v-model="dasar" type="text" class="textarea textarea-bordered text-base h-32 leading-5"
                    required></textarea>
            </div>
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Maksud Pelaksanaan:</label>
                <textarea v-model="maksud" type="text" class="textarea textarea-bordered text-base h-32 leading-5"
                    required></textarea>
            </div>
        </div>
        <!-- untuk dan pengikut -->
        <div class="container bg-emerald-400 rounded-b-xl grid grid-cols-2  p-4">
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Untuk (Misi SPT) :</label>
                <ul class="grid grid-cols-1">
                    <li>
                        <input v-model="parta" type="text" class="input input-bordered w-full my-2" required>
                    </li>
                    <li>
                        <input v-model="partb" type="text" class="input input-bordered w-full my-2">
                    </li>
                    <li>
                        <input v-model="partc" type="text" class="input input-bordered w-full my-2">
                    </li>

                </ul>
            </div>
            <div class="join join-vertical mx-3">
                <div class="grid grid-cols-2">
                    <div>
                        <label class="mr-2 font-bold">Yang Melaksanakan:</label>
                        <select v-model="person" class="select select-bordered w-60 mt-5" @click="getPegawai" required>
                            <option>---</option>
                            <option v-for="peg in listPegawai" :key="peg.id">{{ peg.nama }}</option>
                        </select>
                    </div>

                    <!-- PENGIKUT -->
                    <div>
                        <label class="mr-2 font-bold">Pengikut:</label>
                        <select v-model="pengikut1" class="select select-bordered w-60 my-2">
                            <option>---</option>
                            <option v-for="peg in listPegawai" :key="peg.id">{{ peg.nama }}</option>
                        </select>
                        <select v-model="pengikut2" class="select select-bordered w-60 my-2">
                            <option>---</option>
                            <option v-for="peg in listPegawai" :key="peg.id">{{ peg.nama }}</option>
                        </select>
                        <select v-model="pengikut3" class="select select-bordered w-60 my-2">
                            <option>---</option>
                            <option v-for="peg in listPegawai" :key="peg.id">{{ peg.nama }}</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>

        <hr>
        <!-- TANGGAL-->
        <!-- tanggal SPT -->
        <h2 class="text-center font-bold text-xl my-5">Tanggal</h2>
        <div class="container bg-emerald-400 rounded-t-xl grid grid-cols-4  p-4">
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Tanggal SPT:</label>
                <input v-model="tanggalSpt" type="date" class="input input-bordered input-lg text-md" required>
            </div>
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Tanggal SPPD:</label>
                <input v-model="tanggalSpd" type="date" class="input input-bordered input-lg text-md" required>
            </div>
            <!-- tanggal Berangkat Kembali -->
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Berangkat:</label>
                <input v-model="tanggalBerangkat" type="date" class="input input-bordered input-lg text-md" required>
            </div>
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Kembali:</label>
                <input v-model="tanggalKembali" type="date" class="input input-bordered input-lg text-md" required>
            </div>
        </div>

        <div class="container bg-emerald-400 mb-40 p-4 rounded-b-xl grid grid-cols-3 ">

            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Kendaraan:</label>
                <select v-model="jenisKendaran" class="select select-bordered w-60 mt-5" required>
                    <option></option>
                    <option>Kendaraan Dinas </option>
                    <option selected>Kendaraan Umum</option>
                    <option>Kendaraan Operasional</option>
                </select>
            </div>

            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">PPTK:</label>
                <select v-model="pptk" class="select select-bordered w-60 mt-5" required>
                    <option></option>
                    <option v-for="peg in listPegawai" :key="peg.id">{{ peg.nama }}</option>
                </select>
            </div>

            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold ">Tujuan:</label>
                <input v-model="tujuanBerangkat" type="text" class="input input-bordered  my-2 w-60 " required>
            </div>
        </div>


    </form>
</template>
<script>

import router from '@/router';

export default {
    data() {
        return {
            listPegawai: [],
            urlPegawai: 'https://script.google.com/macros/s/AKfycbyhL61kogjBCM0ipJzEnNjKZ959zx3ru6P7RtrcURCEUlkR8wz0sS1N_n27tLCQfQnB/exec',
            // v-model
            dasar: 'Nota Dinas dari Kepala Balitbang Kota Sungai Nomor Penuh 500.6.18/.../I/2024/BALITBANG Tanggal....2024 tentang .....',
            maksud: '',
            parta: '',
            partb: '',
            partc: '',
            person: '',
            pengikut1: '',
            pengikut2: '',
            pengikut3: '',
            tanggalSpt: '',
            tanggalSpd: '',
            tanggalBerangkat: '',
            tanggalKembali: '',
            pptk: '',
            jenisKendaran: "",
            tujuanBerangkat: "",

            urlSpt: 'https://spdlitbang-default-rtdb.asia-southeast1.firebasedatabase.app/sptlitbang.json',
            authSpt: '?auth=OqPRtuNUjSs38CMvGuUDRD7zC1e4ryuBGNjIAmwE'

        }
    },
    methods: {
        async getPegawai() {
            const req = await fetch(this.urlPegawai);
            const data = await req.json();
            this.listPegawai = data
        },
        postPegawai() {

            const objPegawai = {
                "dasarSpd": this.dasar,
                "maksud": this.maksud,
                "untuk": {
                    "parta": this.parta,
                    "partb": this.partb,
                    "partc": this.partc
                },
                "jenisKendaraan": this.jenisKendaran,
                "tujuanBerangkat": this.tujuanBerangkat,
                "person": this.person,
                "pengikut1": this.pengikut1,
                "pengikut2": this.pengikut2,
                "pengikut3": this.pengikut3,
                "pptk": this.pptk,
                "tanggalBerangkat": this.tanggalBerangkat,
                "tanggalKembali": this.tanggalKembali,
                "tanggalSpd": this.tanggalSpd,
                "tanggalSpt": this.tanggalSpt,
                "url": {
                    "laporan": "",
                    "spd": "",
                    "sptWalikota": "",
                    "sptSekda": "",
                    "sptKaban": "",
                }
            }

            fetch(this.urlSpt + this.authSpt, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objPegawai)
            })
                .then(res => {
                    if (res.ok) {
                        return res.json(); // Handle JSON response
                    } else {
                        throw new Error(`Server error: ${res.status}`); // Handle server-side errors
                    }
                })
                .then(data => {
                    // Log the received data
                    this.dasar = 'Nota Dinas dari Kepala Balitbang Kota Sungai Nomor Penuh 500.6.18/.../I/2024/BALITBANG Tanggal....2024 tentang .....'
                    this.maksud = ''
                    this.parta = ''
                    this.partb = ''
                    this.partc = ''
                    this.person = ''
                    this.pengikut1 = ''
                    this.pengikut2 = ''
                    this.pengikut3 = ''
                    this.tanggalSpt = ''
                    this.tanggalSpd = ''
                    this.tanggalBerangkat = ''
                    this.tanggalKembali = ''
                    this.pptk = ''

                    alert("Data SPT Baru Berhasil di Input")
                    router.go(-1)
                })
                .catch(err => {
                    console.error("Error:", err); // Log the error message
                    // Provide more specific error feedback to the user
                });
        }
    }
}

</script>

<style scoped>
.bg-salmon {
    background-color: #FA8072;
}
</style>