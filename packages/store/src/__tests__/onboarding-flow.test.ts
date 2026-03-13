import { describe, it, expect } from 'vitest';
import { ONBOARDING_STEPS } from '../onboarding-flow';
import type { OnboardingStepId } from '../onboarding-flow';

describe('onboarding-flow', () => {
  it('has exactly 7 steps', () => {
    expect(ONBOARDING_STEPS).toHaveLength(7);
  });

  it('follows the correct step order', () => {
    const expectedOrder: OnboardingStepId[] = [
      'intro_video',
      'skill-level',
      'yoyo_experience',
      'goals',
      'favorite_yoyo',
      'styles',
      'handedness',
    ];
    const actualOrder = ONBOARDING_STEPS.map((step) => step.id);
    expect(actualOrder).toEqual(expectedOrder);
  });

  it('each step has required config fields', () => {
    for (const step of ONBOARDING_STEPS) {
      expect(step.id).toBeTruthy();
      expect(typeof step.questionTitle).toBe('string');
      expect(step.questionTitle.length).toBeGreaterThan(0);
      expect(typeof step.questionEmoji).toBe('string');
      expect(step.questionEmoji.length).toBeGreaterThan(0);
      expect(typeof step.questionSubtitle).toBe('string');
      expect(typeof step.multiSelect).toBe('boolean');
      expect(typeof step.getChoices).toBe('function');
    }
  });

  it('each step returns at least one choice', () => {
    for (const step of ONBOARDING_STEPS) {
      const choices = step.getChoices();
      expect(choices.length).toBeGreaterThan(0);
      for (const choice of choices) {
        expect(choice.id).toBeTruthy();
        expect(typeof choice.label).toBe('string');
        expect(choice.label.length).toBeGreaterThan(0);
      }
    }
  });

  it('intro_video step is not multi-select', () => {
    const introStep = ONBOARDING_STEPS.find((s) => s.id === 'intro_video');
    expect(introStep).toBeDefined();
    expect(introStep!.multiSelect).toBe(false);
    expect(introStep!.getChoices()).toHaveLength(1);
    expect(introStep!.getChoices()[0]!.id).toBe('continue');
  });

  it('handedness step has exactly 2 choices', () => {
    const handednessStep = ONBOARDING_STEPS.find((s) => s.id === 'handedness');
    expect(handednessStep).toBeDefined();
    const choices = handednessStep!.getChoices();
    expect(choices).toHaveLength(2);
    expect(choices.map((c) => c.id)).toEqual(['right', 'left']);
  });

  it('goals and styles steps are multi-select', () => {
    const goalsStep = ONBOARDING_STEPS.find((s) => s.id === 'goals');
    const stylesStep = ONBOARDING_STEPS.find((s) => s.id === 'styles');
    expect(goalsStep!.multiSelect).toBe(true);
    expect(stylesStep!.multiSelect).toBe(true);
  });

  it('single-select steps are not multi-select', () => {
    const singleSelectIds: OnboardingStepId[] = [
      'intro_video',
      'skill-level',
      'yoyo_experience',
      'favorite_yoyo',
      'handedness',
    ];
    for (const id of singleSelectIds) {
      const step = ONBOARDING_STEPS.find((s) => s.id === id);
      expect(step!.multiSelect).toBe(false);
    }
  });
});
