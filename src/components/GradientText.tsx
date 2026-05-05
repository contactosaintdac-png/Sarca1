const GradientText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`bg-gradient-to-r from-brand-red via-brand-purple to-brand-blue bg-clip-text text-transparent font-black ${className}`}>
      {children}
    </span>
  )
}

export default GradientText
