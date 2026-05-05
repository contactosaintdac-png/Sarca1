import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
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

function cn(...c: (string | boolean | undefined)[]) {
  return c.filter(Boolean).join(' ')
}

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: 1 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 80, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function LinkCard({ link, index }: { link: typeof LINKS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <FadeUp delay={index * 0.15}>
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'relative block rounded-3xl p-px cursor-pointer group',
          link.featured ? 'ring-1 ring-white/20' : ''
        )}
        style={{ boxShadow: hovered ? `0 0 60px ${link.glow}` : `0 0 20px ${link.glow}40` }}
      >
        <div className={cn('absolute inset-0 bg-gradient-to-br opacity-80 rounded-3xl', link.gradient)} />
        <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 m-px overflow-visible">
          {link.featured && (
            <div className="absolute -top-3 left-6 bg-gradient-to-r from-brand-purple to-brand-blue text-[10px] font-black px-4 py-1 rounded-full tracking-widest uppercase z-50 shadow-lg">
              ⭐ Más popular
            </div>
          )}
          <div className="flex items-start gap-5">
            <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl flex-shrink-0 group-hover:rotate-12 transition-transform', link.gradient)}>
              {link.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-lg md:text-xl text-white mb-1">{link.label}</h3>
              <p className="text-white/50 text-sm mb-3">{link.sublabel}</p>
              <p className="text-white/70 text-sm leading-relaxed">{link.description}</p>
            </div>
          </div>
          <motion.div animate={{ gap: hovered ? '16px' : '8px' }} className={cn('mt-6 flex items-center justify-between', link.comingSoon ? 'opacity-40 pointer-events-none' : '')}>
            <span className={cn('font-black text-sm uppercase tracking-widest bg-gradient-to-r bg-clip-text text-transparent', link.gradient)}>
              {link.cta} →
            </span>
            <motion.div animate={{ x: hovered ? 5 : 0 }} className={cn('w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center', link.gradient)}>
              <ExternalLink className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </motion.a>
    </FadeUp>
  )
}

