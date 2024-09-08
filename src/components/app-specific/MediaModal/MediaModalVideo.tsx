import { cn } from '@/utils/styles';

export const MediaModalVideo = ({
  videoSrc,
  videoName,
}: {
  videoSrc: string;
  videoName: string;
}) => (
  <div
    className={cn(
      'aspect-[2] w-full',
      'rounded-b-none rounded-t-md',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-[25%] after:w-full after:bg-gradient-to-b after:from-dark-blue/0 after:to-dark-blue/100'
    )}
  >
    <iframe
      className="h-full w-full"
      src={`${videoSrc}?autoplay=1`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={videoName}
    />
  </div>
);
