import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import yimoHero from "@/assets/yimo-hero.png";

export const YimoHero = () => {
  const [floatingYimos, setFloatingYimos] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    // Create floating Yimo particles
    const yimos = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: 0.5 + Math.random() * 0.5,
    }));
    setFloatingYimos(yimos);
  }, []);

  const handleYimoClick = () => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full bg-primary/30 animate-ping';
    ripple.style.width = '200px';
    ripple.style.height = '200px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    
    const container = document.getElementById('yimo-hero');
    if (container) {
      container.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
  };

  return (
    <div id="yimo-hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {floatingYimos.map((yimo) => (
          <div
            key={yimo.id}
            className="absolute w-8 h-8 bg-primary/20 rounded-full blur-sm float-animation"
            style={{
              left: `${yimo.x}%`,
              top: `${yimo.y}%`,
              animationDelay: `${yimo.delay}s`,
              transform: `scale(${yimo.size})`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-pulse">
            YIMO
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground/80">
            Welcome to the Magical Playground! ✨
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter a world where Yimos float, bounce, and sparkle with endless magic and joy!
          </p>
        </div>

        {/* Interactive Yimo */}
        <div 
          className="relative mx-auto w-64 h-48 cursor-pointer group"
          onClick={handleYimoClick}
        >
          <img 
            src={yimoHero} 
            alt="Magical Yimo" 
            className="w-full h-full object-contain float-animation pulse-glow group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors blur-2xl scale-150" />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="yimo-button text-lg px-8 py-6"
            onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🎮 Enter Playground
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-6"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            👀 Explore Gallery
          </Button>
        </div>
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};