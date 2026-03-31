import { describe, it, expect } from 'vitest';
import { ONBOARDING_STEPS } from '../onboarding-flow';
import type { OnboardingStepId } from '../onboarding-flow';

describe('onboarding-flow', () => {
  it('has exactly 6 steps', () => {
    expect(ONBOARDING_STEPS).toHaveLength(6);
  });

  it('follows the correct step order', () => {
    const expectedOrder: OnboardingStepId[] = [
      'account_user',
      'experience',
      'quick_info',
      'current_yoyo',
      'goal',
      'intro_video',
    ];
    const actualOrder = ONBOARDING_STEPS.map((step) => step.key);
    expect(actualOrder).toEqual(expectedOrder);
  });

  it('each step has required config fields', () => {
    for (const step of ONBOARDING_STEPS) {
      expect(step.key).toBeTruthy();
      expect(typeof step.questionTitle).toBe('string');
      expect(step.questionTitle.length).toBeGreaterThan(0);
      expect(typeof step.questionEmoji).toBe('string');
      expect(step.questionEmoji.length).toBeGreaterThan(0);
      expect(typeof step.questionSubtitle).toBe('string');
      expect(typeof step.type).toBe('string');
    }
  });

  it('choice-type steps have at least one choice', () => {
    const choiceSteps = ONBOARDING_STEPS.filter((s) => s.type === 'choices');
    expect(choiceSteps.length).toBeGreaterThan(0);
    for (const step of choiceSteps) {
      expect(step.choices!.length).toBeGreaterThan(0);
      for (const choice of step.choices!) {
        expect(choice.id).toBeTruthy();
        expect(typeof choice.label).toBe('string');
        expect(choice.label.length).toBeGreaterThan(0);
      }
    }
  });

  it('intro_video step is type video', () => {
    const introStep = ONBOARDING_STEPS.find((s) => s.key === 'intro_video');
    expect(introStep).toBeDefined();
    expect(introStep!.type).toBe('video');
  });

  it('account_user step has hasSubQuestion', () => {
    const accountStep = ONBOARDING_STEPS.find((s) => s.key === 'account_user');
    expect(accountStep).toBeDefined();
    expect(accountStep!.hasSubQuestion).toBe(true);
    expect(accountStep!.choices).toHaveLength(3);
  });

  it('current_yoyo and goal steps have text input', () => {
    const yoyoStep = ONBOARDING_STEPS.find((s) => s.key === 'current_yoyo');
    const goalStep = ONBOARDING_STEPS.find((s) => s.key === 'goal');
    expect(yoyoStep!.hasTextInput).toBe(true);
    expect(goalStep!.hasTextInput).toBe(true);
  });

  it('quick_info step has no choices', () => {
    const quickInfoStep = ONBOARDING_STEPS.find((s) => s.key === 'quick_info');
    expect(quickInfoStep).toBeDefined();
    expect(quickInfoStep!.type).toBe('quick_info');
    expect(quickInfoStep!.choices).toBeUndefined();
  });
});
