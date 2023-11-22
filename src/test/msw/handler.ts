import { HttpResponse, http } from 'msw';

import { animeCardData, paginationData } from '@/test/animeCardData';
import { BASE_URL } from '@/constants/constants';

export const handlers = [
  http.get(`${BASE_URL}/1`, () => {
    return HttpResponse.json({ data: animeCardData[0] });
  }),

  http.get(`${BASE_URL}`, () => {
    return HttpResponse.json({
      data: animeCardData,
      pagination: paginationData,
    });
  }),
];
