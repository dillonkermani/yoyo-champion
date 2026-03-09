import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from '@yoyo/store';

type Step = 'welcome' | 'handedness' | 'location' | 'yoyo' | 'done';
const STEPS: Step[] = ['welcome', 'handedness', 'location', 'yoyo', 'done'];

// Distinct yo-yo names from tricks context for the picker
const POPULAR_YOYOS = [
  'YoyoFactory Shutter', 'CLYW Peak 2', 'One Drop Kuntosh',
  'G2 Banshee', 'Turning Point Leviathan', 'Duncan Freehand',
  'Yomega Maverick', 'CLYW Wooly Marmot', 'YoyoFactory Dream',
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { setHandedness, setCountry, setRegion, setFavoriteYoyo, completeOnboarding } = useOnboardingStore();

  const [step, setStep] = useState<Step>('welcome');
  const [country, setCountryLocal] = useState('');
  const [region, setRegionLocal] = useState('');
  const [selectedYoyo, setSelectedYoyo] = useState('');

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const goNext = () => {
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next);
  };

  const handleHandedness = (hand: 'left' | 'right') => {
    setHandedness(hand);
    goNext();
  };

  const handleLocation = () => {
    if (country.trim()) setCountry(country.trim());
    if (region.trim()) setRegion(region.trim());
    goNext();
  };

  const handleYoyo = () => {
    if (selectedYoyo) setFavoriteYoyo(selectedYoyo);
    goNext();
  };

  const handleFinish = () => {
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      {step !== 'welcome' && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` as `${number}%` }]} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome */}
        {step === 'welcome' && (
          <View style={styles.stepContent}>
            <Text style={styles.emoji}>🪀</Text>
            <Text style={styles.heading}>Welcome to YoYo Champion</Text>
            <Text style={styles.body}>
              Let's personalize your experience in a few quick steps.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={goNext}><Text style={styles.primaryButtonText}>Get Started</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleFinish} style={styles.skipLink}>
              <Text style={styles.skipText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Handedness */}
        {step === 'handedness' && (
          <View style={styles.stepContent}>
            <Text style={styles.emoji}>✋</Text>
            <Text style={styles.heading}>Which hand do you throw with?</Text>
            <Text style={styles.body}>This helps us tailor trick instructions for you.</Text>
            <View style={styles.handRow}>
              <TouchableOpacity style={styles.handButton} onPress={() => handleHandedness('left')}>
                <Text style={styles.handEmoji}>🤚</Text>
                <Text style={styles.handLabel}>Left Hand</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.handButton} onPress={() => handleHandedness('right')}>
                <Text style={styles.handEmoji}>✋</Text>
                <Text style={styles.handLabel}>Right Hand</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Location */}
        {step === 'location' && (
          <View style={styles.stepContent}>
            <Text style={styles.emoji}>📍</Text>
            <Text style={styles.heading}>Where are you from?</Text>
            <Text style={styles.body}>Connect with your local yo-yo community.</Text>
            <TextInput
              style={styles.input}
              placeholder="Country (e.g. United States)"
              value={country}
              onChangeText={setCountryLocal}
              placeholderTextColor="#9CA3AF"
              accessibilityLabel="Country"
            />
            <TextInput
              style={[styles.input, { marginTop: 12 }]}
              placeholder="State / Region (optional)"
              value={region}
              onChangeText={setRegionLocal}
              placeholderTextColor="#9CA3AF"
              accessibilityLabel="State or region"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleLocation}><Text style={styles.primaryButtonText}>Continue</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={goNext} style={styles.skipLink}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Favorite Yo-Yo */}
        {step === 'yoyo' && (
          <View style={styles.stepContent}>
            <Text style={styles.emoji}>🪀</Text>
            <Text style={styles.heading}>Favorite yo-yo?</Text>
            <Text style={styles.body}>Pick your go-to throw, or the one you dream about.</Text>
            <View style={styles.yoyoList}>
              {POPULAR_YOYOS.map((yoyo) => (
                <TouchableOpacity
                  key={yoyo}
                  style={[styles.yoyoOption, selectedYoyo === yoyo && styles.yoyoOptionSelected]}
                  onPress={() => setSelectedYoyo(yoyo)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selectedYoyo === yoyo }}
                >
                  <Text style={[styles.yoyoText, selectedYoyo === yoyo && styles.yoyoTextSelected]}>
                    {yoyo}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleYoyo}><Text style={styles.primaryButtonText}>Continue</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={goNext} style={styles.skipLink}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Done */}
        {step === 'done' && (
          <View style={styles.stepContent}>
            <Text style={styles.emoji}>🏆</Text>
            <Text style={styles.heading}>You're all set!</Text>
            <Text style={styles.body}>
              Your profile is personalized. Time to start throwing!
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.primaryButton} onPress={handleFinish}><Text style={styles.primaryButtonText}>Start Learning</Text></TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  progressContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    marginTop: 52,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#1CB0F6',
    borderRadius: 2,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingTop: 40,
  },
  stepContent: { alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: 20 },
  heading: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonRow: { width: '100%', marginTop: 8 },
  skipLink: { marginTop: 16 },
  skipText: { fontSize: 14, color: '#9CA3AF', textAlign: 'center' },
  handRow: { flexDirection: 'row', gap: 16, marginTop: 8 },
  handButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  handEmoji: { fontSize: 40, marginBottom: 8 },
  handLabel: { fontSize: 15, fontWeight: '700', color: '#374151' },
  input: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  yoyoList: { width: '100%', gap: 8, marginBottom: 16 },
  yoyoOption: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  yoyoOptionSelected: {
    backgroundColor: '#EBF8FF',
    borderColor: '#1CB0F6',
  },
  yoyoText: { fontSize: 15, fontWeight: '600', color: '#374151', textAlign: 'center' },
  yoyoTextSelected: { color: '#1CB0F6' },
  primaryButton: {
    backgroundColor: '#1CB0F6',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
