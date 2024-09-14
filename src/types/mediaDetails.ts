import { MediaCardType, MediaVideo } from './medias';

export interface MediaDetails extends MediaCardType {
  video?: MediaVideo;
}
