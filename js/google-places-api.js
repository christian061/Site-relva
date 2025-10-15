/**
 * Google Places API Integration - Real Reviews
 * Busca depoimentos reais do Google Meu Negócio
 */

class GooglePlacesReviews {
    constructor() {
        // Verificar se a configuração existe
        if (typeof window.GooglePlacesConfig === 'undefined') {
            console.error('GooglePlacesConfig not found! Please include config.js');
            this.useConfig = false;
            return;
        }
        
        const config = window.GooglePlacesConfig;
        
        // Configurações
        this.placeId = config.placeId;
        this.apiKey = config.apiKey;
        this.maxReviews = config.maxReviews || 5;
        this.minRating = config.minRating || 1;
        this.fallbackReviews = config.fallbackReviews || [];
        this.googleMapsUrl = config.googleMapsUrl;
        
        // Verificar se a API Key é válida
        this.isValidApiKey = this.apiKey && 
                           this.apiKey !== 'SUA_API_KEY_AQUI' && 
                           this.apiKey.startsWith('AIzaSy');
        
        // Verificar se é uma Client Secret OAuth2 (erro comum)
        this.isClientSecret = this.apiKey && this.apiKey.startsWith('GOCSPX-');
        
        console.log('Google Places API initialized', {
            hasValidApiKey: this.isValidApiKey,
            placeId: this.placeId,
            fallbackReviews: this.fallbackReviews.length
        });
    }

    async fetchReviews() {
        try {
            console.log('Fetching real Google reviews...', {
                placeId: this.placeId,
                apiKey: this.apiKey.substring(0, 20) + '...'
            });
            
            // Usar função Netlify para evitar CORS
            const netlifyFunctionUrl = `/.netlify/functions/google-reviews?placeId=${this.placeId}&apiKey=${this.apiKey}`;
            
            console.log('Using Netlify function to fetch reviews...');
            const response = await fetch(netlifyFunctionUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Netlify function response:', data);
            
            // Verificar resposta da API
            if (data.status === 'OK') {
                if (data.result && data.result.reviews && data.result.reviews.length > 0) {
                    console.log('✅ Reviews found:', data.result.reviews.length);
                    return this.formatReviews(data.result.reviews);
                } else {
                    console.warn('⚠️ No reviews found in API response:', data.result);
                    throw new Error('Este negócio ainda não possui avaliações públicas no Google');
                }
            } else {
                console.error('❌ API Error:', data.status, data.error_message);
                let errorMsg = 'Erro na API do Google';
                
                switch(data.status) {
                    case 'REQUEST_DENIED':
                        errorMsg = 'API Key inválida ou sem permissões';
                        break;
                    case 'INVALID_REQUEST':
                        errorMsg = 'Place ID inválido';
                        break;
                    case 'NOT_FOUND':
                        errorMsg = 'Negócio não encontrado no Google';
                        break;
                    case 'ZERO_RESULTS':
                        errorMsg = 'Nenhum resultado encontrado';
                        break;
                    default:
                        errorMsg = data.error_message || data.status;
                }
                
                throw new Error(errorMsg);
            }
            
        } catch (error) {
            console.error('Error fetching Google reviews:', error);
            throw error; // Re-throw para o método renderReviews lidar
        }
    }

    formatReviews(reviews) {
        return reviews.map(review => ({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time * 1000, // Convert to milliseconds
            profile_photo_url: review.profile_photo_url,
            relative_time_description: review.relative_time_description
        }));
    }

    getRelativeTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (days < 1) {
            return 'hoje';
        } else if (days === 1) {
            return 'há 1 dia';
        } else if (days < 7) {
            return `há ${days} dias`;
        } else if (weeks === 1) {
            return 'há 1 semana';
        } else if (weeks < 4) {
            return `há ${weeks} semanas`;
        } else if (months === 1) {
            return 'há 1 mês';
        } else if (months < 12) {
            return `há ${months} meses`;
        } else {
            const years = Math.floor(months / 12);
            return years === 1 ? 'há 1 ano' : `há ${years} anos`;
        }
    }

    generateStars(rating) {
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

    getInitials(name) {
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return parts[0][0] + parts[parts.length - 1][0];
        }
        return name.substring(0, 2);
    }

