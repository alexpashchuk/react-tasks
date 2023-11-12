export type Anime = {
  rank: number;
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

type Pagination = {
  items: {
    count: number;
    per_page: number;
    total: number;
  };
};

export type AnimeData = {
  data: Anime[];
  pagination: Pagination;
};

export type AnimeDataDetails = {
  data: Anime;
  pagination: Pagination;
  error?: null;
  message?: string | null;
  status?: number | string;
  type?: string;
};
