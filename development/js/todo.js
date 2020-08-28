// Trata a submit do form de Todos
todoForm.onsubmit = function(event){
    event.preventDefault()

    if(todoForm.name.value !== ''){
        const data = {
            name: todoForm.name.value
        }
        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function() {
            console.log('Tarefa adicionada', data.name)
        }).catch(function(error){
            showError('Falha ao adicionar tarefa: ', error)
        })
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

        li.appendChild(spanLi);

        const liRemoveBtn = document.createElement('button');
        liRemoveBtn.appendChild(document.createTextNode('Excluir'));
        liRemoveBtn.setAttribute('onclick', `removeTodo("${item.key}")`);
        liRemoveBtn.setAttribute('class', 'danger todoBtn');
        li.appendChild(liRemoveBtn);

        ulTodoList.appendChild(li);
    });
}

function removeTodo(key){
    // const confirmation = confirm('Realmente deseja remover a tarefa?');
    // if(confirmation){
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch(function (error){
            showError('Erro ao excluir a tarefa: ', error);
        })
    // }
}