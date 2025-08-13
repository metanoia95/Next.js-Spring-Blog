# Next - Spring Blog project

Next.js와 SpringBoot, postgres를 이용한 블로그 프로젝트입니다.

전체 스택
Frontend: Next.js (React, TypeScript)
Backend: Spring Boot (Java)
Database: PostgreSQL
패키지 관리자: npm / Maven
기타: REST API, JPA 등

## 주요 기술
- lexical에디터(위지윅) Next.js 적용 예제
- middleware, Spring Security를 활용한 액세스 토큰과 리프레시 토큰 관리


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



## 배포 방법 
# 1. 이미지 빌드 및 준비
docker compose build

# 1.1 이름 및 태그 확인
docker images

# 2. tar 생성
docker save -o blog-full.tar {이미지 나열}

# 3. server로 도커 이미지 올려서 배포하기
# 도커 이미지 파일 서버로 보내기 
scp blog-full.tar server@192.168.0.20:/home/server/

# 4. ssh로 서버 접속 후 이미지 로드
ssh server@192.168.0.20 
docker load -i blog-full.tar 
# -i : --input의 약자. 도커 이미지 파일을 불러와서 로컬에 등록

# 리눅스에서 도커 컴포즈 실행
docker compose -f docker-compose.prod.yml up -d

# 배포에서 레지스트리 땡기기
docker pull 192.168.0.4:5000/blog-backend
docker pull 192.168.0.4:5000/blog-backend
docker pull 192.168.0.4:5000/blog-nginx

# 배포된 url
next-spring-blog.duckdns.org

# 호스트에서 certbot으로 인증서 발급
sudo certbot certonly --standalone -d next-spring-blog.duckdns.org -d next-spring-blog.duckdns.org