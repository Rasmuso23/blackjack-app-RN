import { Text, StyleSheet, View } from 'react-native';
import { stats } from '../../src/stats';

export default function Statistics() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Statistics</Text>

      <View style={styles.box}>
        <Text style={styles.text}>Played: {stats.rounds}</Text>
      </View>

      <View style={styles.box}>
        <Text style={styles.text}>Wins: {stats.wins}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Losses: {stats.losses}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Ties: {stats.ties}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  header: {
    color: 'white',
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#FFD700',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
});
