type ButtonProps = { label?: string };

export const Button = ({ label }: ButtonProps) => {
  return (
    <button type="button" className="bg-greyish-blue px-4 py-2 text-white">
      {label}
    </button>
  );
};