function InstagramMini() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeUp>
          <div className="text-center mb-16 px-4">
            <p className="text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-4">Explorá mi contenido</p>
            <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
              El universo de <br className="sm:hidden" /> <GradientText>@sarcaone</GradientText>
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="glass rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 mb-8 shadow-premium border-white/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12">
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 flex-shrink-0">
                 <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-brand-red via-brand-purple to-brand-blue">
                  <div className="w-full h-full rounded-full bg-black p-[2px] overflow-hidden">
                    <img src={profileImg} alt="sarcaone" className="w-full h-full rounded-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                  <span className="font-black text-2xl sm:text-3xl tracking-tight text-center sm:text-left">{PROFILE.handle}</span>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <a href={PROFILE.url} target="_blank" className="flex-1 sm:flex-none text-center bg-white text-black px-8 py-2 rounded-xl text-sm font-black hover:bg-white/90 transition-colors">Seguir</a>
                    <a href="https://www.instagram.com/direct/t/110371723683459/" target="_blank" className="flex-1 sm:flex-none text-center bg-white/10 px-8 py-2 rounded-xl text-sm font-black hover:bg-white/20 transition-colors">Mensaje</a>
                  </div>
                </div>
                
                <div className="flex justify-around sm:justify-start gap-0 sm:gap-12 text-sm sm:text-base mb-8 border-y sm:border-y-0 border-white/5 py-4 sm:py-0">
                  <div className="text-center sm:text-left"><div className="font-black text-lg">{PROFILE.posts}</div><div className="text-white/40 text-xs uppercase tracking-widest">posts</div></div>
                  <div className="text-center sm:text-left"><div className="font-black text-lg">{PROFILE.followers}</div><div className="text-white/40 text-xs uppercase tracking-widest">seguidores</div></div>
                  <div className="text-center sm:text-left"><div className="font-black text-lg">{PROFILE.following}</div><div className="text-white/40 text-xs uppercase tracking-widest">seguidos</div></div>
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <p className="text-white/80 text-sm sm:text-lg leading-relaxed font-medium">{PROFILE.bio}</p>
                  <a href={PROFILE.threadsUrl} target="_blank" className="inline-flex items-center gap-2 text-brand-blue text-sm font-bold hover:underline">
                    <AtSign className="w-4 h-4" /> threads.net/@sarcaone
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex gap-5 sm:gap-8 overflow-x-auto no-scrollbar pb-4 justify-start sm:justify-center px-2 sm:px-0">
              {HIGHLIGHTS.map(h => (
                <motion.a 
                  key={h.id} 
                  href={h.url}
                  target="_blank"
                  whileHover={{ scale: 1.05 }} 
                  className="flex flex-col items-center gap-3 cursor-pointer flex-shrink-0 min-w-[70px] sm:min-w-[90px]"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 p-[2px] ring-2 ring-white/5 hover:ring-brand-purple transition-all">
                    <div className="w-full h-full rounded-full bg-black p-[2px] overflow-hidden">
                      <img src={h.img} alt={h.label} className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs text-white/50 font-bold text-center w-full truncate px-1">{h.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </FadeUp>

        <div className="flex justify-center border-t border-white/5 mb-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 sm:gap-16 pt-0">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black border-t-2 border-white -mt-[2px] py-4 uppercase tracking-[0.2em] cursor-pointer">
              <Grid className="w-4 h-4" /> <span className="hidden sm:inline">Publicaciones</span> <span className="sm:hidden">Posts</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-white/30 py-4 uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">
              <Video className="w-4 h-4" /> Reels
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black text-white/30 py-4 uppercase tracking-[0.2em] cursor-pointer hover:text-white transition-colors">
              <User className="w-4 h-4" /> <span className="hidden sm:inline">Etiquetadas</span> <span className="sm:hidden">Tags</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 px-1 sm:px-0">
          {POSTS.map((post, idx) => (
            <FadeUp key={post.id} delay={idx * 0.05}>
              <motion.a
                href={post.url}
                target="_blank"
                whileHover={{ scale: 1.02 }}
                className="relative block aspect-[4/5] rounded-lg sm:rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={post.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-2">
                  {post.pinned && (
                    <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-full ring-1 ring-white/20">
                      <Pin className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-white rotate-45" />
                    </div>
                  )}
                </div>
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/40 backdrop-blur-md p-1 rounded-md sm:rounded-lg">
                   {post.type === 'carousel' ? <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-white" /> : <Video className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2 font-black"><Heart className="w-6 h-6 fill-white" /> {post.likes}</div>
                  <div className="flex items-center gap-2 font-black"><MessageCircle className="w-6 h-6 fill-white" /> {post.comments}</div>
                </div>
              </motion.a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3}>
          <div className="mt-12 sm:mt-20 text-center px-4">
            <a 
              href={PROFILE.reelsUrl}
              target="_blank"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-4 bg-gradient-to-r from-brand-purple to-brand-blue px-12 py-5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" /> Ver todos los Reels
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: Math.random() * 0.2 + 0.1,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, '-10%'],
            opacity: [0, 0.2, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
        />
      ))}
    </div>
  )
}

function AtSign({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
  )
}

function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("text-[#0095f6]", className)}>
      <path d="M12 2c-.176 0-.351.002-.525.006a1 1 0 0 0-.756.406l-1.5 2a1 1 0 0 1-.8.4h-2.5a1 1 0 0 0-1 1v2.5a1 1 0 0 1-.4.8l-2 1.5a1 1 0 0 0-.406.756c-.004.174-.006.349-.006.525s.002.351.006.525a1 1 0 0 0 .406.756l2 1.5a1 1 0 0 1 .4.8v2.5a1 1 0 0 0 1 1h2.5a1 1 0 0 1 .8.4l1.5 2a1 1 0 0 0 .756.406c.174.004.349.006.525.006s.351-.002.525-.006a1 1 0 0 0 .756-.406l1.5-2a1 1 0 0 1 .8-.4h2.5a1 1 0 0 0 1-1v-2.5a1 1 0 0 1 .4-.8l2-1.5a1 1 0 0 0 .406-.756c.004-.174.006-.349.006-.525s-.002-.351-.006-.525a1 1 0 0 0-.406-.756l-2-1.5a1 1 0 0 1-.4-.8V5.912a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-1.5-2A1 1 0 0 0 12.525 2.006C12.351 2.002 12.176 2 12 2zm4.707 9.293-5.5 5.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414L10.5 14.586l4.793-4.793a1 1 0 0 1 1.414 1.414z" />
    </svg>
  )
}

