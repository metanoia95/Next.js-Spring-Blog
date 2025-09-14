import type { NextConfig } from "next";

const nextConfig:
  NextConfig = {
  output: "standalone", // .next 디렉토리 생성. 노드 모듈 중에 필요한 것만 집어넣음. 도커 세팅에서 필요
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 무시
  },
};

export default nextConfig;
