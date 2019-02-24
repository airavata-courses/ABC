pipeline{
	agent{
		label 'feed-service'
	}
	stages{
		stage("Build"){
			steps{
				sh "cd $WORKSPACE/ABC/FeedService/"
				sh "mvn -B -DskipTests clean package"
			}
		}
		
		stage("Test"){
			steps{
				sh "mvn test"
			}
			post{
				always{
					junit 'target/surefire-reports/*.xml'
				}
			}
		}
	}
}
