pipeline {
    agent { label 'master'}
    environment{
        ENV_KEY = credentials("back_env_dev")
    }
    stages{
        stage('Install node dependency'){
            steps {
                script{
                    sh """echo hellow"""
                }
            }
        }
    }
}