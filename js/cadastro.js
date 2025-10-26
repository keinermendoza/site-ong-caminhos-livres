// Ajuda a manter o controle do estado geral de validade do formulário de cadastro
const formErrors = [];

document.addEventListener('DOMContentLoaded', () => {
    // toast elements
    const toastContainer = document.getElementById('toast-container');
    const toastSuccess = document.getElementById('toast-success');
    const toastError = document.getElementById('toast-error');

    // formulario
    const form = document.getElementById('form-cadastro');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(formErrors.length > 0) {
            displayToast(toastError, toastContainer)
        } else {
            displayToast(toastSuccess, toastContainer)
            form.reset();
        }
    })

    // campos do formulario
    const telefone = document.getElementById('telefone');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const dataNascimento = document.getElementById('data_nascimento');
    const endereco = document.getElementById('endereco');
    const cpf = document.getElementById('cpf');
    const cep = document.getElementById('cep');
    const cidade = document.getElementById('cidade');
    const estado = document.getElementById('estado');

    // ajuda a carregar todas as validações dentro de um forEach
    const toValidate = [
        {
            field: telefone,
            validationCallback: () => notEmpty(telefone, "telefone") 
        },
        {
            field: nome,
            validationCallback: () => notEmpty(nome, "nome") 
        },
        {
            field: email,
            validationCallback: () => notEmpty(email, "email") 
        },
        {
            field: email,
            validationCallback: () => validateEmail(email) 
        },
        {
            field: dataNascimento,
            validationCallback: () => notEmpty(dataNascimento, "Data de Nascimento") 
        },
        {
            field: dataNascimento,
            validationCallback: () => minimumAge(dataNascimento, "Data de Nascimento") 
        },
        {
            field: endereco,
            validationCallback: () => notEmpty(endereco, "Endereco") 
        },
        {
            field: cpf,
            validationCallback: () => notEmpty(cpf, "CPF") 
        },
        {
            field: cpf,
            validationCallback: () => validateCPF(cpf) 
        },
        {
            field: cep,
            validationCallback: () => notEmpty(cep, "CEP") 
        },
        {
            field: cep,
            validationCallback: () => validateAndUseCEP(cep, cidade, estado) 
        },
    ]

    // ativando callbacks 
    toValidate.forEach(validation => {
        validation.field.addEventListener("blur", validation.validationCallback);
        validation.field.addEventListener("input", () => cleanError(validation.field));
    })

    // asociando mascaras
    telefone.addEventListener('input', (e) => criaMascaraTelefone(e));
    cpf.addEventListener('input', (e) => criaMascaraCPF(e));
    cep.addEventListener('input', (e) => criaMascaraCEP(e));
})

// MENSAGEMS DE ERRO
function setError(element, message) {
    // adicionando o campo a lista de erros
    if (!formErrors.includes(element)) {
        formErrors.push(element)
    }
    const container = element.parentElement;
    container.classList.add("error");
    container.querySelector(".error-message").innerText = message;
}
function cleanError(element) { 
    // removendo o campo da lista de errors
    const index = formErrors.indexOf(element);
    if (index !== -1) {
        formErrors.splice(index, 1);
    }
    const container = element.parentElement;
    container.classList.remove("error");
}

// VALIDAÇÕES
// valida que os campos não estejão vazios
const notEmpty = (field, fieldname) => {
    if (field.value.trim() === "") {
        setError(field, `Por favor, insira um valor para o campo ${fieldname}`);
    } 
}

// valida email
function validateEmail(emailfield) {
    const email = emailfield.value.trim();
    const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;

    if (!emailPattern.test(email)) {
        setError(emailfield, "E-mail inválido. Por favor, verifique o formato do e-mail")
    }
}

