import React, { useState, useMemo } from 'react';
import { styled, Stack, XStack, YStack, Text, ScrollView } from 'tamagui';
import { NEU } from '../tamagui.config';

/* ---- Types ---- */

export type NodeState = 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';

export interface SkillTreeCategory {
  id: string;
  name: string;
  icon: string;
  trickIds: string[];
}

export interface SkillTreeSection {
  id: string;
  name: string;
  categories: SkillTreeCategory[];
  checkpointXp?: number;
}

export interface TrickInfo {
  id: string;
  name: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpReward: number;
}

export interface SkillTreeProps {
  sections: SkillTreeSection[];
  tricks: Record<string, TrickInfo>;
  masteredTrickIds: string[];
  inProgressTrickIds: string[];
  onTrickSelect?: (trickId: string) => void;
}

/* ---- Helpers ---- */

function getNodeState(
  id: string, mastered: string[], inProg: string[], unlocked: boolean,
): NodeState {
  if (mastered.includes(id)) return 'mastered';
  if (inProg.includes(id)) return 'in-progress';
  return unlocked ? 'available' : 'locked';
}

const SC: Record<NodeState, { bg: string; border: string; text: string }> = {
  locked:        { bg: '#E0E0E0', border: '#BDBDBD', text: '#9E9E9E' },
  available:     { bg: '#FFFFFF', border: '#1CB0F6', text: '#333333' },
  'in-progress': { bg: '#FFF8E1', border: '#FFC800', text: '#333333' },
  completed:     { bg: '#1CB0F6', border: '#0095DB', text: '#FFFFFF' },
  mastered:      { bg: '#FFC800', border: '#A07800', text: '#FFFFFF' },
};

/* ---- SkillNode ---- */

export interface SkillNodeProps {
  state: NodeState;
  name: string;
  icon?: string;
  variant: 'category' | 'trick';
  difficulty?: 1 | 2 | 3 | 4 | 5;
  xpReward?: number;
  progress?: number;
  onPress?: () => void;
}

const NodeCircle = styled(Stack, {
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  animation: 'quick',
  enterStyle: { opacity: 0, y: 20 },
  hoverStyle: { scale: 1.08 },
  pressStyle: { scale: 0.95 },
  cursor: 'pointer',
  variants: {
    size: {
      category: { width: 80, height: 80, borderRadius: 40 },
      trick:    { width: 56, height: 56, borderRadius: 28 },
    },
  } as const,
  defaultVariants: { size: 'trick' },
});

export function SkillNode({ state, name, icon, variant, difficulty, xpReward, progress, onPress }: SkillNodeProps) {
  const c = SC[state];
  const stateIcon = state === 'completed' ? '✓' : state === 'mastered' ? '👑' : icon ?? '';
  const showXp = variant === 'trick' && xpReward != null && state !== 'mastered';

  return (
    <YStack alignItems="center" gap={4} opacity={state === 'locked' ? 0.5 : 1} animation="quick" enterStyle={{ opacity: 0, y: 20 }}>
      <NodeCircle
        size={variant}
        backgroundColor={c.bg}
        borderColor={c.border}
        onPress={state !== 'locked' ? onPress : undefined}
        {...(state === 'mastered' ? NEU.glowGold : state === 'available' ? NEU.card : {})}
      >
        <Text fontSize={variant === 'category' ? 28 : 20} color={c.text} fontWeight="800" textAlign="center">
          {stateIcon}
        </Text>
        {state === 'in-progress' && progress != null && (
          <YStack position="absolute" bottom={-2} right={-2} backgroundColor="$xpGold" borderRadius={10} paddingHorizontal={4} paddingVertical={1}>
            <Text fontSize={9} color="white" fontWeight="700">{progress}%</Text>
          </YStack>
        )}
      </NodeCircle>
      <Text fontSize={11} fontWeight="600" color={state === 'locked' ? '#9E9E9E' : '#333'} textAlign="center" numberOfLines={2} maxWidth={variant === 'category' ? 90 : 70}>
        {name}
      </Text>
      {variant === 'trick' && difficulty != null && (
        <Text fontSize={9} textAlign="center">{'⭐'.repeat(difficulty)}</Text>
      )}
      {showXp && (
        <XStack backgroundColor="$xpGold" paddingHorizontal={6} paddingVertical={2} borderRadius={8}>
          <Text fontSize={9} color="white" fontWeight="700">+{xpReward} XP</Text>
        </XStack>
      )}
    </YStack>
  );
}

