pipeline{
	agent any
	stages{
		stage("Build"){
			steps{
				sh "cd ./FeedService && mvn -B -DskipTests clean package"
			}
		}
		
		stage("Test"){
			steps{
				sh "cd ./FeedService && mvn test"
			}
			post{
				always{
					junit 'target/surefire-reports/*.xml'
				}
			}
		}
	}
}
