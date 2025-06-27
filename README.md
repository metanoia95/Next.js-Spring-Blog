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







