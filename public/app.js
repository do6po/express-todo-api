new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            isDark: true,
            show: true,
            todoTitle: '',
            todos: []
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        getAll() {
            fetch('/api/todo', {method: 'get'})
                .then(res => res.json())
                .then(res => {
                    this.todos = res
                })
                .catch(e => console.log(e))
        },
        addTodo() {
            const title = this.todoTitle.trim()
            if (!title) {
                return
            }
            fetch('/api/todo', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            })
                .then(res => res.json())
                .then(({todo}) => {
                    this.todos.push(todo)
                    this.todoTitle = ''
                })
                .catch(e => console.log(e))
        },
        removeTodo(id) {
            const query = `
        mutation {
          deleteTodo(id: "${id}")
        }
      `
            fetch('/graphql', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({query})
            })
                .then(() => {
                    this.todos = this.todos.filter(t => t.id !== id)
                })
                .catch(e => console.log(e))
        },
        completeTodo(id) {
            fetch('/api/todo', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({done: true})
            })
                .then(res => res.json())
                .then(({todo}) => {
                    const idx = this.todos.findIndex(t => t.id === id)
                    this.todos[idx].updatedAt = todo.updatedAt
                })
                .catch(e => console.log(e))

        }
    },
    filters: {
        capitalize(value) {
            return value
            // return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }

            if (withTime) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
        }
    }
})