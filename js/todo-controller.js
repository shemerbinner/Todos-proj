'use strict'

function onInit() {
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    var approve = confirm('Are you sure you want too delete?');
    ev.stopPropagation()
    
    if (!approve) return

    console.log('Removing Todo', todoId);

    removeTodo(todoId)
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay();
    var strHTMLs = todos.map(todo =>
        `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
           ${todo.txt}
           <span class = timestamp>(${todo.created})</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')

    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()

    if (todos.length === 0) document.querySelector('.todos-none').style.visibility = 'visible';
}


function onToggleTodo(todoId) {
    // console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}

function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]');
    const txt = elTxt.value
    const elImp = document.querySelector('input[name=importance]');
    const imp = elImp.value

    if (!txt) return
    if (imp > 3 || imp < 1) return

    addTodo(txt, imp)

    elTxt.value = ''
    elImp.value = ''
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);

    setFilter(filterBy)
    renderTodos()

}

function onSortBy(sortBy) {
    console.log('Sorting By:', sortBy)

    setSort(sortBy)
    renderTodos()
}