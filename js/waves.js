console.log('waves.js carregado');

// Função para criar um divisor de ondas
function createWaveDivider() {
    console.log('Criando divisor de ondas...');
    
    const waveDiv = document.createElement('div');
    waveDiv.className = 'wave-divider';
    
    const waveTop = document.createElement('div');
    waveTop.className = 'wave wave-top';
    
    const waveBottom = document.createElement('div');
    waveBottom.className = 'wave wave-bottom';
    
    waveDiv.appendChild(waveTop);
    waveDiv.appendChild(waveBottom);
    
    console.log('Divisor de ondas criado:', waveDiv);
    return waveDiv;
}

// Função para adicionar divisores entre as seções
function addWaveDividers() {
    console.log('Buscando seções...');
    // Seleciona todas as seções principais
    const sections = document.querySelectorAll('section');
    console.log(`Encontradas ${sections.length} seções`);
    
    // Adiciona o divisor antes de cada seção (exceto a primeira)
    sections.forEach((section, index) => {
        if (index > 0) {
            console.log(`Adicionando divisor antes da seção ${index + 1}`);
            const waveDivider = createWaveDivider();
            section.parentNode.insertBefore(waveDivider, section);
            console.log('Divisor adicionado com sucesso');
        }
    });
}

// Executa quando o DOM estiver totalmente carregado
console.log('Aguardando DOMContentLoaded...');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded disparado');
    
    // Adiciona os divisores de ondas
    addWaveDividers();
    
    // Adiciona um pequeno atraso para garantir que os estilos sejam aplicados corretamente
    setTimeout(() => {
        document.body.classList.add('waves-loaded');
        console.log('Classe waves-loaded adicionada ao body');
    }, 100);
});
