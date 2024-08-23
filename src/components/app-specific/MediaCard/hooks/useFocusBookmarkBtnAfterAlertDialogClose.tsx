import { useRef, useEffect } from 'react';

import { useAlertDialogStore } from '@/stores/alertDialog';

export const useFocusBookmarkBtnAfterAlertDialogClose = (bookmarkId: string) => {
  const bookmarkBtnRef = useRef<HTMLButtonElement>(null);

  const triggerId = useAlertDialogStore((state) => state.triggerId);
  const showAlertDialog = useAlertDialogStore((state) => state.showAlertDialog);

  useEffect(() => {
    if (!showAlertDialog && bookmarkBtnRef.current && triggerId === bookmarkId) {
      bookmarkBtnRef.current.focus();
    }
  }, [bookmarkId, showAlertDialog, triggerId]);

  return {
    bookmarkBtnRef,
  };
};
