import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import type { Song } from "../data/songs";

import "./MusicPlayer.css";

interface MusicPlayerProps {
  songs: Song[];
  currentSongIndex: number;
  setCurrentSongIndex: Dispatch<SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

function MusicPlayer({
  songs,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
}: MusicPlayerProps) {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const currentSong = songs[currentSongIndex];

  /*
   * Load selected song.
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();

    setCurrentTime(0);

    if (isPlaying) {
      audio
        .play()
        .catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
    }
  }, [currentSongIndex]);

  /*
   * Volume.
   */
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  /*
   * Play / pause.
   */
  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Unable to play audio:", error);
        });
    }
  };

  /*
   * Previous.
   */
  const previousSong = () => {
    setCurrentSongIndex((previousIndex) => {
      if (previousIndex === 0) {
        return songs.length - 1;
      }

      return previousIndex - 1;
    });
  };

  /*
   * Next.
   */
  const nextSong = () => {
    setCurrentSongIndex((previousIndex) => {
      if (previousIndex === songs.length - 1) {
        return 0;
      }

      return previousIndex + 1;
    });
  };

  /*
   * Time update.
   */
  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  /*
   * Metadata loaded.
   */
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
  };

  /*
   * Song finished.
   */
  const handleSongEnded = () => {
    nextSong();
  };

  /*
   * Seek.
   */
  const handleSeek = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;

    setCurrentTime(newTime);
  };

  /*
   * Volume.
   */
  const handleVolumeChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = Number(event.target.value);

    setVolume(newVolume);

    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  /*
   * Mute.
   */
  const toggleMute = () => {
    setIsMuted((previous) => !previous);
  };

  /*
   * Time formatter.
   */
  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) {
      return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="music-player">

      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnded}
        preload="metadata"
      />

      {/* Song information */}

      <div className="song-info">

        <div
          className={`album-art ${
            isPlaying ? "album-art-playing" : ""
          }`}
        >
          <div className="album-art-inner">
            ☀
          </div>
        </div>

        <div className="song-details">

          <h3>{currentSong.title}</h3>

          <p>{currentSong.artist}</p>

        </div>

      </div>

      {/* Controls */}

      <div className="player-controls">

        <button
          onClick={previousSong}
          aria-label="Previous song"
        >
          ⏮
        </button>

        <button
          className="play-button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

        <button
          onClick={nextSong}
          aria-label="Next song"
        >
          ⏭
        </button>

      </div>

      {/* Progress */}

      <div className="progress-area">

        <span>{formatTime(currentTime)}</span>

        <input
          className="progress-slider"
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Song progress"
        />

        <span>{formatTime(duration)}</span>

      </div>

      {/* Volume */}

      <div className="volume-control">

        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? "🔇" : "🔊"}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          aria-label="Volume"
        />

      </div>

    </div>
  );
}

export default MusicPlayer;