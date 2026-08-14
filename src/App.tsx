
import { useState } from "react";

import Background from "./components/Background";
import Atmosphere from "./components/Atmosphere";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import MusicPlayer from "./components/MusicPlayer";
import PlaylistLinks from "./components/PlaylistLinks";
import Playlist from "./components/Playlist";

import { songs } from "./data/songs";

import "./App.css";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="app">

      <LoadingScreen />
      
      <Background />

      <Atmosphere />

      <Hero />

      <PlaylistLinks />

      <Playlist
        songs={songs}
        currentSongIndex={currentSongIndex}
        isOpen={isPlaylistOpen}
        onToggle={() => setIsPlaylistOpen((previous) => !previous)}
        onSongSelect={handleSongSelect}
      />

      <MusicPlayer
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

    </div>
  );
}

export default App;