/* ---- SectionHeader ---- */

export interface SectionHeaderProps {
  name: string;
  isLocked: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  progress: { completed: number; total: number };
}

const SectionBar = styled(XStack, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#E1E8ED',
  alignItems: 'center',
  gap: 12,
  animation: 'quick',
  pressStyle: { scale: 0.98, opacity: 0.9 },
  cursor: 'pointer',
  ...NEU.card,
});

export function SectionHeader({ name, isLocked, isExpanded, onToggle, progress }: SectionHeaderProps) {
  const pct = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  return (
    <SectionBar onPress={isLocked ? undefined : onToggle} opacity={isLocked ? 0.5 : 1}>
      <Text fontSize={18}>{isLocked ? '🔒' : '📂'}</Text>
      <YStack flex={1} gap={4}>
        <Text fontWeight="800" fontSize={15} color={isLocked ? '#9E9E9E' : '#333'}>{name}</Text>
        <XStack alignItems="center" gap={8}>
          <XStack flex={1} height={6} backgroundColor="#E8ECF0" borderRadius={3} overflow="hidden">
            <YStack height={6} width={`${pct}%`} backgroundColor={isLocked ? '#BDBDBD' : '$brandAqua'} borderRadius={3} animation="quick" />
          </XStack>
          <Text fontSize={11} fontWeight="600" color={isLocked ? '#BDBDBD' : '$brandAqua'}>
            {progress.completed}/{progress.total}
          </Text>
        </XStack>
      </YStack>
      {!isLocked && (
        <Text fontSize={14} color="#999" animation="quick" rotate={isExpanded ? '0deg' : '-90deg'}>▼</Text>
      )}
    </SectionBar>
  );
}

/* ---- CheckpointNode ---- */

export interface CheckpointNodeProps {
  sectionName: string;
  xpReward: number;
  isComplete: boolean;
  isUnlocked: boolean;
}

const CheckpointBox = styled(Stack, {
  width: 64, height: 64, borderRadius: 16,
  alignItems: 'center', justifyContent: 'center',
  borderWidth: 2, animation: 'quick',
  enterStyle: { opacity: 0, scale: 0.8 },
});

export function CheckpointNode({ sectionName, xpReward, isComplete, isUnlocked }: CheckpointNodeProps) {
  return (
    <YStack alignItems="center" gap={4}>
      <CheckpointBox
        backgroundColor={isComplete ? '#FFC800' : isUnlocked ? '#FFF' : '#E0E0E0'}
        borderColor={isComplete ? '#A07800' : isUnlocked ? '#FFC800' : '#BDBDBD'}
        opacity={isUnlocked ? 1 : 0.5}
        {...(isComplete ? NEU.glowGold : {})}
      >
        <Text fontSize={28}>{isComplete ? '🏆' : '🎁'}</Text>
      </CheckpointBox>
      <Text fontSize={10} fontWeight="700" color={isComplete ? '$xpGoldDark' : '#9E9E9E'}>{sectionName}</Text>
      <XStack backgroundColor={isComplete ? '$xpGold' : '#E0E0E0'} paddingHorizontal={8} paddingVertical={2} borderRadius={8}>
        <Text fontSize={10} color={isComplete ? 'white' : '#9E9E9E'} fontWeight="700">+{xpReward} XP</Text>
      </XStack>
    </YStack>
  );
}

/* ---- SkillTree (main) ---- */

function Connector() {
  return (
    <YStack alignItems="center" marginVertical={-4}>
      <YStack width={2} height={24} backgroundColor="#D0D5DD" borderRadius={1} />
    </YStack>
  );
}

function sectionTrickIds(s: SkillTreeSection) {
  return s.categories.flatMap((c) => c.trickIds);
}

