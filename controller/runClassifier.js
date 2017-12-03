import Shell from 'shelljs';

export function runModel(){
    let options = {
        mode: 'text'
      };

    Shell.exec('python ./controller/customer_classifier.py');
}