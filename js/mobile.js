// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    // Toggle do menu
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Suporte a toque para dropdowns (se houver)
    const dropdowns = document.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
});

// Suave rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Ajuste para o header fixo
                behavior: 'smooth'
            });
        }
    });
});

// Otimização de imagens para mobile
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Garante que as imagens não ultrapassem a largura da tela
        if (img.width > window.innerWidth) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    });
}

// Executa na carga e no redimensionamento da janela
window.addEventListener('load', optimizeImages);
window.addEventListener('resize', optimizeImages);
