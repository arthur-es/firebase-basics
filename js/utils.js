// Referências
const authForm = document.getElementById("authForm");
const authFormTitle = document.getElementById("authFormTitle");
const loading = document.getElementById("loading");
// const submitAuthForm = document.getElementById("submitAuthForm");
const register = document.getElementById("register");
const access = document.getElementById("access");
const signOutBtn = document.getElementById("signOut");
const auth = document.getElementById("auth");
const userContent = document.getElementById("userContent");
const userEmail = document.getElementById("userEmail");
const userEmailVerified = document.getElementById("userEmailVerified");
const sendEmailVerificationDiv = document.getElementById("sendEmailVerificationDiv");

// Simplifica a adição de elementos da página
function showItem(element){
    element.style.display = 'block';
}

// Simplifica a remoção de elementos da página
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

// Mostrar conteudo para users autenticados
function showUserContent(user) {
    userEmail.innerHTML = user.email;
    hideItem(auth);
    showItem(userContent);
    if(user.emailVerified === true) {
        userEmailVerified.innerHTML = 'E-mail verificado'
        hideItem(sendEmailVerificationDiv)
    } else {
        userEmailVerified.innerHTML = 'E-mail não verificado!'
        showItem(sendEmailVerificationDiv)
    }
 
}

// Mostrar conteudo para users não autenticados
function showAuth() {
    authForm.email.value = '';
    authForm.password.value = '';
    hideItem(userContent);
    showItem(auth);
}

