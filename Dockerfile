FROM java:openjdk-8-jre-alpine

COPY . /opt/app
WORKDIR /opt/app/FeedService

EXPOSE 8080

CMD ["java", "-jar", "./target/feedservice-0.0.1-SNAPSHOT.war"]


