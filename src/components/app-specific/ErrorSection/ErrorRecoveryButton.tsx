import { Button } from '@/components/generic/Button';

type ErrorRecoveryButtonProps = {
  handleRecover: () => void;
};

export const ErrorRecoveryButton = ({ handleRecover }: ErrorRecoveryButtonProps) => {
  return (
    <Button className="mt-6" onClick={handleRecover}>
      Try again
    </Button>
  );
};
