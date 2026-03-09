import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getYoyos, getFeaturedProducts } from '@yoyo/data';

const YOYOS = getYoyos().slice(0, 6);
const FEATURED = getFeaturedProducts().slice(0, 4);

export default function ShopScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <Text style={styles.subtitle}>Gear up for your yo-yo journey</Text>
      </View>

      {/* Yo-Yos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yo-Yos</Text>
        {YOYOS.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            accessibilityRole="button"
            accessibilityLabel={`${product.name} by ${product.brand}, $${product.price.toFixed(2)}`}
          >
            <View style={styles.productIcon}>
              <Text style={styles.productEmoji}>🪀</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
            </View>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Featured */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        {FEATURED.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            accessibilityRole="button"
            accessibilityLabel={`${product.name} by ${product.brand}, $${product.price.toFixed(2)}`}
          >
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
            </View>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    backgroundColor: '#1CB0F6',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 28,
  },
  title: { fontSize: 28, fontWeight: '900', color: 'white', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productIcon: { marginRight: 12 },
  productEmoji: { fontSize: 28 },
  productInfo: { flex: 1 },
  productName: { fontSize: 15, fontWeight: '700', color: '#111827' },
  productBrand: { fontSize: 13, color: '#6B7280', marginTop: 2 },
  productPrice: { fontSize: 16, fontWeight: '800', color: '#1CB0F6' },
  bottomSpacer: { height: 100 },
});
