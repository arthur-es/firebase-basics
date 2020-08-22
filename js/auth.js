// Função que trata a submissão do form de auth
authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();

    if(authForm.submitAuthForm.innerHTML == 'Acessar'){
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error) {
            console.error(error);
        });
    } else if( authForm.submitAuthForm.innerHTML == 'Cadastrar conta'){
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error) {
            console.error(error);
        });
    }
}

// Função que centraliza e trata a auth
firebase.auth().onAuthStateChanged(function(user){
    hideItem(loading)
    if(user){
        showUserContent(user);
    } else {
        showAuth();
    }
})

// Função que permite ao usuario sair da conta dele
function signOut() {
    firebase.auth().signOut().catch(function (error) {
        console.error('Falha ao sair da conta', error);
    }); 
}

// Função que envia um e-mail para o usuario verificá-lo
function sendEmailVerification() {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        alert(`E-mail de verificação foi enviado para ${user.email}`)
    }).catch(function(error) {
        alert(`Ocorreu um erro ao enviar o e-mail de verificação`)
        console.log(error)
    });
}