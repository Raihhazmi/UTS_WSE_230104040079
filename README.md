# UTS Web Service Engineering - RESTful API (Movies Resource)

Proyek ini adalah implementasi RESTful API menggunakan Node.js dan Express.js sebagai pemenuhan tugas Ujian Tengah Semester (UTS) mata kuliah Web Service Engineering. API ini mengelola resource **Movies** sesuai dengan digit terakhir NIM (9).

## Identitas Mahasiswa
* **Nama:** [Muhammad Raihan Azmi]
* **NIM:** 230104040079
* **Kelas:** [TI23B]
* **Resource:** `movies` (Digit NIM akhir 9)

## Deskripsi Proyek
API ini menyediakan operasi CRUD (Create, Read, Update, Delete) lengkap untuk data film. Proyek ini dibangun tanpa menggunakan database eksternal (menggunakan *in-memory data* array untuk simulasi) dan menerapkan **7 Prinsip RESTful API**:
1.  **Resource-Oriented URI:** Menggunakan URI yang jelas untuk resource (`/api/movies`).
2.  **Proper HTTP Methods:** Menggunakan GET, POST, PUT, DELETE sesuai fungsinya.
3.  **Stateless Communication:** Tidak menyimpan sesi di server.
4.  **Consistent Status Codes:** Mengembalikan status kode HTTP yang tepat (200, 201, 204, 400, 404).
5.  **JSON Representation:** Semua komunikasi data menggunakan format JSON.
6.  **Validation & Error Handling:** Validasi input pada POST/PUT dan penanganan error yang rapi.
7.  **Discoverability:** Menyediakan endpoint `/api/info` sebagai metadata layanan.

## Teknologi yang Digunakan
* [Node.js](https://nodejs.org/) - Runtime environment
* [Express.js](https://expressjs.com/) - Web framework
* [Nodemon](https://nodemon.io/) - Development tool untuk auto-restart server

## Cara Instalasi dan Menjalankan

Pastikan Node.js sudah terinstal di komputer Anda.

1.  **Clone/Extract** repository ini ke komputer lokal Anda.
2.  Buka terminal dan arahkan ke direktori proyek.
3.  **Instal dependensi** dengan menjalankan perintah:
    ```bash
    npm install
    ```
4.  **Jalankan server** dalam mode development:
    ```bash
    npm run dev
    ```
5.  Server akan berjalan di `http://localhost:3000`.

## Dokumentasi API

Base URL: `http://localhost:3000/api`

### 1. Service Info
Mendapatkan informasi mengenai layanan API ini.
* **Endpoint:** `GET /info`
* **Response (200 OK):**
    ```json
    {
      "status": "success",
      "message": "API Service for UTS Web Service Engineering",
      "author": "...",
      "nim": "230104040079"
    }
    ```

### 2. Get All Movies
Mengambil daftar semua film yang tersedia.
* **Endpoint:** `GET /movies`
* **Response (200 OK):**
    ```json
    {
      "status": "success",
      "data": [
        { "id": 1, "title": "Inception", "genre": "Sci-Fi", "year": 2010 },
        { "id": 2, "title": "Interstellar", "genre": "Sci-Fi", "year": 2014 }
      ]
    }
    ```

### 3. Get Movie by ID
Mengambil detail satu film berdasarkan ID-nya.
* **Endpoint:** `GET /movies/:id`
* **Example:** `GET /movies/1`
* **Response (200 OK):**
    ```json
    {
      "status": "success",
      "data": { "id": 1, "title": "Inception", "genre": "Sci-Fi", "year": 2010 }
    }
    ```
* **Error (404 Not Found):** Jika ID tidak ditemukan.

### 4. Create New Movie
Menambahkan data film baru. Field `title` dan `genre` wajib diisi.
* **Endpoint:** `POST /movies`
* **Body (JSON):**
    ```json
    {
      "title": "The Dark Knight",
      "genre": "Action",
      "year": 2008
    }
    ```
* **Response (201 Created):**
    ```json
    {
      "status": "success",
      "message": "Data film berhasil dibuat",
      "data": { "id": 3, "title": "The Dark Knight", "genre": "Action", "year": 2008 }
    }
    ```
* **Error (400 Bad Request):** Jika field wajib kosong.

### 5. Update Movie
Memperbarui data film yang sudah ada berdasarkan ID.
* **Endpoint:** `PUT /movies/:id`
* **Example:** `PUT /movies/1`
* **Body (JSON):**
    ```json
    {
      "title": "Inception (Updated)",
      "genre": "Sci-Fi Thriller",
      "year": 2010
    }
    ```
* **Response (200 OK):** Mengembalikan data yang sudah diperbarui.
* **Error (404 Not Found):** Jika ID tidak ditemukan.

### 6. Delete Movie
Menghapus data film berdasarkan ID.
* **Endpoint:** `DELETE /movies/:id`
* **Example:** `DELETE /movies/1`
* **Response (204 No Content):** Tidak ada body response jika berhasil.
* **Error (404 Not Found):** Jika ID tidak ditemukan.

## Struktur Proyek
```
Struktur folder disusun secara modular agar mudah dikembangkan:
UTS_WSE_230104040079/
├── src/
│   ├── app.js               # File utama server
│   ├── data/
│   │   └── movies.data.js   # Data dummy film
│   ├── controllers/
│   │   └── movies.controller.js # Logika untuk setiap endpoint
│   └── routes/
│       └── movies.routes.js # Definisi semua rute API
├── .gitignore               # (Opsional, tapi sangat disarankan)
├── package.json
└── README.md                # Dokumentasi API
```

## Daftar Endpoint

| Method | Endpoint                 | Deskripsi                       |
|--------|--------------------------|---------------------------------|
| GET    | `/api/info`              | Menampilkan info API & author.  |
| GET    | `/api/movies`            | Mengambil semua data film.      |
| GET    | `/api/movies/:id`        | Mengambil data film by ID.      |
| POST   | `/api/movies`            | Menambah data film baru.        |
| PUT    | `/api/movies/:id`        | Memperbarui data film by ID.    |
| DELETE | `/api/movies/:id`        | Menghapus data film by ID.      |