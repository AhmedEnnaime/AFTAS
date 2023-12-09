# Build Stage
FROM maven:3.9.5-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy only the POM file to take advantage of Docker caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application and build
COPY src src
RUN mvn clean install

# Final Stage
FROM openjdk:17-jdk-alpine
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar AFTAS.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "/app/AFTAS.jar"]