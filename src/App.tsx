import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring as useFramerSpring } from 'framer-motion'
import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { 
  MessageCircle, ShoppingBag, Instagram, ChevronDown, Play, Heart, 
  Send, Bookmark, MoreHorizontal, ExternalLink, Users, Zap, Star,
  Pin, Grid, Video, User, Phone, Copy
} from 'lucide-react'
import FluidBackground from './components/FluidBackground'
import CustomCursor from './components/CustomCursor'
import GradientText from './components/GradientText'

// ─── ASSET IMPORTS ─────────────────────────────────────────────────────────────
import profileImg from './assets/instagram/profile.jpg'
import hHearts from './assets/instagram/h-hearts.jpg'
import hReels from './assets/instagram/h-reels.jpg'
import hYo from './assets/instagram/h-yo.jpg'
import hBuenosDias from './assets/instagram/h-buenosdias.jpg'
import hDonaciones from './assets/instagram/h-donaciones.jpg'
import h111 from './assets/instagram/h-111.jpg'
import hPalomo from './assets/instagram/h-palomo.jpg'
import post1 from './assets/instagram/post1.jpg'
import post2 from './assets/instagram/post2.jpg'
import post3 from './assets/instagram/post3.jpg'
import post4 from './assets/instagram/post4.jpg'
import post5 from './assets/instagram/post5.jpg'
import post6 from './assets/instagram/post6.jpg'

// ─── BRAND DATA ────────────────────────────────────────────────────────────────
const PROFILE = {
  handle: 'sarcaone',
  name: 'Sarca One',
  tagline: 'Autenticidad y Comunicación',
  bio: 'Un tipo apasionado · Ayudo a las personas a comunicarse con autenticidad · Entrenamiento mensual de Abril 👇',
  followers: '276K',
  following: '2,509',
  posts: '292',
  url: 'https://www.instagram.com/sarcaone/',
  reelsUrl: 'https://www.instagram.com/sarcaone/reels/',
  threadsUrl: 'https://www.threads.com/@sarcaone?xmt=AQF0Ii68ayfem44v8mRenZcARVTaujHoK3JE_P0OCL_hjn0',
  whatsapp: 'https://wa.me/5493518080446'
}

const LINKS = [
  {
    id: 'collabs',
    icon: Zap,
    label: 'Canjes y Colaboraciones',
    sublabel: 'Trabajemos juntos en algo grande',
    description: '¿Tenés una marca, producto o proyecto? Hablemos de cómo podemos colaborar y generar algo auténtico.',
    cta: 'Quiero colaborar',
    href: 'https://api.whatsapp.com/send?phone=5493518080446&text=Hola!%20Quiero%20colaborar%20con%20vos',
    gradient: 'from-brand-red to-brand-pink',
    glow: 'rgba(239, 68, 68, 0.3)',
    emoji: '⚡',
  },
  {
    id: 'escuela',
    icon: Users,
    label: 'Entrenamiento de Abril',
    sublabel: 'El programa mensual de comunicación',
    description: 'El espacio donde entrenamos la autenticidad. Un método, una comunidad, una transformación real en cómo te expresás.',
    cta: 'Quiero unirme',
    href: 'https://api.whatsapp.com/send?phone=5493518080446&text=Hola!%20Quiero%20unirme%20a%20tu%20escuela!%20',
    gradient: 'from-brand-purple to-brand-blue',
    glow: 'rgba(139, 92, 246, 0.3)',
    emoji: '🔥',
    featured: true,
  },
  {
    id: 'tienda',
    icon: ShoppingBag,
    label: 'Tienda de Recursos',
    sublabel: 'Clases y recursos digitales',
    description: 'Próximamente: recursos, clases y materiales para que puedas avanzar a tu ritmo.',
    cta: 'Ver tienda',
    href: 'https://sarcaone.empretienda.com.ar/',
    gradient: 'from-brand-blue to-brand-purple',
    glow: 'rgba(59, 130, 246, 0.3)',
    emoji: '🎒',
    comingSoon: true,
  },
]

