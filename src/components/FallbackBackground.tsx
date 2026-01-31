const FallbackBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated stars */}
      <div className="absolute inset-0 stars-bg opacity-30" />
      
      {/* Magical glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-yellow-400/20 via-yellow-600/10 to-transparent rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-purple-400/20 via-purple-600/10 to-transparent rounded-full animate-pulse" />
    </div>
  );
};

export default FallbackBackground;