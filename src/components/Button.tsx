export default function Button({
  children,
}: //   content,
{
  children: React.ReactNode;
}) {
  return (
    <div className="px-3 py-1 text-sm bold rounded-[120px] hover:bg-gray-100 ">
      <p className="m-0">{children}</p>
    </div>
  );
}
