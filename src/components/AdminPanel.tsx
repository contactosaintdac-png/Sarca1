import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown,
  Edit3, Save, RotateCcw, ExternalLink, Shield, Check, ArrowLeft
} from 'lucide-react'
import { useLinks, DynamicLink } from '../hooks/useLinks'

const ADMIN_PASSWORD = 'sarca2026'

const GRADIENTS = [
  { value: 'from-brand-red to-brand-pink',    label: '🔴 Rojo → Rosa' },
  { value: 'from-brand-purple to-brand-blue', label: '🟣 Violeta → Azul' },
  { value: 'from-brand-blue to-brand-purple', label: '🔵 Azul → Violeta' },
  { value: 'from-brand-pink to-brand-purple', label: '💗 Rosa → Violeta' },
  { value: 'from-brand-red to-brand-purple',  label: '🔴 Rojo → Violeta' },
]

const GLOW_MAP: Record<string, string> = {
  'from-brand-red to-brand-pink':    'rgba(239, 68, 68, 0.3)',
  'from-brand-purple to-brand-blue': 'rgba(139, 92, 246, 0.3)',
  'from-brand-blue to-brand-purple': 'rgba(59, 130, 246, 0.3)',
  'from-brand-pink to-brand-purple': 'rgba(236, 72, 153, 0.3)',
  'from-brand-red to-brand-purple':  'rgba(139, 92, 246, 0.3)',
}

const EMPTY: Partial<DynamicLink> = {
  emoji: '🔗', label: '', sublabel: '', description: '',
  cta: 'Ver más', href: '', gradient: 'from-brand-purple to-brand-blue',
  glow: 'rgba(139, 92, 246, 0.3)', visible: true,
}

// ── Input helper ────────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-white/40 text-[10px] font-black uppercase tracking-widest">{label}</label>
      {children}
    </div>
  )
}

