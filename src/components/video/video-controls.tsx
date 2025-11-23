"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpeedControl, SpeedBadge } from "./speed-control";
import { LoopSection } from "./loop-section";
import { StepMarkers, StepIndicator } from "./step-markers";
import { TrickStep } from "@/lib/data";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture,
  Settings,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface VideoControlsProps {
  // Playback state
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  buffered: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  playbackRate: number;

  // Loop state
  loopStart: number | null;
  loopEnd: number | null;

  // Steps
  steps?: TrickStep[];
  currentStepId?: string | undefined;

  // Callbacks
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onSeekDelta: (delta: number) => void;
  onVolumeChange: (volume: number) => void;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
  onPiPToggle: () => void;
  onPlaybackRateChange: (rate: number) => void;
  onSetLoopStart: (time: number) => void;
  onSetLoopEnd: (time: number) => void;
  onClearLoop: () => void;
  onStepClick?: (stepId: string, timestamp: number) => void;

  // UI
  className?: string;
  showAdvancedControls?: boolean;
  supportsPiP?: boolean;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  duration,
  buffered,
  volume,
  isMuted,
  isFullscreen,
  playbackRate,
  loopStart,
  loopEnd,
  steps = [],
  currentStepId,
  onPlayPause,
  onSeek,
  onSeekDelta,
  onVolumeChange,
  onMuteToggle,
  onFullscreenToggle,
  onPiPToggle,
  onPlaybackRateChange,
  onSetLoopStart,
  onSetLoopEnd,
  onClearLoop,
  onStepClick,
  className,
  showAdvancedControls = true,
  supportsPiP = true,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const hasLoop = loopStart !== null && loopEnd !== null;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  const getStepIndex = () => {
    if (!currentStepId || steps.length === 0) return 0;
    const index = steps.findIndex((s) => s.id === currentStepId);
    return index >= 0 ? index + 1 : 0;
  };

  return (
    <div
      className={cn(
        "bg-navy-dark/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 space-y-4",
        className
      )}
    >
      {/* Progress Bar with Step Markers */}
      <div className="space-y-2">
        {/* Step Markers */}
        {steps.length > 0 && (
          <StepMarkers
            steps={steps}
            duration={duration}
            currentTime={currentTime}
            currentStepId={currentStepId}
            onStepClick={(id, time) => {
              onSeek(time);
              onStepClick?.(id, time);
            }}
          />
        )}

        {/* Progress Bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="relative h-2 bg-slate-700 rounded-full cursor-pointer group"
        >
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 bg-slate-600 rounded-full"
            style={{ width: `${buffered}%` }}
          />

          {/* Loop Region */}
          {hasLoop && (
            <div
              className="absolute inset-y-0 bg-electric-blue/30 rounded-full"
              style={{
                left: `${(loopStart! / duration) * 100}%`,
                width: `${((loopEnd! - loopStart!) / duration) * 100}%`,
              }}
            />
          )}

          {/* Progress */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-electric-blue to-electric-blue-light rounded-full"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Playhead */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* Time Display */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">{formatTime(currentTime)}</span>
          {steps.length > 0 && (
            <StepIndicator
              currentStep={getStepIndex()}
              totalSteps={steps.length}
            />
          )}
          <span className="font-mono">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls Row */}
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          {/* Skip Back */}
          <button
            onClick={() => onSeekDelta(-10)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={onPlayPause}
            className="w-12 h-12 rounded-full bg-electric-blue flex items-center justify-center text-white hover:bg-electric-blue-light transition-colors shadow-lg shadow-electric-blue/25"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>

          {/* Skip Forward */}
          <button
            onClick={() => onSeekDelta(10)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Center - Speed Badge */}
        <div className="flex items-center gap-3">
          <SpeedBadge speed={playbackRate} />
          {hasLoop && (
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-electric-blue/20 text-electric-blue">
              Loop
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Volume */}
          <div className="flex items-center gap-1 group">
            <button
              onClick={onMuteToggle}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-0 group-hover:w-16 transition-all duration-200 h-1 appearance-none bg-slate-700 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>

          {/* Settings Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-72 p-4 bg-navy-dark border-slate-700"
            >
              <SpeedControl
                value={playbackRate}
                onValueChange={onPlaybackRateChange}
                variant="buttons"
              />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* PiP */}
          {supportsPiP && (
            <button
              onClick={onPiPToggle}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <PictureInPicture className="w-5 h-5" />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={onFullscreenToggle}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isFullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Advanced Controls Toggle */}
      {showAdvancedControls && (
        <>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1"
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Advanced Controls
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Advanced Controls
              </>
            )}
          </button>

          {/* Advanced Controls Panel */}
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pt-2 border-t border-slate-700"
            >
              {/* Speed Control */}
              <SpeedControl
                value={playbackRate}
                onValueChange={onPlaybackRateChange}
              />

              {/* Loop Control */}
              <LoopSection
                loopStart={loopStart}
                loopEnd={loopEnd}
                currentTime={currentTime}
                duration={duration}
                onSetLoopStart={onSetLoopStart}
                onSetLoopEnd={onSetLoopEnd}
                onClearLoop={onClearLoop}
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoControls;
