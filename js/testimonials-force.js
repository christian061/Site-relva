/**
 * Force Load Testimonials - Backup Script
 */

console.log('Force testimonials script loaded');

// Execute immediately
setTimeout(function() {
    console.log('Force loading testimonials...');
    
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    if (!reviewsCarousel) {
        console.log('Carousel not found, retrying...');
        return;
    }
    
    // Check if already loaded
    if (reviewsCarousel.children.length > 1) {
        console.log('Testimonials already loaded');
        return;
    }
    
    // Clear loading message
    reviewsCarousel.innerHTML = '';
    
    // Testimonials data
    const testimonials = [
        {
            name: "Maria Silva Santos",
            rating: 5,
            text: "Excelente profissional! Minha filha de 4 anos tinha muita dificuldade na fala e, após apenas 3 meses de terapia com a Relva, já consegue se comunicar muito melhor. A paciência e dedicação dela são admiráveis. Recomendo de olhos fechados!",
            time: "há 2 semanas"
        },
        {
            name: "Carlos Mendes", 
            rating: 5,
            text: "Profissional excepcional! O tratamento do meu filho com atraso motor de fala evoluiu de forma surpreendente. A Relva é muito atenciosa e sempre nos orienta sobre como ajudar em casa. Estamos muito satisfeitos com os resultados.",
            time: "há 1 mês"
        },
        {
            name: "Ana Paula Costa",
            rating: 5,
            text: "Trabalho fantástico! A Relva conseguiu ajudar minha filha de 6 anos que tinha dificuldade com alguns sons. Hoje ela fala claramente e sua autoestima melhorou muito. O ambiente do consultório é acolhedor e as sessões são sempre produtivas.",
            time: "há 3 semanas"
        },
        {
            name: "Roberto Lima",
            rating: 5,
            text: "Minha filha evoluiu muito rapidamente com o acompanhamento da Relva. Ela é uma profissional extremamente competente, usa métodos modernos e sempre busca o melhor para as crianças. Além disso, é muito carinhosa e paciente. Super recomendo!",
            time: "há 1 semana"
        },
        {
            name: "Fernanda Oliveira",
            rating: 5,
            text: "Profissional incrível! Meu filho tinha atraso de linguagem e estava com dificuldades na escola. Com o trabalho da Relva, ele desenvolveu muito o vocabulário e hoje se comunica super bem. Ela envolve a família no processo, o que faz toda a diferença!",
            time: "há 1 mês"
        }
    ];
    
    // Create testimonials
    testimonials.forEach(function(testimonial) {
        const card = document.createElement('div');
        card.className = 'review-card';
        
        const initials = testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        const stars = '★★★★★';
        
        card.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${initials}</div>
                    <div class="reviewer-details">
                        <h4>${testimonial.name}</h4>
                        <div class="review-stars">${stars}</div>
                    </div>
                </div>
                <div class="review-date">${testimonial.time}</div>
            </div>
            <div class="review-content">
                <p>${testimonial.text}</p>
            </div>
        `;
        
        reviewsCarousel.appendChild(card);
    });
    
    console.log('Testimonials force loaded successfully!');
    
}, 1000);
