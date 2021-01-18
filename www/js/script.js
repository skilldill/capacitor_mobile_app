const navbarTitle = document.getElementById('navbar-title');
const tabs = document.querySelectorAll('.tab');
const tabbarItems = document.querySelectorAll('.tabbar-item');
const formCreate = document.getElementById('form-create');
const tabbar = document.getElementById('tabbar');

// Settings
const switchTheme = document.getElementById('switch-theme');
const btnClearTodos = document.getElementById('btn-clear-todos');

const renderTodos = (data) => {
    if (data.length === 0) {
        tabs[0].innerHTML = "<h1>Список пуст</h1>";
        return;
    }
    
    tabs[0].innerHTML = "";

    data.map((todo, id) => {
        const todoHtml = `
            <div class="todo-item" onclick="openTodo('${todo.name}', '${todo.description}', '${todo.date}', ${id})">
                <h4>${todo.name}</h4>
                <span>${todo.date}</span>
            </div>
        `        
        tabs[0].innerHTML += todoHtml;
    })
}

const handleClickBtnClearTodos = () => {
    const isAgree = confirm('Удалить все заметки?');

    if (isAgree) {
        TodosService.clear();
        Notification.show('Заметки удалены');
        renderTodos(todos);
    }
}

const handleChangeSwitchTheme = () => {
    const checked = !JSON.parse(switchTheme.getAttribute('checked'));

    if (checked) {
        document.body.classList.add('dark-theme');
        switchTheme.classList.add('switch-checked');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        switchTheme.classList.remove('switch-checked');
        localStorage.setItem('theme', 'ligth');
    }

    switchTheme.setAttribute('checked', checked);
} 

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

const removeTodo = (id) => {
    const isAgree = confirm('Вы действительно хотите удалить заметку?');

    if (isAgree) {
        TodosService.remove(id);

        console.log(todos);

        renderTodos(todos);
        Modal.close();
        Notification.show('Заметка удалена', 1000);
    }
}

const openTodo = (name, description, date, index) => {
    const content = `
        <p>${description}</p>
        <span>${date}</span>
        <button class="mui-btn mui-btn--raised mui-btn--danger btn-remove" onclick="removeTodo(${index})">Удалить заметку</button>
    `

    Modal.setTitle(name);
    Modal.setContent(content);
    Modal.open();
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
        
        Notification.show('Заметка добавлена');
    }
}

const checkTheme = () => {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        switchTheme.classList.add('switch-checked');
        switchTheme.setAttribute('checked', true);
    }
}

const init = () => {
    checkTheme();
    renderTodos(todos);

    tabbarItems.forEach((tabbarItem) => tabbarItem.addEventListener('click', handleClickTabbarItem));
    formCreate.addEventListener('submit', handleSubmitFormCreate);
    switchTheme.addEventListener('click', handleChangeSwitchTheme);
    btnClearTodos.addEventListener('click', handleClickBtnClearTodos);

    formCreate.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('focus', () => tabbar.style.display = "none");
    });

    formCreate.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('blur', () => tabbar.style.display = "flex");
    });
}

init();