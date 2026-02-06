
import "./globals.css";
import StoreProvider from "./StoreProvider";
import QueryProvider from "@/lib/react-query/QueryProvider";
export const revalidate = 0; // 캐시하지 않음
export const dynamic = "force-dynamic";
import { QueryClient } from "@tanstack/react-query";
import { getCurrentUserSSR } from "@/services/auth/auth.server";
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer/Footer";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const user = await getCurrentUserSSR();
  queryClient.setQueryData(['currentUser'], user); // 서버사이드에서 미리 데이터 페칭


  return (
    <html lang="en">
      <body>
        <SessionProvider >
          <QueryProvider>
            <StoreProvider>
              <header>
                <Header />
              </header>
              <main>
                <div className="max-w-7xl min-w-[320px] mx-auto">{children}</div>
              </main>
              <Footer />
            </StoreProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
