import { playlistLinks } from "../config/playlists";

import "./PlaylistLinks.css";

function PlaylistLinks() {
  return (
    <div className="playlist-links">

      {playlistLinks.map((playlist) => {

        if (!playlist.available) {
          return (
            <div
              key={playlist.name}
              className="playlist-link playlist-link-disabled"
              title={`${playlist.name} playlist coming soon`}
            >
              <span
                className={`playlist-icon ${
                  playlist.name === "Spotify"
                    ? "spotify"
                    : "youtube"
                }`}
              >
                {playlist.name === "Spotify" ? "●" : "▶"}
              </span>

              <span className="playlist-link-content">

                <small>
                  Coming soon
                </small>

                {playlist.name}

              </span>
            </div>
          );
        }

        return (
          <a
            key={playlist.name}
            href={playlist.url}
            className="playlist-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${playlist.name} playlist`}
          >
            <span
              className={`playlist-icon ${
                playlist.name === "Spotify"
                  ? "spotify"
                  : "youtube"
              }`}
            >
              {playlist.name === "Spotify" ? "●" : "▶"}
            </span>

            <span className="playlist-link-content">

              <small>
                Listen on
              </small>

              {playlist.name}

            </span>

            <span className="external-arrow">
              ↗
            </span>

          </a>
        );
      })}

    </div>
  );
}

export default PlaylistLinks;