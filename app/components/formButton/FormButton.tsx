interface FormButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const FormButton = ({ children, onClick }: FormButtonProps) => {
  return (
    <button
      type="button"
      className="w-full py-2 px-6 rounded-lg bg-amber-300 text-amber-600 text-center font-semibold border border-amber-400 cursor-pointer hover:bg-amber-400 hover:text-white hover:border-amber-500 transition-colors duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
