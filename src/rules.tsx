import { Card, getHandValue } from './components/Deck';
import { useGame } from './context/GameContext';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';

export function getWinMessage(playerHand: Card[], dealerHand: Card[]) {
  const p = getHandValue(playerHand);
  const d = getHandValue(dealerHand);

  const pBJ = isBlackJack(playerHand);
  const dBJ = isBlackJack(dealerHand);

  let message = '';

  if (pBJ && dBJ) {
    message = 'Tie!';
  } else if (pBJ) {
    message = 'Blackjack! You win!';
  } else if (dBJ) {
    message = 'Dealer Blackjack! Dealer wins!';
  } else if (p > 21) {
    message = 'Bust! Dealer wins!';
  } else if (d > 21) {
    message = 'Dealer bust! You win!';
  } else if (p === d) {
    message = 'Tie!';
  } else if (p > d) {
    message = 'You win!';
  } else {
    message = 'Dealer wins!';
  }

  playHaptics(message);
  return message;
}

const hapticMap: Record<string, Haptics.NotificationFeedbackType> = {
  'Tie!': Haptics.NotificationFeedbackType.Warning,
  'Blackjack! You win!': Haptics.NotificationFeedbackType.Success,
  'Dealer Blackjack! Dealer wins!': Haptics.NotificationFeedbackType.Error,
  'Bust! Dealer wins!': Haptics.NotificationFeedbackType.Error,
  'Dealer bust! You win!': Haptics.NotificationFeedbackType.Success,
  'You win!': Haptics.NotificationFeedbackType.Success,
  'Dealer wins!': Haptics.NotificationFeedbackType.Error,
};

export function playHaptics(message: string) {
  const feedback = hapticMap[message];
  if (feedback) {
    Haptics.notificationAsync(feedback);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }
}

export function isBlackJack(hand: Card[]) {
  return hand.length === 2 && getHandValue(hand) === 21;
}

export function Winner() {
  const { playerHand, dealerHand } = useGame();
  const message = getWinMessage(playerHand, dealerHand);
  return <Text>{message}</Text>;
}
