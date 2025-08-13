# 1단계 : 빌드
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package


# 2단계 : 실행
#image 선택
FROM eclipse-temurin:21-jre-jammy
#FROM openjdk:21-jdk-slim : JSP를 사용하면 이 이미지로 변경

# 작업 디렉토리 설정
WORKDIR /app

#jar 파일 복사
COPY --from=builder /build/target/Springtemplate-0.0.1-SNAPSHOT.jar app.jar

#애플리케이션 실행 명령
ENTRYPOINT [ "java", "-jar", "app.jar" ]