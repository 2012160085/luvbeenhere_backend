pipeline {
    agent { label 'master'}
    environment {
        DOCKER_CRED_BASE64 = credentials('dockerio')
        RM_HOST = credentials('rm_host')
        RM_USER = credentials('rm_user')
        RM_PASSWD = credentials('rm_passwd')
    }
    stages{
        stage('Build BE Image'){
            steps {
                script{
                    sh 'mkdir -p ~/.docker'
                    sh """echo ${DOCKER_CRED_BASE64} | base64 -d > ~/.docker/config.json"""
                    sh """docker build --tag bieberlee/luvbeenhere_backend:latest .""" 
                    sh """docker push bieberlee/luvbeenhere_backend:latest"""
                }
            }
        }
        stage('Run Container'){
            steps {
                script{
                    def remote = [:]
                    remote.name = 'dev_server'
                    remote.host = 'localhost'
                    remote.user = RM_USER 
                    remote.password = RM_PASSWD 
                    remote.allowAnyHosts = true

                    def docker_compose_file = sh(returnStdout: true, script: 'base64 -w0 docker-compose.yml').trim()

                    sshCommand remote: remote, command: """echo ${docker_compose_file} | base64 -d > ~/dev/luvbeenhere/be/docker-compose.yml"""
                    sshCommand remote: remote, command: """cd ~/dev/luvbeenhere/be"""
                    sshCommand remote: remote, command: """ls"""
                    sshCommand remote: remote, command: """docker-compose up"""
                }
            }
        }
    }
}