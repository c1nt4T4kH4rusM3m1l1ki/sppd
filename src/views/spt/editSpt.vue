<template>
    <nav-bar />
    <h1 class="text-center mt-10 text-xl font-bold">EDIT SPT</h1>
    <form>
        <!-- Dasar dan Maksud -->
        <hr>
        <div class="flex justify-end">
            <RouterLink to="/" class="btn btn-sm btn-outline  m-3 rounded-xl shadow-md"> Batal</RouterLink>
            <button @click.prevent="putSpt" class="btn btn-sm btn-outline m-3 rounded-xl shadow-md" v-if="showEdit">
                <span class="material-symbols-outlined">save</span>Simpan
            </button>
            <button @click="toggleEdit" class="btn btn-sm btn-outline m-3 rounded-xl shadow-md" v-if="!showEdit">
                <span class="material-symbols-outlined">edit</span>Edit
            </button>

            <div class=" m-3 btn-sm">
                <span class="material-symbols-outlined link link-hover" @click="delSpt">delete</span>
            </div>
        </div>

        <div class="container grid grid-cols-2 rounded-t-lg border-t-2 border-l-2 border-r-2 border-gray-400  p-4">
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Dasar Pelaksanaan:</label>
                <textarea v-model="dasar" type="text" class="textarea textarea-bordered text-base h-32 leading-5"
                    :disabled="!showEdit" required></textarea>
            </div>
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Maksud Pelaksanaan:</label>
                <textarea v-model="maksud" type="text" class="textarea textarea-bordered text-base h-32 leading-5"
                    :disabled="!showEdit" required></textarea>
            </div>
        </div>
        <!-- untuk dan pengikut -->
        <div class="container grid grid-cols-2  border-l-2 border-r-2 border-gray-400 p-4">

            <div class="join join-vertical mx-3">
                <div class="grid grid-cols-2">
                    <div>
                        <label class="mr-2 font-bold">Yang Melaksanakan:</label>
                        <select class="select select-bordered w-60 mt-5" :disabled="!showEdit" v-model="person"
                            required>
                            <option>...</option>
                            <option v-for="dt in listPegawai" :key="dt.id">{{ dt.nama }}</option>
                        </select>
                    </div>

                    <!-- PENGIKUT -->
                    <div>
                        <label class="mr-2 font-bold">Pengikut:</label>
                        <select v-model="pengikut1" class="select select-bordered w-60 my-2" :disabled="!showEdit">
                            <option>...</option>
                            <option v-for="dt in listPegawai" :key="dt.id">{{ dt.nama }}</option>
                        </select>
                        <select v-model="pengikut2" class="select select-bordered w-60 my-2" :disabled="!showEdit">
                            <option>...</option>
                            <option v-for="dt in listPegawai" :key="dt.id">{{ dt.nama }}</option>
                        </select>
                        <select v-model="pengikut3" class="select select-bordered w-60 my-2" :disabled="!showEdit">
                            <option>...</option>
                            <option v-for="dt in listPegawai" :key="dt.id">{{ dt.nama }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="join join-vertical mx-3">
                <div class="grid grid-cols-2">
                    <!-- tanggal Berangkat Kembali -->
                    <div>
                        <div class="join join-vertical mx-3">
                            <label class="mr-2 font-bold">Tanggal Berangkat:</label>
                            <input v-model="tanggalBerangkat" type="date"
                                class="input input-bordered input-lg text-md h-12 w-60" :disabled="!showEdit" required>
                        </div>
                        <div class="join join-vertical mx-3 mt-5">
                            <label class="mr-2 font-bold">Tanggal Kembali:</label>
                            <input v-model="tanggalKembali" type="date"
                                class="input input-bordered input-lg text-md h-12 w-60" :disabled="!showEdit" required>
                        </div>
                    </div>
                    <!-- tujuan kendaraan -->
                    <div>
                        <div class="join join-vertical mx-3">
                            <label class="mr-2 font-bold ">Tujuan:</label>
                            <input v-model="tujuanBerangkat" type="text" class="input input-bordered  my-2 w-60"
                                :disabled="!showEdit" required>
                        </div>
                        <div class="join join-vertical mt-3 mx-3">
                            <label class="mr-2 font-bold">Jenis Kendaraan:</label>
                            <select v-show="showEdit" v-model="jenisKendaran" class="select select-bordered w-60 mt-5"
                                required>
                                <option v-for="list in listKendaraan" :value="list.nama">{{ list.nama }}</option>
                            </select>
                            <input v-model="jenisKendaraan" type="text" class="input input-bordered  my-2 w-60"
                                v-show="!showEdit" disabled>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <!-- TANGGAL-->
        <!-- tanggal SPT -->

        <div
            class="container flex justify-between rounded-b-lg border-b-2 border-l-2 border-r-2 border-gray-400 p-4 text-md">
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">PPTK:</label>
                <select v-model="pptk" class="select select-bordered w-60 mt-5" :disabled="!showEdit" required>
                    <option></option>
                    <option v-for="peg in listPegawai" :key="peg.id">{{ peg.nama }}</option>
                </select>
            </div>
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Tanggal SPT:</label>
                <input v-model="tanggalSpt" type="date" class="input input-bordered input-lg w-60 h-12"
                    :disabled="!showEdit" required>
            </div>
            <div class="join join-vertical mx-3">
                <label class="mr-2 font-bold">Tanggal SPPD:</label>
                <input v-model="tanggalSpd" type="date" class="input input-bordered input-lg w-60 h-12"
                    :disabled="!showEdit" required>
            </div>

        </div>

    </form>
</template>

<script>
import router from '@/router';



export default {


    data() {
        return {
            id: this.$route.params.id,
            showEdit: false,
            urlSpt: 'https://spdlitbang-default-rtdb.asia-southeast1.firebasedatabase.app/sptlitbang/',
            authSpt: '?auth=OqPRtuNUjSs38CMvGuUDRD7zC1e4ryuBGNjIAmwE',
            urlPegawai: 'https://script.google.com/macros/s/AKfycbyhL61kogjBCM0ipJzEnNjKZ959zx3ru6P7RtrcURCEUlkR8wz0sS1N_n27tLCQfQnB/exec',

            // DATA
            dasar: '',
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

            listPegawai: [],
            listKendaraan: [
                {
                    nama: "Kendaraan Dinas",
                },
                {
                    nama: "Kendaraan Umum",
                },
                {
                    nama: "Kendaraan Operasional"
                }
            ]
        }
    },
    methods: {
        toggleEdit() {
            this.showEdit = !this.showEdit
        },
        async getSpt() {
            const res = await fetch(this.urlSpt + this.id + '.json' + this.authSpt);
            if (!res.ok) {
                throw new Error(`terjadi masalah : ${res.statusText}`)
            }
            const data = await res.json();

            this.dasar = data.dasarSpd
            this.maksud = data.maksud
            this.parta = data.untuk.parta
            this.partb = data.untuk.partb
            this.partc = data.untuk.partc
            this.person = data.person
            this.pengikut1 = data.pengikut1
            this.pengikut2 = data.pengikut2
            this.pengikut3 = data.pengikut3
            this.tanggalSpt = data.tanggalSpt
            this.tanggalSpd = data.tanggalSpd
            this.tanggalBerangkat = data.tanggalBerangkat
            this.tanggalKembali = data.tanggalKembali
            this.pptk = data.pptk
            this.jenisKendaraan = data.jenisKendaraan
            this.tujuanBerangkat = data.tujuanBerangkat

        },
        async getListPegawai() {
            const res = await fetch(this.urlPegawai)
            if (!res.ok) {
                throw new Error(`Terjadi Masalah : ${res.statusText}`)
            }

            const data = await res.json();

            this.listPegawai = data
        },
        delSpt() {

            try {
                fetch(this.urlSpt + this.id + '.json' + this.authSpt, {
                    method: "delete",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        alert("Data Berhasil dihapus")
                    })
            } catch (err) {
                consle.error(`error menghapus data ${err}`)
                alert("Gagal Menghapus data")
            }
            router.go(-1)
        },
        putSpt() {

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

            fetch(this.urlSpt + this.id + '.json' + this.authSpt, {
                method: 'PUT',
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

                    this.getListPegawai()

                    alert("Data SPT " + data.person + " berhasil di Ubah")
                    this.toggleEdit()
                })
                .catch(err => {
                    console.error("Error:", err); // Log the error message
                    // Provide more specific error feedback to the user
                });
        }
    },
    created() {
        this.getSpt()
        this.getListPegawai()
    }
}
</script>
