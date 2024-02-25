<template>
  <nav-bar />
  <div class="mt-4">
    <h1 class="flex justify-center font-bold nicon text-4xl">Nama Pegawai Baltibang</h1>

    <button v-on:click="() => loading = true" class="btn btn-xs bg-emerald-600 text-white"
      onclick="my_modal_4.showModal()">
      + TAMBAH PEGAWAI
    </button>

    <form-pegawai :getDataPegawai="getDataPegawai" />

    <div class="w-full h-96 overflow-auto touch-auto mt-5 bg-sky-100 table-fixed">
      <table class="table table-md">
        <!-- head -->
        <thead class="sticky top-0 bg-emerald-300">
          <tr>
            <th>ID</th>
            <th>NAMA</th>
            <th>NIP</th>
            <th>PANGKAT</th>
            <th>GOL</th>
            <th>JABATAN</th>
            <th>TINGKAT</th>
            <th>TANGGAL LAHIR</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tr v-show="loading">
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>
          <td>
            <span class="loading loading-bars loading-lg"></span>
          </td>

        </tr>
        <tbody>
          <!-- row 1 -->
          <tr v-for="p in pegawai" :key="p.id">
            <th>{{ p.id }}</th>
            <td>{{ p.nama }}</td>
            <td>{{ p.nip }}</td>
            <td>{{ p.pangkat }}</td>
            <td>{{ p.gol }}</td>
            <td>{{ p.jabatan }}</td>
            <td>{{ p.tingkatSpd }}</td>
            <td>{{ tanggalIndo(p.tanggalLahir) }}</td>
            <td>
              <RouterLink :to="'/nama-pegawai/' + p.id">
                <img width="25" height="25" src="https://img.icons8.com/pulsar-color/48/arrow.png" alt="arrow" />
              </RouterLink>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import globalFunction from '@/mixins/globalFunction';
import formPegawai from '@/components/modal/formPegawai.vue';

export default {
  components: { 'form-pegawai': formPegawai },
  mixins: [globalFunction],
  data() {
    return {
      pegawai: [], // Array untuk menyimpan data karyawan
      loading: true,
      urlPegawai: 'https://script.google.com/macros/s/AKfycbyhL61kogjBCM0ipJzEnNjKZ959zx3ru6P7RtrcURCEUlkR8wz0sS1N_n27tLCQfQnB/exec',
      parentFunc() {

        alert("Hello")
      }
    };
  },
  methods: {
    async getDataPegawai() {
      try {
        const response = await fetch(this.urlPegawai);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json(); // Konversi respon ke JSON

        this.pegawai = data
        this.loading = false
      } catch (error) {
        console.error('Error fetching employee data:', error);
        // Tampilkan pesan error ke pengguna
      }
    }

  },
  beforeMount() {
    this.getDataPegawai(); // Panggil getDataPegawai setelah komponen dimuat
  },

};

</script>


<style></style>
