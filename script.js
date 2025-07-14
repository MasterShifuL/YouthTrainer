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