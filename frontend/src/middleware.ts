// middelware.ts
// middleware.ts는 next.js에서 자동으로 탐지됨.
// 위치는 app이 있는 경우 src/ 에 위치할 것. * 다른 곳은 인식 안됨.
// 미들웨어에서는 요청가로채기& 리다이렉션만 처리할 것.

export { auth as middleware } from "@/auth"

