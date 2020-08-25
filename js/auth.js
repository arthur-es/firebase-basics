// Função que trata a submissão do form de auth
authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();

    if(authForm.submitAuthForm.innerHTML == 'Acessar'){
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error) {
            console.error(error);
            hideItem(loading)
        });
    } else if( authForm.submitAuthForm.innerHTML == 'Cadastrar conta'){
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error) {
            console.error(error);
            hideItem(loading)
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
    showItem(loading);
    const user = firebase.auth().currentUser;

    user.sendEmailVerification(actionCodeSettions).then(function () {
        alert(`E-mail de verificação foi enviado para ${user.email}`)
    }).catch(function(error) {
        alert(`Ocorreu um erro ao enviar o e-mail de verificação`)
        console.log(error)
    }).finally(function() {
        hideItem(loading);
    });
}

// Função que possibilita o usuário redefinir a senha dele
function sendPasswordResetEmail() {
    const email = prompt('Informe o seu endereço de e-mail', authForm.email.value);
    if(email){
        showItem(loading);
        firebase.auth().sendPasswordResetEmail(email, actionCodeSettions).then(function() {
            alert(`E-mail de redefinição de senha foi enviado para ${email}`);
        }).catch(function(error){
            alert("Houve um erro ao tentar enviar o e-mail de redefinição de senha")
            console.error(error)
        }).finally(function() {
            hideItem(loading)
        });
    }
}

//Função que permite a auth pelo google

function signInWithGoogle(){
    showItem(loading);
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error){
        alert('Houve um erro ao fazer o autenticar usando o google');
        console.log(error);
        hideItem(loading);
    })
}

// Função que permite atualizar nomes de usuários
function updateUserName() {
    const newUserName = prompt('Informe um novo nome de usuário: ', userName.innerHTML);
    if(newUserName && newUserName != ''){
        userName.innerHTML = newUserName;
        showItem(loading);
        firebase.auth().currentUser.updateProfile({
            displayName: newUserName
        }).catch(function (error){
            alert('Falha ao atualizar username');
            console.log(error);
        }).finally(function(){
            hideItem(loading)
        })
    } else {
        alert('Nome de usuário não pode ficar em branco');
    }
}

// Função que permite deletar a conta do usuário
function deleteUserAccount(){
    const confirmation = confirm('Realmente deseja excluir a sua conta?');

    if(confirmation){
        showItem(loading);
        firebase.auth().currentUser.delete().then(
            function () {
                alert("Conta deletada com sucesso!");
            }
        ).catch(function(error){
            hideItem(loading);
            console.log(error);
            alert('Erro ao deletar a sua conta');
        }).finally(function(){
            hideItem(loading);
        })
    }
}