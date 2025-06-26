import NavBar from "@/components/navbar/Navbar";
import "./globals.css";
import StoreProvider from "./StoreProvider";
//import { refreshAccessToken } from "@/lib/services/authService";

export const revalidate = 0; // 캐시하지 않음
export const dynamic = 'force-dynamic';


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body>
        <StoreProvider>
        <header>
          <NavBar />
        </header>

        <main>
          <div className="max-w-4xl min-w-[320px] mx-auto">
            {children}
          </div>
        </main>
        <footer className="text-center text-sm text-gray-500 py-4">
            footer
        </footer>
        </StoreProvider>
      </body>

    </html>
  );
}
