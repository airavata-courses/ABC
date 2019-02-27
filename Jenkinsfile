pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'npm install'
			}
		}
		stage('Test'){
			steps{
				sh 'npm test'
			}
		}
		stage('Deploy'){
			steps{
				build 'deploy-usrmgmt-service'
			}
		}
	}
}
