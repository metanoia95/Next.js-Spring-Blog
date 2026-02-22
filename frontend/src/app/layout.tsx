
import "./globals.css";
import StoreProvider from "./StoreProvider";
export const revalidate = 0; // 캐시하지 않음
export const dynamic = "force-dynamic";
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <SessionProvider >
            <StoreProvider>
              <header>
                <Header />
              </header>
              <main>
                <div className="max-w-7xl min-w-[320px] mx-auto">{children}</div>
              </main>
              <Footer />
            </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
