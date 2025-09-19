import { createContext, ReactNode, useContext, useState } from 'react';
import { Card } from '../components/deck';

type GameContextType = {
  playerHand: Card[];
  dealerHand: Card[];
  setPlayerHand: (h: Card[]) => void;
  setDealerHand: (h: Card[]) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);

  return (
    <GameContext.Provider value={{ playerHand, dealerHand, setPlayerHand, setDealerHand }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
