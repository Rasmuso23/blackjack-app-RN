import { Text, StyleSheet, View } from 'react-native';
import { stats } from '../../src/stats';

export default function Statistics() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics</Text>
      <Text>Played: {stats.rounds}</Text>
      <Text>Wins: {stats.wins}</Text>
      <Text>Losses: {stats.losses}</Text>
      <Text>Ties: {stats.ties}</Text>
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
