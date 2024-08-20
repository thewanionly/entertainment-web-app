import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AlertDialogState {
  showAlertDialog: boolean;
  setShowAlertDialog: (showAlertDialog?: boolean) => void;
  title: string;
  message?: string;
  triggerId?: string;
  setTriggerId: (triggerId: string) => void;
  action?: () => void;
  setAction: (fn: () => void) => void;
}

export const useAlertDialogStore = create<AlertDialogState>()(
  devtools((set) => ({
    showAlertDialog: false,
    setShowAlertDialog: (showAlertDialog) => set(() => ({ showAlertDialog })),
    title: '',
    message: '',
    setTriggerId: (triggerId) => set(() => ({ triggerId })),
    setAction: (action) => set(() => ({ action })),
  }))
);
