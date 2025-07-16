export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <span className="bg-[#FFEAE1] text-[#FF2E00] rounded-md p-1 pl-0">
        {children}
      </span>
    </div>
  );
}
