import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: 'white',

        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          height: 100,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart-sharp" size={32} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="wallet-sharp" size={32} color={color} />,
        }}
      />
    </Tabs>
  );
}
