import { Header } from "@/components/header/Header.server";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import QueryProvider from "@/lib/react-query/QueryProvider";
export const revalidate = 0; // 캐시하지 않음
export const dynamic = "force-dynamic";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { QueryClient } from "@tanstack/react-query";
import { getCurrentUserSSR } from "@/lib/services/auth/auth.server";


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
        <QueryProvider>
          <StoreProvider>
            <header>
              <Header />
            </header>
            <main>
              <div className="max-w-7xl min-w-[320px] mx-auto">{children}</div>
            </main>
            <footer className="flex flex-col text-center text-sm text-gray-500 justify-center">
              <div className="flex flex-row justify-center gap-2.5">
                <a
                  href="https://github.com/metanoia95/Next.js-Spring-Blog"
                  target="_blank" //링크를 새 탭에서 열게하기
                  rel="noopener noreferrer" // 보안처리
                  className="flex items-center justify-center text-gray-400 hover:underline mb-4"
                >
                  <FaGithub size={32} strokeWidth={1} />
                </a>
                <a href="mailto:longje@naver.com">
                  <IoMdMail size={32} strokeWidth={1} />
                </a>
              </div>

              <span>© 2025 Metanoia95. All rights reserved.</span>
            </footer>
          </StoreProvider>
        </QueryProvider>

      </body>
    </html>
  );
}
