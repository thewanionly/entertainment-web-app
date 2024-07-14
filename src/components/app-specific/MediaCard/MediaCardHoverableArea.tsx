'use client';

import { ReactNode } from 'react';

import { cn } from '@/utils/styles';

import { useMediaCard } from './MediaCard.context';

// TODO: add back when implementing play trailer functionality
// const MediaCardHoverableAreaOverlay = () => {
//   const { hoverCard, isHoverable } = useMediaCard();
//   const isInClient = useIsInClient();

//   if (!isInClient) return null;

//   return (
//     isHoverable && (
//       <div
//         className={cn(
//           'col-start-1 row-start-1',
//           'z-10',
//           'h-full w-full rounded-lg bg-black/50',
//           'opacity-0 motion-safe:transition-opacity',
//           '[@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:peer-hover:opacity-0',
//           hoverCard && 'opacity-100'
//         )}
//       />
//     )
//   );
// };

type MediaCardHoverableAreaProps = {
  className?: string;
  children: ReactNode;
  title?: string;
  onClick?: () => void;
};

export const MediaCardHoverableArea = ({
  className = '',
  children,
  title,
  onClick,
}: MediaCardHoverableAreaProps) => {
  const { setShowPlayBtn } = useMediaCard();

  return (
    <div
      title={title}
      data-testid="media-card-hoverable-area"
      className={cn('group relative grid h-full w-full rounded-lg', className)}
      onMouseEnter={() => setShowPlayBtn(true)}
      onMouseLeave={() => setShowPlayBtn(false)}
      onClick={onClick}
    >
      {children}

      {/*  TODO: add back when implementing play trailer functionality */}
      {/* <MediaCardHoverableAreaOverlay /> */}
    </div>
  );
};
