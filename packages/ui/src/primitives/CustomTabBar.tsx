// @ts-nocheck
import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  View,
  Pressable,
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Platform,
} from 'react-native';
// --- Tab configuration ---

interface TabConfig {
  label: string;
  activeColor: string;
  bgColor: string;
  emoji: string;
}

const TAB_CONFIG: Record<string, TabConfig> = {
  index: {
    label: 'Home',
    activeColor: '#9bedff',
    bgColor: 'rgba(155,237,255,0.15)',
    emoji: '🏠',
  },
  'champion-path': {
    label: 'Learn',
    activeColor: '#CE82FF',
    bgColor: 'rgba(206,130,255,0.1)',
    emoji: '📖',
  },
  shop: {
    label: 'Shop',
    activeColor: '#9bedff',
    bgColor: 'rgba(155,237,255,0.15)',
    emoji: '🛍️',
  },
  profile: {
    label: 'Profile',
    activeColor: '#FF86D0',
    bgColor: 'rgba(255,134,208,0.1)',
    emoji: '👤',
  },
  'for-you': {
    label: 'For You',
    activeColor: '#FFC800',
    bgColor: 'rgba(255,200,0,0.1)',
    emoji: '▶️',
  },
};

const INACTIVE_COLOR = '#8899A6';

// Route names in display order — used by web wrapper to build state
export const TAB_ROUTE_NAMES = ['index', 'champion-path', 'shop', 'profile', 'for-you'] as const;
export type TabRouteName = (typeof TAB_ROUTE_NAMES)[number];

// Web path mapping for route detection
const ROUTE_TO_PATH: Record<string, string> = {
  index: '/dashboard',
  'champion-path': '/library',
  shop: '/shop',
  profile: '/profile',
  'for-you': '/for-you',
};

// Spring configs matching framer-motion from old web app
const INDICATOR_SPRING = { damping: 16, stiffness: 180, mass: 1, useNativeDriver: false };
const ICON_SPRING = { damping: 15, stiffness: 400, mass: 1, useNativeDriver: true };
const PILL_SPRING = { damping: 14, stiffness: 160, mass: 1, useNativeDriver: false };

// --- Types ---

interface TabLayout {
  x: number;
  width: number;
}

// BottomTabBarProps from @react-navigation/bottom-tabs (used by expo-router)
interface CustomTabBarProps {
  state: {
    index: number;
    routes: Array<{ key: string; name: string }>;
  };
  descriptors: Record<string, { options: { title?: string; tabBarLabel?: string } }>;
  navigation: {
    emit: (event: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
  bottomInset?: number;
}

// --- Component ---

export function CustomTabBar({ state, descriptors: _descriptors, navigation, bottomInset = 0 }: CustomTabBarProps) {
  const tabLayouts = useRef<Record<number, TabLayout>>({});
  const [layoutsReady, setLayoutsReady] = useState(false);
  const measuredCount = useRef(0);
  const isFirstPosition = useRef(true);

  // Animated values for the sliding indicator line
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorOpacity = useRef(new Animated.Value(0)).current;

  // Animated values for the background pill
  const pillLeft = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const pillOpacity = useRef(new Animated.Value(0)).current;

  // Per-tab animated scale values
  const tabScales = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  // Active tab color for the indicator (driven by state)
  const activeRoute = state.routes[state.index];
  const activeConfig = TAB_CONFIG[activeRoute?.name ?? 'index'] || TAB_CONFIG['index'];

  const handleTabLayout = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      tabLayouts.current[index] = { x, width };
      measuredCount.current += 1;

      if (measuredCount.current >= state.routes.length && !layoutsReady) {
        setLayoutsReady(true);
        const activeLayout = tabLayouts.current[state.index];
        if (activeLayout) {
          // Center the 32px indicator within the tab
          indicatorX.setValue(activeLayout.x + (activeLayout.width - 32) / 2);
          pillLeft.setValue(activeLayout.x + 8);
          pillWidth.setValue(activeLayout.width - 16);
          Animated.parallel([
            Animated.timing(indicatorOpacity, { toValue: 1, duration: 150, useNativeDriver: false }),
            Animated.timing(pillOpacity, { toValue: 1, duration: 150, useNativeDriver: false }),
          ]).start();
          isFirstPosition.current = false;

          // Set initial active scale
          Animated.spring(tabScales[state.index], {
            toValue: 1.1,
            ...ICON_SPRING,
          }).start();
        }
      }
    },
    [state.routes.length, state.index, layoutsReady, indicatorX, pillLeft, pillWidth, indicatorOpacity, pillOpacity, tabScales],
  );

