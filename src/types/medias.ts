// This is the interface of the Media we want our application components
// to use regardless of what API endpoint we use. The fields here shouldn't
// necessarily be 1:1 with the API we use
export interface Media {
  id: number;
  imagePath: string;
  title: string;
  mediaType: string;
  releaseDate: string;
  certification: string;
}
