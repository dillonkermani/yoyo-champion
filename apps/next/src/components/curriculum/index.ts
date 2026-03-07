// Curriculum Components
// Duolingo-style skill tree visualization for YoYo Champion

export {
  CategoryCard,
  CategoryCardSkeleton,
  type CategoryCardProps,
} from "./category-card";

export {
  DifficultySection,
  groupTricksByDifficulty,
  type DifficultySectionProps,
} from "./difficulty-section";

export {
  SkillNode,
  ConnectingPath,
  type SkillNodeProps,
  type ConnectingPathProps,
  type NodeState,
  type NodeVariant,
} from "./skill-node";

export {
  SkillTree,
  type SkillTreeProps,
  type SkillTreeCategory,
  type SkillTreeSection,
} from "./skill-tree";

export {
  LessonSteps,
  StepIndicator,
  MiniLessonProgress,
  type LessonStepsProps,
  type StepIndicatorProps,
  type MiniLessonProgressProps,
} from "./lesson-steps";
