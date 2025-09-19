import { Stack } from 'expo-router';
import { GameProvider } from '../src/context/GameContext';

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </GameProvider>
  );
}
