pipeline{
    agent any
    stages {
        stage('Git clone') {
            steps {
                git url: 'https://github.com/meetcric/College_Event_MGMT.git', branch: 'master'
            }
        }
        stage('Install dependency') {
            steps {
                sh 'cd ./client/ && npm i'
                sh 'cd ./server/ && npm i'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "ok, tested!!"'
            }
        }
        stage('Build') {
            steps {
                sh 'cd ./client/ && npm run build'
            }
        }
        stage('Docker Build') {
            steps {
                // sh 'cd client && docker build .'
                sh 'docker-compose build'
                sh 'docker tag college_event_management_server:latest shreyankb/event_management_server:latest'
                sh 'docker tag college_event_management_client:latest shreyankb/event_management_client:latest'
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'dockerHubPassword', usernameVariable: 'dockerHubUser')]) {
                sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPassword}"
                sh 'docker push shreyankb/event_management_server:latest'
                sh 'docker push shreyankb/event_management_client:latest'
            }
            }
        }
        stage('Clean Docker Images') {
            steps {
                sh 'docker rmi -f shreyankb/event_management_server'
                sh 'docker rmi -f shreyankb/event_management_client'
            }
        }
    }
}
