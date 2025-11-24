"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trick, VideoAngle } from "@/lib/data";
import { VideoPlayer, VideoPlayerRef } from "./video-player";
import { AngleSwitcher, AngleTabs } from "./angle-switcher";
import { VideoControls } from "./video-controls";
import { StepList } from "./step-markers";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Eye,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
} from "lucide-react";

export interface TrickPlayerProps {
  trick: Trick;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  autoPlay?: boolean;
}

interface PlayerState {
  currentAngle: VideoAngle;
  currentVideoUrl: string;
  playbackRate: number;
  loopStart: number | null;
  loopEnd: number | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  buffered: number;
  currentStepId: string | undefined;
  watchedStepIds: string[];
}

export const TrickPlayer: React.FC<TrickPlayerProps> = ({
  trick,
  onComplete,
  onProgress,
  autoPlay = false,
}) => {
  const videoRef = React.useRef<VideoPlayerRef>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [isWatched, setIsWatched] = React.useState(false);
  const [isMastered, setIsMastered] = React.useState(false);

  // Get initial video
  const initialVideo = trick.videos[0];
  const initialAngle = initialVideo?.angle || "front";
  const initialUrl = initialVideo?.url || "";

  const [state, setState] = React.useState<PlayerState>({
    currentAngle: initialAngle,
    currentVideoUrl: initialUrl,
    playbackRate: 1,
    loopStart: null,
    loopEnd: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    buffered: 0,
    currentStepId: trick.steps[0]?.id,
    watchedStepIds: [],
  });

  // Calculate current step based on time
  React.useEffect(() => {
    const currentStep = trick.steps.findLast(
      (step) => state.currentTime >= step.timestamp
    );
    if (currentStep && currentStep.id !== state.currentStepId) {
      setState((prev) => ({
        ...prev,
        currentStepId: currentStep.id,
        watchedStepIds: prev.watchedStepIds.includes(currentStep.id)
          ? prev.watchedStepIds
          : [...prev.watchedStepIds, currentStep.id],
      }));
    }
  }, [state.currentTime, trick.steps]);

  // Calculate and report progress
  React.useEffect(() => {
    if (state.duration > 0) {
      const progress = (state.currentTime / state.duration) * 100;
      onProgress?.(progress);

      // Auto-mark as watched when 90% complete
      if (progress >= 90 && !isWatched) {
        setIsWatched(true);
      }
    }
  }, [state.currentTime, state.duration, onProgress, isWatched]);

  // Handle angle change
  const handleAngleChange = (angle: VideoAngle, videoUrl: string) => {
    const currentTime = videoRef.current?.getCurrentTime() || 0;
    setState((prev) => ({
      ...prev,
      currentAngle: angle,
      currentVideoUrl: videoUrl,
    }));
    // Sync playback position after angle change
    setTimeout(() => {
      videoRef.current?.seek(currentTime);
    }, 100);
  };

  // Video event handlers
  const handleTimeUpdate = (currentTime: number, duration: number) => {
    setState((prev) => ({ ...prev, currentTime, duration }));
  };

  const handlePlay = () => setState((prev) => ({ ...prev, isPlaying: true }));
  const handlePause = () => setState((prev) => ({ ...prev, isPlaying: false }));

  const handleEnded = () => {
    setState((prev) => ({ ...prev, isPlaying: false }));
    onComplete?.();
  };

  // Control handlers
  const handlePlayPause = () => {
    if (state.isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  const handleSeek = (time: number) => {
    videoRef.current?.seek(time);
    setState((prev) => ({ ...prev, currentTime: time }));
  };

  const handleSeekDelta = (delta: number) => {
    const newTime = Math.max(
      0,
      Math.min(state.duration, state.currentTime + delta)
    );
    handleSeek(newTime);
  };

  const handleVolumeChange = (volume: number) => {
    setState((prev) => ({
      ...prev,
      volume,
      isMuted: volume === 0,
    }));
  };

  const handleMuteToggle = () => {
    setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleFullscreenToggle = () => {
    videoRef.current?.toggleFullscreen();
  };

  const handlePiPToggle = async () => {
    await videoRef.current?.togglePiP();
  };

  const handlePlaybackRateChange = (rate: number) => {
    setState((prev) => ({ ...prev, playbackRate: rate }));
    videoRef.current?.setPlaybackRate(rate);
  };

  const handleSetLoopStart = (time: number) => {
    setState((prev) => ({ ...prev, loopStart: time }));
  };

  const handleSetLoopEnd = (time: number) => {
    setState((prev) => ({ ...prev, loopEnd: time }));
  };

  const handleClearLoop = () => {
    setState((prev) => ({ ...prev, loopStart: null, loopEnd: null }));
  };

  const handleStepClick = (stepId: string, timestamp: number) => {
    handleSeek(timestamp);
    setState((prev) => ({ ...prev, currentStepId: stepId }));
  };

  const handleMarkWatched = () => {
    setIsWatched(true);
  };

  const handleMarkMastered = () => {
    setIsMastered(true);
    setIsWatched(true);
    onComplete?.();
  };

  // Get current step details
  const currentStep = trick.steps.find((s) => s.id === state.currentStepId);

  // Generate step markers for video player
  const stepMarkers = trick.steps.map((step) => ({
    time: step.timestamp,
    label: step.title,
    id: step.id,
  }));

  // Check PiP support
  const supportsPiP =
    typeof document !== "undefined" && "pictureInPictureEnabled" in document;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Video Area */}
      <div className="flex-1 space-y-4">
        {/* Angle Switcher - Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <AngleSwitcher
            videos={trick.videos}
            currentAngle={state.currentAngle}
            onAngleChange={handleAngleChange}
          />
          <div className="flex items-center gap-2">
            {isWatched && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fun-blue/20 text-fun-blue text-sm">
                <Eye className="w-4 h-4" />
                Watched
              </div>
            )}
            {isMastered && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-electric-blue/20 text-electric-blue text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Mastered
              </div>
            )}
          </div>
        </div>

        {/* Angle Tabs - Mobile */}
        <div className="md:hidden">
          <AngleTabs
            videos={trick.videos}
            currentAngle={state.currentAngle}
            onAngleChange={handleAngleChange}
          />
        </div>

        {/* Video Player */}
        <VideoPlayer
          ref={videoRef}
          src={state.currentVideoUrl}
          poster={trick.thumbnailUrl}
          autoPlay={autoPlay}
          playbackRate={state.playbackRate}
          loopStart={state.loopStart}
          loopEnd={state.loopEnd}
          stepMarkers={stepMarkers}
          {...(state.currentStepId !== undefined ? { currentStepId: state.currentStepId } : {})}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onStepClick={(stepId) => setState((prev) => ({ ...prev, currentStepId: stepId }))}
          className="rounded-xl overflow-hidden"
        />

        {/* Video Controls */}
        <VideoControls
          isPlaying={state.isPlaying}
          currentTime={state.currentTime}
          duration={state.duration}
          buffered={state.buffered}
          volume={state.volume}
          isMuted={state.isMuted}
          isFullscreen={state.isFullscreen}
          playbackRate={state.playbackRate}
          loopStart={state.loopStart}
          loopEnd={state.loopEnd}
          steps={trick.steps}
          {...(state.currentStepId !== undefined ? { currentStepId: state.currentStepId } : {})}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onSeekDelta={handleSeekDelta}
          onVolumeChange={handleVolumeChange}
          onMuteToggle={handleMuteToggle}
          onFullscreenToggle={handleFullscreenToggle}
          onPiPToggle={handlePiPToggle}
          onPlaybackRateChange={handlePlaybackRateChange}
          onSetLoopStart={handleSetLoopStart}
          onSetLoopEnd={handleSetLoopEnd}
          onClearLoop={handleClearLoop}
          onStepClick={handleStepClick}
          supportsPiP={supportsPiP}
        />

        {/* Current Step Info */}
        {currentStep && (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-navy-light border border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center text-white font-bold">
                {currentStep.order}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {currentStep.title}
                </h3>
                <p className="text-slate-400 mt-1">{currentStep.description}</p>
                {currentStep.tipText && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-400">
                      <span className="font-medium">Tip:</span>{" "}
                      {currentStep.tipText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant={isWatched ? "secondary" : "outline"}
            onClick={handleMarkWatched}
            disabled={isWatched}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            {isWatched ? "Marked as Watched" : "Mark as Watched"}
          </Button>
          <Button
            variant={isMastered ? "secondary" : "brand"}
            onClick={handleMarkMastered}
            disabled={isMastered}
            className="flex-1"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {isMastered ? "Mastered!" : "Mark as Mastered"}
          </Button>
        </div>
      </div>

      {/* Step List Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block overflow-hidden"
          >
            <div className="w-80 h-full bg-navy-dark rounded-xl border border-slate-700 overflow-hidden">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ListOrdered className="w-5 h-5" />
                  Steps ({trick.steps.length})
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Steps List */}
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-4">
                  <StepList
                    steps={trick.steps}
                    {...(state.currentStepId !== undefined ? { currentStepId: state.currentStepId } : {})}
                    completedStepIds={state.watchedStepIds}
                    onStepClick={handleStepClick}
                  />
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Toggle (when closed) */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 p-2 bg-navy-dark border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Steps Sheet Trigger */}
      <div className="lg:hidden fixed bottom-4 right-4">
        <Button
          variant="brand"
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ListOrdered className="w-5 h-5 mr-2" />
          Steps
        </Button>
      </div>

      {/* Mobile Steps Sheet */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-navy-dark rounded-t-2xl border-t border-slate-700 max-h-[60vh] overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-medium">
                <ListOrdered className="w-5 h-5" />
                Steps ({trick.steps.length})
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <ChevronRight className="w-5 h-5 rotate-90" />
              </button>
            </div>
            <ScrollArea className="h-[calc(60vh-60px)]">
              <div className="p-4">
                <StepList
                  steps={trick.steps}
                  currentStepId={state.currentStepId}
                  completedStepIds={state.watchedStepIds}
                  onStepClick={(stepId, timestamp) => {
                    handleStepClick(stepId, timestamp);
                    setSidebarOpen(false);
                  }}
                />
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrickPlayer;
