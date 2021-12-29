const app = getApp();
const username = app.globalData.userName
console.log("username:", username)
Component({
    properties: {
        todo: Array
    },
    data: {
        todo: []
    },
    methods: {
        finishTodo(event) {
            const index = event.detail.value;
            let newTodo = this.data.todo;
            newTodo.splice(index, 1);
            this.setData({
                todo: newTodo
            })
        }
    }
})