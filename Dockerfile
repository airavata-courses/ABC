FROM java:openjdk-8-jre-alpine

COPY . /opt/app
WORKDIR /opt/app/APIGateway

EXPOSE 8081

CMD ["java", "-jar", "./target/apigateway-0.0.1-SNAPSHOT.war"]

