export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  artwork?: string;
  duration?: string;
}

export const songs: Song[] = [
  {
    id: 1,
    title: "Chhath Ke Geet",
    artist: "Chhath Puja • Bihar",
    src: "/audio/song-1.mp3",
    artwork: "/images/chhath-art-1.jpg",
    duration: "4:37",
  },

  {
    id: 2,
    title: "Uga Ho Suraj Dev",
    artist: "Chhath Puja • Bihar",
    src: "/audio/song-2.mp3",
    artwork: "/images/chhath-art-2.jpg",
    duration: "3:02",
  },

  {
    id: 3,
    title: "Kaanch Hi Baans Ke Bahangiya",
    artist: "Chhath Puja • Bihar",
    src: "/audio/song-3.mp3",
    artwork: "/images/chhath-art-3.jpg",
    duration: "3:00",
  },
];