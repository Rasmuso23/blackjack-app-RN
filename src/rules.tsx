import { getHandValue } from './components/deck';
import { useGame } from './context/GameContext';
import { Text } from 'react-native';

export function Winner() {
  const { playerHand, dealerHand } = useGame();

  const p = getHandValue(playerHand);
  const d = getHandValue(dealerHand);

  let message = ' ';
  if (p > d) {
    message = 'You win!';
  }
  if (p === d && p !== 0) {
    message = 'Tie!';
  } else if (d > p) {
    message = 'Dealer win!';
  }

  return <Text>{message}</Text>;
}
