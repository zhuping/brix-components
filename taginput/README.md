# TagInput

下拉框组件。{ .lead }

### 示例 <small>Examples</small>

<div class="bs-example">
    <div class="content">
        <input bx-name="components/taginput" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>通过 HTML 属性 `data-data` 指定初始值。</p>
        <input bx-name="components/taginput" data-data="['foo', 'bar', 'baz']" class="form-control">
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <p>通过 HTML 属性 `data-placeholder` 指定描述预期值的简短提示。</p>
        <input bx-name="components/taginput" data-placeholder="输入几个字符试试" class="form-control">
    </div>
</div>

<script>
    require(['brix/loader', 'underscore', 'mock'], function(Loader, _, Mock) {
        Loader.boot(function() {
            var data = Mock.mock({
                'list|5-10': ['@NAME', '@NATURAL']
            }).list
            var taginputs = Loader.query('components/taginput')
            _.each(taginputs, function(taginput, index) {
                taginput.on('change.suggest.input', function(event, value) {
                    if (!event.namespace) return
                    // if (!value) taginput.suggest.data([])
                    taginput.suggest.data(
                        _.filter(data, function(item, index){
                            return ('' + item).indexOf(value) !== -1
                        })
                    )
                })
            })
        })
    })
</script>

### 配置 <small>Options</small>

配置信息从 `data-*` 中读取，在组件中通过 `this.options` 访问。

Name | Type | Default | Description
:--- | :--- | :------ | :----------
data | array | `[]` | 初始值。例如 `['foo', 'bar', 'baz']`。
placeholder | string | `''` | 描述预期值的简短提示。

### 方法 <small>Methods</small>

#### .add( value )

增加一个值。

* .add( value )

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
instances.add('foo')
instances.add('bar')
```

#### .delete( value )

* .delete( value )
    
    删除一个值。

* .delete( )

    删除所有值。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
instances.delete('foo')
instances.delete()
```

#### .val( [ data ] )

* .val( data )
* .val()

读取或设置值。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
console.log(instances[0].val())
```


### 属性 <small>Properties</small>

Name | Type | Default | Description
:--- | :--- | :------ | :----------
suggest | Suggest | Suggest 组件实例 | `components/suggest`

提示补全的内容通过执行 `suggest.data( array )` 显示。

**使用示例**如下所示：

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/taginput')
_.each(instances, function(taginput, index) {
    // 监听 Suggest 组件触发的 change.suggest.input 事件
    taginput.on('change.suggest.input', function(event, value) {
        if (!event.namespace) return
        // 构造提示补全的内容，调用 taginput.suggest.data()
        taginput.suggest.data(
            [ Math.random(), Math.random(), Math.random() ]
        )
    })
})
```


### 事件 <small>Events</small>

Event Type | Description
:--------- | :----------
change.dropdown | 当日期组件变化时被触发。

```js
var Loader = require('brix/loader')
var instances = Loader.query('components/dropdown')
instances.on('change.dropdown', function(event, extra) {
    console.log(event, extra)
})
```
