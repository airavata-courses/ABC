pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'cd ./APIGateway && mvn -B -DskipTests clean package'
			}
		}	
		stage('Deploy'){
			steps{
				build 'deploy-api-gateway'
			}
		}
	}
}
