<template>
  <nav-bar />
  <div class="countaier-lg  p-3">

    <h1 class=" mt-4 flex justify-center font-bold nicon text-3xl">Perjalanan Dinas</h1>

    <div class="overflow-x-auto mt-3">
      <div class="btn-success shadow-lg btn btn-sm mb-3 text-white" v-on:click="redirek">
        BUAT SPT <span class="material-symbols-outlined">flightsmode</span>
      </div>
      <div class="w-full h-96 overflow-auto touch-auto">

        <table class="table border border-slate-300 text-md">
          <!-- head -->
          <thead class="text-center border border-slate-300 font-bold text-black sticky top-0 bg-emerald-300">
            <tr class="border border-gray-400">
              <th rowspan="2" class="border border-gray-400 hidden" width="3%">ID</th>
              <th rowspan="2" class="border border-gray-400" width="16%">NAMA</th>
              <th rowspan="2" class="border border-gray-400" width="13%">TGl DL</th>
              <th rowspan="2" class="border border-gray-400" width="30%">MAKSUD SPD</th>
              <th rowspan="2" class="border border-gray-400" width="9%">CETAK</th>
              <th colspan="3">Link Download</th>
              <th rowspan="2" class="border border-gray-400" style="width: 5%">ACT</th>
            </tr>
            <tr>
              <th class="border border-gray-400">SPT</th>
              <th class="border border-gray-400">SPPD</th>
              <th class="border border-gray-400">Laporan</th>
            </tr>
          </thead>


          <tbody class="border border-gray-400 bg-emerald-50">
            <!-- row 1 -->

            <tr v-for=" row  in  sptModel " :key="row[0]">
              <th class="border border-gray-400 text-center hidden">{{ row[0] }}</th>
              <td class="border border-gray-400">
                <ol class="text-start ml-4 list-none">
                  <li>{{ row[1].person }}</li>
                  <li>{{ row[1].pengikut1 }}</li>
                  <li>{{ row[1].pengikut2 }}</li>
                  <li>{{ row[1].pengikut3 }}</li>
                </ol>
              </td>
              <td class="border border-gray-400 text-center">
                {{ tanggalIndo(row[1].tanggalBerangkat) }}
                <br>s/d
                <br>
                {{ tanggalIndo(row[1].tanggalKembali) }}
              </td>
              <td class="border border-gray-400">{{ row[1].maksud }}</td>

              <td class="border border-gray-400 text-center">
                <ul>
                  <li>
                    <span class="font-bold link link-hover" @click="toggleSpt">SPT</span>
                    <ul v-show="showSpt">
                      <li><a class="link link-hover" @click="buatSptWako(row[0],
        // idSpt, urlSpd, laporan, sptKaban, sptSekda
        row[1].url.spd,
        row[1].url.laporan,
        row[1].url.sptKaban,
        row[1].url.sptSekda
      )">Wako</a></li>
                      <li><a class="link link-hover" @click="buatSptSekda(row[0],
        row[1].url.spd,
        row[1].url.laporan,
        row[1].url.sptKaban,
        row[1].url.sptWalikota
      )">Sekda</a></li>
                      <li><a class="link link-hover" @click="buatSptKaban(row[0],
        row[1].url.spd,
        row[1].url.laporan,
        row[1].url.sptSekda,
        row[1].url.sptWalikota
      )">Kaban</a></li>

                    </ul>
                  </li>

                  <li class="font-bold link link-hover" @click="buatSPD(row[0],
        row[1].url.laporan,
        row[1].url.sptKaban,
        row[1].url.sptSekda,
        row[1].url.sptWalikota,
      )">
                    SPD
                  </li>

                  <li class="font-bold link link-hover" @click="buatLaporan(row[0],
        row[1].url.spd,
        row[1].url.sptKaban,
        row[1].url.sptSekda,
        row[1].url.sptWalikota,
      )">
                    LAPORAN
                  </li>
                </ul>
              </td>

              <td class="border border-gray-400 text-center">
                <span class="loading loading-infinity loading-md" v-show="waiting"></span>
                <a :href="row[1].url.sptKaban" target="_blank" v-if="row[1].url.sptKaban" class="nicon text-lg">
                  Kaban<span class="material-symbols-outlined">print</span></a><br>
                <a :href="row[1].url.sptSekda" target="_blank" v-if="row[1].url.sptSekda" class="nicon text-lg">
                  Sekda<span class="material-symbols-outlined">print</span>
                </a><br>
                <a :href="row[1].url.sptWalikota" target="_blank" v-if="row[1].url.sptWalikota"
                  class="nicon text-lg">Wako<span class="material-symbols-outlined">print</span>
                </a>
              </td>
              <td class="border border-gray-400 text-center"><a :href="row[1].url.spd" target="_blank"
                  v-if="row[1].url.spd"><span class="material-symbols-outlined">print</span></a>
                <span class="loading loading-infinity loading-md" v-show="waiting"></span>
              </td>

              <td class="border border-gray-400 text-center"><a :href="row[1].url.laporan" target="_blank"
                  v-if="row[1].url.laporan"><span class="material-symbols-outlined">print</span></a>
                <span class="loading loading-infinity loading-md" v-show="waiting"></span>
              </td>
              <td class="border border-gray-400">
                <RouterLink :to="'/edit-spt/' + row[0]">
                  <img src="../components/icon/action.png">
                </RouterLink>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>


