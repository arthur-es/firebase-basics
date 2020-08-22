authForm.onsubmit = function (event) {
    showItem(loading)
    event.preventDefault();

    if(authForm.submitAuthForm.innerHTML == 'Acessar'){
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error) {
            console.error(error)
        });
    } else if( authForm.submitAuthForm.innerHTML == 'Cadastrar conta'){
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error) {
            console.error(error)
        });
    }
}

firebase.auth().onAuthStateChanged(function(user){
    hideItem(loading)
    if(user){
        console.log('Usuário autenticado')
        console.log(user)
    } else {
        console.log('Não autenticado')
    }
})