// valida edade minima 18
function minimumAge(datafield, fieldname) {
    const stringDate = datafield.value.trim();
    const nacimiento = new Date(stringDate);
    const ahora = new Date();
    
    // 1. Calcular la diferencia simple de años
    let edad = ahora.getFullYear() - nacimiento.getFullYear();

    //  Verificar si já fez aniversario este ano
    const mesActual = ahora.getMonth();
    const mesNacimiento = nacimiento.getMonth();
    
    // comprovando mês
    if (mesActual < mesNacimiento) {
        edad--;
    } 

    else if (mesActual === mesNacimiento) {
        const diaActual = ahora.getDate();
        const diaNacimiento = nacimiento.getDate();
        
        if (diaActual < diaNacimiento) {
            edad--;
        }
    }

    // se for menor de edade exibe o erro
    if (edad < 18) {
        setError(datafield, "Não é possível cadastrar menores de idade.")
    } 
}

// valida CPF
function validateCPF(cpfField) {
    if(!coreValidateCPF(cpfField)) {
        setError(cpfField, "CPF inválido.")
    }
}

// logica de validação do CPF
function coreValidateCPF(cpfField) { 
    cpf = cpfField.value.trim();
    cpf = cpf.replace(/[^\d]+/g, '');

    // Confere se tem 11 dígitos ou se é uma secuencia repetida (examp: 00000000000)
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    // Primer dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // Segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// faz uma request a API https://viacep.com.br
// se for valida prenche campos cidade e estado
// se não for valida exibe mensagem de erro
async function validateAndUseCEP(cepField, cidade, estado) {
    cep = cepField.value.trim();
 
    try {
        // elimina cualquer caracter não numérico
        const cleanedCEP = cep.replace(/\D/g, ''); 
        
        if (!/^\d{8}$/.test(cleanedCEP)) {
            throw new Error("invalid");
        }

        const response = await fetch(`https://viacep.com.br/ws/${cleanedCEP}/json/`);
        const data = await response.json();

        if(data.erro) {
            throw new Error("invalid");
        }

        // caso for valido
        cidade.value = data.localidade;
        estado.value = data.estado; 

    } catch(e) {
        setError(cepField, `Não foi possivel reconhecer o cep ${cep}`)
        cidade.value = "";
        estado.value = "";
    }
}

// MASCARAS
// boa parte do seguinte codigo é uma adpatação do codigo de davidsammuel@gmail.com 
// disponivel em https://pt.stackoverflow.com/a/290510 

function criaMascaraTelefone(event) {
    let x = event.target.value; 

    // remove tudo que não seja número
    x = x.replace(/\D/g, '')
    
    // limita a 11 dígitos
    if (x.length > 11) x = x.slice(0, 11);

    // adiciona paréntesis al DDD
    x = x.replace(/^(\d{2})(\d)/g, '($1) $2'); 
    
    // adiciona ifem antes dos últimos 4 dígitos
    x = x.replace(/(\d{5})(\d{4})$/, '$1-$2'); 
    
    // setea valor do input usando variavel
    event.target.value = x;
}

function criaMascaraCPF(event) {
    const cpf = event.target;
    let v = cpf.value;
        
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
        cpf.value = v.substring(0, v.length-1);
        return;
    }
    
    cpf.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) cpf.value += ".";
    if (v.length == 11) cpf.value += "-";
}

function criaMascaraCEP(event) {
    const cep = event.target;
    let v = cep.value;
        
    // impede entrada de caracteres não numéricos
    if (isNaN(v[v.length - 1])) {
        cep.value = v.substring(0, v.length - 1);
        return;
    }

    // define o tamanho máximo (8 dígitos + 1 hífen)
    cep.setAttribute("maxlength", "9");

    // insere o hífen automaticamente após o quinto dígito
    if (v.length === 5) cep.value += "-";

}

// TOAST
function displayToast(templateElement, containerElement) {
  if (!templateElement || !containerElement) {
    console.error("Template ou contenedor no encontrados.");
    return;
  }

  const fragment = templateElement.content.cloneNode(true); 
  const toast = fragment.querySelector(".toast"); 

  containerElement.appendChild(fragment);

  if (toast) {
      //   remove o toast depois de 5.5s
      setTimeout(() => toast.remove(), 5500)
  } 
}
