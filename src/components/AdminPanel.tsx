import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Edit3, Save, RotateCcw, ExternalLink, Shield } from 'lucide-react'
import { useLinks, DynamicLink } from '../hooks/useLinks'

const ADMIN_PASSWORD = 'sarca2026' // Cambiar por una contraseña segura

const GRADIENTS = [
  'from-brand-red to-brand-pink',
  'from-brand-purple to-brand-blue',
  'from-brand-blue to-brand-purple',
  'from-brand-pink to-brand-purple',
  'from-brand-red to-brand-purple',
]

const GLOWS: Record<string, string> = {
  'from-brand-red to-brand-pink': 'rgba(239, 68, 68, 0.3)',
  'from-brand-purple to-brand-blue': 'rgba(139, 92, 246, 0.3)',
  'from-brand-blue to-brand-purple': 'rgba(59, 130, 246, 0.3)',
  'from-brand-pink to-brand-purple': 'rgba(236, 72, 153, 0.3)',
  'from-brand-red to-brand-purple': 'rgba(139, 92, 246, 0.3)',
}

const EMPTY_LINK = {
  emoji: '🔗',
  label: '',
  sublabel: '',
  description: '',
  cta: 'Ver más',
  href: '',
  gradient: 'from-brand-purple to-brand-blue',
  glow: 'rgba(139, 92, 246, 0.3)',
  visible: true,
}

interface AdminPanelProps {
  onClose: () => void
}

