const globalFunction ={
        data(){
            return{
               
            }
        },
        methods:{
            tanggalIndo(tgl){
                const tanggal = new Date(tgl);
                const tanggalIndonesia = tanggal.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
    
            return tanggalIndonesia
        },
        tanggalIso(tgl){
            const tanggal = new Date(tgl);
            const tahun = tanggal.getFullYear();
            const bulan = tanggal.getMonth() + 1; // Januari adalah bulan 0
            const tanggalBaru = tanggal.getDate();
            return `${tahun}-${bulan}-${tanggalBaru}`;
        },
    }
}

export default globalFunction;