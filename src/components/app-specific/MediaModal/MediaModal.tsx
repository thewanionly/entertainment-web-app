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

export const MediaModal = () => {
  const mediaId = useMediaModalStore((state) => state.mediaId);
  const setMediaId = useMediaModalStore((state) => state.setMediaId);

  const closeModal = () => setMediaId('');

  return (
    <Dialog open={Boolean(mediaId)}>
      <DialogContent
        className={cn(
          'bottom-0 top-[5rem] h-dvh w-[96%] max-w-[1312px] translate-y-0 rounded-lg lg:top-[7rem] lg:w-[83%] lg:translate-x-[-45%]'
        )}
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
        onEscapeKeyDown={closeModal}
        onPointerDownOutside={closeModal}
        onInteractOutside={closeModal}
      >
        <DialogHeader>
          <DialogClose asChild>
            <IconButton
              className={cn(
                'absolute right-4 top-4',
                'h-8 w-8 rounded-sm p-1 opacity-70 ring-offset-white transition-opacity hover:bg-transparent',
                'disabled:pointer-events-none',
                'focus:ring-slate-950 focus:outline-none focus:ring-2 focus:ring-offset-2 data-[state=open]:bg-dark-blue data-[state=open]:text-white/80'
              )}
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
              <IconButtonSrLabel label="Next slide" />
            </IconButton>
          </DialogClose>
          <DialogTitle>{mediaId}</DialogTitle>
        </DialogHeader>

        <div className="overflow-auto">
          <DialogDescription></DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};
