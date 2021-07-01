pipeline {
    agent { label 'master'}
    environment {
        DOCKER_CRED_BASE64 = credentials('dockerio')
        RM_HOST = credentials('rm_host')
        RM_USER = credentials('rm_user')
        RM_PASSWD = credentials('rm_passwd')
        DOTENV = credentials('lhb_be_dev_dotenv')
    }
    stages{
        stage('Build BE Image'){
            steps {
                script{
                    sh 'mkdir -p ~/.docker'
                    sh """echo ${DOCKER_CRED_BASE64} | base64 -d > ~/.docker/config.json"""
                    sh """echo ${DOTENV} | base64 -d > App/.env"""
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

                    def remotesu = [:]
                    remotesu.name = 'dev_server_su'
                    remotesu.host = 'localhost'
                    remotesu.user = 'root' 
                    remotesu.password = RM_PASSWD 
                    remotesu.allowAnyHosts = true

                    def docker_compose_file = sh(returnStdout: true, script: 'base64 -w0 docker-compose.yml').trim()

                    sshCommand remote: remote, command: """echo ${docker_compose_file} | base64 -d > ~/dev/luvbeenhere/be/docker-compose.yml"""
                    sshCommand remote: remote, failOnError: false, command: """docker stop lbh_be_dev"""
                    sshPut remote: remotesu, from: 'lbh_be_dev', into: '/etc/nginx/sites-available'
                    sshCommand remote: remote, command: """cd ~/dev/luvbeenhere/be && docker-compose up --detach --force-recreate"""
                }
            }
        }
        stage('Nginx Setting'){
            steps {
                script{
                    def remotesu = [:]
                    remotesu.name = 'dev_server_su'
                    remotesu.host = 'localhost'
                    remotesu.user = 'root' 
                    remotesu.password = RM_PASSWD 
                    remotesu.allowAnyHosts = true

                    sshPut remote: remotesu, from: 'lbh_be_dev', into: '/etc/nginx/sites-available'
                    sshCommand remote: remotesu, command: """service nginx restart"""
                }
            }
        }
    }
}