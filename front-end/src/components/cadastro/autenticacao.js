export class Autenticacao{

    padraoString(value) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,100}$/;
        return regex.test(value);
    }

    padraoData(value){

        const dataNasc = new Date(value);
        const atual = new Date();

        const calc = atual.setFullYear(atual.getFullYear() - 17);

        return dataNasc <= calc;

    }

    padraoTelefone(tel){

        const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}[-]?\d{4}$/;
        return regex.test(tel);

    }

    padraoEmail(email){

        const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);

    }

}
