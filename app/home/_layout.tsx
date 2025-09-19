import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: () => <Ionicons name="bar-chart-sharp" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: () => <Ionicons name="wallet-sharp" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
