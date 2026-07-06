# Album Kenangan Kelas

Website album kenangan kelas (realtime, pakai Firebase Firestore + Storage) dengan
panel admin untuk kelola data siswa, galeri, dan pengaturan halaman.

## Struktur Proyek

- `index.html` — Halaman utama (publik)
- `admin.html` — Panel admin (dilindungi password, lihat di bawah)
- `firebase.js` — Konfigurasi koneksi Firebase
- `firestore.rules` — Security rules Firestore (lihat catatan keamanan di bawah)
- `server.ts` — Server Express yang menyajikan file-file di atas

## Menjalankan di Lokal

**Prasyarat:** Node.js 18+

1. Install dependencies:
   ```
   npm install
   ```
2. (Opsional tapi disarankan) Salin `.env.example` menjadi `.env` dan isi
   `ADMIN_PASSWORD` dengan password pilihanmu untuk melindungi `/admin`.
3. Jalankan:
   ```
   npm run dev
   ```
4. Buka `http://localhost:3000` (halaman utama) atau `http://localhost:3000/admin` (panel admin).

## Deploy ke Railway

1. Push project ini ke GitHub (lihat bagian bawah).
2. Di Railway, buat project baru dari repo GitHub tersebut. Railway akan otomatis
   mendeteksi ini sebagai project Node.js dan menjalankan `npm run build` lalu `npm start`.
3. Di tab **Variables** Railway, tambahkan:
   - `ADMIN_PASSWORD` — password untuk halaman `/admin` (wajib diisi kalau situs ini publik!)
   - `PORT` tidak perlu diisi manual, Railway mengaturnya sendiri.
4. Deploy. Situs bisa diakses lewat domain yang diberikan Railway.

## Push ke GitHub

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Catatan Keamanan (penting, tolong dibaca)

- Panel admin (`/admin`) sekarang dilindungi password lewat `ADMIN_PASSWORD` di server.
  **Kalau env var ini tidak diset, panel admin terbuka untuk siapa saja** yang tahu URL-nya.
- `firestore.rules` saat ini mengizinkan siapa saja membaca **dan menulis** semua data
  (students, gallery, settings, requests) langsung lewat Firebase SDK, terlepas dari
  password admin di atas — karena aplikasi ini belum pakai Firebase Authentication.
  Artinya seseorang yang cukup paham teknis masih bisa mengubah/menghapus data langsung
  ke Firestore tanpa lewat halaman admin sama sekali.
  Untuk menutup celah ini sepenuhnya, perlu ditambahkan Firebase Authentication
  (login khusus admin) lalu ganti rules `write` menjadi mensyaratkan `request.auth != null`.
  Untuk album kenangan kelas biasa, risiko utamanya adalah orang iseng menghapus/mengubah
  data — sesuaikan dengan seberapa penting hal ini untukmu.

## Firebase Setup

Skema data yang dipakai (koleksi Firestore) didokumentasikan di `firebase-blueprint.json`
untuk referensi kalau ingin menambah field baru.
