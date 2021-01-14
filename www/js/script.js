const navbarTitle = document.getElementById('navbar-title');
const tabs = document.querySelectorAll('.tab');
const tabbarItems = document.querySelectorAll('.tabbar-item');
const formCreate = document.getElementById('form-create');
const tabbar = document.getElementById('tabbar');

const handleClickTabbarItem = (event) => {
    const targetTabId = event.currentTarget.getAttribute('tabid');
    const tabName = event.currentTarget.getAttribute('tabname');

    navbarTitle.innerText = tabName;

    tabs.forEach((tab) => {
        if (tab.id === targetTabId) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    })
}

const cleareForm = () => {
    formCreate['name'].value = "";
    formCreate['date'].value = "";
    formCreate['description'].value = "";
}

const openTodo = (name, description, date) => {
    console.log(name, description, date);

    const content = `
        <p>${description}</p>
        <span>${date}</span>
    `

    Modal.setTitle(name);
    Modal.setContent(content);
    Modal.open();
}

const renderTodos = (data) => {
    if (data.length === 0) {
        tabs[0].innerHTML = "<h1>Список пуст</h1>";
        return;
    }
    
    tabs[0].innerHTML = "";

    data.map((todo) => {
        const todoHtml = `
            <div class="todo-item" onclick="openTodo('${todo.name}', '${todo.description}', '${todo.date}')">
                <h4>${todo.name}</h4>
                <span>${todo.date}</span>
            </div>
        `        
        tabs[0].innerHTML += todoHtml;
    })


}

const handleSubmitFormCreate = (event) => {
    event.preventDefault();

    const todoName = formCreate['name'].value;
    const todoDate = formCreate['date'].value;
    const todoDescription = formCreate['description'].value;

    if (todoName.length > 0) {
        const todo = {
            name: todoName,
            date: todoDate,
            description: todoDescription
        }

        TodosService.add(todo);
        cleareForm();
        renderTodos(todos);
    }
}


const init = () => {
    renderTodos(todos);
    tabbarItems.forEach((tabbarItem) => tabbarItem.addEventListener('click', handleClickTabbarItem));
    formCreate.addEventListener('submit', handleSubmitFormCreate);

    formCreate.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('focus', () => tabbar.style.display = "none");
    });

    formCreate.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('blur', () => tabbar.style.display = "flex");
    });
}

init();