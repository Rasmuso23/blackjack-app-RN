import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useWallet } from '../../src/hooks/useWallet';

export default function Wallet() {
  const { balance, deposit, withdraw } = useWallet();
  const sum = 100;

  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
      }}
    >
      <Text style={{ fontSize: 28, textAlign: 'center', color: 'white' }}>
        Current balance: {balance}
      </Text>

      <Pressable
        onPress={() => deposit(sum)}
        style={{ backgroundColor: '#15803d', padding: 10, borderRadius: 12 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>+ {sum}</Text>
      </Pressable>

      <Pressable
        onPress={() => withdraw(sum)}
        style={{ backgroundColor: '#b91c1c', padding: 10, borderRadius: 12 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>- {sum}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
