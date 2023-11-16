import { BASE_URL } from '~constants/constants.ts';
import { IAnimeData, IAnimeDataDetails } from '~types/types.ts';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data: IAnimeData = await response.json();
  return data;
};
const fetchDataId = async (id: string) => {
  const url = `${BASE_URL}/${id}`;
  const response = await fetch(url);
  const data: IAnimeDataDetails = await response.json();
  return data;
};

export { fetchData, fetchDataId };
