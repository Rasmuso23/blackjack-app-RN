import { View, StyleSheet, Text } from 'react-native';
import { Card } from './Deck';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CardProps {
  card: Card;
  faceDown?: boolean;
}

export default function PlayingCard({ card, faceDown = false }: CardProps) {
  if (faceDown) {
    return <View style={[styles.card, styles.cardBack]} />;
  }

  const isRed = card.suit === 'heart' || card.suit === 'diamond';
  const color = isRed ? '#dc2626' : '#111827';

  const suitIcon =
    card.suit === 'heart'
      ? 'cards-heart'
      : card.suit === 'diamond'
      ? 'cards-diamond'
      : card.suit === 'club'
      ? 'cards-club'
      : 'cards-spade';

  return (
    <View style={styles.card}>
      <Text style={[styles.value, { color }]}>{card.value}</Text>
      <MaterialCommunityIcons name={suitIcon} size={24} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 60,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    margin: 4,
  },
  cardBack: {
    backgroundColor: 'black',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
});
