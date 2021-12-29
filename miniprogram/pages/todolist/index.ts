
Page({
    data: {
        todo: [],
        finished: [],
        content: null,
        date: null,
    },
    addTodo() {
        if (this.data.content === null || this.data.date === null) {
            wx.showToast({
                title: "请填入内容与时间",
                icon: "none",
                duration: 2000
            })
        }
        else {
            const toDoItem = {
                content: this.data.content,
                date: this.data.date,
            }
            const newTodo: any = [...this.data.todo, toDoItem];
            this.setData({
                todo: newTodo,
                content: null,
                date: null
            })
        }
    },
    finishTodo(event: any) {
        const index = event.detail
        const item = this.data.todo[index];
        let newTodo = this.data.todo;
        newTodo.splice(index, 1);
        let newFinished = [...this.data.finished, item];
        this.setData({
            todo: newTodo,
            finished: newFinished,
        })
    },
    delTodo(event: any) {
        const index = event.detail;
        wx.showModal({
            title: "将永久删除该todo",
            content: "此操作无法撤销",
            success: () => {
                let newTodo = this.data.todo;
                newTodo.splice(index, 1);
                this.setData({
                    todo: newTodo
                })
            }
        })
    },
    cancelFinish(event: any) {
        const index = event.detail;
        const item = this.data.finished[index];
        let newFinished = this.data.finished;
        newFinished.splice(index, 1);
        let newTodo = [...this.data.todo, item];
        this.setData({
            todo: newTodo,
            finished: newFinished
        })
    },
    deleteFinished(event: any) {
        const index = event.detail;
        wx.showModal({
            title: "将永久删除该todo",
            content: "此操作无法撤销",
            success: () => {
                let newFinished = this.data.finished;
                newFinished.splice(index, 1);
                this.setData({
                    finished: newFinished
                })
            }
        })
    },
})