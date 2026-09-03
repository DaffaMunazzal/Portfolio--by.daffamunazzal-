/* src/data/locales/id.js
   ==========================================================================
   KONTEN BAHASA INDONESIA
   Anda dapat mengubah semua teks portfolio dalam Bahasa Indonesia di file ini.
   ========================================================================== */

export default {
  // ─── NAVIGASI ───
  nav: {
    home: "Beranda",
    about: "Tentang",
    skills: "Keahlian",
    projects: "Projects",
    experience: "Pengalaman",
    contact: "Kontak",
    decoration: "Sistem Informasi Portfolio",
  },

  // ─── HERO SECTION ───
  hero: {
    role: "Mahasiswa Sistem Informasi",
    nameLine1: "DAFFA",
    nameLine2: "MUNAZZAL",
    tagline: "BUILD. THINK. DEPLOY.",
  },

  // ─── ABOUT SECTION ───
  about: {
    sectionLabel: "Tentang Saya",
    title: "SIAPA",
    outlineTitle: "SAYA",
    bio: {
      name: "Muhammad Daffa Oemarqois Munazzal",
      university: "Institut Widya Pratama",
      major: "Sistem Informasi",
      year: "Semester 3, Angkatan 2025",
      interests: "Web Development, Database Management Systems, Machine Learning, UI/UX Design, dan Analisis Data",
      value: "Programming bukan hanya sebuah teknologi, tapi lifestyle",
      story1: "Halo Semuanya! Nama Saya {name}, mahasiswa {major} di {university} ({year}).",
      story2: "Minat saya mencakup {interests}. Saya senang mengubah permasalahan bisnis yang kompleks menjadi solusi digital yang elegan dan efisien.",
    },
    stats: [
      { value: 12, suffix: "+", label: "Projects Selesai" },
      { value: 3, suffix: "", label: "Semester Aktif" },
      { value: 7, suffix: "+", label: "Teknologi Dikuasai" },
      { value: 3, suffix: "x", label: "Sertifikasi Diterima" },
    ],
  },

  // ─── SKILLS SECTION ───
  skills: {
    sectionLabel: "Keahlian Saya",
    title: "APA YANG",
    outlineTitle: "SAYA KUASAI",
    groupTitles: {
      programming: "Programming & Development",
      database: "Database & Systems",
      analysis: "Analysis & Management",
      tools: "Tools & Design",
    },
  },

  // ─── PROJECTS SECTION ───
  projects: {
    sectionLabel: "Karya Saya",
    title: "PROJEK",
    outlineTitle: "PILIHAN",
    viewDetails: "Lihat Detail →",
    featured: "Unggulan",
    view: "Lihat",
    allCategory: "Semua",
    categories: ["Semua", "Web App", "Data Analysis", "UI/UX"],
    items: {
      1: {
        title: "SHIFTCOMP - Website Profil Perusahaan",
        shortDesc: "Sebuah website company profile yang ditujukan untuk Toko Komputer bernama SHIFTCOMP",
        fullDesc: "SHIFTCOMP merupakan website company profile yang ditujukan untuk Toko Komputer bernama SHIFTCOMP. Website ini dibangun menggunakan React dan Tailwind CSS.",
      },
      2: {
        title: "F1 DASHBOARD ANALYTICS",
        shortDesc: "Sebuah website dashboard yang ditujukan untuk menampilkan data dan statistik Formula 1.",
        fullDesc: "F1 DASHBOARD ANALYTICS merupakan website dashboard yang dibangun untuk menampilkan data dan statistik Formula 1. Dashboard ini dibangun menggunakan React dan Tailwind CSS.",
      },
      3: {
        title: "Dashboard Analitik E-Commerce",
        shortDesc: "Dashboard visualisasi data untuk menganalisis tren penjualan, perilaku pelanggan, dan inventaris.",
        fullDesc: "Dashboard analitik interaktif yang dibangun untuk UMKM lokal. Memvisualisasikan data penjualan dengan grafik dinamis (Chart.js), segmentasi pelanggan dengan algoritma K-Means clustering (Python/scikit-learn), serta rekomendasi produk berbasis AI.",
      },
      4: {
        title: "UrbanEats — UI Aplikasi Pesan Antar Makanan",
        shortDesc: "Desain UI/UX high-fidelity untuk aplikasi pesan antar makanan generasi urban millenial.",
        fullDesc: "Proyek desain UI/UX menyeluruh: mulai dari riset pengguna, perancangan persona, wireframing, hingga prototipe interaktif resolusi tinggi di Figma dengan 40+ layar. Dilengkapi design system lengkap dan laporan usability testing.",
      },
      5: {
        title: "Sistem Manajemen Acara Kampus",
        shortDesc: "Aplikasi web full-stack untuk mengelola pendaftaran acara kampus dan tiket peserta.",
        fullDesc: "Platform manajemen acara komprehensif untuk organisasi mahasiswa. Fitur pembuatan acara, registrasi online, tiket digital dengan verifikasi QR code, dan dashboard kehadiran real-time. Dilengkapi pengiriman notifikasi email otomatis.",
      },
      6: {
        title: "Analisis Kesehatan Mental Mahasiswa",
        shortDesc: "Proyek analisis data meneliti korelasi antara beban studi akademik dan kesejahteraan mahasiswa.",
        fullDesc: "Proyek riset berbasis data menggunakan survei lebih dari 200 mahasiswa. Menggunakan analisis statistik (korelasi, regresi) dan visualisasi data untuk mengidentifikasi faktor pemicu stres utama. Temuan dipresentasikan pada simposium riset kampus.",
      },
    },
  },

  // ─── EXPERIENCE & EDUCATION SECTION ───
  experience: {
    sectionLabel: "Perjalanan",
    title: "GARIS",
    outlineTitle: "WAKTU",
    items: {
      1: {
        title: "S1 Sistem Informasi",
        institution: "Institut Widya Pratama",
        location: "Pekalongan, Jawa Tengah",
        description: "Fokus pada rekayasa perangkat lunak, sistem basis data, dan manajemen proyek TI. Anggota aktif komunitas TI kampus dan asisten lab sistem informasi.",
        tags: ["Aktif", "Sistem Informasi"],
      },
      2: {
        title: "Teknik Komputer dan Jaringan",
        institution: "SMK Muhammadiyah Bligo",
        location: "Pekalongan, Jawa Tengah",
        description: "Jurusan Teknik Komputer dan Jaringan, Peserta LKS Desain Grafis 2024-2025, Desain Grafis Antusias",
        tags: ["Teknik Komputer dan Jaringan", "Desain Grafis"],
      },
      3: {
        title: "Web Developer Intern",
        institution: "PT. Teknologi Nusantara",
        location: "Surabaya (Remote)",
        description: "Berkontribusi dalam pengembangan sistem manajemen SDM internal menggunakan Laravel dan Vue.js. Mengimplementasikan RESTful API dan unit testing.",
        tags: ["Laravel", "Vue.js", "REST API", "Agile"],
      },
      4: {
        title: "Kepala Divisi IT",
        institution: "BEM Fakultas Ilmu Komputer",
        location: "Universitas Brawijaya",
        description: "Memimpin tim 8 orang untuk membangun dan memelihara platform web resmi. Menyelenggarakan 2 webinar teknologi nasional dengan 500+ peserta.",
        tags: ["Kepemimpinan", "Tim 8 Orang", "Web Dev"],
      },
      5: {
        title: "Juara 2 — Hackathon Nasional",
        institution: "Gemastik XVI (Kategori Pemrograman)",
        location: "ITS Surabaya",
        description: "Mengikuti kompetisi TI nasional. Membangun platform koordinasi tanggap darurat bencana secara real-time dalam 24 jam dengan React, Node.js, dan WebSockets.",
        tags: ["Hackathon", "Juara 2", "150+ Tim"],
      },
      6: {
        title: "Dicoding — Belajar Membuat Aplikasi Back-End",
        institution: "Dicoding Indonesia",
        location: "Online",
        description: "Menyelesaikan kelas backend tingkat mahir yang mencakup Node.js, Express, desain arsitektur REST API, dan autentikasi aman.",
        tags: ["Node.js", "Dicoding"],
      },
      7: {
        title: "Google Data Analytics Certificate",
        institution: "Coursera — Google",
        location: "Online",
        description: "Sertifikasi profesional 8 modul yang mencakup analisis data dengan Spreadsheets, SQL, R, dan Tableau.",
        tags: ["SQL", "R", "Tableau", "Google"],
      },
    },
  },

  // ─── CONTACT SECTION ───
  contact: {
    sectionLabel: "Hubungi Saya",
    title1: "AYO BANGUN",
    title2: "SESUATU",
    subtitle: "Punya project menarik, pertanyaan, atau sekadar ingin berkenalan? Saya selalu terbuka untuk diskusi!",
    form: {
      name: "Nama",
      namePlaceholder: "Nama lengkapmu",
      email: "Email",
      emailPlaceholder: "email@example.com",
      message: "Pesan",
      messagePlaceholder: "Halo, saya ingin mendiskusikan...",
      send: "Kirim Pesan",
      sending: "Mengirim...",
      sentTitle: "Pesan Terkirim!",
      sentDesc: "Terima kasih! Saya akan membalas secepatnya.",
    },
    findMe: "Temukan Saya",
    availableTitle: "Tersedia untuk Kolaborasi",
    availableDesc: "Sedang mencari peluang magang, freelance, atau project kolaborasi menarik.",
  },

  // ─── FOOTER & MODAL ───
  footer: {
    rights: "Hak Cipta Dilindungi",
    builtWith: "Dibuat dengan",
  },
  modal: {
    techStack: "Tech Stack",
    liveDemo: "Live Demo",
  },
};
