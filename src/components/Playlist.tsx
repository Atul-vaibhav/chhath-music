import type { Song } from "../data/songs";

import "./Playlist.css";

interface PlaylistProps {
  songs: Song[];
  currentSongIndex: number;
  isOpen: boolean;
  onToggle: () => void;
  onSongSelect: (index: number) => void;
}

function Playlist({
  songs,
  currentSongIndex,
  isOpen,
  onToggle,
  onSongSelect,
}: PlaylistProps) {

  return (
    <>
      {/* Floating playlist button */}

      <button
        className={`playlist-trigger ${
          isOpen ? "playlist-trigger-active" : ""
        }`}
        onClick={onToggle}
        aria-label="Open playlist"
        aria-expanded={isOpen}
      >
        <span className="playlist-trigger-icon">
          ☰
        </span>

        <span className="playlist-trigger-text">
          Playlist
        </span>
      </button>


      {/* Playlist panel */}

      <aside
        className={`playlist-panel ${
          isOpen ? "playlist-panel-open" : ""
        }`}
      >

        <div className="playlist-header">

          <div>
            <p className="playlist-label">
              CHHATH PUJA
            </p>

            <h2>
              Songs
            </h2>
          </div>

          <button
            className="playlist-close"
            onClick={onToggle}
            aria-label="Close playlist"
          >
            ×
          </button>

        </div>


        <div className="playlist-count">
          {songs.length} songs
        </div>


        <div className="playlist-song-list">

          {songs.map((song, index) => {

            const isCurrent =
              index === currentSongIndex;

            return (
              <button
                key={song.id}
                className={`playlist-song ${
                  isCurrent
                    ? "playlist-song-active"
                    : ""
                }`}
                onClick={() => onSongSelect(index)}
              >

                <div className="playlist-number">

                  {isCurrent ? (
                    <span className="playing-bars">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    String(index + 1).padStart(2, "0")
                  )}

                </div>


                <div className="playlist-song-art">
                  ☀
                </div>


                <div className="playlist-song-info">

                  <span className="playlist-song-title">
                    {song.title}
                  </span>

                  <span className="playlist-song-artist">
                    {song.artist}
                  </span>

                </div>


                <div className="playlist-song-duration">
                    <span>{song.duration ?? "--:--"}</span>
                    <span className="playlist-song-arrow"></span>
                </div>

              </button>
            );

          })}

        </div>

      </aside>


      {/* Background overlay */}

      {isOpen && (
        <button
          className="playlist-backdrop"
          onClick={onToggle}
          aria-label="Close playlist"
        />
      )}

    </>
  );
}

export default Playlist;