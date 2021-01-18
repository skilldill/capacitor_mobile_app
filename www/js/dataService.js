let todos = JSON.parse(localStorage.getItem('todos'));

const saveTodos = (data) => {
    localStorage.setItem('todos', JSON.stringify(data));
} 

console.log(todos);

if (!todos) {
    todos = [];
    saveTodos(todos);
}

const TodosService = {
    save: saveTodos,
    
    add: (todo) => {
        todos.push(todo);
        saveTodos(todos);
    },

    remove: (id) => {
        const filtredTodos = todos.filter((todo, currentId) => currentId !== id);
        
        console.log(id, filtredTodos);

        todos = filtredTodos;
        saveTodos(todos);
    },

    clear: () => {
        todos = [];
        saveTodos(todos);
    }
}