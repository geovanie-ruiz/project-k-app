export default function BreadcrumbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="mx-auto w-full max-w-screen-xl px-4">{children}</div>
      </div>
    </div>
  );
}
