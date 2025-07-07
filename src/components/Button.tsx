type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
};
export default function Button({ children, onClick, isActive }: ButtonProps) {
  return (
    <div
      className={`p-2 mr-2 text-sm bold rounded-xl whitespace-nowrap cursor-pointer ${
        isActive ? "text-sky-500 font-bold underline underline-offset-4" : ""
      }`}
      onClick={onClick}
    >
      <span>{children}</span>
    </div>
  );
}
