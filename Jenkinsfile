pipeline{
	agent any
	stages{
		stage("Build"){
			steps{
				sh "set +x"
				sh "pip install virtualenv"
				sh "python -m virtualenv flask_env"
				sh "source flask_env/bin/activate"
				sh "pip install -r requirement.txt"
				sh "export NEWS_API_KEY=$NEWS_API_KEY"
			}
		}
		stage("Test"){
			steps{
				sh "test phase"
			}
		}
	}
}
