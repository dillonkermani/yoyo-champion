"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { VideoAngle, TrickVideo } from "@/lib/data";
import {
  User,
  SidebarIcon,
  ArrowUp,
  Eye,
  type LucideIcon,
} from "lucide-react";

export interface AngleSwitcherProps {
  videos: TrickVideo[];
  currentAngle: VideoAngle;
  onAngleChange: (angle: VideoAngle, videoUrl: string) => void;
  className?: string;
}

const angleConfig: Record<
  VideoAngle,
  { label: string; icon: LucideIcon }
> = {
  front: { label: "Front", icon: User },
  side: { label: "Side", icon: SidebarIcon },
  overhead: { label: "Overhead", icon: ArrowUp },
  pov: { label: "POV", icon: Eye },
};

export const AngleSwitcher: React.FC<AngleSwitcherProps> = ({
  videos,
  currentAngle,
  onAngleChange,
  className,
}) => {
  // Get available angles from videos
  const availableAngles = React.useMemo(() => {
    return videos.map((v) => v.angle);
  }, [videos]);

  const handleAngleClick = (angle: VideoAngle) => {
    const video = videos.find((v) => v.angle === angle);
    if (video) {
      onAngleChange(angle, video.url);
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-full bg-navy-dark/80 backdrop-blur-sm",
        className
      )}
    >
      {(["front", "side", "overhead", "pov"] as VideoAngle[]).map((angle) => {
        const config = angleConfig[angle];
        const Icon = config.icon;
        const isAvailable = availableAngles.includes(angle);
        const isActive = currentAngle === angle;

        return (
          <button
            key={angle}
            onClick={() => isAvailable && handleAngleClick(angle)}
            disabled={!isAvailable}
            className={cn(
              "relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5",
              isActive
                ? "text-white"
                : isAvailable
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-600 cursor-not-allowed"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="angle-indicator"
                className="absolute inset-0 bg-electric-blue rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// Simplified angle tabs for mobile
export interface AngleTabsProps {
  videos: TrickVideo[];
  currentAngle: VideoAngle;
  onAngleChange: (angle: VideoAngle, videoUrl: string) => void;
  className?: string;
}

export const AngleTabs: React.FC<AngleTabsProps> = ({
  videos,
  currentAngle,
  onAngleChange,
  className,
}) => {
  const availableAngles = React.useMemo(() => {
    return videos.map((v) => v.angle);
  }, [videos]);

  const handleAngleClick = (angle: VideoAngle) => {
    const video = videos.find((v) => v.angle === angle);
    if (video) {
      onAngleChange(angle, video.url);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center border-b border-slate-700",
        className
      )}
    >
      {(["front", "side", "overhead", "pov"] as VideoAngle[]).map((angle) => {
        const config = angleConfig[angle];
        const isAvailable = availableAngles.includes(angle);
        const isActive = currentAngle === angle;

        return (
          <button
            key={angle}
            onClick={() => isAvailable && handleAngleClick(angle)}
            disabled={!isAvailable}
            className={cn(
              "relative flex-1 px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "text-electric-blue"
                : isAvailable
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-600 cursor-not-allowed"
            )}
          >
            {config.label}
            {isActive && (
              <motion.div
                layoutId="angle-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AngleSwitcher;
