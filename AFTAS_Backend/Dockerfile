# Build Stage
FROM maven:3.9-amazoncorretto-17 AS build
WORKDIR /app

# Copy only the POM file to take advantage of Docker caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application and build
COPY src src
RUN mvn clean install

# Final Stage
FROM eclipse-temurin:17-jdk-focal
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar AFTAS.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "/app/AFTAS.jar"]