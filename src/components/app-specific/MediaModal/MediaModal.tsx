'use client';

import { X } from 'lucide-react';

import { IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/generic/Dialog';
import { useMediaModalStore } from '@/stores/mediaModal';
import { cn } from '@/utils/styles';

import { MediaCardImage } from '../MediaCard/MediaCardImage';

export const MediaModal = () => {
  const media = useMediaModalStore((state) => state.media);
  const setMedia = useMediaModalStore((state) => state.setMedia);

  const { title = '', imagePath = '' } = media ?? {};

  const closeModal = () => {
    setMedia(undefined);
  };

  return (
    <Dialog open={Boolean(media?.id)}>
      <DialogContent
        className={cn(
          'bottom-0 top-[5rem] h-dvh w-[96%] max-w-[1312px] translate-y-0 rounded-lg p-0 lg:top-[7rem] lg:w-[83%] lg:translate-x-[-45%]'
        )}
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        onInteractOutside={closeModal}
      >
        <DialogHeader className="space-y-0">
          <DialogClose asChild>
            <IconButton
              className={cn(
                'absolute right-2 top-2 z-50 sm:right-4 sm:top-4',
                'h-8 w-8 rounded-full bg-dark-blue/70 p-1 text-white ring-offset-white hover:bg-dark-blue/70 hover:text-red motion-safe:transition-all sm:h-10 sm:w-10',
                'disabled:pointer-events-none',
                'focus:ring-slate-950 focus:outline-none focus:ring-2 focus:ring-offset-2 data-[state=open]:bg-dark-blue data-[state=open]:text-white/80'
              )}
              onClick={closeModal}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
              <IconButtonSrLabel label="Next slide" />
            </IconButton>
          </DialogClose>
          <MediaCardImage
            className={cn(
              'aspect-[2] h-[unset] w-full',
              'rounded-b-none rounded-t-lg ',
              'after:absolute after:bottom-0 after:left-0 after:h-[25%] after:w-full after:bg-gradient-to-b after:from-dark-blue/0 after:to-dark-blue/100'
            )}
            src={imagePath}
            alt={title}
          />
        </DialogHeader>
        <DialogTitle className="text-heading-m">{title}</DialogTitle>
        <div className="overflow-auto">
          <DialogDescription></DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};
