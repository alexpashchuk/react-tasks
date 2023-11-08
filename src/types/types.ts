export type Anime = {
  rank: number;
  studios: [{ name: string }];
  year: number;
  mal_id: number;
  type: string;
  score: number;
  title: string;
  source: string;
  season: string;
  rating: string;
  duration: string;
  airing: boolean;
  images: {
    jpg: { large_image_url: string };
    webp: { large_image_url: string };
  };
  trailer: { embed_url: string };
  synopsis: string;
  episodes: number;
  status: string;
};
