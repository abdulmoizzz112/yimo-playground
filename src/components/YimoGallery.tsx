import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import yimoExpressions from "@/assets/yimo-expressions.png";

const yimoMoods = [
  { emoji: "😊", name: "Happy Yimo", description: "Full of joy and magical energy!", color: "primary" },
  { emoji: "😴", name: "Sleepy Yimo", description: "Dreaming of floating through the stars", color: "secondary" },
  { emoji: "😍", name: "Love Yimo", description: "Spreading love and positive vibes!", color: "accent" },
  { emoji: "🤔", name: "Curious Yimo", description: "Always wondering about the universe", color: "primary-glow" },
  { emoji: "🚀", name: "Adventurous Yimo", description: "Ready for the next big adventure!", color: "primary" },
  { emoji: "🎉", name: "Party Yimo", description: "Celebrating life with magical sparkles!", color: "accent" },
  { emoji: "🌟", name: "Glowing Yimo", description: "Radiating pure magical energy", color: "primary-glow" },
  { emoji: "💫", name: "Cosmic Yimo", description: "Connected to the cosmic energy flow", color: "secondary" },
];

export const YimoGallery = () => {
  const [selectedYimo, setSelectedYimo] = useState<number | null>(null);
  const [collectedYimos, setCollectedYimos] = useState<Set<number>>(new Set());

  const collectYimo = (index: number) => {
    setCollectedYimos(prev => new Set([...prev, index]));
    
    // Create collection effect
    const effect = document.createElement('div');
    effect.innerHTML = '✨ Collected! ✨';
    effect.className = 'absolute top-0 left-1/2 transform -translate-x-1/2 text-accent font-bold text-lg animate-bounce pointer-events-none z-20';
    
    const card = document.getElementById(`yimo-card-${index}`);
    if (card) {
      card.style.position = 'relative';
      card.appendChild(effect);
      setTimeout(() => effect.remove(), 2000);
    }
  };

  return (
    <div id="gallery" className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 gradient-magic bg-clip-text text-transparent">
            Yimo Collection Gallery 🎨
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Discover all the different Yimo personalities and collect them all!
          </p>
          <div className="yimo-card p-4 inline-block">
            <p className="text-lg">
              Collected: <span className="text-accent font-bold">{collectedYimos.size}</span> / {yimoMoods.length}
            </p>
          </div>
        </div>

        {/* Main gallery image */}
        <div className="mb-12 text-center">
          <Card className="yimo-card p-8 inline-block">
            <img 
              src={yimoExpressions} 
              alt="Yimo Expressions Gallery" 
              className="max-w-full h-auto rounded-2xl pulse-glow"
            />
          </Card>
        </div>

        {/* Interactive Yimo cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {yimoMoods.map((yimo, index) => (
            <Card 
              key={index}
              id={`yimo-card-${index}`}
              className={`yimo-card p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedYimo === index ? 'ring-2 ring-primary shadow-magic' : ''
              } ${collectedYimos.has(index) ? 'bg-accent/10 border-accent' : ''}`}
              onClick={() => setSelectedYimo(selectedYimo === index ? null : index)}
            >
              <div className="space-y-4">
                <div className={`text-6xl mx-auto w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-${yimo.color}/20 to-${yimo.color}/10 pulse-glow`}>
                  {yimo.emoji}
                </div>
                <h3 className="text-lg font-semibold text-primary">{yimo.name}</h3>
                <p className="text-sm text-muted-foreground">{yimo.description}</p>
                
                {collectedYimos.has(index) ? (
                  <div className="text-accent font-semibold flex items-center justify-center gap-2">
                    <span>✅</span> Collected!
                  </div>
                ) : (
                  <Button 
                    size="sm" 
                    className="yimo-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      collectYimo(index);
                    }}
                  >
                    Collect 💫
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Yimo details */}
        {selectedYimo !== null && (
          <Card className="yimo-card p-8 text-center shadow-magic">
            <div className="space-y-6">
              <div className="text-8xl mx-auto w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-accent/30 to-primary/20 pulse-glow">
                {yimoMoods[selectedYimo].emoji}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary mb-2">{yimoMoods[selectedYimo].name}</h3>
                <p className="text-lg text-muted-foreground mb-4">{yimoMoods[selectedYimo].description}</p>
                <div className="flex justify-center gap-4">
                  <Button 
                    className="yimo-button"
                    onClick={() => collectYimo(selectedYimo)}
                    disabled={collectedYimos.has(selectedYimo)}
                  >
                    {collectedYimos.has(selectedYimo) ? '✅ Collected' : '💫 Collect This Yimo'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedYimo(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Collection completion reward */}
        {collectedYimos.size === yimoMoods.length && (
          <Card className="yimo-card p-8 text-center shadow-magic border-accent animate-pulse">
            <div className="space-y-4">
              <div className="text-6xl">🏆</div>
              <h3 className="text-2xl font-bold text-accent">Congratulations!</h3>
              <p className="text-lg text-muted-foreground">
                You've collected all the Yimos! You are now a Master Yimo Collector! 🌟
              </p>
              <div className="text-4xl">✨ 🎉 ✨</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};