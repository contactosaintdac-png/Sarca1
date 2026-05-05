// Los blobs del fondo están definidos directamente en index.css (body::before y body::after)
// Esto evita el bug de stacking context que escondía los blobs detrás del contenido.
const FluidBackground = () => null

export default FluidBackground
