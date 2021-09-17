pipeline {
  agent any
    
 
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/Edrson/Practica3SA'
      }
    }
     
    stage('Build') {
      steps {
        bat 'npm install'
        
      }
    }  
    
            
    stage('Test') {
      steps {
        bat 'npm run test'
      }
    }
  }
}