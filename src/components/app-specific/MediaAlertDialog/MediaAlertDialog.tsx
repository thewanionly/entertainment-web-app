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

export const MediaAlertDialog = () => {
  const { title, description } = useAlertDialogStore((state) => state.details);
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
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
