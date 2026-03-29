import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1CB0F6',
        tabBarInactiveTintColor: '#8899A6',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E1E8ED',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          shadowOpacity: 0.06,
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
