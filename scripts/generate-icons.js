const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { promisify } = require('util');
const mkdirp = require('mkdirp');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

// Tamanhos de ícone necessários
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const appleIconSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];
const faviconSizes = [16, 32, 96, 192];

// Caminhos
const inputIcon = path.resolve(__dirname, '../src/images/logo.png'); // Substitua pelo caminho do seu logo
const outputDir = path.resolve(__dirname, '../public/images/icons');

async function generateIcons() {
  try {
    // Verifica se o arquivo de origem existe
    await access(inputIcon, fs.constants.F_OK);

    // Cria o diretório de saída se não existir
    await mkdirp(outputDir);

    console.log('Iniciando geração de ícones...');

    // Gera os ícones para PWA
    await Promise.all([
      ...iconSizes.map(size => 
        generateIcon(inputIcon, path.join(outputDir, `icon-${size}x${size}.png`), size, size)
      ),
      ...appleIconSizes.map(size =>
        generateIcon(inputIcon, path.join(outputDir, `apple-touch-icon-${size}x${size}.png`), size, size, {
          fit: 'cover',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
      ),
      ...faviconSizes.map(size =>
        generateIcon(inputIcon, path.join(outputDir, `favicon-${size}x${size}.png`), size, size)
      ),
      // Favicon padrão
      generateIcon(inputIcon, path.join(outputDir, 'favicon.ico'), 32, 32)
    ]);

    console.log('Ícones gerados com sucesso!');
    
    // Atualiza o manifest.json com os caminhos corretos
    await updateManifest();
    
  } catch (error) {
    console.error('Erro ao gerar ícones:', error);
    process.exit(1);
  }
}

async function generateIcon(input, output, width, height, options = {}) {
  try {
    await sharp(input)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
        ...options
      })
      .toFile(output);
    
    console.log(`Ícone gerado: ${output}`);
  } catch (error) {
    console.error(`Erro ao gerar o ícone ${output}:`, error);
    throw error;
  }
}

async function updateManifest() {
  try {
    const manifestPath = path.resolve(__dirname, '../public/manifest.json');
    const manifest = require(manifestPath);
    
    // Atualiza os ícones no manifest
    manifest.icons = iconSizes.map(size => ({
      src: `/images/icons/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
      purpose: 'any maskable'
    }));
    
    // Salva o manifest atualizado
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Manifest.json atualizado com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar o manifest.json:', error);
    throw error;
  }
}

// Executa a geração de ícones
generateIcons().catch(console.error);
