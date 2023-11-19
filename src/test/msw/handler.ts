import { HttpResponse, http } from 'msw';

import { BASE_URL } from '~constants/constants.ts';
import { animeCardData, paginationData } from '~test/animeCardData.tsx';

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