    async renderReviews() {
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        const loadingElement = document.querySelector('.loading-reviews');
        
        if (!reviewsCarousel) {
            console.error('Reviews carousel not found');
            return false;
        }

        // Verificar se temos configuração válida
        if (this.isClientSecret) {
            console.warn('⚠️ Client Secret OAuth2 detectada. Mostrando instruções para API Key...');
            this.showClientSecretError(reviewsCarousel);
            return false;
        }
        
        if (!this.isValidApiKey) {
            console.warn('⚠️ API Key inválida ou não configurada. Mostrando instruções...');
            this.showApiKeyInstructions(reviewsCarousel);
            return false;
        }

        try {
            // Mostrar loading
            if (loadingElement) {
                loadingElement.innerHTML = '<p>Carregando depoimentos reais do Google...</p>';
            }

            // Buscar reviews reais
            const realReviews = await this.fetchReviews();
            
            if (!realReviews || realReviews.length === 0) {
                throw new Error('No reviews found');
            }

            // Remover loading
            if (loadingElement) {
                loadingElement.remove();
            }

            // Limpar carousel
            reviewsCarousel.innerHTML = '';

            // Renderizar reviews reais
            realReviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';

                const header = document.createElement('div');
                header.className = 'review-header';
                
                const reviewerInfo = document.createElement('div');
                reviewerInfo.className = 'reviewer-info';
                
                const avatar = document.createElement('div');
                avatar.className = 'reviewer-avatar';
                
                // Usar foto do perfil se disponível, senão iniciais
                if (review.profile_photo_url) {
                    avatar.innerHTML = `<img src="${review.profile_photo_url}" alt="${review.author_name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
                } else {
                    avatar.textContent = this.getInitials(review.author_name);
                }
                
                const reviewerDetails = document.createElement('div');
                reviewerDetails.className = 'reviewer-details';
                
                const name = document.createElement('h4');
                name.textContent = review.author_name;
                
                const stars = document.createElement('div');
                stars.className = 'review-stars';
                stars.innerHTML = this.generateStars(review.rating);
                
                reviewerDetails.appendChild(name);
                reviewerDetails.appendChild(stars);
                
                reviewerInfo.appendChild(avatar);
                reviewerInfo.appendChild(reviewerDetails);
                
                const time = document.createElement('div');
                time.className = 'review-date';
                time.textContent = review.relative_time_description || this.getRelativeTime(review.time);
                
                header.appendChild(reviewerInfo);
                header.appendChild(time);

                const content = document.createElement('div');
                content.className = 'review-content';
                
                const text = document.createElement('p');
                text.textContent = review.text;
                
                content.appendChild(text);

                reviewCard.appendChild(header);
                reviewCard.appendChild(content);

                reviewsCarousel.appendChild(reviewCard);
            });

            console.log('✅ Real Google reviews loaded successfully!', realReviews.length, 'reviews');
            
            // Inicializar carrossel automático
            this.initializeAutoCarousel(realReviews.length);
            
            return true;

        } catch (error) {
            console.error('Failed to load Google reviews:', error);
            
            // Tentar usar depoimentos reais como fallback
            if (this.fallbackReviews && this.fallbackReviews.length > 0) {
                console.log('🔄 Using fallback reviews (real testimonials collected manually)');
                
                // Remover loading
                if (loadingElement) {
                    loadingElement.remove();
                }
                
                // Mostrar aviso de fallback
                const fallbackNotice = document.createElement('div');
                fallbackNotice.style.cssText = 'text-align: center; padding: 15px; background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); border-radius: 10px; margin: 20px 0; color: #2d3436;';
                fallbackNotice.innerHTML = `
                    <p style="margin: 0; font-size: 0.9rem;">
                        <strong>📋 Depoimentos Reais</strong><br>
                        Coletados manualmente do Google Meu Negócio
                    </p>
                `;
                reviewsCarousel.appendChild(fallbackNotice);
                
                // Função para criar um card de review
                const createReviewCard = (review) => {
                    const reviewCard = document.createElement('div');
                    reviewCard.className = 'review-card';

                    const header = document.createElement('div');
                    header.className = 'review-header';
                    
                    const reviewerInfo = document.createElement('div');
                    reviewerInfo.className = 'reviewer-info';
                    
                    const avatar = document.createElement('div');
                    avatar.className = 'reviewer-avatar';
                    avatar.textContent = this.getInitials(review.author_name);
                    
                    const reviewerDetails = document.createElement('div');
                    reviewerDetails.className = 'reviewer-details';
                    
                    const name = document.createElement('h4');
                    name.textContent = review.author_name;
                    
                    const stars = document.createElement('div');
                    stars.className = 'review-stars';
                    stars.innerHTML = this.generateStars(review.rating);
                    
                    reviewerDetails.appendChild(name);
                    reviewerDetails.appendChild(stars);
                    
                    reviewerInfo.appendChild(avatar);
                    reviewerInfo.appendChild(reviewerDetails);
                    
                    const time = document.createElement('div');
                    time.className = 'review-date';
                    time.textContent = review.relative_time_description || this.getRelativeTime(review.time);
                    
                    header.appendChild(reviewerInfo);
                    header.appendChild(time);

                    const content = document.createElement('div');
                    content.className = 'review-content';
                    
                    const text = document.createElement('p');
                    text.textContent = review.text;
                    
                    content.appendChild(text);

                    reviewCard.appendChild(header);
                    reviewCard.appendChild(content);
                    
                    return reviewCard;
                };

                // Renderizar depoimentos
                this.fallbackReviews.forEach(review => {
                    reviewsCarousel.appendChild(createReviewCard(review));
                });    

                console.log('✅ Fallback reviews loaded successfully!', this.fallbackReviews.length, 'reviews');
                
                // Inicializar carrossel automático
                this.initializeAutoCarousel(this.fallbackReviews.length);
                
                return true;
            }
            
            // Se não há fallback, mostrar erro
            if (reviewsCarousel) {
                reviewsCarousel.innerHTML = `
                    <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #ff7675 0%, #e17055 100%); border-radius: 15px; margin: 20px; color: white;">
                        <h3 style="color: white; margin-bottom: 15px;">⚠️ Erro de Conexão</h3>
                        <p style="margin-bottom: 15px; font-size: 1.1rem;">Não foi possível carregar os depoimentos no momento devido a restrições de CORS.</p>
                        <p style="font-size: 0.9rem; margin-bottom: 20px; opacity: 0.9;">
                            Erro técnico: ${error.message}
                        </p>
                        <div style="margin-top: 20px;">
                            <a href="${this.googleMapsUrl}" target="_blank" 
                               style="display: inline-block; margin-right: 10px; padding: 12px 20px; background: white; color: #e17055; text-decoration: none; border-radius: 25px; font-weight: bold;">
                               📍 Ver Avaliações no Google
                            </a>
                            <button onclick="location.reload()" 
                                    style="padding: 12px 20px; background: rgba(255,255,255,0.2); color: white; border: 2px solid white; border-radius: 25px; cursor: pointer; font-weight: bold;">
                                🔄 Tentar Novamente
                            </button>
                        </div>
                    </div>
                `;
            }
            
            return false;
        }
    }

    showApiKeyInstructions(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; margin: 20px; color: white;">
                <h3 style="color: white; margin-bottom: 20px;">🔑 Configuração Necessária</h3>
                <p style="margin-bottom: 20px; font-size: 1.1rem;">Para exibir os depoimentos reais do Google, você precisa configurar uma API Key.</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: left;">
                    <h4 style="color: #ffd700; margin-bottom: 15px;">📋 Passos para configurar:</h4>
                    <ol style="color: white; line-height: 1.8;">
                        <li>Acesse <a href="https://console.cloud.google.com/" target="_blank" style="color: #ffd700;">Google Cloud Console</a></li>
                        <li>Crie ou selecione um projeto</li>
                        <li>Ative a "Places API"</li>
                        <li>Crie uma API Key</li>
                        <li>Configure restrições para seu domínio</li>
                        <li>Edite o arquivo <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">config.js</code></li>
                    </ol>
                </div>
                
                <div style="margin-top: 25px;">
                    <a href="https://console.cloud.google.com/" target="_blank" 
                       style="display: inline-block; padding: 12px 25px; background: #ffd700; color: #333; text-decoration: none; border-radius: 25px; font-weight: bold; margin-right: 15px;">
                       🚀 Configurar API
                    </a>
                    <a href="${this.googleMapsUrl}" target="_blank" 
                       style="display: inline-block; padding: 12px 25px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; border: 2px solid white;">
                       📍 Ver no Google Maps
                    </a>
                </div>
                
                <p style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
                    Após configurar, os depoimentos reais aparecerão automaticamente aqui.
                </p>
            </div>
        `;
    }

    showClientSecretError(container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); border-radius: 15px; margin: 20px; color: white;">
                <h3 style="color: white; margin-bottom: 20px;">⚠️ Chave Incorreta Detectada</h3>
                <p style="margin-bottom: 20px; font-size: 1.1rem;">Você forneceu uma <strong>Client Secret OAuth2</strong>, mas precisamos de uma <strong>API Key do Google Places</strong>.</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: left;">
                    <h4 style="color: #ffd700; margin-bottom: 15px;">🔍 Diferenças:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; color: white;">
                        <div>
                            <strong>❌ Client Secret (atual):</strong><br>
                            <code style="background: rgba(0,0,0,0.3); padding: 5px; border-radius: 3px; font-size: 0.8rem;">GOCSPX-XXXXXXXX</code><br>
                            <small>Para autenticação OAuth2</small>
                        </div>
                        <div>
                            <strong>✅ API Key (necessária):</strong><br>
                            <code style="background: rgba(0,0,0,0.3); padding: 5px; border-radius: 3px; font-size: 0.8rem;">AIzaSyXXXXXXXXXX</code><br>
                            <small>Para Google Places API</small>
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; text-align: left;">
                    <h4 style="color: #ffd700; margin-bottom: 15px;">🚀 Como corrigir:</h4>
                    <ol style="color: white; line-height: 1.8;">
                        <li>Vá para <a href="https://console.cloud.google.com/" target="_blank" style="color: #ffd700;">Google Cloud Console</a></li>
                        <li>No mesmo projeto, vá em <strong>APIs e Serviços → Credenciais</strong></li>
                        <li>Clique <strong>"+ CRIAR CREDENCIAIS" → "Chave de API"</strong></li>
                        <li>Configure restrições para seu domínio</li>
                        <li>Substitua no arquivo <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">config.js</code></li>
                    </ol>
                </div>
                
                <div style="margin-top: 25px;">
                    <a href="https://console.cloud.google.com/apis/credentials" target="_blank" 
                       style="display: inline-block; padding: 12px 25px; background: #ffd700; color: #333; text-decoration: none; border-radius: 25px; font-weight: bold; margin-right: 15px;">
                       🔑 Criar API Key
                    </a>
                    <a href="${this.googleMapsUrl}" target="_blank" 
                       style="display: inline-block; padding: 12px 25px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; border: 2px solid white;">
                       📍 Ver Depoimentos no Google
                    </a>
                </div>
                
                <p style="margin-top: 20px; font-size: 0.9rem; opacity: 0.8;">
                    💡 <strong>Dica:</strong> A API Key é gratuita até $200/mês (mais que suficiente para seu site)
                </p>
            </div>
        `;
    }

    initializeAutoCarousel(totalReviews) {
        const reviewsCarousel = document.querySelector('.reviews-carousel');
        const reviewsContainer = document.querySelector('.reviews-container');
        
        if (!reviewsCarousel || totalReviews <= 1) {
            console.log('Carousel not needed or not found');
            return;
        }

        console.log('🎠 Initializing auto carousel with', totalReviews, 'reviews');

        let currentIndex = 0;
        let isTransitioning = false;
        let autoPlayInterval;
        let isPaused = false;

        // Configurações do carrossel contínuo
        const autoPlayDelay = 3000; // 3 segundos entre transições (mais rápido)
        const transitionDuration = 600; // 0.6s de transição (mais suave)

        // Configurar carrossel responsivo
        const cardWidth = getCardWidth();
        const gap = 20;
        const isMobile = window.innerWidth <= 768;
        
        console.log('📱 Configurando carrossel:', { 
            isMobile, 
            cardWidth, 
            totalReviews, 
            screenWidth: window.innerWidth,
            containerWidth: reviewsContainer?.offsetWidth 
        });
        
        // Aplicar estilos CSS baseado no dispositivo
        if (isMobile) {
            // Mobile: mostrar um card por vez
            reviewsCarousel.style.cssText = `
                display: flex;
                gap: 20px;
                transition: transform 0.5s ease;
                width: ${totalReviews * (cardWidth + gap)}px;
            `;
            
            // Container com overflow hidden - FORÇAR largura específica
            if (reviewsContainer) {
                reviewsContainer.style.cssText = `
                    overflow: hidden !important;
                    position: relative;
                    width: ${cardWidth}px !important;
                    max-width: ${cardWidth}px !important;
                    margin: 0 auto;
                `;
            }
            
            // Forçar o container pai também
            const parentContainer = reviewsContainer?.parentElement;
            if (parentContainer) {
                parentContainer.style.cssText = `
                    overflow: hidden !important;
                    width: 100% !important;
                    display: flex !important;
                    justify-content: center !important;
                `;
            }
        } else {
            // Desktop: carrossel contínuo
            reviewsCarousel.style.cssText = `
                display: flex;
                gap: 20px;
                animation: continuousSlide ${totalReviews * 4}s linear infinite;
                width: ${totalReviews * (cardWidth + gap) * 2}px;
            `;
            
            if (reviewsContainer) {
                reviewsContainer.style.cssText = `
                    overflow: hidden;
                    position: relative;
                `;
            }
            
            // Criar animação CSS para desktop
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                @keyframes continuousSlide {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-${totalReviews * (cardWidth + gap)}px); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
        
        // Configurar cada card
        const reviewCards = reviewsCarousel.querySelectorAll('.review-card');
        reviewCards.forEach(card => {
            if (isMobile) {
                card.style.cssText = `
                    min-width: ${cardWidth}px;
                    max-width: ${cardWidth}px;
                    flex-shrink: 0;
                    padding: 20px;
                    margin: 10px 0;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    border: 1px solid #f0f0f0;
                `;
            } else {
                card.style.cssText = `
                    min-width: ${cardWidth}px;
                    max-width: ${cardWidth}px;
                    flex-shrink: 0;
                `;
            }
        });

        // Função para calcular largura do card baseada na tela
        function getCardWidth() {
            if (window.innerWidth <= 480) {
                return window.innerWidth - 30; // Margem de 15px de cada lado
            } else if (window.innerWidth <= 768) {
                return window.innerWidth - 40; // Margem de 20px de cada lado
            } else {
                return 370;
            }
        }

        // Função para ir para um slide específico
        function goToSlide(index) {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentIndex = index;
            
            const translateX = -(currentIndex * (cardWidth + gap));
            reviewsCarousel.style.transform = `translateX(${translateX}px)`;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }

        // Função para próximo slide
        function nextSlide() {
            if (isTransitioning) return;
            
            const nextIndex = (currentIndex + 1) % totalReviews;
            goToSlide(nextIndex);
        }

        // Função para slide anterior
        function prevSlide() {
            if (isTransitioning) return;
            
            const prevIndex = currentIndex === 0 ? totalReviews - 1 : currentIndex - 1;
            goToSlide(prevIndex);
        }

        // Auto-play
        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        // Criar controles de navegação
        function createNavigation() {
            const navContainer = document.createElement('div');
            navContainer.className = 'carousel-navigation';
            navContainer.style.cssText = `
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-top: 20px;
            `;

            // Botão anterior
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '‹';
            prevBtn.style.cssText = `
                width: 50px;
                height: 50px;
                border: 2px solid #9be2b5;
                background: white;
                color: #9be2b5;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(155, 226, 181, 0.3);
            `;
            prevBtn.addEventListener('click', prevSlide);
            
            // Hover effects
            prevBtn.addEventListener('mouseenter', () => {
                prevBtn.style.background = '#9be2b5';
                prevBtn.style.color = 'white';
                prevBtn.style.transform = 'scale(1.1)';
            });
            prevBtn.addEventListener('mouseleave', () => {
                prevBtn.style.background = 'white';
                prevBtn.style.color = '#9be2b5';
                prevBtn.style.transform = 'scale(1)';
            });

            // Botão próximo
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '›';
            nextBtn.style.cssText = `
                width: 50px;
                height: 50px;
                border: 2px solid #9be2b5;
                background: white;
                color: #9be2b5;
                border-radius: 50%;
                cursor: pointer;
                font-size: 24px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(155, 226, 181, 0.3);
            `;
            nextBtn.addEventListener('click', nextSlide);
            
            // Hover effects
            nextBtn.addEventListener('mouseenter', () => {
                nextBtn.style.background = '#9be2b5';
                nextBtn.style.color = 'white';
                nextBtn.style.transform = 'scale(1.1)';
            });
            nextBtn.addEventListener('mouseleave', () => {
                nextBtn.style.background = 'white';
                nextBtn.style.color = '#9be2b5';
                nextBtn.style.transform = 'scale(1)';
            });

            // Indicadores (dots)
            const dotsContainer = document.createElement('div');
            dotsContainer.style.cssText = `
                display: flex;
                gap: 8px;
                margin: 0 15px;
                align-items: center;
            `;

            for (let i = 0; i < totalReviews; i++) {
                const dot = document.createElement('button');
                dot.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border: none;
                    border-radius: 50%;
                    background: ${i === 0 ? '#9be2b5' : '#ddd'};
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin: 0 2px;
                `;
                
                dot.addEventListener('click', () => goToSlide(i));
                
                // Hover effect para dots
                dot.addEventListener('mouseenter', () => {
                    if (dot.style.background !== 'rgb(155, 226, 181)') {
                        dot.style.background = '#bbb';
                        dot.style.transform = 'scale(1.2)';
                    }
                });
                dot.addEventListener('mouseleave', () => {
                    if (dot.style.background !== 'rgb(155, 226, 181)') {
                        dot.style.background = '#ddd';
                        dot.style.transform = 'scale(1)';
                    }
                });
                
                dotsContainer.appendChild(dot);
            }

            navContainer.appendChild(prevBtn);
            navContainer.appendChild(dotsContainer);
            navContainer.appendChild(nextBtn);
            
            if (reviewsContainer) {
                reviewsContainer.appendChild(navContainer);
            }

            // Atualizar dots
            function updateDots() {
                const dots = dotsContainer.querySelectorAll('button');
                dots.forEach((dot, index) => {
                    dot.style.background = index === currentIndex ? 'var(--accent-color)' : '#ccc';
                });
            }

            // Override goToSlide para atualizar dots
            const originalGoToSlide = goToSlide;
            goToSlide = function(index) {
                originalGoToSlide(index);
                updateDots();
            };
        }

