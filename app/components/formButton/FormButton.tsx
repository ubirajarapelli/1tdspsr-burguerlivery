interface FormButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export const FormButton = ({ children, onClick }: FormButtonProps) => {
  return (
    <button
      type="button"
      className="w-full py-2 px-6 rounded-lg bg-amber-300 text-amber-600 text-center font-semibold border border-amber-400 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
