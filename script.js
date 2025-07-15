document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav'); // Target a container instead

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            // This toggles a class on the nav container
            // We will handle the show/hide with CSS for better performance and animations
            mainNav.classList.toggle('active');
        });
    }
});

// --- Modal Trainer ---

// Data profil trainer (LENGKAPI DATA INI DENGAN BENAR)
const trainersData = {
    Alif: {
        name: "Alif",
        image: "images/alif.jpg",
        description: "Dengan rekam jejak yang solid di bidang legislasi, debat, dan pengembangan skill, Alif membawa energi baru ke YouthTrainer. Ia memiliki ketertarikan mendalam pada bidang pemerintahan dan pengembangan sumber daya, yang ia terapkan saat menjadi fasilitator di berbagai kegiatan kepemudaan.  Alif akan memandu para peserta untuk tidak hanya berani berbicara, tetapi juga berpikir kritis dan membangun argumen yang kuat, skill yang esensial di dunia profesional.",
        profile: "Public Speaker Bersertifikasi (C.PS) dengan keahlian dalam kepemimpinan. ",
        education: "S1 Hukum Tata Negara, Universitas Islam Negeri Sunan Ampel Surabaya",
        organization: "Mantan Ketua Umum Duta Kesehatan Sidoarjo (2021 - 2023)"
    },
    Iqbal: {
        name: "Iqbal",
        image: "images/iqbal2.jpg",
        description: "Iqbal adalah lulusan S1 Sosiologi Agama yang memiliki pengalaman teruji dalam kepemimpinan dan pengembangan masyarakat. Perannya sebagai Ketua Umum Himpunan Mahasiswa telah mengasah kemampuannya dalam komunikasi, manajemen tim, dan perencanaan program kerja. Ia adalah pribadi yang mudah beradaptasi dan bersemangat untuk berkontribusi dalam membentuk para pemimpin masa depan bersama YouthTrainer.",
        profile: "Trainer dengan keahlian dalam kepemimpinan, komunikasi, dan pembangunan komunitas yang siap menginspirasi generasi muda.",
        education: "S1 Sosiologi Agama, Universitas Islam Negeri Syekh Wasil Kediri",
        organization: "Mantan Ketua Umum Himpunan Mahasiswa Prodi Sosiologi Agama (2023 - 2024)"
    },
    Amirul: {
        name: "Amirul",
        image: "images/amirul.png",
        description: "Dengan latar belakang di Sistem Informasi, Amirul membawa kombinasi unik antara keterampilan teknis dan soft skill kepemimpinan. Ia telah terbukti berhasil memimpin berbagai acara, mengelola tim, dan berkoordinasi dengan berbagai pihak. Di YouthTrainer, ia siap membagikan keahliannya untuk membantu setiap ide kreatif agar dapat tervisualisasikan dengan baik.",
        profile: "Anggota tim YouthTrainer dengan keahlian di bidang teknologi untuk mendukung kreativitas anak muda.",
        education: "S1 Sistem Informasi, Universitas Negeri Surabaya",
        organization: "Staff Divisi Penalaran Riset & Teknologi Himpunan Mahasiswa Prodi Sistem Informasi (2024)"
    }
};

const trainerCards = document.querySelectorAll('.trainer-card');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
let scrollPosition = 0;

function openModal(trainer) {
    if (trainer) {
        // 1. Hitung lebar scrollbar untuk kompensasi
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        // 2. Simpan posisi scroll saat ini
        scrollPosition = window.pageYOffset;
        
        // 3. Isi konten modal
        modalBody.innerHTML = `
            <div class="trainer-modal-content">
                <img src="${trainer.image}" alt="Foto ${trainer.name}">
                <h3>${trainer.name}</h3>
                <p class="trainer-profile">${trainer.profile}</p>
                <div class="trainer-details">
                    <div class="detail-item">
                        <i class="fas fa-graduation-cap"></i>
                        <span>${trainer.education}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-users"></i>
                        <span>${trainer.organization}</span>
                    </div>
                </div>
                <p class="trainer-description">${trainer.description}</p>
            </div>
        `;
        
        // 4. Terapkan padding kanan ke body
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        // 5. Tampilkan modal dan kunci scroll
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
        document.body.style.top = `-${scrollPosition}px`;
    }
}

function closeModal() {
    // Matikan sementara smooth scroll agar tidak ada animasi
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Hapus kelas dan style untuk membuka kembali scroll
    document.body.classList.remove('modal-open');
    document.body.style.top = '';

    // Hapus padding kanan yang ditambahkan
    document.body.style.paddingRight = '';

    // Kembalikan ke posisi scroll semula secara instan
    window.scrollTo(0, scrollPosition);

    // Sembunyikan modal
    modalOverlay.classList.remove('active');
    
    // Kembalikan lagi smooth scroll setelahnya
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Tambahkan event listener untuk setiap kartu trainer
trainerCards.forEach(card => {
    card.addEventListener('click', () => {
        const trainerId = card.getAttribute('data-trainer');
        openModal(trainersData[trainerId]);
    });
});

// Event listener untuk tombol close dan area luar modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

// --- Auto-scroll untuk Galeri Proyek di Mobile ---

document.addEventListener('DOMContentLoaded', () => {
    // Cek jika lebar layar adalah untuk perangkat mobile (misalnya, 768px atau kurang)
    if (window.innerWidth <= 768) {
        const portfolioContainer = document.querySelector('.portfolio-grid-layout');
        let scrollInterval;

        const startScrolling = () => {
            // Hentikan interval sebelumnya jika ada
            clearInterval(scrollInterval);
            
            // Mulai interval baru untuk menggulir
            scrollInterval = setInterval(() => {
                // Jika sudah di ujung, kembali ke awal
                if (portfolioContainer.scrollLeft + portfolioContainer.clientWidth >= portfolioContainer.scrollWidth) {
                    portfolioContainer.scrollLeft = 0;
                } else {
                    // Gulir 1 pixel ke kanan
                    portfolioContainer.scrollLeft += 1;
                }
            }, 35); // Angka ini mengontrol kecepatan (semakin besar semakin lambat)
        };

        const stopScrolling = () => {
            clearInterval(scrollInterval);
        };

        // Mulai menggulir saat halaman dimuat
        startScrolling();

        // Berhenti menggulir saat disentuh/hover
        portfolioContainer.addEventListener('mouseenter', stopScrolling);
        
        // Lanjutkan menggulir saat sentuhan/hover dilepas
        portfolioContainer.addEventListener('mouseleave', startScrolling);
    }
});
// Anda perlu menambahkan CSS untuk class .active ini di file style.css
// Contoh (tambahkan di akhir file CSS Anda):
/*
@media (max-width: 768px) {
    .main-nav {
        display: none; // sembunyi by default
    }
    .main-nav.active {
        display: block;
        position: absolute;
        top: 70px; // tinggi header
        left: 0;
        width: 100%;
        background: white;
        box-shadow: var(--shadow-md);
    }
    .main-nav.active .nav-links {
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        align-items: flex-start;
    }
}
*/