// ── Login ──────────────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      onSuccess()
    } else {
      setError(true)
      setPw('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] gap-8"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center shadow-xl">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-black text-white">Panel Admin</h2>
        <p className="text-white/40 text-sm">Solo para @sarcaone</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <motion.div animate={error ? { x: [-8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Contraseña"
            autoFocus
            className={`w-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 text-white placeholder-white/20 outline-none focus:border-brand-purple transition-all text-lg font-bold tracking-widest`}
          />
          {error && <p className="text-red-400 text-sm mt-2 text-center font-bold">Contraseña incorrecta</p>}
        </motion.div>
        <button type="submit" className="w-full bg-gradient-to-r from-brand-purple to-brand-blue py-4 rounded-2xl font-black text-white uppercase tracking-widest hover:opacity-90 transition-opacity">
          Ingresar
        </button>
      </form>
    </motion.div>
  )
}

// ── Link Form ──────────────────────────────────────────────────────────────────
function LinkForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Partial<DynamicLink>
  onSave: (data: any) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({ ...EMPTY_LINK, ...initial })
  const set = (key: string, val: string | boolean) => setForm(p => ({ ...p, [key]: val }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4"
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Emoji</label>
          <input value={form.emoji} onChange={e => set('emoji', e.target.value)} className="admin-input" maxLength={2} />
        </div>
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Degradado</label>
          <select value={form.gradient} onChange={e => { set('gradient', e.target.value); set('glow', GLOWS[e.target.value] || form.glow) }} className="admin-input">
            {GRADIENTS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Título</label>
        <input value={form.label} onChange={e => set('label', e.target.value)} placeholder="Nombre del link" className="admin-input" />
      </div>
      <div>
        <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Subtítulo</label>
        <input value={form.sublabel} onChange={e => set('sublabel', e.target.value)} placeholder="Descripción corta" className="admin-input" />
      </div>
      <div>
        <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Descripción</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Texto del cuerpo de la card" rows={2} className="admin-input resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">Texto botón</label>
          <input value={form.cta} onChange={e => set('cta', e.target.value)} placeholder="Ver más" className="admin-input" />
        </div>
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest font-bold">URL destino</label>
          <input value={form.href} onChange={e => set('href', e.target.value)} placeholder="https://..." className="admin-input" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" id="featured" checked={!!form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-purple-500" />
        <label htmlFor="featured" className="text-white/60 text-sm font-bold">Marcar como destacado</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={() => onSave(form)} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-purple to-brand-blue py-3 rounded-2xl font-black text-white text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
          <Save className="w-4 h-4" /> Guardar
        </button>
        <button onClick={onCancel} className="px-6 py-3 rounded-2xl bg-white/5 text-white/50 font-bold text-sm hover:bg-white/10 transition-colors">
          Cancelar
        </button>
      </div>
    </motion.div>
  )
}

// ── Main Panel ─────────────────────────────────────────────────────────────────
export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const { links, addLink, updateLink, deleteLink, toggleVisible, reorder, resetToDefaults } = useLinks()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.85)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0d14] border border-white/10 rounded-[2rem] p-8 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>

        {!authed ? (
          <AdminLogin onSuccess={() => setAuthed(true)} />
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Gestión de Links</h2>
                <p className="text-white/30 text-sm">Los cambios se guardan automáticamente</p>
              </div>
              <button onClick={resetToDefaults} className="flex items-center gap-2 text-white/30 hover:text-white/70 transition-colors text-xs font-bold uppercase tracking-widest">
                <RotateCcw className="w-3 h-3" /> Resetear
              </button>
            </div>

            {/* Link list */}
            <div className="space-y-3">
              <AnimatePresence>
                {links.map((link, idx) => (
                  <motion.div
                    key={link.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`border rounded-2xl overflow-hidden ${link.visible ? 'border-white/10' : 'border-white/5 opacity-50'}`}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-4 p-4 bg-white/3">
                      <span className="text-2xl">{link.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-white truncate">{link.label || 'Sin título'}</p>
                        <p className="text-white/30 text-xs truncate">{link.href || 'Sin URL'}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {/* Reorder */}
                        <button onClick={() => reorder(idx, Math.max(0, idx - 1))} disabled={idx === 0} className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-20">
                          <ChevronUp className="w-4 h-4 text-white/50" />
                        </button>
                        <button onClick={() => reorder(idx, Math.min(links.length - 1, idx + 1))} disabled={idx === links.length - 1} className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-20">
                          <ChevronDown className="w-4 h-4 text-white/50" />
                        </button>
                        {/* Visibility */}
                        <button onClick={() => toggleVisible(link.id)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                          {link.visible ? <Eye className="w-4 h-4 text-brand-blue" /> : <EyeOff className="w-4 h-4 text-white/30" />}
                        </button>
                        {/* Preview */}
                        {link.href && (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                            <ExternalLink className="w-4 h-4 text-white/50" />
                          </a>
                        )}
                        {/* Edit */}
                        <button onClick={() => setEditing(editing === link.id ? null : link.id)} className="p-2 rounded-xl hover:bg-white/10 transition-colors">
                          <Edit3 className={`w-4 h-4 ${editing === link.id ? 'text-brand-purple' : 'text-white/50'}`} />
                        </button>
                        {/* Delete */}
                        <button onClick={() => { if (confirm(`¿Eliminar "${link.label}"?`)) deleteLink(link.id) }} className="p-2 rounded-xl hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    {/* Edit form inline */}
                    <AnimatePresence>
                      {editing === link.id && (
                        <div className="p-4 border-t border-white/5">
                          <LinkForm
                            initial={link}
                            onSave={(data) => { updateLink(link.id, data); setEditing(null) }}
                            onCancel={() => setEditing(null)}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add new */}
            <div>
              {!adding ? (
                <button
                  onClick={() => setAdding(true)}
                  className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-2xl py-5 text-white/30 font-bold hover:border-brand-purple/50 hover:text-brand-purple transition-all"
                >
                  <Plus className="w-5 h-5" /> Agregar nuevo link
                </button>
              ) : (
                <AnimatePresence>
                  <LinkForm
                    initial={{}}
                    onSave={(data) => { addLink(data); setAdding(false) }}
                    onCancel={() => setAdding(false)}
                  />
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
