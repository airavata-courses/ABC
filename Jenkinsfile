pipeline{
	agent any
	stages{
		stage("Build"){
			steps{
				sh "set +x"
				sh "pip install virtualenv"
				sh "pip install --user -r requirement.txt"
				withCredentials([string(credentialsId: 'NEWS_API_KEY', variable: 'NEWS_API_KEY')]) {
                    			sh '''
                      				set +x
                   			'''
                		}
			}
		}
		stage("Test"){
			steps{
				sh "test phase"
			}
		}
	}
}
