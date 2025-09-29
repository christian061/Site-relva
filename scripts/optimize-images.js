const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { promisify } = require('util');
const mkdirp = require('mkdirp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const imageminSvgo = require('imagemin-svgo');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

// Configurações
const config = {
  inputDir: path.resolve(__dirname, '../src/images'),
  outputDir: path.resolve(__dirname, '../public/images'),
  formats: ['jpg', 'jpeg', 'png', 'webp'], // Formatos de saída
  quality: 80, // Qualidade das imagens (0-100)
  widths: [320, 480, 768, 1024, 1366, 1600, 1920], // Larguras para imagens responsivas
  enableWebp: true, // Converter para WebP
  enableAvif: false, // AVIF tem melhor compressão, mas menos suporte
};

// Verifica se um diretório existe, se não, cria
async function ensureDirectoryExists(dir) {
  try {
    await access(dir);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdirp(dir);
    } else {
      throw error;
    }
  }
}

// Obtém todos os arquivos de um diretório recursivamente
async function getFiles(dir) {
  const subdirs = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir.name);
      return subdir.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.flat();
}

// Otimiza uma única imagem
async function optimizeImage(filePath) {
  try {
    const parsedPath = path.parse(filePath);
    const relativeDir = path.relative(config.inputDir, parsedPath.dir);
    const outputBaseDir = path.join(config.outputDir, relativeDir);
    
    await ensureDirectoryExists(outputBaseDir);
    
    // Processa a imagem para diferentes tamanhos
    await Promise.all(
      config.widths.map(async (width) => {
        const outputFileName = `${parsedPath.name}-${width}w${parsedPath.ext}`;
        const outputPath = path.join(outputBaseDir, outputFileName);
        
        // Redimensiona a imagem mantendo a proporção
        await sharp(filePath)
          .resize(width, null, { withoutEnlargement: true })
          .toFile(outputPath);
        
        console.log(`Imagem otimizada: ${outputPath}`);
        
        // Se WebP estiver ativado, cria uma versão WebP
        if (config.enableWebp) {
          const webpOutputPath = outputPath.replace(/\.(jpg|jpeg|png)$/, '.webp');
          await sharp(filePath)
            .resize(width, null, { withoutEnlargement: true })
            .webp({ quality: config.quality })
            .toFile(webpOutputPath);
          
          console.log(`Imagem WebP gerada: ${webpOutputPath}`);
        }
      })
    );
    
    // Otimiza a imagem original
    const optimizedPath = path.join(outputBaseDir, path.basename(filePath));
    
    await imagemin([filePath], {
      destination: outputBaseDir,
      plugins: [
        imageminMozjpeg({ quality: config.quality }),
        imageminPngquant({
          quality: [config.quality / 100, config.quality / 100],
        }),
      ],
    });
    
    console.log(`Imagem original otimizada: ${optimizedPath}`);
    
  } catch (error) {
    console.error(`Erro ao processar ${filePath}:`, error);
  }
}

// Função principal
async function optimizeImages() {
  try {
    console.log('Iniciando otimização de imagens...');
    
    // Cria o diretório de saída se não existir
    await ensureDirectoryExists(config.outputDir);
    
    // Obtém todos os arquivos de imagem
    const files = await getFiles(config.inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file)
    );
    
    console.log(`Encontradas ${imageFiles.length} imagens para otimizar.`);
    
    // Processa as imagens em lotes para evitar sobrecarregar a memória
    const batchSize = 5;
    for (let i = 0; i < imageFiles.length; i += batchSize) {
      const batch = imageFiles.slice(i, i + batchSize);
      await Promise.all(batch.map(optimizeImage));
    }
    
    console.log('Otimização de imagens concluída com sucesso!');
    
  } catch (error) {
    console.error('Erro durante a otimização de imagens:', error);
    process.exit(1);
  }
}

// Executa a otimização de imagens
optimizeImages().catch(console.error);
