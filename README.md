# Next - Spring Blog project

Next.js와 SpringBoot, postgres를 이용한 블로그 프로젝트입니다.

전체 스택
Frontend: Next.js (React, TypeScript)
Backend: Spring Boot (Java)
Database: PostgreSQL
패키지 관리자: npm / Maven
기타: REST API, JPA 등

## 주요 기술
- 팁탭 에디터 라이브러리를 이용한 WISYWIG 게시글 에디터 제작
- SSR 처리와 유지보수를 위한 BFF 아키텍쳐
- Auth.js 라이브러리를 이용한 SSR 환경에서 JWT 세션 개체 유지
- UI 컴포넌트 재사용성을 높이기 위한 shadcn/ui 사용
- nginx 리버스 프록시를 이용한 HTTPS (let's encrypt 이용) 처리
- nginx 이미지 정적 서빙 및 캐싱
- Spring Aop를 이용한 로깅 등 공통 로직 처리
- GlobalExceptionHanler 전역 예외처리를 이용한 API Spec(HTTP Method, Status Code)을 만족하는 API 개발
- Docker, Docker compose를 이용한 CD
- 스트레스 테스트, 서버 유지비 감소를 위한 온프레미스서버 세팅 및 구축


## 0. 공통 요구사항
Node.js (v18 이상 추천)

Java 17 이상 (Spring용)

PostgreSQL 14 이상



## 1. 환경변수 세팅
```
#.env -> backend 폴더 안에 넣어주면 됨
DB_URL=jdbc:postgresql://{DB 정보}
DB_USERNAME={DB 정보}
DB_PASSWORD={DB 정보}
JWT_SECRET={Jwt 토큰 암호화를 위한 비밀 키}
```


## 2. 개발환경 세팅 

### 2.1. Frontend
```
cd frontend/NEXT-APP  # 폴더명 
npm install
npm run dev  # http://localhost:3000
```

### 2.2 Backend 
```
cd backend
mvn clean install
mvn spring-boot:run  
#인텔리제이나 이클립스로 세팅 권장 I recommend using IntelliJ IDEA or Eclipse
```

### 2.3 Database
- PostgresSQL 설치

```
#application.properties
spring.jpa.hibernate.ddl-auto=update
```

### 2.4 nginx
```
mkcert로 localhost 인증서 추가: nginx > certs 폴더
nginx 실행
```




## 배포 방법 
### 1. 이미지 빌드 및 준비
```
docker compose build
```

### 1.1 이름 및 태그 확인
```
docker images
```

### 2. ssh로 서버 접속 후 이미지 로드
```
ssh server@192.168.0.20 
```

### 3. 도커로 배포하기 
#### 개발에서 레지스트리로 push
```
docker compose push
```
: push 전에 레지스트리 컨테이너 켤 것.

#### 배포에서 레지스트리 pull
```
docker compose pull
```
: 컴포즈 파일에서 레지스트리 경로를 지정해둘 것. 

#### 리눅스에서 도커 컴포즈 실행
```
docker compose up -d
```
:데몬으로 실행

#### 배포된 url
next-spring-blog.duckdns.org

#### 호스트에서 certbot으로 인증서 발급
```
sudo certbot certonly --standalone -d next-spring-blog.duckdns.org -d next-spring-blog.duckdns.org
```
