//Referências
const authForm = document.getElementById("authForm");
const authFormTitle = document.getElementById("authFormTitle");
const loading = document.getElementById("loading");
// const submitAuthForm = document.getElementById("submitAuthForm");
const register = document.getElementById("register");
const access = document.getElementById("access");

function showItem(element){
    element.style.display = 'block';
}

function hideItem(element){
    element.style.display = 'none';
}

function toggleToRegister(){
    authForm.submitAuthForm.innerHTML = 'Cadastrar conta';
    authFormTitle.innerHTML = "Insira seus dados para se cadastrar";

    hideItem(register);
    showItem(access);
}

function toggleToAccess(){
    authForm.submitAuthForm.innerHTML = 'Acessar';
    authFormTitle.innerHTML = "Acesse a sua conta para continuar";

    hideItem(access);
    showItem(register);
}



