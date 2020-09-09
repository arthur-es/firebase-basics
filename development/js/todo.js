// Trata a submit do form de Todos
todoForm.onsubmit = function(event){
    event.preventDefault()

    if(todoForm.name.value !== ''){

        const file = todoForm.file.files[0]; // Seleciona primeiro arquivo da seleção de arquvios
        if(file != null){ // Verifica se o arquivo foi selecionado
            if(file.type.includes('image')){ // Verifica se o arquivo é uma imagem
                const imgName = `${firebase.database().ref().push().key}-${file.name}` // compoe nome da imagem
                const imgPath = `todoListFiles/${firebase.auth().currentUser.uid}/${imgName}` // compoe caminho do arquivo
                const storageRef = firebase.storage().ref(imgPath) // cria uma referencia de arquivo usando o caminho criado anteriormente
            
                //inicia o processo de upload
                let upload = storageRef.put(file);

                trackUpload(upload).then(() => {
                    storageRef.getDownloadURL().then((downloadURL) => {
                        const data = {
                            name: todoForm.name.value,
                            nameLowerCase: todoForm.name.value.toLowerCase(),
                            imgUrl: downloadURL,
                        }

                        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function() {
                            console.log('Tarefa adicionada', data.name);
                        }).catch(function(error){
                            showError('Falha ao adicionar tarefa: ', error);
                        });
                
                        todoForm.name.value = '';
                        todoForm.file.value = '';
                    });
                }).catch((error) => {
                    showError('Falha ao adicionar tarefa: ', error);
                });
            } else {
                alert('O arquivo selecionado precisa ser uma imagem');
            }
        } else {
            const data = {
                name: todoForm.name.value,
                nameLowerCase: todoForm.name.value.toLowerCase(),
            }
        
            dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function() {
                console.log('Tarefa adicionada', data.name);
            }).catch(function(error){
                showError('Falha ao adicionar tarefa: ', error);
            });
        
            todoForm.name.value = '';
        }
        
    } else {
        alert('Campo nome da tarefa não pode estar vazio');
    }
}

// rastrea o progresso de upload
function trackUpload(upload) {

    return new Promise(function(resolve, reject) {
        showItem(progressFeedback);
        upload.on('state_changed', (snapshot) => {
            progress.value = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        }, (error) => {
            hideItem(progressFeedback);
            reject(error);
        }, () => {
            console.log("Sucesso no upload da imagem");
            hideItem(progressFeedback);
            resolve();
        });
    
        let playPauseUpload = true; // Estado de controle do nosso upload (pausado ou em andamento)
        playPauseBtn.onclick = function() {
            playPauseUpload = !playPauseUpload;
    
            if(playPauseUpload){
                upload.resume();
    
                playPauseBtn.innerHTML = 'Pausar';
    
                console.log('Upload retomado');
            } else { // Se deseja pausar o upload faça...
                upload.pause();
    
                playPauseBtn.innerHTML = 'Continuar';
    
                console.log('Upload pausado');
            }
        }
    
        cancelBtn.onclick = () => {
            upload.cancel(); // Cancela o upload
            hideItem(progressFeedback)
        }
    })
    
}



function fillTodoList(dataSnaptshot){
    ulTodoList.innerHTML = '';
    const num = dataSnaptshot.numChildren();
    todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':';
    dataSnaptshot.forEach(function (item){
        const value = item.val();

        const li = document.createElement('li');
        const spanLi = document.createElement('span');

        spanLi.appendChild(document.createTextNode(value.name));
        spanLi.id = item.key;

        li.appendChild(spanLi);
      
        const liRemoveBtn = document.createElement('button');
        liRemoveBtn.appendChild(document.createTextNode('Excluir'));
        liRemoveBtn.setAttribute('onclick', `removeTodo("${item.key}")`);
        liRemoveBtn.setAttribute('class', 'danger todoBtn');
        li.appendChild(liRemoveBtn);

        const liUpdateBtn = document.createElement('button');
        liUpdateBtn.appendChild(document.createTextNode('Atualizar'));
        liUpdateBtn.setAttribute('onclick', `updateTodo("${item.key}")`);
        liUpdateBtn.setAttribute('class', 'alternative todoBtn');
        li.appendChild(liUpdateBtn);

        ulTodoList.appendChild(li);
    });
}

function removeTodo(key){
    const selectedItem = document.getElementById(key);
    const confirmation = confirm( `Realmente deseja remover a tarefa "${selectedItem.innerHTML}" ?`);
    if(confirmation){
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch(function (error){
            showError(`Erro ao excluir a tarefa ${selectedItem.innerHTML}`, error);
        });
    }
}

function updateTodo(key){
    const selectedItem = document.getElementById(key);
    const newTodoName = prompt(`Qual é o novo nome da tarefa "${selectedItem.innerHTML}"?`, selectedItem.innerHTML);
    if(newTodoName != ''){
        const data = {
            name: newTodoName,
            nameLowerCase: newTodoName.toLowerCase()
        }
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).then(function() {
            console.log('Atualizado...');
        }).catch(function (error) {
            showError('Erro ao atualizar a tarefa', error);
        });
    }  else {
        alert('O nome da tarefa não pode ser em branco para atualizar a tarefa.')
    }
}