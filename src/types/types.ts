export type IAnime = {
  mal_id: number;
  rank: number;
  year: number;
  score: number;
  title: string;
  source: string;
  season: string;
  rating: string;
  duration: string;
  airing: boolean;
  images: {
    webp: { image_url: string };
  };
  episodes: number;
  status: string;
};

type Pagination = {
  last_visible_page: number;
};

export type IAnimeData = {
  data: IAnime[];
  pagination: Pagination;
};

export type IAnimeDataDetails = {
  data: IAnime;
};

export type IAnimeListApi = {
  pageQuery: string;
  searchQuery: string;
  perPageQuery: string;
};

export interface IData {
  animeList?: IAnimeData;
  animeDetails?: IAnimeDataDetails;
}
