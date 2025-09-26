import { useState } from 'react';
import { Card, createDeck, dealerPick, drawCard, getHandValue, hit } from '../components/Deck';
import { getWinMessage } from '../rules';

export function useBlackjack(
  setPlayerHand: (cards: Card[]) => void,
  setDealerHand: (cards: Card[]) => void,
) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [hiddenCard, setHiddenCard] = useState<Card | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [roundOver, setRoundOver] = useState(false);
  const [isDealing, setIsDealing] = useState(false);

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
      setMessage('Bust! Dealer wins!');
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
    if (isDealing) return;
    setIsDealing(true);

    const revealDealer = hiddenCard ? [dealerHand[0], hiddenCard] : dealerHand;
    setDealerHand(revealDealer);
    setHiddenCard(null);

    const r = dealerPick(revealDealer, deck);
    setDealerHand(r.hand);
    setDeck(r.deck);

    const outcome = getWinMessage(playerHand, r.hand);
    setMessage(outcome);
    setRoundOver(true);
    setIsDealing(false);
  };

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
  };
}
