// This is the interface of the Media we want our application components
// to use regardless of what API endpoint we use. The fields here shouldn't
// necessarily be 1:1 with the API we use
export interface Media {
  id: number;
  image_path: string;
  title: string;
  media_type: string;
  release_date: string;
  certification: string;
}
