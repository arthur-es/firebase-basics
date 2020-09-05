// Trata a submit do form de Todos
todoForm.onsubmit = function(event){
    event.preventDefault()

    if(todoForm.name.value !== ''){
        const data = {
            name: todoForm.name.value,
            nameLowerCase: todoForm.name.value.toLowerCase()
        }
        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function() {
            console.log('Tarefa adicionada', data.name)
        }).catch(function(error){
            showError('Falha ao adicionar tarefa: ', error)
        });

        todoForm.name.value = '';
    } else {
        alert('Campo nome da tarefa não pode estar vazio')
    }
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
            name: newTodoName
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