const POSTS = [
  { id: 1, img: post1, likes: '12.4k', comments: '142', pinned: true, url: 'https://www.instagram.com/p/DPspMr3jM6D/', type: 'reel' },
  { id: 2, img: post2, likes: '9.1k', comments: '89', pinned: true, url: 'https://www.instagram.com/p/DOXKz_SjLlI/', type: 'reel' },
  { id: 3, img: post3, likes: '15.2k', comments: '245', pinned: true, url: 'https://www.instagram.com/p/CzP0ZU7Oxet/', type: 'reel' },
  { id: 4, img: post4, likes: '8.7k', comments: '112', pinned: false, url: 'https://www.instagram.com/p/DX8FCpuMlOT/', type: 'reel' },
  { id: 5, img: post5, likes: '11.3k', comments: '96', pinned: false, url: 'https://www.instagram.com/p/DX7Gk3OKy-g/', type: 'reel' },
  { id: 6, img: post6, likes: '14.7k', comments: '167', pinned: false, url: 'https://www.instagram.com/p/DX2k-daDtXs/?img_index=1', type: 'carousel' },
]

const HIGHLIGHTS = [
  { id: 1, label: '💜💕', img: hHearts, url: 'https://www.instagram.com/stories/highlights/18152507962430403/' },
  { id: 2, label: 'Debió ser Reel', img: hReels, url: 'https://www.instagram.com/stories/highlights/17904172920036682/' },
  { id: 3, label: 'Yo', img: hYo, url: 'https://www.instagram.com/stories/highlights/18021969302319047/' },
  { id: 4, label: 'Buenos Días', img: hBuenosDias, url: 'https://www.instagram.com/stories/highlights/18008823919707058/' },
  { id: 5, label: 'Donaciones', img: hDonaciones, url: 'https://www.instagram.com/stories/highlights/18038379844574256/' },
  { id: 6, label: '111', img: h111, url: 'https://www.instagram.com/stories/highlights/18135615013272857/' },
  { id: 7, label: 'Luis el Palomo', img: hPalomo, url: 'https://www.instagram.com/stories/highlights/17874690443447565/' },
]

// ─── UTILS ────────────────────────────────────────────────────────────────────
function cn(...c: (string | boolean | undefined)[]) {
  return c.filter(Boolean).join(' ')
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 5 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, delay, type: 'spring', stiffness: 50 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── 3D HERO OBJECT ───────────────────────────────────────────────────────────
function Hero3D() {
  const mesh = useRef<any>(null!)
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.2
    mesh.current.rotation.y = t * 0.3
    mesh.current.position.y = Math.sin(t * 0.5) * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={2.2}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial 
          backside
          samples={16}
          thickness={0.2}
          roughness={0.1}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.1}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

// ─── FLOATING PARTICLES (Elite) ────────────────────────────────────────────────
function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-5]">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.3 + 0.1,
            scale: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            y: [null, '-10%'],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_8px_white]"
        />
      ))}
    </div>
  )
}

// ─── LINK CARD (Glassmorphism Math) ───────────────────────────────────────────
function LinkCard({ link, index }: { link: typeof LINKS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  function handleMouseMove(e: any) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <FadeUp delay={index * 0.1}>
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); setHovered(false) }}
        onMouseEnter={() => setHovered(true)}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative block rounded-[2.5rem] p-px group"
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-20 rounded-[2.5rem] transition-opacity duration-500', link.gradient, hovered ? 'opacity-40' : '')} />
        <div className="relative bg-black/40 backdrop-blur-3xl rounded-[2.5rem] p-8 m-px border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">
          {link.featured && (
            <div className="absolute -top-3 left-10 bg-gradient-to-r from-brand-purple to-brand-blue text-[9px] font-black px-5 py-1 rounded-full tracking-[0.3em] uppercase z-50">
              ⚡ Destacado
            </div>
          )}
          <div className="flex gap-6 items-center">
            <div className={cn('w-16 h-16 rounded-3xl bg-gradient-to-br flex items-center justify-center text-3xl shadow-xl', link.gradient)}>
              {link.emoji}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-2xl text-white tracking-tight">{link.label}</h3>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{link.sublabel}</p>
            </div>
          </div>
          <p className="mt-6 text-white/60 leading-relaxed text-lg font-light">{link.description}</p>
          <div className="mt-8 flex items-center justify-between">
            <span className={cn('font-black text-xs uppercase tracking-[0.3em] bg-gradient-to-r bg-clip-text text-transparent', link.gradient)}>
              {link.cta}
            </span>
            <div className={cn('w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform', link.gradient)}>
              <ExternalLink size={18} />
            </div>
          </div>
        </div>
      </motion.a>
    </FadeUp>
  )
}

