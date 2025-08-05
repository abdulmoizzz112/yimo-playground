import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import yimoPlayground from "@/assets/yimo-playground.png";

interface BouncingYimo {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export const YimoPlayground = () => {
  const [yimos, setYimos] = useState<BouncingYimo[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const colors = ['primary', 'accent', 'secondary', 'primary-glow'];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setYimos(prev => prev.map(yimo => {
        let newX = yimo.x + yimo.vx;
        let newY = yimo.y + yimo.vy;
        let newVx = yimo.vx;
        let newVy = yimo.vy;

        // Bounce off walls
        if (newX <= 0 || newX >= 90) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(90, newX));
        }
        if (newY <= 0 || newY >= 80) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(80, newY));
        }

        return { ...yimo, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const spawnYimo = () => {
    const newYimo: BouncingYimo = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.8 + Math.random() * 0.4,
    };
    setYimos(prev => [...prev, newYimo]);
  };

  const catchYimo = (id: number) => {
    setYimos(prev => prev.filter(yimo => yimo.id !== id));
    setScore(prev => prev + 10);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setYimos([]);
    // Spawn initial Yimos
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnYimo(), i * 200);
    }
  };

  const stopGame = () => {
    setIsPlaying(false);
    setYimos([]);
  };

  return (
    <div id="playground" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 gradient-magic bg-clip-text text-transparent">
            Yimo Playground 🎮
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Catch the bouncing Yimos to score points! They're full of magical energy! ⚡
          </p>
        </div>

        {/* Game stats and controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="yimo-card p-6 flex-1">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">Score</h3>
              <div className="text-4xl font-bold text-accent">{score}</div>
            </div>
          </Card>
          
          <Card className="yimo-card p-6 flex-1">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">Active Yimos</h3>
              <div className="text-4xl font-bold text-secondary">{yimos.length}</div>
            </div>
          </Card>

          <Card className="yimo-card p-6 flex-1">
            <div className="flex flex-col gap-2">
              {!isPlaying ? (
                <Button onClick={startGame} className="yimo-button">
                  🚀 Start Game
                </Button>
              ) : (
                <Button onClick={stopGame} variant="destructive">
                  ⏹️ Stop Game
                </Button>
              )}
              {isPlaying && (
                <Button onClick={spawnYimo} className="yimo-button">
                  ➕ Spawn Yimo
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Game area */}
        <Card className="yimo-card relative overflow-hidden" style={{ height: '500px' }}>
          <div 
            className="absolute inset-4 rounded-2xl border-2 border-primary/30 relative overflow-hidden"
            style={{
              backgroundImage: `url(${yimoPlayground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Bouncing Yimos */}
            {yimos.map(yimo => (
              <div
                key={yimo.id}
                className={`absolute w-12 h-12 rounded-full cursor-pointer bounce-animation opacity-90 hover:opacity-100 transition-opacity`}
                style={{
                  left: `${yimo.x}%`,
                  top: `${yimo.y}%`,
                  transform: `scale(${yimo.size})`,
                  background: `radial-gradient(circle, hsl(var(--${yimo.color})), hsl(var(--${yimo.color}) / 0.7))`,
                  boxShadow: `0 0 20px hsl(var(--${yimo.color}) / 0.5)`,
                }}
                onClick={() => catchYimo(yimo.id)}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent">
                  <div className="w-4 h-4 bg-background rounded-full absolute top-2 left-2 opacity-80" />
                  <div className="w-4 h-4 bg-background rounded-full absolute top-2 right-2 opacity-80" />
                  <div className="w-2 h-2 bg-primary rounded-full absolute top-3 left-3" />
                  <div className="w-2 h-2 bg-primary rounded-full absolute top-3 right-3" />
                </div>
              </div>
            ))}

            {/* Game instructions overlay */}
            {!isPlaying && yimos.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎯</div>
                  <h3 className="text-2xl font-bold text-primary">Ready to Play?</h3>
                  <p className="text-muted-foreground">Click "Start Game" to begin catching Yimos!</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Game tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="yimo-card p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-lg font-semibold mb-2">Catch Them All!</h4>
            <p className="text-sm text-muted-foreground">Click on bouncing Yimos to catch them and earn points!</p>
          </Card>
          <Card className="yimo-card p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h4 className="text-lg font-semibold mb-2">Magical Energy</h4>
            <p className="text-sm text-muted-foreground">Each Yimo has different colors and magical properties!</p>
          </Card>
          <Card className="yimo-card p-6 text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h4 className="text-lg font-semibold mb-2">High Scores</h4>
            <p className="text-sm text-muted-foreground">Challenge yourself to catch as many Yimos as possible!</p>
          </Card>
        </div>
      </div>
    </div>
  );
};