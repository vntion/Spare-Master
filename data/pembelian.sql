SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

/*
    Create table pembelian
*/
CREATE TABLE IF NOT EXISTS `pembelian` (
    id INT(45) NOT NULL AUTO_INCREMENT,
    isPaid BOOLEAN NOT NULL,
    totalHarga DECIMAL(12, 2) NOT NULL,
    alamat TEXT NOT NULL,
    jumlahProduk INT(10) NOT NULL,
    produkId INT(45) NOT NULL,
    akunId INT(45) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_produk FOREIGN KEY (produkId) REFERENCES produk(id) ON DELETE CASCADE,
    CONSTRAINT fk_akun FOREIGN KEY (akunId) REFERENCES akun(id) ON DELETE CASCADE
);

INSERT INTO `pembelian` (isPaid, totalHarga, alamat, jumlahProduk, produkId, akunId, createdAt)
VALUES
    (1, 150000.00, 'Jl. Thamrin No. 10, Jakarta Pusat, DKI Jakarta', 2, 1, 2, '2024-01-15 10:25:00'),
    (0, 250000.00, 'Jl. Malioboro No. 23, Yogyakarta, DI Yogyakarta', 1, 2, 3, '2024-02-12 14:45:00'),
    (1, 375000.00, 'Jl. Asia Afrika No. 99, Bandung, Jawa Barat', 3, 3, 4, '2024-03-08 09:30:00'),
    (0, 480000.00, 'Jl. Gajah Mada No. 21, Semarang, Jawa Tengah', 2, 4, 5, '2024-04-25 16:50:00'),
    (1, 560000.00, 'Jl. Pemuda No. 3, Surabaya, Jawa Timur', 1, 5, 6, '2024-05-14 11:20:00'),
    (0, 670000.00, 'Jl. Diponegoro No. 17, Malang, Jawa Timur', 3, 6, 7, '2024-06-22 13:15:00'),
    (1, 450000.00, 'Jl. Sudirman No. 8, Medan, Sumatera Utara', 2, 7, 8, '2024-07-10 18:35:00'),
    (0, 320000.00, 'Jl. Merdeka No. 12, Palembang, Sumatera Selatan', 1, 8, 9, '2024-08-01 20:10:00'),
    (1, 590000.00, 'Jl. Ahmad Yani No. 30, Makassar, Sulawesi Selatan', 3, 9, 10, '2024-09-18 08:45:00'),
    (0, 810000.00, 'Jl. Irian Jaya No. 4, Jayapura, Papua', 2, 10, 11, '2024-10-25 07:30:00'),
    (1, 290000.00, 'Jl. Kartini No. 15, Denpasar, Bali', 1, 11, 2, '2024-11-05 12:00:00'),
    (0, 480000.00, 'Jl. Veteran No. 7, Pontianak, Kalimantan Barat', 3, 12, 3, '2024-12-15 14:30:00'),
    (1, 650000.00, 'Jl. Pahlawan No. 9, Samarinda, Kalimantan Timur', 2, 13, 4, '2024-01-27 17:45:00'),
    (0, 720000.00, 'Jl. Kalimantan No. 6, Balikpapan, Kalimantan Timur', 1, 14, 5, '2024-02-03 19:20:00'),
    (1, 390000.00, 'Jl. Sumatra No. 10, Banda Aceh, Aceh', 3, 15, 6, '2024-03-18 21:50:00'),
    (0, 560000.00, 'Jl. Pattimura No. 5, Manado, Sulawesi Utara', 2, 16, 7, '2024-04-07 22:40:00'),
    (1, 750000.00, 'Jl. Hasanuddin No. 2, Ambon, Maluku', 1, 17, 8, '2024-05-19 15:30:00'),
    (0, 330000.00, 'Jl. Sisingamangaraja No. 11, Pekanbaru, Riau', 3, 18, 9, '2024-06-11 09:25:00'),
    (1, 880000.00, 'Jl. Sumatera No. 20, Jambi, Jambi', 2, 19, 10, '2024-07-29 16:50:00'),
    (0, 450000.00, 'Jl. Antasari No. 13, Banjarmasin, Kalimantan Selatan', 1, 20, 11, '2024-08-03 12:10:00'),
    (1, 620000.00, 'Jl. Tanjung Priok No. 8, Jakarta Utara, DKI Jakarta', 3, 21, 2, '2024-09-14 13:40:00'),
    (0, 280000.00, 'Jl. Diponegoro No. 25, Surakarta, Jawa Tengah', 2, 22, 3, '2024-10-28 10:00:00'),
    (1, 590000.00, 'Jl. Raden Saleh No. 19, Cirebon, Jawa Barat', 1, 23, 4, '2024-11-06 11:50:00'),
    (0, 670000.00, 'Jl. Pancasila No. 15, Kupang, Nusa Tenggara Timur', 3, 24, 5, '2024-12-12 09:15:00'),
    (1, 720000.00, 'Jl. Merdeka Barat No. 4, Mataram, Nusa Tenggara Barat', 2, 25, 6, '2024-01-31 08:40:00'),
    (0, 430000.00, 'Jl. Panglima Polim No. 11, Tangerang, Banten', 1, 26, 7, '2024-02-14 14:25:00'),
    (1, 810000.00, 'Jl. Pandawa No. 3, Bekasi, Jawa Barat', 3, 27, 8, '2024-03-05 20:00:00'),
    (0, 530000.00, 'Jl. Cokroaminoto No. 7, Depok, Jawa Barat', 2, 28, 9, '2024-04-22 15:10:00'),
    (1, 400000.00, 'Jl. Siliwangi No. 18, Bogor, Jawa Barat', 1, 29, 10, '2024-05-13 11:25:00'),
    (0, 490000.00, 'Jl. Majapahit No. 9, Tangerang Selatan, Banten', 3, 30, 11, '2024-06-30 17:45:00');


