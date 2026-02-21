'use client';

import { Game } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

interface GameCardProps {
  game: Game;
  onPlay?: (gameId: string) => void;
}

export default function GameCard({ game, onPlay }: GameCardProps) {
  const handlePlay = () => {
    if (onPlay) {
      onPlay(game.id);
    }
  };

  return (
    <Card className="game-card group cursor-pointer relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
        {game.isHot && (
          <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
            🔥 QUENTE
          </div>
        )}
        {game.isPopular && (
          <div className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
            👑 POPULAR
          </div>
        )}
        {game.isNew && (
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            ✨ NOVO
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Game Icon/Thumbnail */}
        <div className="text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">
          {getGameEmoji(game.category, game.name)}
        </div>

        {/* Game Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-black text-white mb-2">{game.name}</h3>
          <p className="text-purple-300 text-sm mb-3">{game.provider}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-300">RTP:</span>
              <span className="text-green-400 font-bold">{game.rtp}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300">Min/Max:</span>
              <span className="text-yellow-400 font-bold">
                {formatCurrency(game.minBet)} - {formatCurrency(game.maxBet)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-300">Volatilidade:</span>
              <span className={`font-bold ${
                game.volatility === 'HIGH' ? 'text-red-400' :
                game.volatility === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {game.volatility === 'HIGH' ? '🔥 Alta' :
                 game.volatility === 'MEDIUM' ? '⚡ Média' : '🟢 Baixa'}
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 justify-center">
            {game.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-purple-900/50 text-purple-300 text-xs px-2 py-1 rounded border border-purple-500/30"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Play Button */}
        <Button
          variant="primary"
          className="w-full hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
          onClick={handlePlay}
        >
          🎮 JOGAR AGORA
        </Button>

        {/* Demo Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2 border-purple-500/30 text-purple-300 hover:border-purple-400 hover:text-purple-200"
        >
          👁️ DEMO
        </Button>
      </CardContent>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
}

// Helper function para emojis dos jogos
function getGameEmoji(category: string, name: string): string {
  // Emojis específicos por nome
  const gameEmojis: Record<string, string> = {
    'Fortune Tiger': '🐅',
    'Sweet Bonanza': '🍭',
    'Gates of Olympus': '⚡',
    'Fortune Ox': '🐂',
    'Fortune Mouse': '🐭',
    'Aviator': '✈️',
    'Crazy Time': '🎪',
    'Lightning Roulette': '⚡',
    'Blackjack Classic': '🃏',
    'Mines': '💣',
  };

  if (gameEmojis[name]) {
    return gameEmojis[name];
  }

  // Emojis por categoria
  const categoryEmojis: Record<string, string> = {
    'SLOTS': '🎰',
    'LIVE_CASINO': '🎲',
    'TABLE_GAMES': '🃏',
    'CRASH': '🚀',
    'INSTANT_WIN': '⚡',
    'SPORTS': '⚽',
  };

  return categoryEmojis[category] || '🎮';
}
