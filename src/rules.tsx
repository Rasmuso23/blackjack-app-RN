import { Card, getHandValue } from './components/Deck';
import { useGame } from './context/GameContext';
import { Text } from 'react-native';

export function getWinMessage(playerHand: Card[], dealerHand: Card[]) {
  const p = getHandValue(playerHand);
  const d = getHandValue(dealerHand);

  const pBJ = isBlackJack(playerHand);
  const dBJ = isBlackJack(dealerHand);

  if (pBJ && dBJ) {
    return 'Tie!';
  }
  if (pBJ) {
    return 'Blackjack! You win!';
  }
  if (dBJ) {
    ('Dealer Blackjack! Dealer wins!');
  }

  if (p > 21) {
    return 'Bust! Dealer wins!';
  }
  if (d > 21) {
    return 'Dealer bust! You win!';
  }

  if (p > d && p !== 21) {
    return 'You win!';
  }
  if (p === d) {
    return 'Tie!';
  }
  if (d > p) {
    return 'Dealer wins!';
  }

  return '';
}

function isBlackJack(hand: Card[]) {
  return hand.length === 2 && getHandValue(hand) === 21;
}

export function Winner() {
  const { playerHand, dealerHand } = useGame();
  const message = getWinMessage(playerHand, dealerHand);
  return <Text>{message}</Text>;
}
