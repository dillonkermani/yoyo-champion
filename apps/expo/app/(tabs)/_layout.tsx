import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1CB0F6',
        tabBarInactiveTintColor: '#a0a8b0',
        tabBarStyle: {
          backgroundColor: '#e8ecf1',
          borderTopWidth: 0,
          shadowColor: '#b8c0cc',
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 12,
          shadowOpacity: 0.5,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="champion-path" options={{ title: 'Learn' }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="for-you" options={{ title: 'For You' }} />
    </Tabs>
  );
}
