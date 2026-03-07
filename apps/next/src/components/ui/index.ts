// UI Component Library - YoYo Champion
// Production-quality components following shadcn/ui patterns with Radix primitives

// Core utilities
export { cn, brandColors, animationDurations, easings } from "@/lib/utils";

// Button
export {
  Button,
  MotionButton,
  buttonVariants,
  type ButtonProps,
  type MotionButtonProps,
} from "./button";

// Card
export {
  Card,
  MotionCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type MotionCardProps,
} from "./card";

// Badge
export {
  Badge,
  DifficultyBadge,
  badgeVariants,
  type BadgeProps,
  type DifficultyBadgeProps,
} from "./badge";

// Progress
export {
  Progress,
  MultiProgress,
  CircularProgress,
  type ProgressProps,
  type MultiProgressProps,
  type CircularProgressProps,
} from "./progress";

// Tabs
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AnimatedTabsContent,
  VideoAngleTabs,
  type TabsListProps,
  type TabsTriggerProps,
  type VideoAngleTabsProps,
} from "./tabs";

// Slider
export {
  Slider,
  PlaybackSpeedSlider,
  RangeSlider,
  type SliderProps,
  type PlaybackSpeedSliderProps,
  type RangeSliderProps,
} from "./slider";

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  MotionDialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogContentProps,
} from "./dialog";

// Dropdown Menu
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuContentProps,
} from "./dropdown-menu";

// Avatar
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  UserAvatar,
  type AvatarProps,
  type AvatarGroupProps,
  type UserAvatarProps,
} from "./avatar";

// Tooltip
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  SimpleTooltip,
  InfoTooltip,
  type TooltipContentProps,
  type SimpleTooltipProps,
  type InfoTooltipProps,
} from "./tooltip";

// Scroll Area
export {
  ScrollArea,
  ScrollBar,
  HorizontalScroll,
  VirtualScrollArea,
  type ScrollAreaProps,
  type ScrollBarProps,
  type HorizontalScrollProps,
  type VirtualScrollAreaProps,
} from "./scroll-area";

// Select
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SimpleSelect,
  type SelectTriggerProps,
  type SelectContentProps,
  type SimpleSelectProps,
} from "./select";

// Input
export {
  Input,
  SearchInput,
  FormField,
  Textarea,
  inputVariants,
  type InputProps,
  type SearchInputProps,
  type FormFieldProps,
  type TextareaProps,
} from "./input";

// Skeleton
export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonTrickCard,
  SkeletonProfile,
  SkeletonVideoPlayer,
  SkeletonList,
  type SkeletonProps,
  type SkeletonListProps,
} from "./skeleton";

// Separator
export {
  Separator,
  Divider,
  Spacer,
  type SeparatorProps,
  type DividerProps,
  type SpacerProps,
} from "./separator";
