// flow-data.js
const flowData = {
    case1a: {
        title: "Tukar Barang Sama (Hari Sama)",
        subtitle: "Case: Hari Sama & Produk Sama",
        colorClass: "blue",
        steps: [
            {
                title: "Step 1: Inisiasi Klaim",
                description: "Customer mendatangi meja CS dengan membawa produk serta nota pembelian asli untuk mengajukan klaim penggantian produk.",
                image: "./assets/step_one_cs.png"
            },
            {
                title: "Step 2: Pemeriksaan Fisik",
                description: "CS memeriksa kelayakan barang dan memastikan kondisi fisik produk memenuhi syarat penukaran (misal: cacat pabrik, bukan kelalaian pemakaian).",
                image: "./assets/step_two_cs.png"
            },
            {
                title: "Step 3: Penginputan Sistem",
                description: "CS mengisi formulir refund/pembatalan di dalam sistem operasional POS/ERP untuk mencatatkan riwayat retur barang secara resmi.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 4: Serah Terima (Selesai)",
                description: "Setelah dokumen divalidasi sistem, CS mengambil produk baru yang sama dari stok toko dan langsung menyerahkannya kepada customer.",
                image: "./assets/step_four_cs.png"
            }
        ]
    },
    case1b: {
        title: "Tukar Barang Beda (Hari Sama)",
        subtitle: "Case: Hari Sama & Produk Beda",
        colorClass: "blue",
        steps: [
            {
                title: "Step 1: Inisiasi CS",
                description: "Customer mendatangi meja CS dengan membawa produk serta nota pembelian asli untuk menukar dengan barang beda.",
                image: "./assets/step_one_cs.png"
            },
            {
                title: "Step 2: Pemeriksaan & Input",
                description: "CS memeriksa kondisi kelayakan barang, lalu mengisi formulir refund di dalam sistem ERP.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 3: Pembatalan di Kasir",
                description: "CS mengarahkan customer ke Kasir. Kasir memproses pembatalan (*cancel*) transaksi lama di sistem POS & menyerahkan dana pengembalian ke customer.",
                image: "./assets/cashier_pos.png"
            },
            {
                title: "Step 4: Transaksi Baru (Selesai)",
                description: "Kasir segera membuat transaksi baru untuk barang beda yang diinginkan customer, menerapkan aturan selisih harga (kembalian atau tambah bayar).",
                image: "./assets/step_four_cs.png"
            }
        ]
    },
    case1c: {
        title: "Pengembalian Dana Tunai (Hari Sama)",
        subtitle: "Case: Claim Refund Hari Sama",
        colorClass: "blue",
        steps: [
            {
                title: "Step 1: Melapor ke CS",
                description: "Customer mendatangi meja CS membawa produk & nota pembelian asli untuk meminta pengembalian dana tunai.",
                image: "./assets/step_one_cs.png"
            },
            {
                title: "Step 2: Pemeriksaan Fisik",
                description: "CS memeriksa kelayakan barang dan memastikan kondisi fisik produk memenuhi syarat retur.",
                image: "./assets/step_two_cs.png"
            },
            {
                title: "Step 3: Formulir Refund",
                description: "CS menginput formulir refund/retur ke dalam sistem ERP, lalu mengarahkan customer ke meja Kasir.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 4: Serah Terima Uang (Selesai)",
                description: "Kasir memproses pembatalan transaksi asal pada POS dan langsung mengembalikan uang tunai penuh kepada customer.",
                image: "./assets/cashier_pos.png"
            }
        ]
    },
    case2a: {
        title: "Tukar Barang Sama (Beda Hari)",
        subtitle: "Case: Beda Hari & Produk Sama",
        colorClass: "orange",
        steps: [
            {
                title: "Step 1: Inisiasi CS",
                description: "Customer melapor ke CS membawa produk & nota pembelian asal melewati tanggal pembelian.",
                image: "./assets/step_one_cs.png"
            },
            {
                title: "Step 2: Pemeriksaan Barang",
                description: "CS melakukan validasi kelayakan kondisi fisik barang dan menginput formulir retur beda hari di sistem.",
                image: "./assets/step_two_cs.png"
            },
            {
                title: "Step 3: Approval Sistem",
                description: "CS melakukan klik 'Confirm' pada formulir sistem ERP untuk menyetujui transaksi penukaran barang beda hari.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 4: Tukar Produk (Selesai)",
                description: "Setelah disetujui sistem, CS langsung memberikan produk pengganti yang baru kepada customer.",
                image: "./assets/step_four_cs.png"
            }
        ]
    },
    case2b: {
        title: "Tukar Barang Beda (Beda Hari)",
        subtitle: "Case: Beda Hari & Produk Beda",
        colorClass: "orange",
        steps: [
            {
                title: "Step 1: Melapor ke CS",
                description: "Customer datang ke meja CS membawa produk dan nota pembelian asli beda tanggal.",
                image: "./assets/step_one_cs.png"
            },
            {
                title: "Step 2: Konfirmasi Sistem CS",
                description: "CS memeriksa kondisi barang, mengisi formulir penukaran di sistem ERP, dan mengklik tombol 'Confirm'.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 3: Penerbitan Voucher",
                description: "Sistem otomatis menerbitkan Voucher Refund senilai harga beli produk sebelumnya dan mengirimkannya langsung ke customer.",
                image: "./assets/digital_voucher.png"
            },
            {
                title: "Step 4: Belanja di Kasir (Selesai)",
                description: "Customer belanja barang beda di Kasir. Kasir memproses transaksi dengan memindai Voucher Refund sebagai metode pembayaran di POS.",
                image: "./assets/cashier_pos.png"
            }
        ]
    },
    case2c: {
        title: "Klaim Pengembalian Beda Hari",
        subtitle: "Case: Claim Refund Beda Hari",
        colorClass: "orange",
        steps: [
            {
                title: "Step 1: Melapor ke CS",
                description: "Customer datang ke CS membawa produk & nota pembelian asli beda tanggal.",
                image: "./assets/step_one_cs.png"
            },
            {
                title: "Step 2: Pemeriksaan Fisik",
                description: "CS memeriksa kelayakan barang dan menginput formulir refund beda hari di sistem ERP.",
                image: "./assets/step_two_cs.png"
            },
            {
                title: "Step 3: Konfirmasi Approval",
                description: "CS melakukan klik 'Confirm' pada formulir sistem untuk memvalidasi dan menyetujui klaim refund beda hari.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 4: Terbit Voucher (Selesai)",
                description: "Sistem secara otomatis menerbitkan Voucher Refund dengan nilai nominal pengembalian yang sama persis untuk customer.",
                image: "./assets/digital_voucher.png"
            }
        ]
    },
    case3: {
        title: "Kebijakan Khusus Barang Rusak (Scrap)",
        subtitle: "Case: Is Broken = True (Scrap Otomatis)",
        colorClass: "red",
        steps: [
            {
                title: "Step 1: Temuan Barang Rusak",
                description: "CS memeriksa kelayakan barang retur dan mendapati hasil investigasi fisik barang menunjukkan status parameter is broken = true.",
                image: "./assets/step_two_cs.png"
            },
            {
                title: "Step 2: Cek Status Dokumen",
                description: "Sistem otomatis mengecek keberadaan dokumen scrap logistik berstatus 'Draft'.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 3: Penggabungan Otomatis",
                description: "Jika dokumen berstatus 'Draft' ditemukan, item barang rusak baru akan langsung digabungkan ke dokumen scrap yang sama.",
                image: "./assets/step_three_cs.png"
            },
            {
                title: "Step 4: Pembuatan Baru (Selesai)",
                description: "Jika dokumen scrap sebelumnya sudah 'Confirmed/In Process', sistem otomatis membuat dokumen scrap baru secara terpisah.",
                image: "./assets/step_one_cs.png"
            }
        ]
    }
};