const FluidBackground = () => {
  return (
    <>
      <style>{`
        @keyframes blobMove1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(60px, -40px) scale(1.1); }
          66%       { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes blobMove2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-80px, 60px) scale(1.15); }
          66%       { transform: translate(50px, -70px) scale(0.9); }
        }
        @keyframes blobMove3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(40px, 40px) scale(1.2); }
        }
        @keyframes blobMove4 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-60px, -50px) scale(1.1); }
        }
        .blob { position: absolute; border-radius: 9999px; }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: -10,
        background: '#06060a', overflow: 'hidden',
      }}>

        {/* Blob 1 — Violeta */}
        <div className="blob" style={{
          width: 700, height: 700,
          top: '-15%', left: '-10%',
          background: '#7c3aed',
          filter: 'blur(80px)',
          opacity: 0.45,
          animation: 'blobMove1 20s ease-in-out infinite',
        }} />

        {/* Blob 2 — Azul */}
        <div className="blob" style={{
          width: 800, height: 800,
          top: '20%', right: '-15%',
          background: '#2563eb',
          filter: 'blur(90px)',
          opacity: 0.4,
          animation: 'blobMove2 25s ease-in-out infinite',
        }} />

        {/* Blob 3 — Rosa */}
        <div className="blob" style={{
          width: 600, height: 600,
          bottom: '5%', left: '25%',
          background: '#db2777',
          filter: 'blur(70px)',
          opacity: 0.35,
          animation: 'blobMove3 18s ease-in-out infinite',
        }} />

        {/* Blob 4 — Rojo */}
        <div className="blob" style={{
          width: 500, height: 500,
          top: '50%', left: '60%',
          background: '#dc2626',
          filter: 'blur(80px)',
          opacity: 0.3,
          animation: 'blobMove4 22s ease-in-out infinite',
        }} />

        {/* Grid mesh glassmorphism */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />

        {/* Viñeta radial para profundidad */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.55) 100%)',
        }} />

      </div>
    </>
  )
}

export default FluidBackground
