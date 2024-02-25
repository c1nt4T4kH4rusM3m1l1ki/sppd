<template>
    <nav-bar />
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />



    <h1 class="flex justify-center font-semibold nicon text-3xl">Profil Pegawai</h1>


    <div class="sm:container mt-2 p-8 bg-teal-600 rounded-lg shadow-xl">

        <from class="grid grid-cols-2">

            <label class="form-control w-full max-w-sm m-2">
                <div class="label">
                    <span class="label-text nicon text-2xl">Nama</span>
                </div>
                <input type="text" v-model="nama" :disabled="shw" class="input input-bordered w-full max-w-xl" />
            </label>

            <label class="form-control w-full max-w-sm m-2">
                <div class="label">
                    <span class="label-text nicon text-2xl">Nip</span>
                </div>
                <input type="text" v-model="nip" :disabled="shw" class="input input-bordered w-full max-w-xl" />
            </label>

            <label class="form-control w-full max-w-sm m-2">
                <div class="label">
                    <span class="label-text nicon text-2xl">Pangkat</span>
                </div>
                <select class="select select-bordered w-full max-w-" v-model="pangkat" :disabled="shw">
                    <option v-for="list in listPangkat" :key="pangkat">{{ list }}</option>
                </select>
            </label>

            <label class="form-control w-full max-w-sm m-2">
                <div class="label">
                    <span class="label-text nicon text-2xl">Golongan</span>
                </div>
                <input type="text" v-model="compGolongan" class="input input-bordered w-full max-w-xl" readonly />
            </label>

            <label class="form-control w-full max-w-sm m-2">
                <div class="label">
                    <span class="label-text nicon text-2xl">Jabatan</span>
                </div>
                <input type="text" v-model="jabatan" :disabled="shw" class="input input-bordered w-full max-w-xl" />
            </label>

            <label class="form-control w-full max-w-sm m-2">
                <div class="label">
                    <span class="label-text nicon text-2xl">Tingkat Spd</span>
                </div>
                <input type="text" v-model="tingkatSpd" :disabled="shw" class="input input-bordered w-full max-w-xl" />
            </label>

            <label class="form-control w-full max-w-sm m-2">
                <div class="label" v-on:click="toggleDate">
                    <span class="label-text nicon text-2xl">Tanggal Lahir</span>
                </div>
                <input type="date" v-model="tglLahir" :disabled="shw" class="input input-bordered w-full max-w-xl" />
            </label>

            <!-- TOMBOL -->

            <div class="ml-2 mt-3">
                <button class="btn btn-primary btn-sm" v-on:click="toggleDisabled" v-show="shw">
                    <span class="material-symbols-outlined">edit_note </span> EDIT
                </button>
                <button class="btn btn-accent btn-sm" v-on:click="kirimEdit" v-show="simpanShow">
                    <span class="material-symbols-outlined">save</span> SIMPAN
                </button>
            </div>

            <div>
                <RouterLink to="/nama-pegawai" class="btn btn-neutral mr-3 btn-sm">
                    <span class="material-symbols-outlined">fast_rewind</span> KEMBALI
                </RouterLink>
                <button class="btn btn-error btn-sm" v-on:click="delData">
                    <span class="material-symbols-outlined ">
                        delete
                    </span> HAPUS
                </button>
            </div>
        </from>





    </div>
</template>

<script>
import globalFunction from '@/mixins/globalFunction';
import router from '@/router';
import moment from 'moment'


export default {
    mixins: [globalFunction],
    name: "ProfilPegawai",
    data() {
        return {
            shw: true,
            simpanShow: false,
            dateShow: true,
            listPangkat: [
                'Penata Muda',
                'Penata Muda TK I',
                'Penata',
                'Penata Tingkat I',
                'Pembina',
                'Pembina Tingkat I',
                'Pembina Utama Muda',
                'Pembina Utama Madya',
                'Pembina Utama'
            ],

            id: this.$route.params.id,
            nama: '',
            nip: '',
            pangkat: '',
            jabatan: '',
            tingkatSpd: '',
            tglLahir: '',
            urlPerson: "https://script.google.com/macros/s/AKfycbyhL61kogjBCM0ipJzEnNjKZ959zx3ru6P7RtrcURCEUlkR8wz0sS1N_n27tLCQfQnB/exec?id=",
            url: "https://script.google.com/macros/s/AKfycbyhL61kogjBCM0ipJzEnNjKZ959zx3ru6P7RtrcURCEUlkR8wz0sS1N_n27tLCQfQnB/exec"
        }
    },


    // METHOD
    methods: {
        async getPerson() {
            try {
                const res = await fetch(this.urlPerson + this.id);
                if (!res.ok) {
                    throw new error(`terjadi masalah: ${res.statusText}`)
                }
                const data = await res.json();
                this.nama = data['nama'];
                this.nip = data['nip'];
                this.pangkat = data['pangkat'];
                this.jabatan = data['jabatan'];
                this.tingkatSpd = data['tingkatSPD'];
                this.tglLahir = moment(data['tanggalLahir']).format("YYYY-MM-DD");
            } catch (er) {
                console.error('Error fetching employee data:', er);
            }
        },
        toggleDisabled() {
            this.shw = !this.shw
            this.simpanShow = !this.simpanShow
        },
        async kirimEdit() {
            let obData = {
                'aksi': 'edit',
                'id': this.id,
                'nama': this.nama,
                'nip': this.nip,
                'jabatan': this.jabatan,
                'pangkat': this.pangkat,
                'gol': this.compGolongan,
                'tgllLahir': this.tglLahir,
                'tingkatSpd': this.tingkatSpd,
            };

            await fetch(this.url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obData, function (key, value) {
                    if (key === "id") {
                        return parseInt(value)
                    }
                    return value;
                }),
            })
                .then(response => response.text())
                .then(data => console.log(data),
                    alert("Data Berhasil Di Ubah")
                )
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.toggleDisabled();
            this.textDate = "text";
        },
        async delData() {
            const dta = {
                'aksi': 'hapus',
                'id': this.id
            }
            try {
                const response = await fetch(this.url, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dta, (key, value) => (key === 'id' ? parseInt(value) : value))
                });

                const data = await response.text();
                router.push('/nama-pegawai'); // Navigasi setelah penghapusan berhasil
                alert(`Data ${data} Berhasil Dihapus`);

            } catch (err) {
                console.error('Error menghapus data:', err);
                alert(`Error: Tidak dapat menghapus data. Silakan coba lagi.`);
            }
        }


    },

    // COMPUTEd
    computed: {
        compGolongan() {
            switch (this.pangkat) {
                case 'Penata Muda':
                    return 'III.a'
                case 'Penata Muda TK I':
                    return 'III.b'
                case 'Penata':
                    return 'III.c'
                case 'Penata Tingkat I':
                    return 'III.d'
                case 'Pembina':
                    return 'IV.a'
                case 'Pembina Tingkat I':
                    return 'IV.b'
                case 'Pembina Utama Muda':
                    return 'IV.c'
                case 'Pembina Utama Madya':
                    return 'IV.d'
                case 'Pembina Utama':
                    return 'IV.c'
                case '':
                    return ''
                default:
                    return ''
            }
        }
    },

    // HOOK
    mounted() {
        this.getPerson()
    },
}
</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
}

span {
    color: white;
}
</style>