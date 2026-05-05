import { useState, useEffect } from 'react'

export interface DynamicLink {
  id: string
  emoji: string
  label: string
  sublabel: string
  description: string
  cta: string
  href: string
  gradient: string
  glow: string
  featured?: boolean
  comingSoon?: boolean
  visible: boolean
}

const DEFAULT_LINKS: DynamicLink[] = [
  {
    id: 'collabs',
    emoji: '⚡',
    label: 'Canjes y Colaboraciones',
    sublabel: 'Trabajemos juntos en algo grande',
    description: '¿Tenés una marca, producto o proyecto? Hablemos de cómo podemos colaborar y generar algo auténtico.',
    cta: 'Quiero colaborar',
    href: 'https://api.whatsapp.com/send?phone=5493518080446&text=Hola!%20Quiero%20colaborar%20con%20vos',
    gradient: 'from-brand-red to-brand-pink',
    glow: 'rgba(239, 68, 68, 0.3)',
    visible: true,
  },
  {
    id: 'escuela',
    emoji: '🔥',
    label: 'Entrenamiento de Abril',
    sublabel: 'El programa mensual de comunicación',
    description: 'El espacio donde entrenamos la autenticidad. Un método, una comunidad, una transformación real en cómo te expresás.',
    cta: 'Quiero unirme',
    href: 'https://api.whatsapp.com/send?phone=5493518080446&text=Hola!%20Quiero%20unirme%20a%20tu%20escuela!%20',
    gradient: 'from-brand-purple to-brand-blue',
    glow: 'rgba(139, 92, 246, 0.3)',
    featured: true,
    visible: true,
  },
  {
    id: 'tienda',
    emoji: '🎒',
    label: 'Tienda de Recursos',
    sublabel: 'Clases y recursos digitales',
    description: 'Próximamente: recursos, clases y materiales para que puedas avanzar a tu ritmo.',
    cta: 'Ver tienda',
    href: 'https://sarcaone.empretienda.com.ar/',
    gradient: 'from-brand-blue to-brand-purple',
    glow: 'rgba(59, 130, 246, 0.3)',
    comingSoon: true,
    visible: true,
  },
]

const STORAGE_KEY = 'sarcaone_links'

export function useLinks() {
  const [links, setLinks] = useState<DynamicLink[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : DEFAULT_LINKS
    } catch {
      return DEFAULT_LINKS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links))
  }, [links])

  const addLink = (link: Omit<DynamicLink, 'id'>) => {
    const newLink = { ...link, id: Date.now().toString() }
    setLinks(prev => [...prev, newLink])
  }

  const updateLink = (id: string, updates: Partial<DynamicLink>) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  const toggleVisible = (id: string) => {
    setLinks(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l))
  }

  const reorder = (fromIdx: number, toIdx: number) => {
    setLinks(prev => {
      const arr = [...prev]
      const [item] = arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, item)
      return arr
    })
  }

  const resetToDefaults = () => {
    setLinks(DEFAULT_LINKS)
    localStorage.removeItem(STORAGE_KEY)
  }

  return { links, addLink, updateLink, deleteLink, toggleVisible, reorder, resetToDefaults }
}
