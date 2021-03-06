/* global define, require, document */
/*
    http://jqueryui.com/dialog
 */
define(
    [
        'jquery', 'underscore',
        'components/base', 'brix/event',
        './position.js',
        './dialog.tpl.js',
        'css!./dialog.css'
    ],
    function(
        $, _,
        Brix, EventManager,
        position,
        template
    ) {
        /*
            var Dialog = require('components/dialog')
            var content = '\
                <div class="dialog-header">\
                    <h4 class="dialog-title">abc</h4>\
                </div>\
            '
            var dialog = new Dialog({
                content: content,
                modal: true,
                left: 100,
                top: 100
            })
            dialog.on('open.dialog',function(){
                debugger
            })
            dialog.open()
         */

        var TRANSITION_DURATION = 150
        var EASING = 'swing'
        var NAMESPACE = '.dialog'

        function Dialog() {
            // 支持构造函数
            if (arguments.length) {
                this.options = _.extend({}, this.options, arguments[0])
                this.init()
                this.render()
                this.fill()
            }
        }

        _.extend(Dialog.prototype, Brix.prototype, {
            options: {
                placement: 'right', // top bottom left right
                align: 'top', // left right top bottom
                left: undefined,
                top: undefined,
                width: 'auto',
                height: 'auto',
                offset: {
                    left: 0,
                    top: 0
                },

                content: '',

                closable: true, // 是否可关闭
                modal: false, // 是否模块对话框
                singleton: true // 是否单例模式
            },
            init: function() {
                this.$element = $(this.element || this.options.element)
                this.$manager = new EventManager('bx-')

                // 支持自定义 CSS 样式
                if (this.options.css) require('css!' + this.options.css)

                if (this.options.content.indexOf('<') === -1) this.options.content = '<div class="dialog-body">' + this.options.content + '<div>'

                return this
            },
            render: function() {
                this.$manager.delegate(this.$element, this)
                this._autoHide()
            },
            destroy: function() {
                var type = 'keyup.dialog_autohide_' + this.clientId
                $(document.body).off(type)

                if (this.$manager) this.$manager.undelegate(this.$element)
                this.$relatedElement.remove()
            },
            fill: function() {
                var html = _.template(template)(this.options)
                this.$relatedElement = $('div.dialog.dialog-singleton')

                if (!this.options.singleton || !this.$relatedElement.length) {
                    this.$relatedElement = $(html).appendTo(document.body).hide()
                }

                if (this.options.singleton) {
                    this.$relatedElement
                        .removeClass('dialog-top dialog-bottom dialog-left dialog-right')
                        .addClass('dialog-' + this.options.placement)
                        .find('.dialog-close')[
                            this.options.closable ? 'removeClass' : 'addClass'
                        ]('hide').end()
                        .find('.dialog-content').html(this.options.content)
                }

                this.$relatedElement.css({
                    width: this.options.width,
                    height: this.options.height
                })

                if (this.options.modal) {
                    this.$backdropElement = $('.dialog-backdrop')
                    if (!this.$backdropElement.length) {
                        this.$backdropElement = $('<div class="dialog-backdrop"></div>').hide()
                            .appendTo(document.body)
                    }
                }

                this.$manager.delegate(this.$relatedElement, this)
                return this
            },
            open: function() {
                if (!this.element &&
                    this.options.element &&
                    (this.options.element !== this.$element[0])
                ) this.$element = $(this.options.element)

                this.fill()

                var offset = this._offset()
                this.$relatedElement.show()
                    .stop()
                    .css(
                        position.start(this.$relatedElement, offset)
                    )
                    .animate(
                        position.end(this.$relatedElement, offset),
                        TRANSITION_DURATION,
                        EASING
                    )

                if (this.options.modal) {
                    $(document.body).addClass('modal-open')
                    this.$backdropElement.show()
                }

                this.trigger('open' + NAMESPACE)

                return this
            },
            close: function() {
                if (!this.$relatedElement || !this.$relatedElement.length) return this

                var that = this
                var offset = this._offset()
                this.$relatedElement
                    .stop()
                    .animate(
                        position.start(this.$relatedElement, offset),
                        TRANSITION_DURATION,
                        EASING,
                        function() {
                            that.$relatedElement.hide()
                        }
                    )

                if (this.options.modal) {
                    $(document.body).removeClass('modal-open')
                    this.$backdropElement.hide()
                }

                this.trigger('close' + NAMESPACE)
                return this
            },
            _offset: function() {
                var offset = this.options.left !== undefined && this.options.top !== undefined ? {
                    left: this.options.left,
                    top: this.options.top
                } : position(this.$element, this.$relatedElement, this.options.placement, this.options.align)
                offset = {
                    left: offset.left + (this.options.offset.left || 0),
                    top: offset.top + (this.options.offset.top || 0)
                }
                return offset
            },
            _autoHide: function() {
                var that = this
                var type = 'keyup.dialog_autohide_' + this.clientId
                $(document.body).off(type)
                    .on(type, function(event) {
                        if (event.keyCode === 27) that.close()
                    })
            }
        })

        return Dialog
            // return Brix.extend({})
    }
)