/* groovylint-disable NestedBlockDepth */
pipeline {
    agent { label 'master'}
    environment {
        DOTENV = credentials('lhb_be_dev_dotenv')
        REMOTE_USER = credentials('lhb_be_dev_remote_user')
        REMOTE_PASSWD = credentials('lhb_be_dev_remote_passwd')
        DOCKER_CRED = credentials('dockerhub_credential')
    }
    stages {
        stage('Build Image') {
            steps {
                script {
                    sh 'mkdir -p ~/.docker'
                    sh """echo ${DOCKER_CRED} | base64 -d > ~/.docker/config.json"""
                    sh """echo ${DOTENV} | base64 -d > App/.env"""
                    sh """cat App/.env"""
                    sh """docker build --tag 'img-lbh-dev-be-nodeserver' ."""
                    container_running = \
                        /* groovylint-disable-next-line LineLength */
                        sh(returnStdout: true, script: """docker ps | awk '/ctn-lbh-dev-be-nodeserver/ {print \$1}' """).trim()
                    if (container_running != "") {
                        sh """docker stop ${container_running}"""
                    }
                    sh """docker-compose up --build -d"""
                }
            }
        }
    }
    post { cleanup { cleanWs() } }
}