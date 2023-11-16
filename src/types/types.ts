export type IAnime = {
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
  last_visible_page: number;
};

export type IAnimeData = {
  data: IAnime[];
  pagination: Pagination;
};

export type IAnimeDataDetails = {
  data: IAnime;
  pagination: Pagination;
};
