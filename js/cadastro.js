document.addEventListener('DOMContentLoaded', () => {
    // cria mascara do telefone usando javascript
    const telefone = document.getElementById('telefone');

    telefone.addEventListener('input', (e) => {
        // armazena valor do input em variavel
        let x = e.target.value; 

        // remove tudo que não seja número
        x = x.replace(/\D/g, '')
        
        // limita a 11 dígitos
        if (x.length > 11) x = x.slice(0, 11);

        // adiciona paréntesis al DDD
        x = x.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        
        // adiciona ifem antes dos últimos 4 dígitos
        x = x.replace(/(\d{5})(\d{4})$/, '$1-$2'); 
        
        // setea valor do input usando variavel
        e.target.value = x;
    });

    // cria mascara do CPF usando javascript
    // codigo adpatado, original do davidsammuel@gmail.com disponivel em https://pt.stackoverflow.com/a/290510 
    const cpf = document.getElementById('cpf');

    cpf.addEventListener("input", (e) =>{
        let v = e.target.value;
        
        if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
            cpf.value = v.substring(0, v.length-1);
            return;
        }
        
        cpf.setAttribute("maxlength", "14");
        if (v.length == 3 || v.length == 7) cpf.value += ".";
        if (v.length == 11) cpf.value += "-";
    })  


    // cria mascara do CEP usando javascript
    const cep = document.getElementById('cep');

    cep.addEventListener("input", (e) => {
        let v = e.target.value;
        
        // impede entrada de caracteres não numéricos
        if (isNaN(v[v.length - 1])) {
            cep.value = v.substring(0, v.length - 1);
            return;
        }

        // define o tamanho máximo (8 dígitos + 1 hífen)
        cep.setAttribute("maxlength", "9");

        // insere o hífen automaticamente após o quinto dígito
        if (v.length === 5) cep.value += "-";
    });

})