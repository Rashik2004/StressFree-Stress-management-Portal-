pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Rashik2004/StressFree-Stress-management-Portal-'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build and Start Containers') {
            steps {
                sh 'docker compose up --build -d'
            }
        }

        stage('Verify Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
