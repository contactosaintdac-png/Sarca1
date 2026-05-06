/**
 * compress-images.js
 * Comprime todas las imágenes de src/assets/instagram/ a WebP optimizado.
 * Uso: node compress-images.js
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const INPUT_DIR  = path.join(__dirname, 'src/assets/instagram')
const OUTPUT_DIR = path.join(__dirname, 'src/assets/instagram')

const CONFIG = {
  // Foto de perfil: 400×400 max
  profile: { width: 400, height: 400, quality: 85 },
  // Highlights (círculos pequeños): 200×200 max
  h_: { width: 200, height: 200, quality: 80 },
  // Posts (grilla): 600×600 max
  post: { width: 600, height: 600, quality: 80 },
}

function getConfig(filename) {
  if (filename.startsWith('profile')) return CONFIG.profile
  if (filename.startsWith('h-'))      return CONFIG['h_']
  return CONFIG.post
}

async function compressAll() {
  const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  
  console.log(`\n🔧 Comprimiendo ${files.length} imágenes...\n`)
  let totalBefore = 0, totalAfter = 0

  for (const file of files) {
    const inputPath  = path.join(INPUT_DIR, file)
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    const outputPath = path.join(OUTPUT_DIR, outputName)

    const cfg = getConfig(file)
    const beforeSize = fs.statSync(inputPath).size

    await sharp(inputPath)
      .resize(cfg.width, cfg.height, { fit: 'cover', withoutEnlargement: true })
      .webp({ quality: cfg.quality })
      .toFile(outputPath)

    const afterSize = fs.statSync(outputPath).size
    const reduction = Math.round((1 - afterSize / beforeSize) * 100)

    totalBefore += beforeSize
    totalAfter  += afterSize

    console.log(`  ✅ ${file.padEnd(25)} ${(beforeSize/1024/1024).toFixed(1)}MB → ${(afterSize/1024).toFixed(0)}KB  (-${reduction}%)`)
  }

  const totalReduction = Math.round((1 - totalAfter / totalBefore) * 100)
  console.log(`\n🎉 Total: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  (-${totalReduction}%)\n`)
  console.log('📌 Ahora actualizá las importaciones en App.tsx de .jpg → .webp\n')
}

compressAll().catch(console.error)
