import { MediaCardType, MediaVideo } from './medias';

export interface MovieDetails extends MediaCardType {
  video?: MediaVideo;
}
