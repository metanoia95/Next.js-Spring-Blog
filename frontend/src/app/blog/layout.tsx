

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="min-h-[80vh] flex flex-col flex-1 p-6">{children}</div>
  );
}