// ── Link Form ───────────────────────────────────────────────────────────────────
function LinkForm({ initial, onSave, onCancel }: {
  initial: Partial<DynamicLink>
  onSave: (d: Partial<DynamicLink>) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({ ...EMPTY, ...initial })
  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="space-y-4">
      {/* Back header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onCancel} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h3 className="font-black text-white text-lg">
          {initial.id ? 'Editar link' : 'Nuevo link'}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Emoji">
          <input value={form.emoji} onChange={e => set('emoji', e.target.value)}
            maxLength={2} className="admin-input text-2xl text-center" />
        </Field>
        <Field label="Color">
          <select value={form.gradient}
            onChange={e => { set('gradient', e.target.value); set('glow', GLOW_MAP[e.target.value] || '') }}
            className="admin-input text-sm">
            {GRADIENTS.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Título del link">
        <input value={form.label} onChange={e => set('label', e.target.value)}
          placeholder="Nombre del link" className="admin-input" />
      </Field>

      <Field label="Subtítulo">
        <input value={form.sublabel} onChange={e => set('sublabel', e.target.value)}
          placeholder="Descripción corta" className="admin-input" />
      </Field>

      <Field label="Descripción">
        <textarea value={form.description} onChange={e => set('description', e.target.value)}
          placeholder="Texto del cuerpo..." rows={3} className="admin-input resize-none" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Botón CTA">
          <input value={form.cta} onChange={e => set('cta', e.target.value)}
            placeholder="Ver más" className="admin-input" />
        </Field>
        <Field label="URL">
          <input value={form.href} onChange={e => set('href', e.target.value)}
            placeholder="https://..." className="admin-input" />
        </Field>
      </div>

      <label className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 cursor-pointer">
        <input type="checkbox" checked={!!form.featured} onChange={e => set('featured', e.target.checked)}
          className="w-5 h-5 accent-purple-500 rounded" />
        <span className="text-white/70 text-sm font-bold">⭐ Marcar como destacado</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-purple to-brand-blue py-4 rounded-2xl font-black text-white uppercase tracking-widest text-sm active:scale-95 transition-transform">
          <Check className="w-5 h-5" /> Guardar
        </button>
        <button onClick={onCancel}
          className="px-5 py-4 rounded-2xl bg-white/5 text-white/50 font-bold text-sm hover:bg-white/10 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  )
}

// ── Login ────────────────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onSuccess() }
    else { setError(true); setPw(''); setTimeout(() => setError(false), 2000) }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center shadow-xl">
        <Shield className="w-10 h-10 text-white" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-black text-white mb-1">Panel Admin</h2>
        <p className="text-white/30 text-sm">Solo para @sarcaone</p>
      </div>

      <form onSubmit={submit} className="w-full space-y-4">
        <motion.div animate={error ? { x: [-8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            placeholder="Contraseña" autoFocus
            className={`admin-input text-center text-xl tracking-[0.3em] ${error ? 'border-red-500' : ''}`} />
          {error && <p className="text-red-400 text-sm mt-2 text-center font-bold">Contraseña incorrecta</p>}
        </motion.div>
        <button type="submit"
          className="w-full bg-gradient-to-r from-brand-purple to-brand-blue py-4 rounded-2xl font-black text-white uppercase tracking-widest text-sm active:scale-95 transition-transform">
          Ingresar
        </button>
      </form>
    </div>
  )
}

// ── Main Panel ───────────────────────────────────────────────────────────────────
export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authed, setAuthed] = useState(false)
  const [editing, setEditing] = useState<DynamicLink | null>(null)
  const [adding, setAdding] = useState(false)
  const { links, addLink, updateLink, deleteLink, toggleVisible, reorder, resetToDefaults } = useLinks()

  // Full-screen form view (mobile-friendly)
  if (authed && (editing || adding)) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] overflow-y-auto"
        style={{ backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.95)' }}>
        <div className="min-h-full flex flex-col justify-center p-5 max-w-lg mx-auto">
          <LinkForm
            initial={editing ?? EMPTY}
            onSave={data => {
              if (editing) {
                updateLink(editing.id, data)
              } else {
                const newLink = {
                  ...EMPTY,
                  ...data,
                  visible: true
                } as Omit<DynamicLink, 'id'>
                addLink(newLink)
              }
              setEditing(null)
              setAdding(false)
            }}
            onCancel={() => { setEditing(null); setAdding(false) }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.85)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto
          bg-[#0d0d14] border border-white/10
          rounded-t-[2rem] sm:rounded-[2rem]
          shadow-[0_-20px_60px_rgba(0,0,0,0.8)]"
      >
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="p-5 sm:p-8">
          {!authed ? (
            <AdminLogin onSuccess={() => setAuthed(true)} />
          ) : (
            <div className="space-y-5">

              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-white">Gestión de Links</h2>
                  <p className="text-white/30 text-xs mt-0.5">Cambios guardados automáticamente</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => { if (confirm('¿Resetear a los links originales?')) resetToDefaults() }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    title="Resetear">
                    <RotateCcw className="w-4 h-4 text-white/40" />
                  </button>
                  <button onClick={onClose}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Link list */}
              <div className="space-y-3">
                <AnimatePresence>
                  {links.map((link, idx) => (
                    <motion.div key={link.id} layout
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`rounded-2xl border overflow-hidden transition-opacity ${link.visible ? 'border-white/10' : 'border-white/5 opacity-40'}`}>

                      {/* Card row */}
                      <div className="flex items-center gap-3 p-3.5">
                        {/* Emoji */}
                        <span className="text-2xl flex-shrink-0">{link.emoji}</span>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-white text-sm leading-tight truncate">
                            {link.label || 'Sin título'}
                          </p>
                          <p className="text-white/25 text-[11px] truncate mt-0.5">
                            {link.href || 'Sin URL'}
                          </p>
                        </div>

                        {/* Actions — 2 rows on mobile, 1 row on desktop */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0">
                          {/* Row 1: order */}
                          <div className="flex gap-1">
                            <button onClick={() => reorder(idx, Math.max(0, idx - 1))}
                              disabled={idx === 0}
                              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center disabled:opacity-20 active:bg-white/20 transition-colors">
                              <ChevronUp className="w-4 h-4 text-white/60" />
                            </button>
                            <button onClick={() => reorder(idx, Math.min(links.length - 1, idx + 1))}
                              disabled={idx === links.length - 1}
                              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center disabled:opacity-20 active:bg-white/20 transition-colors">
                              <ChevronDown className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                          {/* Row 2: actions */}
                          <div className="flex gap-1">
                            <button onClick={() => toggleVisible(link.id)}
                              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center active:bg-white/20 transition-colors">
                              {link.visible
                                ? <Eye className="w-4 h-4 text-brand-blue" />
                                : <EyeOff className="w-4 h-4 text-white/30" />}
                            </button>
                            <button onClick={() => setEditing(link)}
                              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center active:bg-white/20 transition-colors">
                              <Edit3 className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete bar at bottom */}
                      <button
                        onClick={() => { if (confirm(`¿Eliminar "${link.label}"?`)) deleteLink(link.id) }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/5 hover:bg-red-500/15 border-t border-white/5 transition-colors text-red-400 text-xs font-bold">
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar este link
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Add button */}
              <button onClick={() => setAdding(true)}
                className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-2xl py-5 text-white/40 font-bold text-sm hover:border-brand-purple/50 hover:text-brand-purple transition-all active:scale-95">
                <Plus className="w-5 h-5" /> Agregar nuevo link
              </button>

              <div className="h-safe-area-bottom" />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
