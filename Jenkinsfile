pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'cd ./FeedService && mvn -B -DskipTests clean package'
			}
		}	
		stage('Test'){
			steps{
				sh 'cd ./FeedService && mvn test'
			}
		}
		stage('Deploy'){
			steps{
				build 'deploy-feed-service'
			}
		}
	}
}
