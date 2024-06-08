import { Media, MediaType } from '@/types/medias';

export const TRENDING_SECTION_HEADING = 'Trending';

export const mockedTrendingData: Media[] = [
  {
    id: 1,
    imagePath: '/the-first-omen.jpg',
    title: 'The First Omen',
    mediaType: MediaType.MOVIE,
    releaseDate: '2024-04-03',
    certification: '',
  },
  {
    id: 2,
    imagePath: '/atlas.jpg',
    title: 'Atlas',
    mediaType: MediaType.MOVIE,
    releaseDate: '2024-05-23',
    certification: '',
  },
  {
    id: 3,
    imagePath: '/tarot.jpg',
    title: 'Tarot',
    mediaType: MediaType.MOVIE,
    releaseDate: '2024-05-01',
    certification: '',
  },
  {
    id: 4,
    imagePath: '/civil-war.jpg',
    title: 'Civil War',
    mediaType: MediaType.MOVIE,
    releaseDate: '2024-04-10',
    certification: '',
  },
  {
    id: 5,
    imagePath: '/joy-of-life.jpg',
    title: 'Joy of Life',
    mediaType: MediaType.TV,
    releaseDate: '2019-11-26',
    certification: '',
  },
];
