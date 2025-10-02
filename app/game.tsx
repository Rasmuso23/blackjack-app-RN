import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getHandValue } from '../src/components/Deck';
import { useRouter } from 'expo-router';
import { useBlackjack } from '../src/hooks/useBlackjack';
import { useGame } from '../src/context/GameContext';
import { LinearGradient } from 'expo-linear-gradient';
import PlayingCard from '../src/components/Card';
import ActionButton from '../src/components/ActionButton';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useWallet } from '../src/hooks/useWallet';

export default function Game() {
  const router = useRouter();

  const bet = 100;

  const { playerHand, dealerHand, setPlayerHand, setDealerHand } = useGame();
  const { balance, deposit, withdraw } = useWallet();
  const {
    hiddenCard,
    message,
    showMessage,
    roundOver,
    isDealing,
    deal,
    onHit,
    onStand,
    setHiddenCard,
  } = useBlackjack(setPlayerHand, setDealerHand, { deposit, withdraw, bet });

  return (
    <LinearGradient
      colors={['#0b5d1e', '#818682ff', '#0b5d1e']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topSection}>
        <View>
          <Text>Dealer ({hiddenCard ? '?' : getHandValue(dealerHand)})</Text>
          <View style={{ flexDirection: 'row' }}>
            {dealerHand.map((c, i) => (
              <PlayingCard key={i} card={c} />
            ))}
            {hiddenCard && <PlayingCard card={hiddenCard} faceDown />}
          </View>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.tableText}>
          BLACKJACK PAYS 3 TO 2{'\n'}
          Dealer must stand on 17
        </Text>
        <ActionButton label="Deal" onPress={deal} disabled={isDealing} style={styles.dealButton} />
      </View>
      <View style={styles.bottomSection}>
        <View>
          <Text>Player: ({getHandValue(playerHand)})</Text>
          <View style={{ flexDirection: 'row' }}>
            {playerHand.map((c, i) => (
              <PlayingCard key={i} card={c} />
            ))}
          </View>
        </View>
      </View>
      <Pressable
        style={styles.homeButton}
        onPress={() => {
          setPlayerHand([]);
          setDealerHand([]);
          setHiddenCard(null);
          router.push('/');
        }}
      >
        <MaterialCommunityIcons name="home" size={28} color="black" />
      </Pressable>
      <Pressable style={styles.walletButton} onPress={() => router.push('/home/wallet')}>
        <Ionicons name="wallet-sharp" size={28} color="black" />
        <Text style={styles.walletText}>{balance}</Text>
      </Pressable>
      <View style={styles.bottomButtons}>
        <ActionButton
          label="Stand"
          onPress={() => onStand(playerHand, dealerHand)}
          disabled={isDealing || !hiddenCard || roundOver}
        />
        <ActionButton
          label="Hit"
          onPress={() => onHit(playerHand, dealerHand)}
          disabled={isDealing || playerHand.length === 0 || roundOver}
        />
      </View>

      {message && showMessage && (
        <View style={styles.messageOverlay}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  homeButton: {
    position: 'absolute',
    top: 70,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: 'black',
  },
  walletButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    borderWidth: 2,
    borderColor: 'black',
  },
  walletText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomButtons: {
    position: 'absolute',
    left: 100,
    right: 100,
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dealButton: {
    width: 120,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: 'black',
  },
  topSection: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 16,
  },
  middleSection: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  tableText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  messageOverlay: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999, //ovanpå korten
    backgroundColor: 'black',
    padding: 16,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: 'center',
  },
});
