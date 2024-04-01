import { Icon } from '@/components/Icon';

type ButtonProps = { label?: string };

export const Button = ({ label }: ButtonProps) => {
  return (
    <button type="button" className="bg-slate-500 px-4 py-2 text-gray-200">
      <Icon />
      {label}
    </button>
  );
};
