Component({
    properties: {
        todo: Array,
    },
    data: {
        checked: false
    },
    lifetimes: {
    },
    methods: {
        finishTodo(event) {
            const index = event.detail.value[0];
            this.triggerEvent("finishtodo", index);
        },
        deleteTodo(event) {
            const index = event.currentTarget.dataset.index
            this.triggerEvent("deltodo", index);
        }
    },
    observers:{
        "todo":function(){
            this.setData({checked:false})
        }
    }

})