<script>
import globalFunction from '@/mixins/globalFunction';
import buatDokumen from '@/mixins/buatDokumen'
import router from "@/router";
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  mixins: [globalFunction, buatDokumen],
  data() {
    return {
      sptModel: [],
      showSpt: false,
      waiting: false,
      gambarPrinter: `<span class="material-symbols-outlined">print</span>`,
      urlCetakSpd: 'https://script.google.com/macros/s/AKfycbwNU4eSPxkAuCi5pJocurA608vSkjcS14cpBpLf6F2cdR4QYiLnt0fvj7oh54GEjfCfHA/exec',
      urlCetakLaporan: 'https://script.google.com/macros/s/AKfycbxH3ZPi4I2v9wSdubFOh9McnsFXqly2wwQBM-DVp7NfZDdfQFn9oG3lHGbIVt5PUVv2Ow/exec',
      urlCetakSptKaban: 'https://script.google.com/macros/s/AKfycbw9_G8Y1-ApA3HvZqY6s37NcsH40xUWWOnGNVPeZw84VVRYT4ZxwdTq6GUeIGeZu0aG/exec',
      urlCetakSptSekda: 'https://script.google.com/macros/s/AKfycbyRxrLc6drzrc6mhYd8PugzTeYl9HUCQcu2GzrBk1OGVqSCHPV4ymsEchaK4VtweSzQwg/exec',
      urlCetakSptWako: 'https://script.google.com/macros/s/AKfycbyTZ6NBFuDAA_GZwsn_kcIEg6soRzBIxn-OFVHE7hm7xuPHkdZO3MJvYMn8WOhzt7yW/exec'

    };
  },



  // METHODS
  methods: {
    async dataSpt() {
      const res = await fetch('https://spdlitbang-default-rtdb.asia-southeast1.firebasedatabase.app/sptlitbang.json?auth=OqPRtuNUjSs38CMvGuUDRD7zC1e4ryuBGNjIAmwE');
      const data = await res.json();
      let output = Object.entries(data);
      this.sptModel = output;
    },
    redirek() {
      router.push('/new-spt');
    },
    toggleSpt() {
      this.showSpt = !this.showSpt;
    },
    async buatSPD(idSpt, urlLaporan, urlSptKaban, urlSptSekda, urlSptWalikota) {
      this.waiting = true
      await this.buatDok(idSpt, urlLaporan, urlSptKaban, urlSptSekda, urlSptWalikota, this.urlCetakSpd)
      setTimeout(() => {
        alert(`Dokumen SPPD Berhasil di Buat silahkan pilih gambar Printer di (kolom SPD)`)
        this.waiting = false
        this.dataSpt();
      }, 9000);
    },
    async buatLaporan(idSpt, urlSpd, sptKaban, sptSekda, sptWalikota) {
      this.waiting = true
      await this.buatDok(idSpt, urlSpd, sptKaban, sptSekda, sptWalikota, this.urlCetakLaporan)
      setTimeout(() => {
        alert(`Laporan SPPD Berhasil di Buat silahkan pilih gambar  Printer di (kolom Laporan)`)
        this.waiting = false
        this.dataSpt();
      }, 9000)

    },
    async buatSptKaban(idSpt, urlSpd, laporan, sptSekda, sptWalikota) {
      this.waiting = true
      await this.buatDok(idSpt, urlSpd, laporan, sptSekda, sptWalikota, this.urlCetakSptKaban)
      setTimeout(() => {
        alert(`Dokumen SPT Berhasil di Buat silahkan pilih (kaban Printer) di kolom SPT`)
        this.waiting = false
        this.dataSpt();
      }, 9000)
    },
    async buatSptSekda(idSpt, urlSpd, laporan, sptKaban, sptWalikota) {
      this.waiting = true;
      await this.buatDok(idSpt, urlSpd, laporan, sptKaban, sptWalikota, this.urlCetakSptSekda);
      setTimeout(() => {
        alert(`Dokumen SPT Berhasil di Buat silahkan pilih (sekda Printer) di kolom SPT`)
        this.waiting = false
        this.dataSpt();
      }, 9000)
    },
    async buatSptWako(idSpt, urlSpd, laporan, sptKaban, sptSekda) {
      this.waiting = true
      await this.buatDok(idSpt, urlSpd, laporan, sptKaban, sptSekda, this.urlCetakSptWako);
      setTimeout(() => {
        this.waiting = false
        this.dataSpt();
        alert(`Dokumen SPT Berhasil di Buat silahkan pilih (Wako Printer) di kolom SPT`)
      }, 8000)
    }
  },




  // HOOK
  created() {
    this.dataSpt();

  }


}


</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0");

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
}
</style>
