import { Media } from '@/types/medias';

interface MediasEndpointResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
const options: RequestInit = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEDIAS_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMedias = async (): Promise<Media[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MEDIAS_BASE_ENDPOINT}/trending/all/day`,
      options
    );

    if (!response.ok) {
      throw new Error('Failed to fetch trending medias data');
    }

    const data = (await response.json()) as MediasEndpointResponse<Media>;

    return data.results.filter(({ media_type }) => media_type !== 'person');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
