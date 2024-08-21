'use client';

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/generic/AlertDialog';
import { useAlertDialogStore } from '@/stores/alertDialog';

export const BookmarkRemovalAlertDialog = () => {
  const showAlertDialog = useAlertDialogStore((state) => state.showAlertDialog);
  const setShowAlertDialog = useAlertDialogStore((state) => state.setShowAlertDialog);
  const action = useAlertDialogStore((state) => state.action);

  const hideAlertDialog = () => {
    setShowAlertDialog(false);
  };

  return (
    <AlertDialog
      open={showAlertDialog}
      onOpenChange={(open: boolean) => !open && hideAlertDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove this item from your bookmark list?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the current media from the bookmark list. To add this back, you would
            have to find it in the home or media pages and bookmark it again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
