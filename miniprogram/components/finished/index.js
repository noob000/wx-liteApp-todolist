Component({
    properties: {
        finished: Array
    },
    data: {
        checked: true
    },
    lifetimes: {
       attached:function(){
           console.log("attached")
       },
       ready:function(){
           console.log("ready")
       }
    },
    methods: {
        cancelFinish(event) {
            const selected = event.detail.value;
            let index = 0;
            if (selected.length > 0) {
                while (true) {
                    if (selected.indexOf(`${index}`) == -1) {
                        break;
                    } else index++;
                }
            }
            this.triggerEvent("cancelfinish", index);
        },
        deleteFinished(event) {
            const index = event.currentTarget.dataset.index;
            this.triggerEvent("delfinished", index)
        }
    },
    observers:{
        "finished":function(){
            this.setData({checked:true})
        }
    }
})