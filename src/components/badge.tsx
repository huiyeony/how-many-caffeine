export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <span className="bg-[#FFEAE1] text-[#FF2E00] rounded-md py-1 px-2 ">
        {children}
      </span>
    </div>
  );
}
