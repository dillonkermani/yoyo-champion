"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Camera,
  Bell,
  Video,
  Gauge,
  Moon,
  Target,
  Download,
  Trash2,
  Shield,
  Info,
  FileText,
  Lock,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Check,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useUserStore,
  useUIStore,
  useOnboardingStore,
  selectUser,
  selectVideoSettings,
  selectSkillLevel,
  selectPreferredStyles,
  selectGoals,
  SKILL_LEVEL_METADATA,
  STYLE_METADATA,
  GOAL_METADATA,
  type VideoSettings,
} from "@/stores";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Toggle Switch Component
interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onCheckedChange, disabled }) => (
  <button
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
      checked ? "bg-xp" : "bg-gray-200",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    <span
      className={cn(
        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
        checked ? "translate-x-6" : "translate-x-1"
      )}
    />
  </button>
);

// Setting Row Component
interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  children: React.ReactNode;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, description, children }) => (
  <div className="flex items-center justify-between py-4">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-surface-secondary text-muted-foreground">{icon}</div>
      <div>
        <p className="font-medium text-brand-black">{label}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
    <div className="flex items-center">{children}</div>
  </div>
);

// Account Settings Section
const AccountSettings: React.FC = () => {
  const user = useUserStore(selectUser);
  const updateProfile = useUserStore((state) => state.updateProfile);
  const [displayName, setDisplayName] = React.useState(user?.displayName || "");
  const [isSaving, setIsSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const initials = (user?.displayName || "YY")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateProfile({ displayName });
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-fun-blue" />
          Account Settings
        </CardTitle>
        <CardDescription>Manage your profile information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar size="xl" variant="brand">
              <AvatarImage src={user?.avatarUrl} alt={user?.displayName || "User"} />
              <AvatarFallback className="bg-xp text-white text-xl">{initials}</AvatarFallback>
            </Avatar>
            <button
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-md border border-border hover:bg-surface-secondary transition-colors"
              aria-label="Change avatar"
            >
              <Camera className="w-3.5 h-3.5 text-brand-black" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-brand-black">Profile Photo</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
            <Button variant="outline" size="sm" className="mt-2">
              Upload Photo
            </Button>
          </div>
        </div>

        <Separator />

        {/* Display Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-black">Display Name</label>
          <div className="flex gap-2">
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="max-w-sm"
            />
            <Button onClick={handleSave} disabled={isSaving || displayName === user?.displayName}>
              {isSaving ? "Saving..." : saved ? <Check className="w-4 h-4" /> : "Save"}
            </Button>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-brand-black">Email</label>
          <div className="flex items-center gap-2">
            <Input
              value={user?.email || "user@example.com"}
              disabled
              className="max-w-sm bg-surface-secondary"
            />
            <span className="text-xs text-muted-foreground">(Cannot be changed)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Video Preferences Section
const VideoPreferences: React.FC = () => {
  const videoSettings = useUIStore(selectVideoSettings);
  const updateVideoSettings = useUIStore((state) => state.updateVideoSettings);

  const qualityOptions = [
    { value: "auto", label: "Auto" },
    { value: "1080p", label: "1080p HD" },
    { value: "720p", label: "720p" },
    { value: "480p", label: "480p" },
  ];

  const speedOptions = [
    { value: "0.25", label: "0.25x" },
    { value: "0.5", label: "0.5x" },
    { value: "0.75", label: "0.75x" },
    { value: "1", label: "1x (Normal)" },
    { value: "1.25", label: "1.25x" },
    { value: "1.5", label: "1.5x" },
    { value: "2", label: "2x" },
  ];

  const angleOptions = [
    { value: "auto", label: "Auto" },
    { value: "front", label: "Front" },
    { value: "side", label: "Side" },
    { value: "pov", label: "POV" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5 text-fun-blue" />
          Video Preferences
        </CardTitle>
        <CardDescription>Customize your video playback experience</CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        <SettingRow
          icon={<Gauge className="w-4 h-4" />}
          label="Default Video Quality"
          description="Set your preferred video resolution"
        >
          <Select
            value={videoSettings.quality}
            onValueChange={(value) =>
              updateVideoSettings({ quality: value as VideoSettings["quality"] })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {qualityOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>

        <SettingRow
          icon={<Gauge className="w-4 h-4" />}
          label="Default Playback Speed"
          description="Choose your preferred speed"
        >
          <Select
            value={videoSettings.playbackSpeed.toString()}
            onValueChange={(value) => updateVideoSettings({ playbackSpeed: parseFloat(value) })}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {speedOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>

        <SettingRow
          icon={<Video className="w-4 h-4" />}
          label="Preferred Angle"
          description="Default camera angle for tutorials"
        >
          <Select
            value={videoSettings.preferredAngle}
            onValueChange={(value) =>
              updateVideoSettings({ preferredAngle: value as VideoSettings["preferredAngle"] })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {angleOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SettingRow>

        <SettingRow
          icon={<Video className="w-4 h-4" />}
          label="Autoplay"
          description="Automatically play next video"
        >
          <ToggleSwitch
            checked={videoSettings.autoplay}
            onCheckedChange={(checked) => updateVideoSettings({ autoplay: checked })}
          />
        </SettingRow>

        <SettingRow
          icon={<Video className="w-4 h-4" />}
          label="Loop Videos"
          description="Loop trick tutorials for practice"
        >
          <ToggleSwitch
            checked={videoSettings.loop}
            onCheckedChange={(checked) => updateVideoSettings({ loop: checked })}
          />
        </SettingRow>
      </CardContent>
    </Card>
  );
};

// Notification Preferences Section
const NotificationPreferences: React.FC = () => {
  const [streakNotifications, setStreakNotifications] = React.useState(true);
  const [achievementNotifications, setAchievementNotifications] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-fun-blue" />
          Notifications
        </CardTitle>
        <CardDescription>Manage how you receive updates</CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        <SettingRow
          icon={<Bell className="w-4 h-4" />}
          label="Streak Reminders"
          description="Get notified to maintain your streak"
        >
          <ToggleSwitch checked={streakNotifications} onCheckedChange={setStreakNotifications} />
        </SettingRow>

        <SettingRow
          icon={<Bell className="w-4 h-4" />}
          label="Achievement Alerts"
          description="Celebrate when you unlock badges"
        >
          <ToggleSwitch
            checked={achievementNotifications}
            onCheckedChange={setAchievementNotifications}
          />
        </SettingRow>

        <SettingRow
          icon={<Mail className="w-4 h-4" />}
          label="Weekly Progress Digest"
          description="Receive weekly email summaries"
        >
          <ToggleSwitch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
        </SettingRow>
      </CardContent>
    </Card>
  );
};

// Appearance Preferences Section
const AppearancePreferences: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="w-5 h-5 text-fun-blue" />
          Appearance
        </CardTitle>
        <CardDescription>Customize how the app looks</CardDescription>
      </CardHeader>
      <CardContent className="divide-y divide-border">
        <SettingRow
          icon={<Moon className="w-4 h-4" />}
          label="Dark Mode"
          description="Coming soon!"
        >
          <ToggleSwitch checked={darkMode} onCheckedChange={setDarkMode} disabled />
        </SettingRow>
      </CardContent>
    </Card>
  );
};

// Learning Preferences Section
const LearningPreferences: React.FC = () => {
  const skillLevel = useOnboardingStore(selectSkillLevel);
  const preferredStyles = useOnboardingStore(selectPreferredStyles);
  const goals = useOnboardingStore(selectGoals);

  const skillMeta = skillLevel ? SKILL_LEVEL_METADATA[skillLevel] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-fun-blue" />
          Learning Preferences
        </CardTitle>
        <CardDescription>Your personalized learning settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Skill Level */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-brand-black">Skill Level</p>
            <p className="text-sm text-muted-foreground">
              {skillMeta ? skillMeta.label : "Not set"}
            </p>
          </div>
          <Link href="/onboarding">
            <Button variant="outline" size="sm" className="gap-1">
              Update
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <Separator />

        {/* Goals */}
        <div>
          <p className="font-medium text-brand-black mb-2">Your Goals</p>
          <div className="flex flex-wrap gap-2">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <span
                  key={goal}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-fun-blue/10 text-fun-blue"
                >
                  {GOAL_METADATA[goal]?.label || goal}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No goals set</span>
            )}
          </div>
        </div>

        <Separator />

        {/* Preferred Styles */}
        <div>
          <p className="font-medium text-brand-black mb-2">Preferred Styles</p>
          <div className="flex flex-wrap gap-2">
            {preferredStyles.length > 0 ? (
              preferredStyles.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-brand-blue/10 text-brand-blue"
                >
                  {STYLE_METADATA[style]?.label || style}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No styles selected</span>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Link href="/onboarding">
            <Button variant="outline" className="w-full gap-2">
              <Target className="w-4 h-4" />
              Update Learning Preferences
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

// Data & Privacy Section
const DataPrivacy: React.FC = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-fun-blue" />
          Data & Privacy
        </CardTitle>
        <CardDescription>Manage your data and privacy settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Download className="w-4 h-4" />
          Export My Data
          <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2">
          <Lock className="w-4 h-4" />
          Privacy Settings
          <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
        </Button>

        <Separator />

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </Button>

          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-red-800">Are you sure?</p>
                        <p className="text-sm text-red-600">
                          This action cannot be undone. All your progress, badges, and data will be
                          permanently deleted.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            // Handle delete
                            setShowDeleteConfirm(false);
                          }}
                        >
                          Yes, Delete My Account
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

// About Section
const AboutSection: React.FC = () => {
  const appVersion = "1.0.0";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-fun-blue" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <span className="text-muted-foreground">App Version</span>
          <span className="font-medium">{appVersion}</span>
        </div>

        <Separator />

        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center justify-between py-2 hover:bg-surface-secondary -mx-2 px-2 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Terms of Service
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between py-2 hover:bg-surface-secondary -mx-2 px-2 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" />
              Privacy Policy
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between py-2 hover:bg-surface-secondary -mx-2 px-2 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              Contact Support
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Settings Page
export default function SettingsPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-brand-black">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        <AccountSettings />
        <VideoPreferences />
        <NotificationPreferences />
        <AppearancePreferences />
        <LearningPreferences />
        <DataPrivacy />
        <AboutSection />
      </div>
    </div>
  );
}