// ─── AT SIGN ICON FOR THREADS ──────────────────────────────────────────────────
function AtSign({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
  )
}

// ─── VERIFIED BADGE ICON ───────────────────────────────────────────────────────
function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("text-[#0095f6]", className)}>
      <path d="M12 2c-.176 0-.351.002-.525.006a1 1 0 0 0-.756.406l-1.5 2a1 1 0 0 1-.8.4h-2.5a1 1 0 0 0-1 1v2.5a1 1 0 0 1-.4.8l-2 1.5a1 1 0 0 0-.406.756c-.004.174-.006.349-.006.525s.002.351.006.525a1 1 0 0 0 .406.756l2 1.5a1 1 0 0 1 .4.8v2.5a1 1 0 0 0 1 1h2.5a1 1 0 0 1 .8.4l1.5 2a1 1 0 0 0 .756.406c.174.004.349.006.525.006s.351-.002.525-.006a1 1 0 0 0 .756-.406l1.5-2a1 1 0 0 1 .8-.4h2.5a1 1 0 0 0 1-1v-2.5a1 1 0 0 1 .4-.8l2-1.5a1 1 0 0 0 .406-.756c.004-.174.006-.349.006-.525s-.002-.351-.006-.525a1 1 0 0 0-.406-.756l-2-1.5a1 1 0 0 1-.4-.8V5.912a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-1.5-2A1 1 0 0 0 12.525 2.006C12.351 2.002 12.176 2 12 2zm4.707 9.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L10.5 14.586l4.793-4.793a1 1 0 0 1 1.414 1.414z" />
    </svg>
  )
}

