/* global define */
define(
    [
        'jquery', 'underscore',
        'brix/base',
        './boilerplate.tpl.js',
        'css!./boilerplate.css'
    ],
    function(
        $, _,
        Brix,
        template
    ) {
        /*
            ### 数据
                {}
            ### 选项
                data template
            ### 属性
                element moduleId clientId parentClientId childClientIds data template
            ### 方法
                .render()
            ### 事件
                ready destroyed
        */
        function boilerplate() {}

        _.extend(boilerplate.prototype, Brix.prototype, {
            options: {},
            render: function() {
                this.data = this.data || _.extend({}, this.options)
                var html = _.template(template)(this.data)
                $(this.element).append(html)
            }
        })

        return boilerplate
    }
)