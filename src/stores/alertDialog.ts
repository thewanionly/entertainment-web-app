import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AlertDialogDetails {
  title: string;
  description?: string;
}

interface AlertDialogState {
  showAlertDialog: boolean;
  setShowAlertDialog: (showAlertDialog?: boolean) => void;
  details: AlertDialogDetails;
  setDetails: (details: AlertDialogDetails) => void;
  triggerId?: string;
  setTriggerId: (triggerId: string) => void;
  action?: () => void;
  setAction: (fn: () => void) => void;
}

export const useAlertDialogStore = create<AlertDialogState>()(
  devtools((set) => ({
    showAlertDialog: false,
    setShowAlertDialog: (showAlertDialog) => set(() => ({ showAlertDialog })),
    details: { title: '' },
    setDetails: (details: AlertDialogDetails) => set(() => ({ details })),
    setTriggerId: (triggerId) => set(() => ({ triggerId })),
    setAction: (action) => set(() => ({ action })),
  }))
);
