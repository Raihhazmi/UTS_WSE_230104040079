# 🛡️ Praktikum 7 --- RESTful API Hardening & Observability

### Mata Kuliah: **Web Service Engineering (20251)**

Repositori: **P7_Hardening_230104040079**

## 📌 1. Deskripsi Praktikum

Praktikum ini berfokus pada peningkatan kualitas dan keamanan API hasil
UTS dengan menambahkan fitur **API Hardening** serta **Observability**
(logging & monitoring).\
Tujuan utama adalah membuat API menjadi:

-   Lebih **aman**
-   Lebih **stabil**
-   Mudah **dipantau** dan **di-debug**

Fitur yang diimplementasikan:

-   🔐 **Security Middleware**: Helmet, CORS, Rate Limit\
-   ⚙️ **Environment Variable**: dotenv\
-   📄 **Request Logging**: Morgan\
-   ❗ **Global Error Handler** yang konsisten\
-   ❤️ **Health & Metrics Endpoint** (/api/health)

## 🎯 2. Learning Outcomes

1.  Menerapkan middleware keamanan (Helmet, CORS, Rate Limit).
2.  Mengelola environment configuration menggunakan **.env**.
3.  Mengimplementasikan logging API menggunakan **Morgan**.
4.  Membuat Global Error Handler reusable.
5.  Membuat endpoint observability `/api/health`.
6.  Memahami dasar observability dalam Web Service Engineering.

## 📂 3. Prasyarat

-   Praktikum 5\
-   Praktikum 6\
-   UTS\
    Project pada praktikum ini merupakan lanjutan dari **project UTS**.

## ⚙️ 4. Setup Project

1.  Buat folder project baru:

        P7_Hardening_230104040079/

2.  Pindahkan project hasil UTS ke dalam folder tersebut.

3.  Install dependency berikut:

    ``` bash
    npm install helmet cors express-rate-limit dotenv morgan
    ```

4.  Buat file `.env`:

        PORT=3000
        RATE_LIMIT=100
        NODE_ENV=development

5.  Buat file `.env.example` dengan struktur variabel yang sama.

## 🔐 5. Implementasi Security & Observability

### A. Security Middleware

``` js
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
```

**Rate Limiter:**

``` js
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.RATE_LIMIT,
  message: { status: "fail", message: "Terlalu banyak request." }
});

app.use(limiter);
```

### B. Logging (Morgan)

``` js
const morgan = require('morgan');
app.use(morgan('combined'));
```

### C. Global Error Handler

**File:** `src/middlewares/errorHandler.js`

``` js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
```

Tambahkan ke `app.js`:

``` js
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
```

### D. Health Endpoint

``` js
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});
```

## 🗂️ 6. Struktur Folder Project

    src/
    ├── app.js
    ├── routes/
    │   └── movies.routes.js
    ├── controllers/
    │   └── movies.controller.js
    ├── middlewares/
    │   ├── errorHandler.js
    │   ├── logger.js
    │   └── limiter.js
    ├── utils/
    │   └── env.js
    ├── data/
    │   └── movies.data.js
    ├── logs/
    │   └── access.log
    └── .env

## 🧪 7. Pengujian API

| Method | Endpoint            | Deskripsi                               | Autentikasi | Status Code      | Keterangan                               |
|--------|----------------------|-------------------------------------------|-------------|------------------|-------------------------------------------|
| GET    | /api/<resource>      | Mendapatkan semua data resource           | Tidak       | 200              | Resource berasal dari project UTS         |
| GET    | /api/<resource>/:id  | Mendapatkan data berdasarkan ID           | Tidak       | 200 / 404        | 404 jika ID tidak ditemukan               |
| POST   | /api/<resource>      | Menambah data baru                        | Tidak       | 201 / 400        | Validasi input wajib                      |
| PUT    | /api/<resource>/:id  | Mengubah data berdasarkan ID              | Tidak       | 200 / 400 / 404  | Konsisten dengan RESTful principles       |
| DELETE | /api/<resource>/:id  | Menghapus data berdasarkan ID             | Tidak       | 204 / 404        | Response kosong jika berhasil             |
| GET    | /api/info            | Menampilkan informasi service             | Tidak       | 200              | Metadata API & identitas                  |
| GET    | /api/health          | Mengecek status API                       | Tidak       | 200              | Monitoring uptime & environment           |
| ANY    | endpoint tidak dikenal | Handler 404 global                     | Tidak       | 404              | Ditangani oleh middleware                 |
| ERROR  | internal server error | Global Error Handler                    | Tidak       | 500              | Response error JSON                       |


## 📤 8. Output Praktikum

Folder `/evidence/P8/` berisi: - Screenshot hasil uji API\
- File `.env` dan `.env.example`\
- `README_P8.md`\
- Project lengkap **P7_Hardening_230104040079**

## 9 📝 Bukti pengerjaan
| Aksi                                     | Gambar |
|------------------------------------------|--------|
| 🟢 GET — Ambil semua movies              | ![GET All](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/GET%20API%20MOVIES.png) |
| 🟢 GET — Ambil movies by ID              | ![GET by ID 200](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/GET%20API%20MOVIES%20BY%20ID%20(200).png) |
| 🔴 GET — Ambil movies by ID (404)        | ![GET by ID 404](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/GET%20API%20MOVIES%20BY%20ID%20(404).png) |
| 🟡 POST — Tambah movies baru (201)       | ![POST 201](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/POST%20TAMBAH%20DATA%20BARU%20(201).png) |
| 🔴 POST — Tambah movies baru (400)       | ![POST 400](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/POST%20TAMBAH%20DATA%20BARU%20(400).png) |
| 🔵 PUT — Update movies by ID (200)       | ![PUT 200](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/PUT%20UBAH%20DATA%20BY%20ID%20(200).png) |
| 🔴 PUT — Update movies by ID (400)       | ![PUT 400](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/PUT%20UBAH%20DATA%20BY%20ID%20(400).png) |
| 🔴 PUT — Update movies by ID (404)       | ![PUT 404](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/PUT%20UBAH%20DATA%20BY%20ID%20(404).png) |
| 🔴 DELETE — Hapus movies by ID (204)     | ![DELETE 204](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/DEL%20HAPUS%20DATA%20BY%20ID%20(204).png) |
| 🔴 DELETE — Hapus movies by ID (404)     | ![DELETE 404](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/DEL%20HAPUS%20DATA%20BY%20ID%20(404).png) |
| ⚙️ GET — API Info                        | ![GET INFO](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/GET%20API%20INFO.png) |
| ⚙️ GET — Health Check                    | ![HEALTH](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/GET%20UJI%20HEALTH%20END%20POINT.png) |
| 🔐 LIMITTER — Cegah spam request (429)   | ![429](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/API%20MOVIES%20LIMITTER%20(429).png) |
| 🔴 Global 404 Handler                    | ![404 Handler](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/GET%20GLOBAL%20404%20HANDLER.png) |
| 🔥 Global Error Handler (500)            | ![500 Handler](https://github.com/Raihhazmi/UTS_WSE_230104040079/blob/main/ScreenShots/global%20eror%20handler%20500.png) |

## 📎 10. Catatan Tambahan

-   Gunakan resource **movies** dari project UTS.\
-   Pastikan seluruh struktur project mengikuti arsitektur modular.
