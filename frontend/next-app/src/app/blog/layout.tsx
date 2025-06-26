

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-row min-h-0">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
