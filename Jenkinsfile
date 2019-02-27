pipeline{
	agent any
	stages{
		stage('Build'){
			steps{
				sh 'cd web-ui && npm install'
			}
		}
		stage('Test'){
			steps{
				sh 'echo Testing'
			}
		}
		stage('Deploy'){
			steps{
				build 'deploy-web-ui'
			}
		}
	}
}
