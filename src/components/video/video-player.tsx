"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  initialTime?: number;
  playbackRate?: number;
  loopStart?: number | null;
  loopEnd?: number | null;
  stepMarkers?: Array<{ time: number; label: string; id: string }>;
  currentStepId?: string | undefined;
  onStepClick?: (stepId: string, timestamp: number) => void;
}

export interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  toggleFullscreen: () => void;
  togglePiP: () => Promise<void>;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const VideoPlayer = React.forwardRef<VideoPlayerRef, VideoPlayerProps>(
  (
    {
      src,
      poster,
      className,
      autoPlay = false,
      onTimeUpdate,
      onEnded,
      onError,
      onPlay,
      onPause,
      initialTime = 0,
      playbackRate = 1,
      loopStart,
      loopEnd,
      stepMarkers = [],
      currentStepId,
      onStepClick,
    },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const progressRef = React.useRef<HTMLDivElement>(null);
    const hideControlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);
    const [showControls, setShowControls] = React.useState(true);
    const [buffered, setBuffered] = React.useState(0);
    const [hoveredMarker, setHoveredMarker] = React.useState<string | null>(null);

    // Expose methods via ref
    React.useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      setPlaybackRate: (rate: number) => {
        if (videoRef.current) {
          videoRef.current.playbackRate = rate;
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
      toggleFullscreen: () => toggleFullscreen(),
      togglePiP: async () => {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (videoRef.current) {
          await videoRef.current.requestPictureInPicture();
        }
      },
    }));

    // Apply playback rate
    React.useEffect(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = playbackRate;
      }
    }, [playbackRate]);

    // Handle A-B loop
    React.useEffect(() => {
      if (
        loopStart !== null &&
        loopEnd !== null &&
        loopStart !== undefined &&
        loopEnd !== undefined &&
        currentTime >= loopEnd
      ) {
        if (videoRef.current) {
          videoRef.current.currentTime = loopStart;
        }
      }
    }, [currentTime, loopStart, loopEnd]);

    // Set initial time
    React.useEffect(() => {
      if (videoRef.current && initialTime > 0) {
        videoRef.current.currentTime = initialTime;
      }
    }, [initialTime]);

    // Auto-hide controls
    const resetHideControlsTimeout = React.useCallback(() => {
      setShowControls(true);
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      if (isPlaying) {
        hideControlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    }, [isPlaying]);

    React.useEffect(() => {
      return () => {
        if (hideControlsTimeoutRef.current) {
          clearTimeout(hideControlsTimeoutRef.current);
        }
      };
    }, []);

    // Keyboard shortcuts
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!containerRef.current?.contains(document.activeElement) && document.activeElement !== document.body) {
          return;
        }

        switch (e.key.toLowerCase()) {
          case " ":
            e.preventDefault();
            togglePlayPause();
            break;
          case "arrowleft":
            e.preventDefault();
            seek(-5);
            break;
          case "arrowright":
            e.preventDefault();
            seek(5);
            break;
          case "arrowup":
            e.preventDefault();
            adjustVolume(0.1);
            break;
          case "arrowdown":
            e.preventDefault();
            adjustVolume(-0.1);
            break;
          case "m":
            e.preventDefault();
            toggleMute();
            break;
          case "f":
            e.preventDefault();
            toggleFullscreen();
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isPlaying, volume]);

    // Fullscreen change listener
    React.useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };

      document.addEventListener("fullscreenchange", handleFullscreenChange);
      return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const togglePlayPause = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
      }
    };

    const seek = (delta: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(
          0,
          Math.min(duration, videoRef.current.currentTime + delta)
        );
      }
    };

    const adjustVolume = (delta: number) => {
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        videoRef.current!.muted = false;
      }
    };

    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    };

    const toggleFullscreen = async () => {
      if (!containerRef.current) return;

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !videoRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    };

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const time = videoRef.current.currentTime;
        setCurrentTime(time);
        onTimeUpdate?.(time, duration);

        // Update buffered
        if (videoRef.current.buffered.length > 0) {
          const bufferedEnd = videoRef.current.buffered.end(
            videoRef.current.buffered.length - 1
          );
          setBuffered((bufferedEnd / duration) * 100);
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
        setIsLoading(false);
        if (initialTime > 0) {
          videoRef.current.currentTime = initialTime;
        }
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
      resetHideControlsTimeout();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
      setShowControls(true);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };

    const handleRetry = () => {
      setHasError(false);
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.load();
      }
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    // Calculate marker positions
    const getMarkerPosition = (time: number) => {
      return duration > 0 ? (time / duration) * 100 : 0;
    };

    if (hasError) {
      return (
        <div
          className={cn(
            "relative aspect-video bg-navy-dark rounded-lg flex flex-col items-center justify-center gap-4",
            className
          )}
        >
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="text-slate-400 text-sm">Failed to load video</p>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-video bg-black rounded-lg overflow-hidden group",
          className
        )}
        onMouseMove={resetHideControlsTimeout}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="w-full h-full bg-navy-dark" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-electric-blue border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}

        {/* Video Element */}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-contain"
          autoPlay={autoPlay}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={onEnded}
          onError={handleError}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
        />

        {/* Center Play Button Overlay */}
        <AnimatePresence>
          {!isPlaying && !isLoading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center z-20 bg-black/30"
            >
              <div className="w-20 h-20 rounded-full bg-electric-blue/90 flex items-center justify-center shadow-lg shadow-electric-blue/30 hover:bg-electric-blue transition-colors">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-4 px-4"
            >
              {/* Progress Bar */}
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="relative h-2 bg-white/20 rounded-full cursor-pointer mb-4 group/progress"
              >
                {/* Buffered */}
                <div
                  className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
                  style={{ width: `${buffered}%` }}
                />

                {/* Loop Region */}
                {loopStart !== null && loopStart !== undefined && loopEnd !== null && loopEnd !== undefined && (
                  <div
                    className="absolute inset-y-0 bg-electric-blue/30 rounded-full"
                    style={{
                      left: `${getMarkerPosition(loopStart)}%`,
                      width: `${getMarkerPosition(loopEnd) - getMarkerPosition(loopStart)}%`,
                    }}
                  />
                )}

                {/* Progress */}
                <div
                  className="absolute inset-y-0 left-0 bg-electric-blue rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />

                {/* Step Markers */}
                {stepMarkers.map((marker) => (
                  <div
                    key={marker.id}
                    className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                    style={{ left: `${getMarkerPosition(marker.time)}%` }}
                    onMouseEnter={() => setHoveredMarker(marker.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepClick?.(marker.id, marker.time);
                      if (videoRef.current) {
                        videoRef.current.currentTime = marker.time;
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2 transition-all -translate-x-1/2",
                        currentStepId === marker.id
                          ? "bg-electric-blue border-white scale-125"
                          : "bg-white/80 border-electric-blue hover:scale-125"
                      )}
                    />
                    {/* Marker Tooltip */}
                    <AnimatePresence>
                      {hoveredMarker === marker.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-navy-dark rounded text-xs text-white whitespace-nowrap"
                        >
                          {marker.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Playhead */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md -translate-x-1/2 opacity-0 group-hover/progress:opacity-100 transition-opacity"
                  style={{ left: `${progressPercent}%` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="text-white hover:text-electric-blue transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2 group/volume">
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-electric-blue transition-colors"
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
                      onChange={(e) => {
                        const newVolume = parseFloat(e.target.value);
                        setVolume(newVolume);
                        if (videoRef.current) {
                          videoRef.current.volume = newVolume;
                        }
                        if (newVolume > 0 && isMuted) {
                          setIsMuted(false);
                          videoRef.current!.muted = false;
                        }
                      }}
                      className="w-0 group-hover/volume:w-20 transition-all duration-200 h-1 appearance-none bg-white/30 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>

                  {/* Time Display */}
                  <span className="text-sm text-white/80 font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Picture in Picture */}
                  {"pictureInPictureEnabled" in document && (
                    <button
                      onClick={async () => {
                        if (document.pictureInPictureElement) {
                          await document.exitPictureInPicture();
                        } else if (videoRef.current) {
                          await videoRef.current.requestPictureInPicture();
                        }
                      }}
                      className="text-white hover:text-electric-blue transition-colors"
                    >
                      <PictureInPicture className="w-5 h-5" />
                    </button>
                  )}

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-electric-blue transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
