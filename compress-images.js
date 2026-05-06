import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const INPUT_DIR  = path.join(process.cwd(), 'src', 'assets', 'instagram')
const OUTPUT_DIR = INPUT_DIR

console.log('📂 Carpeta de entrada:', INPUT_DIR)

if (!fs.existsSync(INPUT_DIR)) {
  console.error('❌ ERROR: No existe la carpeta src/assets/instagram')
  process.exit(1)
}

const CONFIG = {
  profile: { width: 400, height: 400, quality: 85 },
  h_: { width: 200, height: 200, quality: 80 },
  post: { width: 600, height: 600, quality: 80 },
}

function getConfig(filename) {
  if (filename.startsWith('profile')) return CONFIG.profile
  if (filename.startsWith('h-'))      return CONFIG['h_']
  return CONFIG.post
}

async function compressAll() {
  const allFiles = fs.readdirSync(INPUT_DIR)
  const files = allFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f))
  
  if (files.length === 0) {
    console.log('⚠️ No se encontraron archivos JPG/PNG en la carpeta.')
    console.log('Archivos encontrados en la carpeta:', allFiles)
    return
  }

  console.log(`\n🔧 Comprimiendo ${files.length} imágenes...\n`)

  for (const file of files) {
    const inputPath  = path.join(INPUT_DIR, file)
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    const outputPath = path.join(OUTPUT_DIR, outputName)

    const cfg = getConfig(file)

    try {
      await sharp(inputPath)
        .resize(cfg.width, cfg.height, { fit: 'cover', withoutEnlargement: true })
        .webp({ quality: cfg.quality })
        .toFile(outputPath)
      console.log(`  ✅ ${file} -> ${outputName}`)
    } catch (err) {
      console.error(`  ❌ Error procesando ${file}:`, err.message)
    }
  }
  console.log('\n✨ ¡Proceso terminado! Ahora puedes hacer git add y push.')
}

compressAll().catch(console.error)
