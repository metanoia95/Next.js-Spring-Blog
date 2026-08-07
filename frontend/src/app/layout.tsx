import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
export const revalidate = 0; // 캐시하지 않음
//export const dynamic = "force-dynamic"; // 모든 페이지를 동적 페이지로 설정
import Header from "@/components/header/Header";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer/Footer";


export const metadata: Metadata = {

  metadataBase: new URL("https://next-spring-blog.duckdns.org"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "metanoia95의 기술 블로그",
    template: "%s | metanoia95의 기술 블로그",
  },
  description: "개발 경험과 기술 내용을 기록하는 블로그입니다.",
  keywords: [
    "개발",
    "React",
    "Next.js",
    "프론트엔드",
    "백엔드",
    "웹 개발",
    "프로그래밍",
    "기술 블로그",
    "데이터 베이스",
  ],
  openGraph: {
    title: "metanoia95의 기술 블로그",
    description: "개발 경험과 기술 내용을 기록하는 블로그입니다.",
    url: "https://next-spring-blog.duckdns.org",
    type: "website",
    locale: "ko_KR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="ko">
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

