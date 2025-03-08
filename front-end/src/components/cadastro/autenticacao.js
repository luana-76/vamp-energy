class Autenticacao{

    constructor(){

        this.nome = document.querySelector('#campNome');
        this.tempo();

    }

    tempo(){

        setInterval(()=>{

            this.padraoNome()

        }, 100)

    }

    padraoNome(){

        if(this.nome.validity.patternMismatch){

            console.log('invalido')

        }
        else{console.log('Valido')

        }

    }

}

new Autenticacao()