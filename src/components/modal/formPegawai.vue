<template>
    <!-- You can open the modal using ID.showModal() method -->
    <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-5xl bg-sky-800">
            <h3 class="font-bold text-center nicon text-2xl">From Input Pegawai</h3>

            <form class="grid grid-cols-2 ml-12">
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold">Nama</span>
                    </div>
                    <input type="text" v-model="nama" class="input input-bordered w-full max-w-xs" />
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold">Nip</span>
                    </div>
                    <input type="text" v-model="nip" class="input input-bordered w-full max-w-xs" />
                </label>

                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold">Pangkat</span>
                    </div>
                    <select class="select select-bordered w-full max-w-xs" v-model="pangkat">
                        <option v-for="list in listPangkat" :key="pangkat">{{ list }}</option>
                    </select>
                </label>
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold" v-on:click="cek">Golongan</span>
                    </div>
                    <input type="text" v-model="compGolongan" class="input input-bordered w-full max-w-xs" disabled />
                </label>

                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold">Jabatan</span>
                    </div>
                    <input type="text" v-model="jabatan" class="input input-bordered w-full max-w-xs" />
                </label>

                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold">Tingkat SPD</span>
                    </div>
                    <input type="text" v-model="tingkatSpd" class="input input-bordered w-full max-w-xs" />
                </label>

                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text font-semibold">Tanggal Lahir</span>
                    </div>
                    <input type="date" v-model="tglLahir" class="input input-bordered w-full max-w-xs" />
                </label>


            </form>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button, it will close the modal -->
                    <button class="btn btn-primary mr-5" @click="inputData">Simpan</button>
                    <button class="btn btn-warning">Batal</button>
                </form>
            </div>
        </div>
    </dialog>
</template>

<script>

export default {
    props: {
        getDataPegawai: {
            type: Function,
            required: true
        },

    },
    name: "form-pegawai",
    data() {
        return {
            nama: '',
            nip: '',
            pangkat: '',
            jabatan: '',
            tglLahir: "00/00/0000",
            tingkatSpd: '',
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
            ]
        }
    },
    methods: {
        inputData() {
            console.log(this.tglLahir)
            fetch('https://script.google.com/macros/s/AKfycbyhL61kogjBCM0ipJzEnNjKZ959zx3ru6P7RtrcURCEUlkR8wz0sS1N_n27tLCQfQnB/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "nama": this.nama,
                    "nip": this.nip,
                    "jabatan": this.jabatan,
                    "pangkat": this.pangkat,
                    "gol": this.compGolongan,
                    "tglLahir": this.tglLahir,
                    "tingkatSpd": this.tingkatSpd,
                }),
            })
                .then(response => response.text())
                .then(data => {

                    this.nama = '',
                        this.nip = '',
                        this.pangkat = '',
                        this.jabatan = '',
                        this.tingkatSpd = '',
                        this.tglLahir = ''
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            this.getDataPegawai()
        },
        cek() {
            console.log(this.a)
        }

        // computed
    },
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
    }
}
</script>

<style scoped>
h3 {
    color: white;
}
</style>
<!-- > -->