function App() {
  return (
    <div className="min-h-screen relative text-white overflow-x-hidden selection:bg-brand-purple/30 font-outfit">
      <FluidBackground />
      <Particles />
      <CustomCursor />

      {/* ── HERO (Impacto Inmersivo) ────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Hero3D />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="relative w-36 h-36 md:w-52 md:h-52 mx-auto mb-12">
              <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-tr from-brand-red via-brand-purple to-brand-blue shadow-[0_0_60px_rgba(139,92,246,0.4)]">
                <div className="w-full h-full rounded-full bg-black p-1 overflow-hidden">
                  <img src={profileImg} alt="Sarca" className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                <VerifiedBadge className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter">
                <GradientText>@sarcaone</GradientText>
              </h1>
              <p className="text-white/40 text-lg md:text-2xl font-bold uppercase tracking-[0.4em]">Autenticidad y Comunicación</p>
              <p className="text-white/70 text-xl md:text-3xl font-light italic max-w-3xl mx-auto leading-relaxed">
                "No te enseña a hablar. Te ayuda a ser vos cuando hablás."
              </p>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.3}>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a 
                href={PROFILE.whatsapp} 
                whileHover={{ scale: 1.05 }} 
                className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                Hablemos por WhatsApp
              </motion.a>
              <motion.a 
                href="#links" 
                whileHover={{ scale: 1.05 }} 
                className="w-full sm:w-auto glass px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm border-white/10"
              >
                Explorar Caminos
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ABOUT (Revelación Asimétrica) ────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeUp>
              <div className="relative p-10 glass rounded-[3rem] border-white/10 shadow-premium">
                <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
                  Habitá tu propia <GradientText>voz.</GradientText>
                </h2>
                <p className="text-white/60 text-xl leading-relaxed mb-8 font-light">
                  Sarca no es oratoria. Es un proceso de <span className="text-white font-bold italic">desbloqueo expresivo</span>. El objetivo no es que hables perfecto, sino que hables como vos.
                </p>
                <div className="grid grid-cols-2 gap-4">
                   {['Sin fachadas', 'Sin poses', '100% Vos', 'Impacto Real'].map(t => (
                      <div key={t} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <Star className="w-4 h-4 text-brand-purple" />
                        <span className="text-sm font-bold text-white/80">{t}</span>
                      </div>
                   ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
               <div className="relative group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple to-brand-blue opacity-20 blur-3xl rounded-[3rem]" />
                 <img src={post1} alt="Sarca One" className="relative rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl ring-1 ring-white/10" />
               </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── LINKS ───────────────────────────────────── */}
      <section id="links" className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Elegí tu <GradientText>camino</GradientText></h2>
            <p className="text-white/40 text-xl font-light">Acceso directo a mis herramientas y programas.</p>
          </FadeUp>
          <div className="space-y-8">
            {LINKS.map((link, i) => (
              <LinkCard key={link.id} link={link} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM MINI (Simulación de App) ───────── */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <FadeUp className="text-center mb-16">
             <p className="text-brand-blue text-xs font-black uppercase tracking-[0.5em] mb-4">Simulación Digital</p>
             <h2 className="text-4xl md:text-6xl font-black">Instagram <GradientText>Experience</GradientText></h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="glass rounded-[3rem] p-8 md:p-12 border-white/10 shadow-premium overflow-hidden">
               {/* IG Header Sim */}
               <div className="flex flex-col sm:flex-row items-center gap-10 mb-12">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-brand-red via-brand-purple to-brand-blue">
                    <img src={profileImg} className="w-full h-full rounded-full object-cover border-4 border-black" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                      <span className="text-3xl font-black">{PROFILE.handle}</span>
                      <div className="flex gap-2">
                         <a href={PROFILE.url} className="bg-white text-black px-8 py-2 rounded-xl text-sm font-black">Seguir</a>
                         <a href={PROFILE.whatsapp} className="bg-white/10 px-8 py-2 rounded-xl text-sm font-black">Mensaje</a>
                      </div>
                    </div>
                    <div className="flex justify-around sm:justify-start gap-12 text-center sm:text-left mb-6">
                       <div><div className="text-xl font-black">{PROFILE.posts}</div><div className="text-xs text-white/40 font-bold uppercase">posts</div></div>
                       <div><div className="text-xl font-black">{PROFILE.followers}</div><div className="text-xs text-white/40 font-bold uppercase">seguidores</div></div>
                       <div><div className="text-xl font-black">{PROFILE.following}</div><div className="text-xs text-white/40 font-bold uppercase">seguidos</div></div>
                    </div>
                    <p className="text-white/70 text-lg leading-relaxed">{PROFILE.bio}</p>
                  </div>
               </div>

               {/* Highlights Scroll */}
               <div className="flex gap-8 overflow-x-auto no-scrollbar pb-6 border-t border-white/5 pt-10">
                  {HIGHLIGHTS.map(h => (
                    <a key={h.id} href={h.url} className="flex flex-col items-center gap-3 flex-shrink-0">
                       <div className="w-20 h-20 rounded-full p-0.5 bg-white/10 ring-2 ring-white/5 hover:ring-brand-purple transition-all">
                          <img src={h.img} className="w-full h-full rounded-full object-cover border-4 border-black" />
                       </div>
                       <span className="text-[10px] font-black uppercase text-white/40">{h.label}</span>
                    </a>
                  ))}
               </div>

               {/* Tabs */}
               <div className="flex justify-center border-t border-white/5 mt-10">
                  <div className="flex gap-16">
                     <div className="flex items-center gap-2 py-4 border-t-2 border-white text-xs font-black uppercase tracking-widest"><Grid size={14}/> Posts</div>
                     <div className="flex items-center gap-2 py-4 text-white/30 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"><Video size={14}/> Reels</div>
                     <div className="flex items-center gap-2 py-4 text-white/30 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"><User size={14}/> Tags</div>
                  </div>
               </div>

               {/* Grid */}
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {POSTS.map(post => (
                    <motion.a href={post.url} key={post.id} whileHover={{ scale: 1.02 }} className="aspect-[4/5] rounded-3xl overflow-hidden relative group">
                       <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-xl">
                          {post.type === 'carousel' ? <Copy size={16}/> : <Video size={16}/>}
                       </div>
                       {post.pinned && <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-xl"><Pin size={16} fill="white" className="rotate-45" /></div>}
                    </motion.a>
                  ))}
               </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <FadeUp>
              <h3 className="text-[5vw] font-black tracking-tighter mb-12"><GradientText>@sarcaone</GradientText></h3>
              <div className="flex justify-center gap-10 text-white/40 text-xs font-black uppercase tracking-[0.5em] mb-20">
                 <a href={PROFILE.url} className="hover:text-white transition-colors">Instagram</a>
                 <a href={PROFILE.threadsUrl} className="hover:text-white transition-colors">Threads</a>
                 <a href={PROFILE.whatsapp} className="hover:text-white transition-colors">WhatsApp</a>
              </div>
              <p className="text-[10px] text-white/10 uppercase tracking-[1em]">Created for Authenticity · 2026</p>
           </FadeUp>
        </div>
      </footer>
    </div>
  )
}

export default App
