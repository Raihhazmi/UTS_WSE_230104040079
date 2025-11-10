# 📘 UTS Web Service Engineering - RESTful API (Articles Resource)

Proyek ini merupakan implementasi **RESTful API** menggunakan **Node.js** dan **Express.js** sebagai pemenuhan tugas **Ujian Tengah Semester (UTS)** mata kuliah *Web Service Engineering*.  
API ini mengelola resource **Articles**, sesuai dengan digit terakhir NIM mahasiswa (9).

---

## 👤 Identitas Mahasiswa
| Keterangan | Detail |
|-------------|---------|
| **Nama** | Muhammad Raihan Azmi |
| **NIM** | 230104040079 |
| **Kelas** | TI23B |
| **Resource** | `articles` (Digit akhir NIM: 9) |

---

## 📝 Deskripsi Proyek
API ini menyediakan operasi **CRUD (Create, Read, Update, Delete)** lengkap untuk data artikel.  
Proyek dibangun **tanpa database eksternal** (menggunakan *in-memory data array* sebagai simulasi penyimpanan), serta menerapkan **7 Prinsip RESTful API**:

1. **Resource-Oriented URI** — menggunakan URI yang jelas untuk resource (`/api/articles`)
2. **Proper HTTP Methods** — menggunakan GET, POST, PUT, DELETE sesuai fungsinya
3. **Stateless Communication** — setiap permintaan bersifat independen
4. **Consistent Status Codes** — menggunakan kode status HTTP yang tepat (200, 201, 204, 400, 404)
5. **JSON Representation** — komunikasi data menggunakan format JSON
6. **Validation & Error Handling** — validasi input dan penanganan error yang baik
7. **Discoverability** — menyediakan endpoint `/api/info` sebagai metadata layanan

---

## 🧰 Teknologi yang Digunakan
- [Node.js](https://nodejs.org/) — Runtime environment  
- [Express.js](https://expressjs.com/) — Web framework  
- [Nodemon](https://nodemon.io/) — Development tool untuk auto-restart server  

---

## ⚙️ Cara Instalasi dan Menjalankan

Pastikan **Node.js** telah terinstal di komputer Anda.

1. **Clone** atau **extract** repository ini ke komputer lokal.  
2. Buka terminal dan arahkan ke direktori proyek.  
3. Jalankan perintah berikut untuk menginstal dependensi:
   ```bash
   npm install
   ```
4. Jalankan server dalam mode development:
   ```bash
   npm run dev
   ```
5. Server akan berjalan pada:
   ```
   http://localhost:3000
   ```

---

## 📚 Dokumentasi API

**Base URL:** `http://localhost:3000/api`

### 1. Service Info
**Endpoint:** `GET /info`  
**Deskripsi:** Menampilkan informasi tentang layanan API.  

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "API Service for UTS Web Service Engineering",
  "author": "Muhammad Raihan Azmi",
  "nim": "230104040079"
}
```

---

### 2. Get All Articles
**Endpoint:** `GET /articles`  
**Deskripsi:** Mengambil semua data artikel.  

**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    { "id": 1, "title": "Understanding RESTful APIs", "author": "John Doe", "year": 2024 },
    { "id": 2, "title": "Node.js for Beginners", "author": "Jane Doe", "year": 2023 }
  ]
}
```

---

### 3. Get Article by ID
**Endpoint:** `GET /articles/:id`  
**Example:** `/api/articles/1`  

**Response (200 OK):**
```json
{
  "status": "success",
  "data": { "id": 1, "title": "Understanding RESTful APIs", "author": "John Doe", "year": 2024 }
}
```

**Error (404 Not Found):**
```json
{
  "status": "error",
  "message": "Artikel tidak ditemukan"
}
```

---

### 4. Create New Article
**Endpoint:** `POST /articles`  
**Deskripsi:** Menambahkan artikel baru.  
**Body (JSON):**
```json
{
  "title": "Modern Web Development",
  "author": "Alex Smith",
  "year": 2025
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Artikel berhasil dibuat",
  "data": { "id": 3, "title": "Modern Web Development", "author": "Alex Smith", "year": 2025 }
}
```

**Error (400 Bad Request):**
```json
{
  "status": "error",
  "message": "Field title dan author wajib diisi"
}
```

---

### 5. Update Article
**Endpoint:** `PUT /articles/:id`  
**Deskripsi:** Memperbarui artikel berdasarkan ID.  
**Example:** `/api/articles/2`  
**Body (JSON):**
```json
{
  "title": "Node.js Advanced Concepts",
  "author": "Jane Doe",
  "year": 2024
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Artikel berhasil diperbarui",
  "data": { "id": 2, "title": "Node.js Advanced Concepts", "author": "Jane Doe", "year": 2024 }
}
```

**Error (400 / 404):**
```json
{
  "status": "error",
  "message": "Artikel tidak ditemukan atau data tidak valid"
}
```

---

### 6. Delete Article
**Endpoint:** `DELETE /articles/:id`  
**Deskripsi:** Menghapus artikel berdasarkan ID.  
**Example:** `/api/articles/3`

**Response (204 No Content):**  
*(Tidak ada body response)*

**Error (404 Not Found):**
```json
{
  "status": "error",
  "message": "Artikel tidak ditemukan"
}
```

---

## 📂 Struktur Proyek
```
UTS_WSE_230104040079/
├── src/
│   ├── app.js                    # File utama server
│   ├── data/
│   │   └── articles.data.js      # Data dummy artikel
│   ├── controllers/
│   │   └── articles.controller.js # Logika untuk setiap endpoint
│   └── routes/
│       └── articles.routes.js    # Definisi semua rute API
├── package.json
└── README.md
```

---

## 🔗 Daftar Endpoint

| Method | Endpoint             | Deskripsi               | Status          |
|--------|-----------------------|--------------------------|-----------------|
| GET    | `/api/articles`       | Ambil semua artikel      | 200             |
| GET    | `/api/articles/:id`   | Ambil artikel by ID      | 200 / 404       |
| POST   | `/api/articles`       | Tambah artikel baru      | 201 / 400       |
| PUT    | `/api/articles/:id`   | Update full artikel      | 200 / 400 / 404 |
| DELETE | `/api/articles/:id`   | Hapus artikel            | 204 / 404       |
| GET    | `/api/info`           | Cek status API           | 200             |

---

## 💡 Catatan
Proyek ini dibuat untuk memenuhi tugas **UTS Web Service Engineering** dan dapat dijadikan dasar pengembangan layanan API lebih lanjut dengan integrasi ke database seperti **MongoDB** atau **PostgreSQL**.
