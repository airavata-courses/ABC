pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'cd ./EmailService && npm install'
			}
		}	
		stage('Test'){
			steps{
				sh 'cd ./EmailService && npm test'
			}
		}
	}
}
