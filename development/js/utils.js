// Referências
const authForm = document.getElementById("authForm");
const authFormTitle = document.getElementById("authFormTitle");
const loading = document.getElementById("loading");
const register = document.getElementById("register");
const access = document.getElementById("access");
const signOutBtn = document.getElementById("signOut");
const auth = document.getElementById("auth");
const userContent = document.getElementById("userContent");
const userEmail = document.getElementById("userEmail");
const userEmailVerified = document.getElementById("userEmailVerified");
const sendEmailVerificationDiv = document.getElementById("sendEmailVerificationDiv");
const passwordReset = document.getElementById("passwordReset");
const userName = document.getElementById("userName");
const userImg = document.getElementById("userImg");

const todoForm = document.getElementById("todoForm");
const todoCount = document.getElementById("todoCount");
const ulTodoList = document.getElementById("ulTodoList");


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
    hideItem(passwordReset);
    showItem(access);
}

function toggleToAccess(){
    authForm.submitAuthForm.innerHTML = 'Acessar';
    authFormTitle.innerHTML = "Acesse a sua conta para continuar";

    hideItem(access);
    showItem(passwordReset);
    showItem(register);
}

// Mostrar conteudo para users autenticados
function showUserContent(user) {
    if(user.emailVerified === true) {
        userEmailVerified.innerHTML = 'E-mail verificado'
        hideItem(sendEmailVerificationDiv)
    } else {
        userEmailVerified.innerHTML = 'E-mail não verificado!'
        showItem(sendEmailVerificationDiv)
    }

    userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.png'
    userName.innerHTML = user.displayName;

    userEmail.innerHTML = user.email;
    hideItem(auth);

    dbRefUsers.child(firebase.auth().currentUser.uid).on('value', function(dataSnapshot) {
        fillTodoList(dataSnapshot)
    });

    showItem(userContent);
}

// Mostrar conteudo para users não autenticados
function showAuth() {
    authForm.email.value = '';
    authForm.password.value = '';
    hideItem(userContent);
    showItem(auth);
}

// Atributos extras de config de e-mail
const actionCodeSettions = {
    url: 'http://127.0.0.1:5500'
}

// Centralizar e traduzir erros
function showError(prefix, error){
    console.error(error.code)

    hideItem(loading);

    switch(error.code){
        case 'auth/invalid-email': alert(`${prefix} E-mail inválido.`)
        break;

        case 'auth/wrong-password': alert(`${prefix} Senha inválida.`)
        break;

        case 'auth/weak-password': alert(`${prefix} Senha fraca. A senha deve ter no mínimo 6 caracteres.`)
        break;
        
        case 'auth/email-already-in-use': alert(`${prefix} O e-mail já está sendo usado. Recupere a sua senha.`)
        break;
        
        case 'auth/popup-closed-by-user': alert(`${prefix} O popup foi fechado antes de concluir a autenticação.`)
        break;

        default: alert(`${prefix} ${error.message}`)
    }
}

const database = firebase.database();

const dbRefUsers = database.ref('users');