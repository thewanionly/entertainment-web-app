'use client';

import { Dialog, DialogContent, DialogClose } from '@/components/generic/Dialog';
import { Drawer, DrawerContent, DrawerClose } from '@/components/generic/Drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useMediaModalStore } from '@/stores/mediaModal';
import { cn } from '@/utils/styles';

import { MediaModalCloseButton } from './MediaModalCloseButton';
import { MediaModalContent } from './MediaModalContent';

export const MediaModal = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const media = useMediaModalStore((state) => state.media);
  const openModal = useMediaModalStore((state) => state.openModal);
  const setOpenModal = useMediaModalStore((state) => state.setOpenModal);

  if (!media) return null;

  const closeModal = () => {
    setOpenModal(false);
  };

  if (!sm) {
    // show drower in mobile
    return (
      <Drawer open={openModal} onOpenChange={(open: boolean) => !open && closeModal()}>
        <DrawerContent>
          <DrawerClose asChild>
            <MediaModalCloseButton closeModal={closeModal} />
          </DrawerClose>
          <MediaModalContent data={media} />
        </DrawerContent>
      </Drawer>
    );
  }

  // show dialog in desktop
  return (
    <Dialog open={openModal} onOpenChange={(open: boolean) => !open && closeModal()}>
      <DialogContent
        className={cn(
          'bottom-0 top-[unset] mt-5 flex aspect-[0.9] h-[min-content] max-h-dvh max-w-[unset] translate-y-0 flex-col gap-0 rounded-t-md p-0 sm:top-[50%] sm:w-[90%] sm:max-w-[50rem] sm:translate-y-[-50%] sm:rounded-md'
        )}
      >
        <DialogClose asChild>
          <MediaModalCloseButton closeModal={closeModal} />
        </DialogClose>
        <MediaModalContent data={media} isMobile />
      </DialogContent>
    </Dialog>
  );
};