  // Animate when active tab changes
  useEffect(() => {
    if (!layoutsReady || isFirstPosition.current) return;

    const targetLayout = tabLayouts.current[state.index];
    if (!targetLayout) return;

    // Slide indicator line
    Animated.spring(indicatorX, {
      toValue: targetLayout.x + (targetLayout.width - 32) / 2,
      ...INDICATOR_SPRING,
    }).start();

    // Slide background pill
    Animated.parallel([
      Animated.spring(pillLeft, {
        toValue: targetLayout.x + 8,
        ...PILL_SPRING,
      }),
      Animated.spring(pillWidth, {
        toValue: targetLayout.width - 16,
        ...PILL_SPRING,
      }),
    ]).start();

    // Scale animations: active tab up, others down
    state.routes.forEach((_, i) => {
      Animated.spring(tabScales[i], {
        toValue: i === state.index ? 1.1 : 1,
        ...ICON_SPRING,
      }).start();
    });
  }, [state.index, layoutsReady, indicatorX, pillLeft, pillWidth, tabScales, state.routes]);

  const handlePress = (index: number, routeName: string, routeKey: string) => {
    // Tap animation: scale down then back
    Animated.sequence([
      Animated.spring(tabScales[index], { toValue: 0.85, damping: 20, stiffness: 500, mass: 1, useNativeDriver: true }),
      Animated.spring(tabScales[index], { toValue: index === state.index ? 1.1 : 1, ...ICON_SPRING }),
    ]).start();

    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(bottomInset, 8) }]}>
      {/* Sliding top indicator line */}
      <Animated.View
        style={[
          styles.indicator,
          {
            left: indicatorX,
            opacity: indicatorOpacity,
            backgroundColor: activeConfig.activeColor,
          },
        ]}
      />

      {/* Active background pill */}
      <Animated.View
        style={[
          styles.pill,
          {
            left: pillLeft,
            width: pillWidth,
            opacity: pillOpacity,
            backgroundColor: activeConfig.bgColor,
          },
        ]}
      />

      {/* Tab items */}
      <View style={styles.tabRow}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;
          const config = TAB_CONFIG[route.name] || TAB_CONFIG.index;
          const color = isActive ? '#000000' : INACTIVE_COLOR;

          return (
            <Pressable
              key={route.key}
              onPress={() => handlePress(index, route.name, route.key)}
              onLayout={handleTabLayout(index)}
              style={styles.tab}
            >
              <Animated.View
                style={[
                  styles.iconContainer,
                  { transform: [{ scale: tabScales[index] }] },
                ]}
              >
                <Animated.Text style={styles.iconEmoji}>
                  {config.emoji}
                </Animated.Text>
              </Animated.View>
              <Animated.Text
                style={[
                  styles.label,
                  {
                    color,
                    opacity: isActive ? 1 : 0.8,
                    fontWeight: isActive ? '700' : '600',
                  },
                ]}
              >
                {config.label}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
    shadowOpacity: 0.06,
    elevation: 8,
    // Border
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.05)',
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(12px)' } as any : {}),
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 4,
    borderRadius: 2,
  },
  pill: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    borderRadius: 16,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minWidth: 56,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 32,
  },
  iconEmoji: {
    fontSize: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
});

// --- Web-compatible wrapper ---
// Builds a fake navigation state from a pathname string for use outside Expo Router

interface WebTabBarProps {
  pathname: string;
  onNavigate: (path: string) => void;
}

export function WebTabBar({ pathname, onNavigate }: WebTabBarProps) {
  // Determine active index from pathname
  const activeIndex = TAB_ROUTE_NAMES.findIndex((name) => {
    const path = ROUTE_TO_PATH[name];
    if (path === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard' || pathname.startsWith('/dashboard');
    }
    return pathname.startsWith(path);
  });

  const fakeState = {
    index: Math.max(activeIndex, 0),
    routes: TAB_ROUTE_NAMES.map((name) => ({ key: name, name })),
  };

  const fakeNavigation = {
    emit: () => ({ defaultPrevented: false }),
    navigate: (name: string) => {
      const path = ROUTE_TO_PATH[name] || '/';
      onNavigate(path);
    },
  };

  return (
    <CustomTabBar
      state={fakeState}
      descriptors={{}}
      navigation={fakeNavigation as any}
    />
  );
}
