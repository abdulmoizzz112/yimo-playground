import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const YimoFooter = () => {
  const magicalQuotes = [
    "✨ Every Yimo carries a spark of pure magic",
    "🌟 In the playground of dreams, Yimos dance with stars",
    "💫 Where imagination meets magic, Yimos are born",
    "🎭 Each Yimo has a story written in stardust",
  ];

  const randomQuote = magicalQuotes[Math.floor(Math.random() * magicalQuotes.length)];

  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Card className="yimo-card p-12 text-center">
          <div className="space-y-8">
            {/* Magical quote */}
            <div className="text-xl text-accent italic font-medium">
              {randomQuote}
            </div>

            {/* Floating mini Yimos */}
            <div className="flex justify-center gap-4 my-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent float-animation opacity-70"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Call to action */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold gradient-magic bg-clip-text text-transparent">
                Keep the Magic Alive! 🪄
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The Yimo universe is endless. Create your own magical moments and share them with the world!
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="yimo-button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                🚀 Back to Top
              </Button>
              <Button 
                variant="outline" 
                className="border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🎮 Play Again
              </Button>
            </div>

            {/* Credits */}
            <div className="pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Made with 💖 and ✨ magical energy • Yimo Playground © 2024
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};