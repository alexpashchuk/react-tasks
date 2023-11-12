import { BASE_URL } from '~constants/constants.ts';
import { AnimeData, AnimeDataDetails } from '~types/types.ts';

const fetchData = async (pageQuery: string, searchQuery: string, perPageQuery: string, initialPageSize: boolean) => {
  const url = `${BASE_URL}?page=${pageQuery}&q=${searchQuery.trim().toLowerCase()}&limit=${
    initialPageSize ? perPageQuery : '20'
  }`;
  const response = await fetch(url);
  const data: AnimeData = await response.json();
  return data;
};
const fetchDataId = async (id: string) => {
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url);
  const data: AnimeDataDetails = await response.json();
  return data;
};

export { fetchData, fetchDataId };
