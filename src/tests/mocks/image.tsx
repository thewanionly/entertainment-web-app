import { ImageProps } from 'next/image';

export const MockedImage = ({ src, alt }: ImageProps) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src as string} alt={alt} />;
};
