pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'cd ./APIGateway && mvn -B -DskipTests clean package'
				sh 'cd ./APIGateway docker build -t chetan253/api-gateway .'
				sh 'docker push chetan253/api-gateway:latest'
			}
		}	
		stage('Deploy'){
			steps{
				build 'deploy-api-gateway'
			}
		}
	}
}
