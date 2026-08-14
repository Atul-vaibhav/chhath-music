export interface PlaylistLink {
  name: string;
  url: string;
  available: boolean;
}

export const playlistLinks: PlaylistLink[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/playlist/7hTi3NqV3fNEGtkKsiwtJ0?si=6c016dc1f44c4630",
    available: true,
  },
  {
    name: "YouTube Music",
    url: "",
    available: false,
  },
];