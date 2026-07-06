pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        COMPOSE_PROJECT_NAME = "stress-management-portal"
        DOCKER_BUILDKIT = "1"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Check Frontend Lint') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                        sh 'npm run lint'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Validate Compose Configuration') {
            steps {
                sh 'docker compose -f docker-compose.prod.yml config'
            }
        }

        stage('Build Production Images') {
            steps {
                sh 'docker compose -f docker-compose.prod.yml build'
            }
        }

        stage('Deploy Production Stack') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                sh 'docker compose -f docker-compose.prod.yml up -d --remove-orphans'
            }
        }

        stage('Verify Deployment') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                sh '''
                    set -eu
                    docker compose -f docker-compose.prod.yml ps

                    for i in $(seq 1 30); do
                        if docker compose -f docker-compose.prod.yml exec -T backend node -e "fetch('http://127.0.0.1:5000/health').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"; then
                            echo "Backend health check passed"
                            exit 0
                        fi

                        echo "Waiting for backend health check..."
                        sleep 5
                    done

                    echo "Backend health check failed"
                    docker compose -f docker-compose.prod.yml logs --tail=100 backend
                    exit 1
                '''
            }
        }
    }

    post {
        failure {
            sh 'docker compose -f docker-compose.prod.yml ps || true'
            sh 'docker compose -f docker-compose.prod.yml logs --tail=100 || true'
        }
    }
}
