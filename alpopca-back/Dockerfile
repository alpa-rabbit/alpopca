# Build stage
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# 의존성 캐싱 레이어 - 소스 변경 시에도 재다운로드 방지
COPY gradle/ gradle/
COPY gradlew build.gradle settings.gradle ./
RUN ./gradlew dependencies --no-daemon

# 소스 복사 후 빌드
COPY src/ src/
RUN ./gradlew bootJar --no-daemon

# Runtime stage
FROM eclipse-temurin:17-jre

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
