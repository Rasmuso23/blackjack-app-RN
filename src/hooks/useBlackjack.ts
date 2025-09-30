import { useState, useEffect } from 'react';
import { Card, createDeck, drawCard, getHandValue, hit } from '../components/Deck';
import { getWinMessage, isBlackJack } from '../rules';
import { addStat } from '../stats';
import { useWallet } from './useWallet';

export function useBlackjack(
  setPlayerHand: (cards: Card[]) => void,
  setDealerHand: (cards: Card[]) => void,
  wallet: {
    deposit: (amount: number) => Promise<void>;
    withdraw: (amount: number) => Promise<void>;
    bet: number;
  },
) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [hiddenCard, setHiddenCard] = useState<Card | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [roundOver, setRoundOver] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { deposit, withdraw, bet } = wallet;
  //const bet = 100;

  const deal = () => {
    if (isDealing) return;
    setPlayerHand([]);
    setDealerHand([]);
    setHiddenCard(null);
    setMessage(null);
    setRoundOver(false);
    setIsDealing(true);

    setTimeout(() => {
      const d = createDeck();
      setDeck(d);

      setTimeout(() => {
        setPlayerHand([d[0]]);
      }, 500);

      setTimeout(() => {
        setDealerHand([d[1]]);
      }, 1000);

      setTimeout(() => {
        setPlayerHand([d[0], d[2]]);
      }, 1500);

      setTimeout(() => {
        setHiddenCard(d[3]);
        setIsDealing(false);
      }, 2000);
    }, 1000);
  };

  const onHit = (playerHand: Card[], dealerHand: Card[]) => {
    if (isDealing || roundOver) return;

    const result = hit(playerHand, deck);
    setPlayerHand(result.hand);
    setDeck(result.deck);

    if (result.bust) {
      const revealedDealer = hiddenCard ? [dealerHand[0], hiddenCard] : dealerHand;
      const outcome = getWinMessage(result.hand, revealedDealer);
      setMessage(outcome);
      addStat(outcome);

      if (outcome.includes('You win')) {
        deposit(bet);
      } else if (outcome.includes('Dealer wins')) {
        withdraw(bet);
      }
      setIsDealing(true);

      setTimeout(() => {
        const revealedDealer = hiddenCard ? [dealerHand[0], hiddenCard] : dealerHand;
        setDealerHand(revealedDealer);
        setHiddenCard(null);

        const step = (hand: Card[], deckNow: Card[]) => {
          if (getHandValue(hand) < 17) {
            const [card, rest] = drawCard(deckNow);
            setDealerHand([...hand, card]);
            setTimeout(() => step([...hand, card], rest), 800);
          } else {
            setDeck(deckNow);
            setRoundOver(true);
            setIsDealing(false);
          }
        };

        step(revealedDealer, result.deck);
      }, 1000);
    }
  };

  const onStand = (playerHand: Card[], dealerHand: Card[]) => {
    if (isDealing || roundOver) return;
    setIsDealing(true);

    const revealDealer = hiddenCard ? [dealerHand[0], hiddenCard] : dealerHand;
    setDealerHand(revealDealer);
    setHiddenCard(null);

    let deckNow = [...deck];

    const step = (hand: Card[]) => {
      if (getHandValue(hand) < 17) {
        const [card, rest] = drawCard(deckNow);
        deckNow = rest;

        const next = [...hand, card];
        setDealerHand(next);

        setTimeout(() => step(next), 1000);
      } else {
        setDeck(deckNow);
        const outcome = getWinMessage(playerHand, hand);
        setMessage(outcome);
        addStat(outcome);

        const playerBJ = isBlackJack(playerHand);
        const dealerBJ = isBlackJack(hand);

        if (playerBJ && !dealerBJ) {
          //betalar 3:2
          deposit(Math.round(bet * 1.5));
        } else if (outcome.includes('You win')) {
          deposit(bet);
        } else if (outcome.includes('Dealer wins')) {
          withdraw(bet);
        }
        setRoundOver(true);
        setIsDealing(false);
      }
    };
    setTimeout(() => step(revealDealer), 1000);
  };

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return {
    deck,
    hiddenCard,
    message,
    roundOver,
    isDealing,
    deal,
    onHit,
    onStand,
    setHiddenCard,
    setMessage,
    showMessage,
  };
}
