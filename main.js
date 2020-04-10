{
    'use strict';

    let lists = [];
    let idCounter = 0;

    const lists_parent = document.getElementById('lists-parent')
    const todos_parent = document.getElementById('todos-parent')
    const task_btn = document.getElementById('task-btn')
    const lists_btn = document.getElementById('lists-btn')
    const task_input = document.getElementById('task-input')
    const list_input = document.getElementById('list-input')
    const title = document.getElementById('title')
    const clear_list = document.getElementById('clear-list')
    const clear_tasks = document.getElementById('clear-tasks')
    const main_container = document.getElementById('main-container')



    lists_btn.addEventListener('click', () => {
        if (!list_input.value) {
            return
        }
        
        const newList = {
            name: list_input.value,
            todos: []
        }
        
        lists.push(newList)
        appendLists(newList)
        list_input.value = ''
    })

    function appendLists(list) {
        const listName = document.createElement("li");
        listName.textContent = list.name;
        lists_parent.appendChild(listName)
        title.textContent = list.name;

        // generateTodos(list);
        todos_parent.innerHTML = ''

        listName.addEventListener('click', () => {
            title.textContent = list.name;
            generateTodos(list);
        })
    }

    task_btn.addEventListener('click', () => {
        if (!task_input.value || !lists.length) {
            return
        }
        lists.forEach(list => {
            if (list.name === title.textContent) {
                list.todos.push({
                    todo: task_input.value,
                    done: false
                })
                generateTodos(list)
            }
        })
        task_input.value = ''
    })

    function generateTodos(list) {
        todos_parent.innerHTML = ''
        for (let i = 0; i < list.todos.length; i++) {
            const todo = document.createElement("li");
            todo.textContent = list.todos[i].todo;

            if (list.todos[i].done) {
                todo.classList.add('done')
            }

            todo.addEventListener('click', () => {
                list.todos[i].done = !list.todos[i].done;
                todo.classList.toggle('done')
            })

            todos_parent.appendChild(todo);
        }
        // console.log(lists[0].todos)
    }

    clear_tasks.addEventListener('click', () => {
        if (!lists.length) {
            return
        }

        const index = lists.findIndex((v) => v.name === title.textContent);

        const filteredTodos = lists[index].todos.filter(todo => {
            return todo.done !== true
        })

        // console.log(filteredTodos)

        lists[index].todos = filteredTodos;
        generateTodos(lists[index])
    })

    clear_list.addEventListener('click', () => {
        if (!lists.length) {
            return
        }
        // console.log(lists)
        const index = lists.findIndex((v) => v.name === title.textContent); //@TODO; not allow duplicate list name function
        // console.log(index)

        const filteredList = lists.filter(list => {
            return list.name !== title.textContent
        })

        lists = filteredList
        lists_parent.children[index].remove();

        // console.log(lists)
        // console.log(lists[0])
        title.textContent = lists[0].name;
        generateTodos(lists[0]);
    })
}