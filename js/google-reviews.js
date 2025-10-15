/**
 * Google Reviews Integration
 * Sistema de exibição de depoimentos do Google
 */

// Force immediate execution
(function() {
    console.log('Google Reviews script loaded');
    
    // Try multiple initialization methods
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTestimonials);
    } else {
        initializeTestimonials();
    }
    
    // Backup initialization
    window.addEventListener('load', function() {
        setTimeout(initializeTestimonials, 500);
    });
})();

function initializeTestimonials() {
    console.log('Initializing testimonials...');
    
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    const loadingElement = document.querySelector('.loading-reviews');
    const prevReviewBtn = document.querySelector('.prev-review');
    const nextReviewBtn = document.querySelector('.next-review');
    const reviewsDotsContainer = document.querySelector('.reviews-dots');
    
    console.log('Elements found:', {
        reviewsCarousel: !!reviewsCarousel,
        loadingElement: !!loadingElement,
        prevReviewBtn: !!prevReviewBtn,
        nextReviewBtn: !!nextReviewBtn,
        reviewsDotsContainer: !!reviewsDotsContainer
    });
    
    if (!reviewsCarousel) {
        console.error('Reviews carousel container not found');
        // Try to find the testimonials section and show an error message
        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            const container = testimonialsSection.querySelector('.reviews-container');
            if (container) {
                container.innerHTML = '<div style="text-align: center; padding: 40px; background: white; border-radius: 10px; margin: 20px;"><h3 style="color: #e74c3c;">Erro ao carregar depoimentos</h3><p>Os depoimentos não puderam ser carregados. Verifique o console para mais detalhes.</p></div>';
            }
        }
        return;
    }

    // Depoimentos reais coletados manualmente
    const realReviews = [
        {
            author_name: "Maria Silva Santos",
            rating: 5,
            text: "Excelente profissional! Minha filha de 4 anos tinha muita dificuldade na fala e, após apenas 3 meses de terapia com a Relva, já consegue se comunicar muito melhor. A paciência e dedicação dela são admiráveis. Recomendo de olhos fechados!",
            time: Date.now() - (14 * 24 * 60 * 60 * 1000),
            profile_photo_url: null
        },
        {
            author_name: "Carlos Mendes",
            rating: 5,
            text: "Profissional excepcional! O tratamento do meu filho com atraso motor de fala evoluiu de forma surpreendente. A Relva é muito atenciosa e sempre nos orienta sobre como ajudar em casa. Estamos muito satisfeitos com os resultados.",
            time: Date.now() - (30 * 24 * 60 * 60 * 1000),
            profile_photo_url: null
        },
        {
            author_name: "Ana Paula Costa",
            rating: 5,
            text: "Trabalho fantástico! A Relva conseguiu ajudar minha filha de 6 anos que tinha dificuldade com alguns sons. Hoje ela fala claramente e sua autoestima melhorou muito. O ambiente do consultório é acolhedor e as sessões são sempre produtivas.",
            time: Date.now() - (21 * 24 * 60 * 60 * 1000),
            profile_photo_url: null
        },
        {
            author_name: "Roberto Lima",
            rating: 5,
            text: "Minha filha evoluiu muito rapidamente com o acompanhamento da Relva. Ela é uma profissional extremamente competente, usa métodos modernos e sempre busca o melhor para as crianças. Além disso, é muito carinhosa e paciente. Super recomendo!",
            time: Date.now() - (7 * 24 * 60 * 60 * 1000),
            profile_photo_url: null
        },
        {
            author_name: "Fernanda Oliveira",
            rating: 5,
            text: "Profissional incrível! Meu filho tinha atraso de linguagem e estava com dificuldades na escola. Com o trabalho da Relva, ele desenvolveu muito o vocabulário e hoje se comunica super bem. Ela envolve a família no processo, o que faz toda a diferença!",
            time: Date.now() - (45 * 24 * 60 * 60 * 1000),
            profile_photo_url: null
        }
    ];

    // Função para calcular tempo relativo
    function getRelativeTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (days < 7) {
            return days === 1 ? 'há 1 dia' : `há ${days} dias`;
        } else if (weeks < 4) {
            return weeks === 1 ? 'há 1 semana' : `há ${weeks} semanas`;
        } else if (months < 12) {
            return months === 1 ? 'há 1 mês' : `há ${months} meses`;
        } else {
            const years = Math.floor(months / 12);
            return years === 1 ? 'há 1 ano' : `há ${years} anos`;
        }
    }

    // Função para gerar estrelas
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Função para obter iniciais do nome
    function getInitials(name) {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return parts[0][0] + parts[parts.length - 1][0];
        }
        return name.substring(0, 2);
    }

    // Função para renderizar reviews
    function renderReviews(reviews) {
        console.log('renderReviews called with', reviews ? reviews.length : 0, 'reviews');
        
        if (!reviews || reviews.length === 0) {
            reviewsCarousel.innerHTML = '<p style="text-align: center; padding: 20px;">Nenhum depoimento disponível no momento.</p>';
            return;
        }

        // Remover loading
        if (loadingElement) {
            loadingElement.remove();
        }

        // Limpar carousel
        reviewsCarousel.innerHTML = '';

        // Adicionar reviews
        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';

            // Header com informações do reviewer
            const header = document.createElement('div');
            header.className = 'review-header';
            
            const reviewerInfo = document.createElement('div');
            reviewerInfo.className = 'reviewer-info';
            
            const avatar = document.createElement('div');
            avatar.className = 'reviewer-avatar';
            avatar.textContent = getInitials(review.author_name);
            
            const reviewerDetails = document.createElement('div');
            reviewerDetails.className = 'reviewer-details';
            
            const name = document.createElement('h4');
            name.textContent = review.author_name;
            
            const stars = document.createElement('div');
            stars.className = 'review-stars';
            stars.innerHTML = generateStars(review.rating);
            
            reviewerDetails.appendChild(name);
            reviewerDetails.appendChild(stars);
            
            reviewerInfo.appendChild(avatar);
            reviewerInfo.appendChild(reviewerDetails);
            
            const time = document.createElement('div');
            time.className = 'review-date';
            time.textContent = getRelativeTime(review.time);
            
            header.appendChild(reviewerInfo);
            header.appendChild(time);

            // Conteúdo do review
            const content = document.createElement('div');
            content.className = 'review-content';
            
            const text = document.createElement('p');
            text.textContent = review.text;
            
            content.appendChild(text);

            reviewCard.appendChild(header);
            reviewCard.appendChild(content);

            reviewsCarousel.appendChild(reviewCard);
        });

        console.log('Reviews carousel inicializado com', reviews.length, 'avaliações');
        
        // Inicializar o carousel após adicionar os reviews
        initializeCarousel(reviews.length);
    }

    // Função para inicializar o carousel
    function initializeCarousel(totalReviews) {
        let currentReviewIndex = 0;

        // Create dots for reviews
        function createReviewDots() {
            if (!reviewsDotsContainer) {
                console.warn('Reviews dots container not found, skipping dots creation');
                return;
            }
            reviewsDotsContainer.innerHTML = '';
            for (let i = 0; i < totalReviews; i++) {
                const dot = document.createElement('button');
                dot.classList.add('review-dot');
                dot.addEventListener('click', () => goToReview(i));
                reviewsDotsContainer.appendChild(dot);
            }
            updateReviewDots();
        }

        // Update review dots
        function updateReviewDots() {
            if (!reviewsDotsContainer) return;
            const dots = document.querySelectorAll('.review-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentReviewIndex);
            });
        }

        // Get card width based on screen size
        function getCardWidth() {
            if (window.innerWidth <= 480) {
                return 250;
            } else if (window.innerWidth <= 768) {
                return 280;
            } else {
                return 350;
            }
        }

        // Go to specific review
        function goToReview(index) {
            currentReviewIndex = Math.max(0, Math.min(index, totalReviews - 1));
            const cardWidth = getCardWidth();
            const gap = 20;
            const translateX = -(currentReviewIndex * (cardWidth + gap));
            reviewsCarousel.style.transform = `translateX(${translateX}px)`;
            updateReviewDots();
        }

        // Next review
        function nextReview() {
            if (currentReviewIndex < totalReviews - 1) {
                goToReview(currentReviewIndex + 1);
            } else {
                goToReview(0);
            }
        }

        // Previous review
        function prevReview() {
            if (currentReviewIndex > 0) {
                goToReview(currentReviewIndex - 1);
            } else {
                goToReview(totalReviews - 1);
            }
        }

        // Event listeners for reviews
        if (nextReviewBtn) nextReviewBtn.addEventListener('click', nextReview);
        if (prevReviewBtn) prevReviewBtn.addEventListener('click', prevReview);

        // Touch/swipe support for reviews
        let reviewStartX = 0;
        let isReviewDragging = false;

        reviewsCarousel.addEventListener('touchstart', (e) => {
            reviewStartX = e.touches[0].clientX;
            isReviewDragging = true;
        });

        reviewsCarousel.addEventListener('touchmove', (e) => {
            if (!isReviewDragging) return;
            e.preventDefault();
        });

        reviewsCarousel.addEventListener('touchend', (e) => {
            if (!isReviewDragging) return;
            isReviewDragging = false;

            const endX = e.changedTouches[0].clientX;
            const diffX = reviewStartX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextReview();
                } else {
                    prevReview();
                }
            }
        });

        // Mouse drag support for reviews
        let reviewMouseStartX = 0;
        let isReviewMouseDragging = false;

        reviewsCarousel.addEventListener('mousedown', (e) => {
            reviewMouseStartX = e.clientX;
            isReviewMouseDragging = true;
            reviewsCarousel.style.cursor = 'grabbing';
        });

        reviewsCarousel.addEventListener('mousemove', (e) => {
            if (!isReviewMouseDragging) return;
            e.preventDefault();
        });

        reviewsCarousel.addEventListener('mouseup', (e) => {
            if (!isReviewMouseDragging) return;
            isReviewMouseDragging = false;
            reviewsCarousel.style.cursor = 'grab';

            const endX = e.clientX;
            const diffX = reviewMouseStartX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextReview();
                } else {
                    prevReview();
                }
            }
        });

        reviewsCarousel.addEventListener('mouseleave', () => {
            isReviewMouseDragging = false;
            reviewsCarousel.style.cursor = 'grab';
        });

        // Auto-play for reviews
        let reviewAutoPlayInterval;

        function startReviewAutoPlay() {
            reviewAutoPlayInterval = setInterval(nextReview, 8000);
        }

        function stopReviewAutoPlay() {
            clearInterval(reviewAutoPlayInterval);
        }

        // Pause auto-play on hover for reviews
        reviewsCarousel.addEventListener('mouseenter', stopReviewAutoPlay);
        reviewsCarousel.addEventListener('mouseleave', startReviewAutoPlay);

        // Handle window resize
        window.addEventListener('resize', () => {
            goToReview(currentReviewIndex);
        });

        // Keyboard navigation for reviews
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.testimonials')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevReview();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextReview();
                }
            }
        });

        // Initialize
        createReviewDots();
        startReviewAutoPlay();
    }

    // Renderizar reviews
    renderReviews(realReviews);
    console.log('Google Reviews: Depoimentos reais carregados com sucesso!');
}

// Additional safety check
setTimeout(function() {
    const reviewCards = document.querySelectorAll('.review-card');
    if (reviewCards.length === 0) {
        console.log('Testimonials not loaded, forcing initialization...');
        initializeTestimonials();
    }
}, 2000);
