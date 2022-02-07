'use strict'

const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'ALL'
var gSortBy = 'TXT'
_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return getSortedTodosForDisplay(gTodos)

    return getSortedTodosForDisplay(gTodos).filter(todo =>
        todo.isDone && gFilterBy === 'DONE' ||
        !todo.isDone && gFilterBy === 'ACTIVE'
    )
}

function getSortedTodosForDisplay(todos) {
    var sortBy = '';

    var sorted = todos.sort((a, b) => {
        if (gSortBy === 'TXT') {

            var first = a.txt.toLowerCase();
            var second = b.txt.toLowerCase();
        }
        else {
            if (gSortBy === 'CREATED') sortBy = 'created';
            else sortBy = 'importance';

            var first = a[sortBy];
            var second = b[sortBy];
        }

        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
    })
    // console.log(sorted)
    return sorted
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, imp) {
    const todo = _createTodo(txt, imp)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master Javascript'),
        ]
        _saveTodosToStorage()
    }
}

function _createTodo(txt, imp = 1) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        created: createdAt(),
        importance: imp
    }
    return todo
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function createdAt() {
    return Date.now();
}
