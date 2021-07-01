pipeline {
    agent { label 'master'}
    stages{
        stage('Install node dependency'){
            steps {
                script{
                    sh """docker build -t bieberlee/luvbeenhere_backend:latest"""
                    sh """docker push bieberlee/luvbeenhere_backend:latest"""
                }
            }
        }
    }
}