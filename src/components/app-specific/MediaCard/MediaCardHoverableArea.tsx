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
};

export const MediaCardHoverableArea = ({
  className = '',
  children,
}: MediaCardHoverableAreaProps) => {
  const { setShowPlayBtn } = useMediaCard();

  return (
    <div
      data-testid="media-card-hoverable-area"
      className={cn('rounded-lg', 'group relative grid h-full w-full', className)}
      onMouseEnter={() => setShowPlayBtn(true)}
      onMouseLeave={() => setShowPlayBtn(false)}
    >
      {children}

      {/*  TODO: add back when implementing play trailer functionality */}
      {/* <MediaCardHoverableAreaOverlay /> */}
    </div>
  );
};
