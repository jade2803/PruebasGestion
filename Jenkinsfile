pipeline {
    agent any

    stages {
        stage('Clonar Repositorio') {
            steps {
                // Clonar el repositorio desde GitHub
                git 'https://github.com/jade2803/PruebasGestion.git' // Cambia la URL si es necesario
            }
        }

        stage('Instalar Dependencias') {
            steps {
                script {
                    // Instalar las dependencias del proyecto
                    bat 'npm install' // Para Windows
                }
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                script {
                    // Ejecutar las pruebas directamente con Node.js
                    bat 'node auth.service.test.js' // Ejecuta el archivo de prueba
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado exitosamente.'
        }
        failure {
            echo 'La ejecución del pipeline falló.'
        }
    }
}