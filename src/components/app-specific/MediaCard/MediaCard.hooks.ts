import { useRef, useEffect } from 'react';

import { useMediaModalStore } from '@/stores/mediaModal';

export const useFocusCardAfterModalClose = (cardId: string) => {
  const modalTriggerRef = useRef<HTMLButtonElement>(null);

  const modalTriggerId = useMediaModalStore((state) => state.modalTriggerId);
  const openModal = useMediaModalStore((state) => state.openModal);

  useEffect(() => {
    if (!openModal && modalTriggerRef.current && modalTriggerId === cardId) {
      modalTriggerRef.current.focus();
    }
  }, [cardId, openModal, modalTriggerId]);

  return {
    modalTriggerRef,
  };
};