        // Suporte a touch/swipe
        let startX = 0;
        let isDragging = false;

        reviewsCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        reviewsCarousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        reviewsCarousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });

        // Inicializar baseado no dispositivo
        if (isMobile) {
            // Mobile: remover seção de depoimentos
            console.log('📱 Removing testimonials section on mobile');
            const testimonialsSection = document.querySelector('#depoimentos') || 
                                      document.querySelector('.testimonials') || 
                                      reviewsContainer?.closest('section');
            
            if (testimonialsSection) {
                testimonialsSection.style.display = 'none';
                console.log('✅ Testimonials section hidden on mobile');
            } else if (reviewsContainer) {
                reviewsContainer.style.display = 'none';
                console.log('✅ Reviews container hidden on mobile');
            }
        } else {
            // Desktop: apenas duplicar cards para loop infinito
            const originalCards = Array.from(reviewsCarousel.children);
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                reviewsCarousel.appendChild(clone);
            });
            console.log('🎠 Desktop continuous carousel initialized!');
        }

        console.log('🎠 Auto carousel initialized successfully!');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing real Google Places reviews...');
    
    const googleReviews = new GooglePlacesReviews();
    
    // Tentar carregar reviews reais
    setTimeout(() => {
        googleReviews.renderReviews();
    }, 500);
});
