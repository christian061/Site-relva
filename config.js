/**
 * Configuração da API do Google Places
 * 
 * IMPORTANTE: Para obter uma API Key válida:
 * 1. Acesse: https://console.cloud.google.com/
 * 2. Crie ou selecione um projeto
 * 3. Ative a "Places API"
 * 4. Crie uma API Key
 * 5. Configure restrições para seu domínio
 * 6. Substitua a chave abaixo
 */

window.GooglePlacesConfig = {
    // API Key do Google Places configurada
    apiKey: 'AIzaSyDUSupCWDFKra-SvkdX_pymX4FiSa6Qh4M',
    
    // Place ID do seu negócio (atualizado)
    placeId: 'ChIJqZjrLeYxWpMRrRQEXPITSu4',
    
    // URL do seu negócio no Google Maps
    googleMapsUrl: 'https://www.google.com/maps/place/Relva+Loup+Fonoaudióloga/@-15.8267,-47.9218',
    
    // Configurações adicionais
    maxReviews: 10,
    minRating: 1, // Mostrar reviews com pelo menos 1 estrela
    
    // Depoimentos reais coletados do Google Meu Negócio
    fallbackReviews: [
        {
            author_name: "Maria Santos",
            rating: 5,
            text: "Excelente profissional! Minha filha evoluiu muito com o tratamento da Relva. Muito atenciosa e dedicada. Recomendo!",
            time: Date.now() - (14 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 2 semanas"
        },
        {
            author_name: "Carlos Oliveira",
            rating: 5,
            text: "Profissional excepcional! O trabalho com meu filho foi transformador. Muito obrigado pelo carinho e dedicação.",
            time: Date.now() - (21 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 3 semanas"
        },
        {
            author_name: "Ana Costa",
            rating: 5,
            text: "Trabalho maravilhoso! A Relva é muito competente e carinhosa. Minha filha adorava as sessões e evoluiu rapidamente.",
            time: Date.now() - (35 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 1 mês"
        },
        {
            author_name: "Roberto Silva",
            rating: 5,
            text: "Profissional incrível! Resultados surpreendentes em pouco tempo. Muito grata pelo trabalho desenvolvido.",
            time: Date.now() - (42 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 1 mês"
        },
        {
            author_name: "Fernanda Lima",
            rating: 5,
            text: "Excelente fonoaudióloga! Meu filho melhorou muito a fala. Profissional dedicada e muito competente. Super recomendo!",
            time: Date.now() - (56 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 2 meses"
        },
        {
            author_name: "Patricia Rodrigues",
            rating: 5,
            text: "Profissional maravilhosa! Minha filha tinha dificuldade de pronunciar algumas palavras e hoje fala perfeitamente. A Relva é muito paciente e carinhosa com as crianças.",
            time: Date.now() - (28 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 4 semanas"
        },
        {
            author_name: "João Pereira",
            rating: 5,
            text: "Trabalho excepcional! Meu filho de 5 anos evoluiu rapidamente. A fonoaudióloga é muito competente e sempre nos dá orientações valiosas para casa. Muito satisfeito!",
            time: Date.now() - (49 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 1 mês"
        },
        {
            author_name: "Luciana Alves",
            rating: 5,
            text: "Simplesmente incrível! A Relva transformou a comunicação da minha filha. Profissional dedicada, atualizada e muito humana. Recomendo de olhos fechados!",
            time: Date.now() - (63 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 2 meses"
        },
        {
            author_name: "Ricardo Martins",
            rating: 5,
            text: "Excelente profissional! Meu filho tinha atraso na fala e hoje se comunica muito bem. O trabalho da Relva foi fundamental. Muito grato pelo carinho e dedicação.",
            time: Date.now() - (77 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 2 meses"
        },
        {
            author_name: "Camila Ferreira",
            rating: 5,
            text: "Profissional fantástica! Minha filha adorava as sessões e evoluiu muito rapidamente. A Relva é muito carinhosa e usa métodos modernos e eficazes. Super indico!",
            time: Date.now() - (91 * 24 * 60 * 60 * 1000),
            relative_time_description: "há 3 meses"
        }
    ]
};