export function SkillTree({ sections, tricks, masteredTrickIds, inProgressTrickIds, onTrickSelect }: SkillTreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(sections.slice(0, 2).map((s) => s.id)));

  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const sectionUnlock = useMemo(() => {
    const m: Record<string, boolean> = {};
    sections.forEach((s, i) => {
      if (i === 0) { m[s.id] = true; return; }
      const ids = sectionTrickIds(sections[i - 1]!);
      const done = ids.filter((id) => masteredTrickIds.includes(id)).length;
      m[s.id] = ids.length === 0 || done / ids.length >= 0.5;
    });
    return m;
  }, [sections, masteredTrickIds]);

  const secProg = useMemo(() => {
    const m: Record<string, { completed: number; total: number }> = {};
    sections.forEach((s) => {
      const ids = sectionTrickIds(s);
      m[s.id] = { total: ids.length, completed: ids.filter((id) => masteredTrickIds.includes(id)).length };
    });
    return m;
  }, [sections, masteredTrickIds]);

  const allComplete = useMemo(
    () => sections.every((s) => { const p = secProg[s.id]; return p && p.completed === p.total && p.total > 0; }),
    [sections, secProg],
  );

  const lastSec = sections[sections.length - 1];

  return (
    <ScrollView>
      <YStack padding={16} gap={8} alignItems="center">
        {sections.map((section, sIdx) => {
          const unlocked = sectionUnlock[section.id] ?? false;
          const expanded = expandedIds.has(section.id);
          const prog = secProg[section.id] ?? { completed: 0, total: 0 };
          const prevSec = sIdx > 0 ? sections[sIdx - 1]! : null;

          return (
            <React.Fragment key={section.id}>
              {sIdx > 0 && <Connector />}
              {prevSec?.checkpointXp != null && (
                <>
                  <CheckpointNode
                    sectionName={prevSec.name}
                    xpReward={prevSec.checkpointXp!}
                    isComplete={(secProg[prevSec.id]?.completed ?? 0) === (secProg[prevSec.id]?.total ?? 1)}
                    isUnlocked={sectionUnlock[prevSec.id] ?? false}
                  />
                  <Connector />
                </>
              )}
              <YStack width="100%" maxWidth={480}>
                <SectionHeader name={section.name} isLocked={!unlocked} isExpanded={expanded} onToggle={() => toggle(section.id)} progress={prog} />
              </YStack>
              {expanded && unlocked && (
                <YStack gap={20} paddingVertical={12} animation="quick" enterStyle={{ opacity: 0, y: -10 }} width="100%" maxWidth={480}>
                  {section.categories.map((cat) => {
                    const catDone = cat.trickIds.filter((id) => masteredTrickIds.includes(id)).length;
                    const catState: NodeState = catDone === cat.trickIds.length && cat.trickIds.length > 0 ? 'mastered' : catDone > 0 ? 'in-progress' : 'available';
                    return (
                      <YStack key={cat.id} gap={12} alignItems="center">
                        <SkillNode state={catState} name={cat.name} icon={cat.icon} variant="category"
                          progress={cat.trickIds.length > 0 ? Math.round((catDone / cat.trickIds.length) * 100) : 0} />
                        <XStack flexWrap="wrap" justifyContent="center" gap={16}>
                          {cat.trickIds.map((tid) => {
                            const t = tricks[tid];
                            if (!t) return null;
                            return (
                              <SkillNode key={tid} state={getNodeState(tid, masteredTrickIds, inProgressTrickIds, unlocked)}
                                name={t.name} variant="trick" difficulty={t.difficulty} xpReward={t.xpReward}
                                onPress={() => onTrickSelect?.(tid)} />
                            );
                          })}
                        </XStack>
                      </YStack>
                    );
                  })}
                </YStack>
              )}
            </React.Fragment>
          );
        })}

        {lastSec?.checkpointXp != null && (
          <>
            <Connector />
            <CheckpointNode sectionName={lastSec.name} xpReward={lastSec.checkpointXp!}
              isComplete={(secProg[lastSec.id]?.completed ?? 0) === (secProg[lastSec.id]?.total ?? 1)}
              isUnlocked={sectionUnlock[lastSec.id] ?? false} />
          </>
        )}

        <Connector />
        <YStack alignItems="center" gap={6} animation="quick" enterStyle={{ opacity: 0, scale: 0.8 }}>
          <Stack width={88} height={88} borderRadius={44} alignItems="center" justifyContent="center"
            backgroundColor={allComplete ? '#FFC800' : '#E0E0E0'} borderWidth={3}
            borderColor={allComplete ? '#A07800' : '#BDBDBD'} opacity={allComplete ? 1 : 0.4}
            {...(allComplete ? NEU.glowGold : {})}>
            <Text fontSize={36}>{allComplete ? '🏆' : '🔒'}</Text>
          </Stack>
          <Text fontWeight="900" fontSize={16} color={allComplete ? '$xpGoldDark' : '#9E9E9E'} textAlign="center">
            Yo-Yo Master
          </Text>
          {allComplete && <Text fontSize={12} color="$xpGold" fontWeight="700">All tricks mastered!</Text>}
        </YStack>
      </YStack>
    </ScrollView>
  );
}
