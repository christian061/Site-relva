document.addEventListener('DOMContentLoaded', function() {
    // Criar bolhas flutuantes
    function createBubbles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        for (let i = 0; i < 20; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Tamanho aleatório entre 10px e 40px
            const size = Math.random() * 30 + 10;
            
            // Posição aleatória na tela
            const posX = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            
            // Aplicar estilos
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${posX}%`;
            bubble.style.bottom = `-${size}px`;
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.opacity = Math.random() * 0.6 + 0.1;
            
            hero.appendChild(bubble);
        }
    }
    
    // Criar ondinhas no rodapé
    function createWaves() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const wave = document.createElement('div');
        wave.className = 'wave';
        hero.appendChild(wave);
    }
    // Inicializar efeitos
    createBubbles();
    createWaves();
    createTwinklingStars();
    
    // Adicionar classe de animação nos cards
    document.querySelectorAll('.specialty-card').forEach((card, index) => {
        card.style.setProperty('--i', index);
        card.classList.add('glow-on-hover');
    });
    
    // Efeito de digitação no título com arco-íris
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.backgroundImage = 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF)';
        heroTitle.style.webkitBackgroundClip = 'text';
        heroTitle.style.backgroundClip = 'text';
        heroTitle.style.color = 'transparent';
        heroTitle.style.backgroundSize = '300% 300%';
        heroTitle.style.animation = 'rainbow 5s ease infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar animação após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // Efeito de balanço nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = '';
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }

    // Efeito de flutuação nos cards
    const cards = document.querySelectorAll('.specialty-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            card.style.boxShadow = `${-angleY}px ${angleX}px 20px rgba(0, 0, 0, 0.1)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Criar estrelinhas cintilantes
    function createTwinklingStars() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Número de estrelas
        const starCount = 30;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Tamanho aleatório entre 2px e 6px
            const size = Math.random() * 4 + 2;
            
            // Posição aleatória na tela
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Atraso e duração da animação
            const delay = Math.random() * 5;
            const duration = 2 + Math.random() * 3;
            
            // Aplicar estilos
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;
            
            // Adicionar ao hero
            hero.appendChild(star);
        }
    }
    
    // Efeito de confete no clique dos botões
    function createConfetti(button) {
        const colors = ['#00A8E8', '#FF6B6B', '#4CAF50', '#FFD700', '#9C27B0'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Estilos do confete
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            
            // Posição inicial
            const rect = button.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            
            confetti.style.position = 'fixed';
            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // Adicionar ao body
            document.body.appendChild(confetti);
            
            // Animação
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 5;
            const rotation = Math.random() * 360;
            
            const animation = confetti.animate([
                {
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * 100}px, ${Math.sin(angle) * 100 - 100}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
            });
            
            // Remover após a animação
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Adicionar evento de clique nos botões
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            createConfetti(button);
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
                    mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.main-nav a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.main-nav a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Initialize AOS (Animate On Scroll) if needed
    // You'll need to include AOS library in your HTML
    // AOS.init({
    //     duration: 1000,
    //     once: true
    // });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.specialty-card, .team-member, .about-content, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initialize animation on page load
    animateOnScroll();
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
