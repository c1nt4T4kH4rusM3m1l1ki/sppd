const buatDokumen = {
    methods: {
        async buatDok(idSpt, urlLaporan, urlSptKaban, urlSptSekda, urlSptWalikota, url) {
            alert("Dokumen anda sedang diproses mohon bersabar ... ")
            await fetch(url, {
                method: "POST",
                mode: "no-cors",
                headers: {
                "content-type": "application/json"
                },
                body: JSON.stringify({
                "idSpt": idSpt,
                "laporan": urlLaporan,
                "sptKaban": urlSptKaban,
                "sptSekda": urlSptSekda,
                "sptWalikota": urlSptWalikota
                })
            });
        },
    }
}

export default buatDokumen;