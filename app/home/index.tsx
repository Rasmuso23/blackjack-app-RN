import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0b5d1e', '#0f7a2a', '#0b5d1e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="cards-playing-outline" size={80} color="black" />
          <Text style={styles.title}>♠️Blackjack♠️</Text>
        </View>
        <Pressable onPress={() => router.push('/game')} style={styles.navButton}>
          <LinearGradient
            colors={['#FFD700', '#FFA500', '#FFD700']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
          />
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    letterSpacing: 3,
    color: '#FFD700',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  navButton: {
    width: 200,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    shadowColor: 'black',
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
