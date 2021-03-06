# ErrorTips

Brix 组件实现示例。{ .lead }

### 示例 <small>Examples</small>



<div class="bs-example">
    <div class="content">
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
        <a href="javascript:;" bx-name="components/errortips" bx-options="{duration:2000,width:200}" mx-click="confirm" class="btn btn-primary">Submit</a>
    </div>
</div>

<script type="text/javascript">
    require(['brix/loader', 'brix/event'], function(Loader, EventManager) {
        var manager = new EventManager('mx-')
        var owner = {
            confirm: function(event){
                var instance = Loader.query(event.currentTarget)[0]
                instance.showTips(Math.random())
            }
        }
        manager.delegate($('.bs-example'), owner)
    })
</script>

### 配置 <small>Options</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
width | number | `180` | 指定提示框的宽度。
msg | string | `'操作<span>不正确</span>，请重新操作'` | 指定提示文案。支持 HTML 标签。
duration | number | `2000` | 指定提示持续框显示的持续时间。
shake | boolean | `true` | 指定按钮是否抖动反馈。如果为 `false`，则只显示提示框。

### 方法 <small>Methods</small>

#### .showTips( [ message ] )

* .showTips( message )
* .showTips()

显示提示框。参数 message 是提示框里的提示内容，支持 HTML 标签。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/errortips')
instances.showTips('这里显示的是错误提示信息')
```

支持通过构造函数 `ErrorTips()` 创建：

```js
var instance = new ErrorTips(element, options)
instance.showTips('这里显示的是错误提示信息')
```

### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
complete.errortips | 提示框隐藏后被触发。监听函数接受 2 个参数：jQuery 事件对象 `event` 和 ErrorTips 实例。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/errortips')
instances.on('complete.errortips', function(event, errortips){
    console.log(event, errortips)
})
```
