import { X } from 'lucide-react';

import { IconButton, IconButtonSrLabel } from '@/components/generic/Button';
import { cn } from '@/utils/styles';

const CLOSE_BUTTON_LABEL = 'Close modal';

export const MediaModalCloseButton = ({ closeModal }: { closeModal: () => void }) => (
  <IconButton
    className={cn(
      'absolute right-2 top-2 z-50 sm:right-4 sm:top-4',
      'h-8 w-8 rounded-full bg-dark-blue/70 p-1 text-white ring-offset-white hover:bg-dark-blue/70 hover:text-red motion-safe:transition-all sm:h-10 sm:w-10',
      'disabled:pointer-events-none',
      'focus-visible:ring-white-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=open]:bg-dark-blue data-[state=open]:text-white/80'
    )}
    onClick={closeModal}
    title={CLOSE_BUTTON_LABEL}
  >
    <X className="h-5 w-5 sm:h-6 sm:w-6" />
    <IconButtonSrLabel label={CLOSE_BUTTON_LABEL} />
  </IconButton>
);
