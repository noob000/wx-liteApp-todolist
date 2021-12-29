# 微信小程序入门

## 环境搭建
1. 下载微信开发者工具并安装  
   [下载链接](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
  
2. 建立一个todolist demo  
   该demo只为帮助熟悉微信小程序的开发，项目可以使用不使用云服务
## 与基于react进行web开发进行对比  
### 一些差异 
html对应于小程序的wxml,常用html标签例如div,p等在wxml中可以使用view标签代替，微信小程序开发中除了使用js与ts，微信还提供了wxs作为可选的脚本语言。
  一个JSX语法的标签   
  `<div className="demo">{val}</div>`  
  换成wxml标签如下  
  `<view class="demo">{{val}}</view>`  
  [wxml中的监听事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)  
  [wxml中的标签](https://developers.weixin.qq.com/miniprogram/dev/component/)  

 - - -

### 页面以及路由
如果index.js文件中包含一个Page()构造器，说明该文件对应微信小程序中的一个页面，如果想通过小程序下方的tab点击跳转到对应页面，需要在app.json文件中注册，代码如下：
```
{
   "pages": [
    "pages/home/index",
    "pages/todolist/index"
  ],
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/home/index",
        "text": "home"
      },
      {
        "pagePath": "pages/todolist/index",
        "text":"todo"
      }
    ]
  },
}
```  
pages对应页面所在文件的路径，tabBar对应下方tab中显示标签的文本，以及对应的页面,tabBar样式的设置也在app.json中。 
[关于tabBar具体设置请参考](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar)。

react中可以通过react-router中的link标签实现路由跳转，微信小程序可以通过提供的navigator标签实现。  
[关于navigator标签及路由跳转详情请参考](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)


---
### 如何定义一个页面（组件）的初始数据  
  react class component中在constructor中定义state初始数据可能需要的代码如下：
   ```
  ...
  constructor(props){
     super(props);
     this.state={
        year:2021,
        month:12,
        day:12.22
     }
  }
  ```
  在微信小程序中定义一个页面的初始数据，应在对应页面文件夹下的index.js文件中定义，代码如下：
  ```
  page({
     data:{
        year:2021,
        month:12,
        day:12.22
     }
     ...
  })
  ```
  在该文件夹下的文件中访问data对象下的属性，只需填入所需属性的名称，大概如下：
  ```
  <view>{{year}}</view>
  ```
  
  与定义初始数据方式相同，可以在page()中定义页面加载时执行的函数，以及其他一些自定义的事件响应函数,例如handleClick等等。  
  [具体请参考](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html)

---  
### 自定义组件  
 [建议该部分阅读微信小程序官方开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

---
### 生命周期
react中 class component常常在componentDidMount中发送请求获取数据，在微信小程序中对应的生命周期为onLoad。当class component中state发生变化时会触发componenDidUpdate生命周期，在微信小程序中则没有对应的生命周期。[具体生命周期请参考]()

---
### 数据的流动  
  
  react中实现受控组件  
  ```
  <input  
  onChange={(event)=>{this.setState({inputValue:event.target.value})}}  
  value={this.state.inputValue}/>
  ```

  微信小程序中实现了类似vue中实现的双向绑定，语法较为接近，代码如下：  
  `<input model:value="{{inputValue}}"`  
  在vue中：  
  `<input v-model="inputValue"/>`  
  当输入框状态发生变化，index.ts中data的inputValue属性会自动更新，input的初始值即为data.inputValue的值.如不想实现受控组件，只想设置input的初始状态,只需要设置value：  
  `<input value="{{inputValue}}">`  
  [具体请参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/two-way-bindings.html)  

  class component对state进行更新是通过this.setState({year:2020})实现的，在微信小程序中写法类似，通过this.setData({year:2020})语句更新。  
  如果修改的时候通过 `this.data.year=2020`这种方式修改，虽然值会发生改变，但如果`<view>`标签中绑定了该属性值，当该属性发生变化时，UI层不会同步更新(同react一样），故不建议通过这种方式更新。（虽然在二者写法十分接近，但实现的效果有所不同，具体在todolist demo中有写）  
  
  function component中可以利用useEffect钩子函数，当一个或多个由useState定义的变量或props传递的变量发生变化时执行对应的副作用函数。在微信小程序中,可以通过自定义组件中提供的数据监听器实现同样的效果，假设有如下场景，变量c依赖于变量a,b当a,b发生变化时，c需要同步更新.  
  在react中可能需要的代码如下:
  ```
  const [a,setA] = useState(5);
  const [b,setB] = useState(10);
  const [c,setC] = useState(15);
  useEffect(()=>{
     setC(a+b)
  },[a,b])
  ```
  在微信小程序中,通过数据监听器observers实现，在自定义组件中实现相同的效果的代码如下：
  ```
  Component({
     ...,
     data:{
        a:5,
        b:10,
        c:15
     },
     observers:{
        "a,b":function(a,b){
           this.setData({c:a+b})
        }
     }
  })
  ```
  [监听器相关请参考](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html)

  react中参数的传递可能有以下几种情况：
  1. 父子组件通过props传递 
  2. 兄弟组件通过共享父组件状态，在props中加入修改state的回调函数，控制状态.
   
  如果有一个变量需要被多个组件或页面获取，可以将该变量储存在app.js文件中，并通过以下方式获取，代码如下：
  ```
  app({
     globaldata:{
        username:'tom',//username需要被多个组件和页面获取
        ...
     },
     onLanuch:()=>{},
     onShow:()=>{},
  })
   ```
   页面想要获取该state的代码如下：
   ```
   pages/subPage1/index.js
   const app = getApp();
   const username = app.globaldata.username
   ```
   如果想在页面中对该state进行修改，直接修改即可：
   ```
   pages/subPage1/index.js
   const app = getApp();
   app.globalData.username = 'lihua';
   console.log(app.globalData.username) //lihua
   ```
   如果有：
   ```
   //pages/subPage1/index.js
   const app = getApp();
   const username = app.globalData.username;

   Page({
       data:{
           username:username
          },
        setUserName(event){
             app.globalData.username="lihua"；
             console.log(this.data.username)  //tom
             console.log(app.globalData.username)  //lihua
        }
   })
   ```
   ```
   //pages/subPage1/index.wxml
   ...
   <view bindtap="setUserName">{{username}}</view>

   ```
   当点击时app.globalData.username会发生变化，但是页面的data中的username不会发生改变，故view标签中的值也不会发生改变。

   自定义组件的嵌套场景下,在父组件中可以通过this.selectComponent获取子组件的实例对象，从而获取子组件的一些状态.
   ```
   //pages/subPage1/index.js
   Page({
     data: {},
     getChildComponent: function () {
         const child = this.selectComponent('.my-component');//请先确保父组件注册了子组件
         console.log(child.data) //{...}
     }
    })
   ```
   
   另外一种方式,可以通过自定义监听事件的方式实现父子组件之间的传值，具体可参考todolist demo中的使用.[也可参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html#%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88)

   ---
### 列表渲染与条件渲染  
  react中进行一个列表渲染可能需要的代码如下：
  ```
  <ul>
  {this.state.dataArray.map((element,index)=><li>index is {index},and the value is{element}</li>)}
  </ul>
  ```  

  微信小程序中实现相同效果的列表渲染代码如下：
  ```
  <view wx:for="{{dataArray}}">the index is{{index}},and the value is{{item}}</view>
  ```
  数组下标变量名默认为index，当前项变量名为item，若数组当前项为对象，可以通过item.xx读取对应的属性。  
  [具体请参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)  

  react中通过变量控制一个组件的渲染可能需要的代码如下
  ```
  const isRender:boolean = this.state.isRender
  return(
    <div>
      {isRender&&<p>some text</p>}
    </div> 
  )
  ```
  微信小程序中实现相同效果的条件渲染代码如下
  ```
  <view wx:if="{{isRender}}">some text</view>
  ```
  [具体请参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html)  
  react中不存在模版的概念，如果想根据输入值生成可复用的jsx可能需要的代码如下
  ```
  ...
  const fn=({year,month,day})=>
        <div>
          <p>year:{year}</p>
          <p>month:{month}</p>
          <p>day:{day}</p>
        </div>
  ...
  return(
     <div>
       {fn(data)}
     </div>
  )
  ```
  微信小程序中可以通过模版实现相同效果：  
  在wxml文件中定义一个模版
  ```
  <template name="date">
  <view>
    <view>year:{{year}}</view>
    <view>month:{{month}}</view>
    <view>day:{{day}}</view>
  </view>
  </template>
  ```
  在wxml中插入对应name的模版：
  ```
  <template is="date" data="{{item}}"/>
  ```  

## 实现一个简单的todolist
### 新建一个Page并设置初始的数据
```
//  pages/todolist/index.ts
Page({
   data:{
      todo:[],
      finished:[]。
      content:null,  //储存todo的内容
      date:null      //储存todo的时间
   }
})
```
```
//  pages/todolist/index.wxml 一个简单的界面
<view>
    <view>this is a todolist</view>
    <input placeholder="请输入todo的内容" model:value="{{content}}" />
    <input placeholder="请输入todo对应的时间" model:value="{{date}}" />
    <button bindtap="addTodo">添加todo</button>
    <view>
        <view>已完成</view>
        <view wx:for="{{todo}}">内容：{{item.content}},日期：{{item.date}}</view>
    </view>
    <view>
        <view>未完成</view>
        <view wx:for="{{finished}}">内容：{{item.content}},日期：{{item.date}}</view>
    </view>
</view>
```

### 注册页面对应的路由
在app.json中注册对应的页面即路由，可以通过底部的tabBar点击跳转到todolist页面。
```
//  app.json
{
   ...
"pages": [
    "pages/home/index",//不是必要的页面
    "pages/todolist/index"
  ],
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/home/index",//不是必要的页面
        "text": "home"
      },
      {
        "pagePath": "pages/todolist/index",
        "text":"todo"
      }
    ]
  },
}
```

### 添加新增todo的逻辑，以及完成todo的逻辑
上面代码input已经完成与content和date的双向绑定。新增todo通过点击button将此时输入框的内容保存到this.data.todo中并清除输入框的内容，如果输入框内容为空则创建一个toast提示。完成todo通过点击todo将对应部分移至finished中。代码如下：
```
//  page/todolist/index.ts
Page({
  ...
++   addTodo() {
        if (this.data.content === null || this.data.date === null) {
            wx.showToast({
                title: "请填入内容与时间",
                icon:"none",//有图标时最多显示7个字符
                duration: 2000
            })
        }
        else {
            const item = {
                content: this.data.content,
                date: this.data.date,
            }
            const newTodo: any = [...this.data.todo, item];
            this.setData({
                todo: newTodo,
                content: null,
                date: null
            })
        }
    },
++   finishTodo(event: any) {
        const targetIndex = event.target.dataset.index;
        let newToDo: any = this.data.todo;
        const item = this.data.todo[targetIndex];
        newToDo.splice(targetIndex, 1);
        const finished: any = [...this.data.finished, item];
        this.setData({
            todo: newToDo,
            finished: finished
        })
    },
++   deleteTodo(event: any) {
     const targetIndex = event.target.dataset.index;
        const content = (this.data.finished[targetIndex] as any).content;
        let finished = this.data.finished;
        finished.splice(targetIndex, 1);
        this.setData({
            finished: finished
        })
        wx.showToast({
            title: `已完成:${content}`,
            icon:"none"
        })
    }
})
```
```
//  page/todolist/index.wxml

...

<view>
        <view>已完成</view>
--      <view wx:for="{{todo}}">内容：{{item.content}},日期：{{item.date}}</view>
++      <view wx:for="{{todo}}" data-index="{{index}}" bindtap="finishTodo">内容：{{item.content}},日期：{{item.date}}</view>
</view>
<view>
        <view>未完成</view>
--      <view wx:for="{{finished}}">内容：{{item.content}},日期：{{item.date}}</view>
++      <view wx:for="{{finished}}" data-index="{{index}}" bindtap="deleteTodo">内容：{{item.content}},日期：{{item.date}}</view>
</view>
```
至此,在输入框输入todo的内容以及时间之后，点击“添加todo”即可新增todo，点击某一项todo之后会将该todo移至已完成，点击已完成的某一项todo会将其删除。


### 一个问题(个人理解可能有误)
#### 目标：将上述index.wxml中view标签换成checkbox，将已完成和未完成的wxml拆成两个独立的component并根据页面传给component的properties进行列表渲染。  
#### 意义：创造一个常见的场景：父组件中包含多个子组件，子组件分别接受来自父组件的参数，不同子组件接受的参数相互依赖，一个参数发生改变其余子组件接受的参数都有可能发生变化。

为了创造上述场景做出的改变如下：  
   创建一个与page同级的文件夹名为components，在components文件夹中创建一个unfinish文件夹，该文件夹中包含index.js，index.wxml，index.wxss，index.json 四个文件。  
在index.js中有如下代码:

```
//  components/unfinish/index.js
Component({
    properties: {
        todo: Array,
    },
})
```
上面代码表示unfinish文件夹下包含一个自定义组件，该自定义组件接受父组件传递给其一个名为todo的参数，该参数是一个数组。  
为了声明该文件夹下包含一个自定义组件，需要在index.json文件中声明：
```
//components/unfinish/index.json
{
    "component":true
}
```
在其他页面中使用自定义组件，需要在该页面的json文件中声明，本例子中我们将在todolist页面中使用该自定义组件，故作出如下修改：
```
// pages/todolist/index.json
{
    ...
++    "usingComponents": {
        "unfinish":"../../components/unfinish/index",
    }
}
```
自定义组件输出的wxml模版写在该文件夹的index.wxml中如下：
```
// components/unfinsih/index.wxml
<view>
    <view>未完成</view>
    <checkbox-group>
        <view wx:for="{{todo}}" wx:key="{{item.content}}">
            <checkbox value="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
        </view>
    </checkbox-group>
</view>
```
我希望这个自定义组件能完成这些事情：
1. 根据父组件传递的todo数组列表渲染生成checkbox数组
2. 当点击某一个checkbox标志该事件已完成时，父组件中将该事件从todo数组中移动到父组件的finished数组中  
3. 当长按某一个checkbox标志该事件需要被删除，将会弹出一个modal，若确认，父组件应将该事件从todo数组中删除，否则隐藏modal。

为此我需要做的是给checkbox添加监听事件，点击事件或长按事件触发时，父组件中todo数组和finished数组发生对应改变。  
如果在react框架中实现上述逻辑可以通过父组件传递给子组件一个包含setTodo(...)，setFinished(...)的函数，将对应改变后的数组填入即可。  
在微信小程序中。实现上述逻辑的方式是，父组件中声明一个标志着checkbox发生更改的自定义事件，当子组件点击一个checkbox时通过this.triggerEvent触发该自定义事件，并传递给其一个数组下标，在父组件中编写该事件被触发时执行的回调函数，同样道理设置删除的逻辑。
为此新增的代码如下：
```
//  components/unfinish/index.js
Component({
    properties: {
        todo: Array,
    },
    methods: {
        finishTodo(event) {
            const index = event.detail.value[0];
            this.triggerEvent("finishtodo", index);
        },
        deleteTodo(event) {
            const index = event.currentTarget.dataset.index
            this.triggerEvent("deltodo", index)
        }
    }

})
```

```
// components/unfinsih/index.wxml
<view>
    <view>未完成</view>
    <checkbox-group bindchange="finishTodo">
        <view wx:for="{{todo}}" wx:key="{{item.content}}">
            <checkbox value="{{index}}"  bindlongpress="deleteTodo" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
        </view>
    </checkbox-group>
</view>
```


```
// pages/todolist/index.ts
page({
...
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
```

   
```
// pages/todolist/index.wxml
...
--  <view>
--        <view>已完成</view>
--        <view wx:for="{{todo}}" data-index="{{index}}" bindtap="finishTodo">内容：{{item.content}},日期：{{item.date}}</view>
--  </view>
++  <unfinish bind:finishtodo="finishTodo" bind:deltodo="delTodo"todo="{{todo}}" id="unfinish" update="{{update}}" />
```
同样的,我将原先todolist/index.wxml中生成已完成列表的部份拆成单独的一个自定义组件，定义方式同上面相似.  
该组件实现的功能是点击已完成的checkbox,对应的事件将会从父组件的finished数组中移动到unfinish数组中。当长按时将会弹出一个modal询问是否永久删除该事件，确认则永久删除否则隐藏modal。  
定义该子组件过程省略，下面给出实现该逻辑的代码：
```
// components/finished/index.js
Component({
    properties: {
        finished: Array
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
    }
})
```

```
// components/finished/index.wxml
<view>
        <view>已完成</view>
        <checkbox-group bindchange="cancelFinish">
            <view wx:for="{{finished}}" data-index="{{index}}">
                <checkbox value="{{index}}" checked="{{true}}" bindlongpress="deleteFinished" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
            </view>
        </checkbox-group>
</view>
```

```
//pages/todolist/index.wxml
...
--  <view>
--     <view>未完成</view>
--     <view wx:for="{{finished}}" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</view>
    </view>
++  <finished bind:cancelfinish="cancelFinish" bind:delfinished="deleteFinished" finished="{{finished}}" id="finished"/>
...
```
完成上述工作，理论上todolist已经完成了.这个时候会发现一个问题，当点击一个未完成的todo时，他会移动到已完成列表，但是此时，未完成列表的下一项会自动变为已完成状态。出现这个现象的原因是什么？  
在react中，当组件接受的参数发生变化时，组件会重新渲染。在这个例子中，因为checkbox标签是根据父组件传递todo数组进行列表渲染生成，所以点击未完成todo会移动至已完成列表证明组件的状态的确已经更新了，下一个未完成todo自动变为已完成的原因是，checkbox.group标签中的部分状态没有发生更新。上述代码中todo的移动通过在checkbox.group标签上添加change事件完成，回调函数接受的event.detail.value数组中包含着已选中的项，当选中一个checkbox时对应下标会出现在数组中，但是当该checkbox被移动至已完成列表时，value数组的值并没有发生改变，所以下一个checkbox的下标自动减一就被选中了。这证明该子组件并没有发生react中整个组件的重渲染，而是只进行了与变化数据相关的标签的重渲染，所以checkbox.group的状态没有按照预期的变为原始状态。解决这个问题的方法是手动重置checkbox.group的状态，给checkbox标签添加checked属性，checked属性的值为子组件data中的一个boolean值，每一次移动todo都触发this.setData({checked:true})，这样相当于每次checkbox.group的状态都被重置为原始状态，就解决了checkbox会自动变为选中状态的原因。变动代码如下：
```
// components/unfinsih/index.js
...
++ data: {
++        checked: false
++    },
methods: {
         finishTodo(event) {
            const index = event.detail.value[0];
            this.triggerEvent("finishtodo", index);
++            this.setData({
++               checked: false
++            })
        },
         deleteTodo(event) {
            const index = event.currentTarget.dataset.index
            this.triggerEvent("deltodo", index);
++            this.setData({
++               checked: false
++            })
        }
```

```
// components/unfinish/index.wxml
...
--  <checkbox value="{{index}}"  bindlongpress="deleteTodo" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
++  <checkbox value="{{index}}" checked="{{checked}}" bindlongpress="deleteTodo" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
```
```
//components/finished/index.js
...
++ data: {
++        checked: true
++    },
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
++          this.setData({
++                checked: true
++          })
        },
```

```
//components/finished/index.wxml
...
--   <checkbox value="{{index}}" checked="{{true}}"  bindlongpress="deleteFinished" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
++   <checkbox value="{{index}}" checked="{{checked}}"  bindlongpress="deleteFinished" data-index="{{index}}">内容：{{item.content}},日期：{{item.date}}</checkbox>
```

至此，一个todolist已经完成。  

### 优化
上面代码中我们为了每次更新todo的时候checkbox的状态也随之更新，手动更新了checked。这种情况可以考虑添加一个对todo的observer，代码如下：
```
//components/unfinish/index.js
...
        finishTodo(event) {
            const index = event.detail.value[0];
            this.triggerEvent("finishtodo", index);
--          this.setData({
--                checked: true
--          })
        },
        deleteTodo(event) {
            const index = event.currentTarget.dataset.index
            this.triggerEvent("deltodo", index);
--          this.setData({
--                checked: true
--          })
        }
    },
++    observers:{
++        "todo":function(){
++            this.setData({checked:false})
        }
    }

```
同样在unfinish组件中对todo添加监听，这样将setData部分单独写在observer中可以理解为todo或finished改变的“副作用”。  

[自定义组件具体请参考](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)  
[checkbox相关请参考](https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html)  
[组件间传参请参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html#%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%A1%88)  
[todolist代码仓库](https://github.com/noob000/wx-liteApp-todolist)


## 需要注意的地方
1. 微信小程序iOS 环境下的 Promise 是一个使用 setTimeout 模拟的 Polyfill。这意味着 Promise 触发的任务为普通任务，而非微任务，进而导致 在 iOS 下的 Promise 时序会和标准存在差异。[详情请参考](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/js-support.html#Promise-%E6%97%B6%E5%BA%8F%E5%B7%AE%E5%BC%82)
2. 父子组件之间可以通过this.triggerEvent触发自定义事件达到通信目的，但是多层嵌套情况通过单个this.triggerEvent无法与更高层组件进行通信。  
举个例子，现在有三个组件a,b,c，a是b的父组件，b是c的父组件，a传给b 参数prop1，b将prop1传递给c。如果a在引用b时添加customEvent监听事件，则b可以通过this.triggerEvent("customeEvent")与a通信，但是c不可以通过this.triggerEvent("customeEvent")与a通信。  
为了实现目标效果，需要在b中对c添加customEvent事件，在该事件的响应函数中添加this.triggerEvent("customeEvent")，则c可以通过该事件与a通信。


