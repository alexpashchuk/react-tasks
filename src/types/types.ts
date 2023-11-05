export type Character = {
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
  images: {
    jpg: { large_image_url: string };
    webp: { large_image_url: string };
  };
  trailer: { embed_url: string };
  synopsis: string;
  episodes: number;
  demographics: animeDemographics[];
  status: string;
  genres: genres[];
};

type animeDemographics = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type genres = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};
