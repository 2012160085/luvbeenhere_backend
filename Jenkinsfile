pipeline {
    agent { label 'master'}
    environment {
        SVC_ACCOUNT_KEY = credentials('dockerio')
    }
    stages{
        stage('Install node dependency'){
            steps {
                script{
                    sh 'mkdir -p ~/.docker'
                    sh """echo ${SVC_ACCOUNT_KEY} | base64 -d > ~/.docker/config.json"""
                    sh """docker build --tag bieberlee/luvbeenhere_backend:latest .""" 
                    sh """docker push bieberlee/luvbeenhere_backend:latest"""
                }
            }
        }
    }
}