function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <div 
      className="min-h-screen relative text-white overflow-x-hidden selection:bg-brand-purple/30 bg-transparent"
      style={{
        background: `
          radial-gradient(ellipse 80% 70% at 10% 10%,  rgba(124, 58, 237, 0.55) 0%, transparent 60%),
          radial-gradient(ellipse 80% 70% at 90% 90%,  rgba(29, 78, 216, 0.55)  0%, transparent 60%),
          radial-gradient(ellipse 60% 55% at 80% 5%,   rgba(219, 39, 119, 0.4)  0%, transparent 55%),
          radial-gradient(ellipse 55% 50% at 20% 90%,  rgba(239, 68, 68, 0.35)  0%, transparent 55%),
          #06060a
        `
      }}
    >
      <FluidBackground />
      <Particles />
      <CustomCursor />

      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-3xl mx-auto flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative w-32 h-32 md:w-48 md:h-48 group cursor-pointer"
            onClick={() => window.open(PROFILE.url, '_blank')}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-red via-brand-purple to-brand-blue p-[4px] shadow-[0_0_50px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_80px_rgba(139,92,246,0.5)] transition-shadow">
              <div className="w-full h-full rounded-full bg-black p-[3px] overflow-hidden">
                <img 
                  src={profileImg} 
                  alt="sarcaone" 
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 group-hover:scale-110 transition-transform">
              <VerifiedBadge className="w-10 h-10 md:w-14 md:h-14" />
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-brand-purple text-sm font-black tracking-[0.3em] uppercase">Un tipo apasionado</motion.p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              <GradientText>@sarcaone</GradientText>
            </h1>
            <p className="text-white/40 text-lg md:text-2xl font-medium tracking-tight">Autenticidad y Comunicación</p>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-white/70 text-lg md:text-2xl font-light leading-relaxed max-w-2xl italic">
            "No te enseña a hablar. Te ayuda a ser vos cuando hablás."
          </motion.p>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-10 flex flex-col items-center gap-3 opacity-30">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black">Empezá el viaje</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
                <div className="relative glass rounded-3xl p-8 md:p-12 border-white/10 overflow-hidden">
                   <h2 className="text-4xl md:text-6xl font-black leading-[1.1] mb-8">
                    <GradientText>No te enseña a hablar.</GradientText><br />
                    Te ayuda a ser vos cuando hablás.
                  </h2>
                  <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-6">
                    Sarca no te enseña oratoria tradicional. Te entrena para que tu comunicación sea un reflejo exacto de quién sos, sin poses ni libretos.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Sin fachadas', 'Sin poses', '100% Vos'].map(t => (
                      <span key={t} className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold text-white/60 ring-1 ring-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            <div className="space-y-6">
              {[
                { title: 'Entrenamiento Real', text: 'Un proceso de desbloqueo expresivo para que hablar en público o ante cámara sea natural.', icon: Star },
                { title: 'Comunidad Exclusiva', text: 'Acceso a un círculo de personas que buscan la misma claridad y autenticidad.', icon: Users },
                { title: 'Recursos Directos', text: 'Herramientas prácticas para aplicar hoy mismo en tu comunicación.', icon: Zap }
              ].map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.1}>
                  <div className="flex gap-6 p-6 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 relative bg-gradient-to-b from-transparent via-brand-purple/5 to-transparent">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Elegí tu <GradientText>camino</GradientText></h2>
            <p className="text-white/40 text-lg">El primer paso para una comunicación más real.</p>
          </FadeUp>
          <div className="space-y-6">
            {LINKS.map((link, i) => (
              <LinkCard key={link.id} link={link} index={i} />
            ))}
          </div>
        </div>
      </section>

      <InstagramMini />

      <footer className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/20 to-transparent opacity-30" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <FadeUp>
            <div className="flex flex-col items-center gap-8">
              <div className="space-y-4 flex flex-col items-center">
                <div className="flex gap-4 mb-2">
                  <a href={PROFILE.url} target="_blank" className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/10">
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a href={PROFILE.whatsapp} target="_blank" className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center hover:scale-110 transition-transform hover:bg-white/10">
                    <Phone className="w-8 h-8" />
                  </a>
                </div>
                <h3 className="text-4xl font-black tracking-tight"><GradientText>@sarcaone</GradientText></h3>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-xs">Comunicación Auténtica</p>
              </div>

              <div className="flex gap-10 text-white/30 text-sm font-bold uppercase tracking-widest mt-6">
                <a href={PROFILE.url} target="_blank" className="hover:text-white transition-colors">Instagram</a>
                <a href={PROFILE.threadsUrl} target="_blank" className="hover:text-white transition-colors">Threads</a>
              </div>
              <p className="text-white/10 text-[10px] mt-10">© 2026 Sarca One · Crafted for Authenticity</p>
            </div>
          </FadeUp>
        </div>
      </footer>
    </div>
  )
}

export default App
