/* global define */
define(
    [
        'jquery', 'underscore', 'mock',
        'base/brix',
        'text!./sidebar.tpl',
        'less!./sidebar.less'
    ],
    function(
        $, _, Mock,
        Brix,
        template
    ) {
        /*
            ### 数据
                {
                    label: '',
                    href: '',
                    icon: '',
                    children: [
                        { label, href, icon, children }
                    ]
                }
            ### 选项
                TODO
            ### 属性
                TODO
            ### 方法
                TODO
            ### 事件
                TODO
            ===

            ### 公共选项
                data template css
            ### 公共属性
                element relatedElement 
                moduleId clientId parentClientId childClientIds 
                data template css
            ### 公共方法
                .render()
            ### 公共事件
                ready destroyed

        */
        function Sidebar() {}

        _.extend(Sidebar.prototype, Brix.prototype, {
            options: {
                data: {}
            },
            render: function() {
                // this.data = this.data || _.extend({}, this.options)
                // var html = _.template(template, this.data)
                // $(this.element).append(html)
                var $element = $(this.element).empty()
                fix(this.options.data, template)
                $element.append(
                    _.template(template, this.options.data)
                )

                $element
                    .on('click', 'a.sidebar-link', function(event) {
                        $(event.delegateTarget).find('a.sidebar-link').removeClass('active')
                        $(event.currentTarget).addClass('active')
                            .parents('ul').prev().addClass('active')
                    })
                    .on('click', 'a.sidebar-link-1', function(event) {
                        var li = $(event.target).closest('li')
                        li.find('>ul.sidebar').show()
                        li.siblings().find('>ul.sidebar').hide()
                    })
                    .find('a.sidebar-link-1:eq(0)').click()
            }
        })

        function fix(node, template, deep) {
            deep = deep === undefined ? 0 : deep
            node.deep = deep
            node.childrenFn = function() {
                if (!this.children || !this.children.length) return ''
                return _.template(template, this)
            }
            _.each(node.children, function(item /*, index*/ ) {
                fix(item, template, deep + 1)
            })
        }

        Mock.Random.extend({
            hanzi: function(min, max) {
                var len,
                    result = [];

                if (arguments.length === 0) len = this.natural(3, 7)
                if (arguments.length === 1) len = max = min
                if (arguments.length === 2) {
                    min = parseInt(min, 10)
                    max = parseInt(max, 10)
                    len = this.natural(min, max)
                }

                for (var i = 0; i < len; i++) {
                    result.push(
                        /* jshint -W061 */
                        eval(
                            '"\\u' +
                            (Math.round(Math.random() * 20901) + 19968).toString(16) +
                            '"'
                        )
                    )
                }
                return result.join('')
            },
            icon: function() {
                return this.pick([
                    'glyphicon glyphicon-asterisk',
                    'glyphicon glyphicon-plus',
                    'glyphicon glyphicon-euro',
                    'glyphicon glyphicon-minus',
                    'glyphicon glyphicon-cloud',
                    'glyphicon glyphicon-envelope',
                    'glyphicon glyphicon-pencil',
                    'glyphicon glyphicon-glass',
                    'glyphicon glyphicon-music',
                    'glyphicon glyphicon-search',
                    'glyphicon glyphicon-heart',
                    'glyphicon glyphicon-star',
                    'glyphicon glyphicon-star-empty',
                    'glyphicon glyphicon-user',
                    'glyphicon glyphicon-film',
                    'glyphicon glyphicon-th-large',
                    'glyphicon glyphicon-th',
                    'glyphicon glyphicon-th-list',
                    'glyphicon glyphicon-ok',
                    'glyphicon glyphicon-remove',
                    'glyphicon glyphicon-zoom-in',
                    'glyphicon glyphicon-zoom-out',
                    'glyphicon glyphicon-off',
                    'glyphicon glyphicon-signal',
                    'glyphicon glyphicon-cog',
                    'glyphicon glyphicon-trash',
                    'glyphicon glyphicon-home',
                    'glyphicon glyphicon-file',
                    'glyphicon glyphicon-time',
                    'glyphicon glyphicon-road',
                    'glyphicon glyphicon-download-alt',
                    'glyphicon glyphicon-download',
                    'glyphicon glyphicon-upload',
                    'glyphicon glyphicon-inbox',
                    'glyphicon glyphicon-play-circle',
                    'glyphicon glyphicon-repeat',
                    'glyphicon glyphicon-refresh',
                    'glyphicon glyphicon-list-alt',
                    'glyphicon glyphicon-lock',
                    'glyphicon glyphicon-flag',
                    'glyphicon glyphicon-headphones',
                    'glyphicon glyphicon-volume-off',
                    'glyphicon glyphicon-volume-down',
                    'glyphicon glyphicon-volume-up',
                    'glyphicon glyphicon-qrcode',
                    'glyphicon glyphicon-barcode',
                    'glyphicon glyphicon-tag',
                    'glyphicon glyphicon-tags',
                    'glyphicon glyphicon-book',
                    'glyphicon glyphicon-bookmark',
                    'glyphicon glyphicon-print',
                    'glyphicon glyphicon-camera',
                    'glyphicon glyphicon-font',
                    'glyphicon glyphicon-bold',
                    'glyphicon glyphicon-italic',
                    'glyphicon glyphicon-text-height',
                    'glyphicon glyphicon-text-width',
                    'glyphicon glyphicon-align-left',
                    'glyphicon glyphicon-align-center',
                    'glyphicon glyphicon-align-right',
                    'glyphicon glyphicon-align-justify',
                    'glyphicon glyphicon-list',
                    'glyphicon glyphicon-indent-left',
                    'glyphicon glyphicon-indent-right',
                    'glyphicon glyphicon-facetime-video',
                    'glyphicon glyphicon-picture',
                    'glyphicon glyphicon-map-marker',
                    'glyphicon glyphicon-adjust',
                    'glyphicon glyphicon-tint',
                    'glyphicon glyphicon-edit',
                    'glyphicon glyphicon-share',
                    'glyphicon glyphicon-check',
                    'glyphicon glyphicon-move',
                    'glyphicon glyphicon-step-backward',
                    'glyphicon glyphicon-fast-backward',
                    'glyphicon glyphicon-backward',
                    'glyphicon glyphicon-play',
                    'glyphicon glyphicon-pause',
                    'glyphicon glyphicon-stop',
                    'glyphicon glyphicon-forward',
                    'glyphicon glyphicon-fast-forward',
                    'glyphicon glyphicon-step-forward',
                    'glyphicon glyphicon-eject',
                    'glyphicon glyphicon-chevron-left',
                    'glyphicon glyphicon-chevron-right',
                    'glyphicon glyphicon-plus-sign',
                    'glyphicon glyphicon-minus-sign',
                    'glyphicon glyphicon-remove-sign',
                    'glyphicon glyphicon-ok-sign',
                    'glyphicon glyphicon-question-sign',
                    'glyphicon glyphicon-info-sign',
                    'glyphicon glyphicon-screenshot',
                    'glyphicon glyphicon-remove-circle',
                    'glyphicon glyphicon-ok-circle',
                    'glyphicon glyphicon-ban-circle',
                    'glyphicon glyphicon-arrow-left',
                    'glyphicon glyphicon-arrow-right',
                    'glyphicon glyphicon-arrow-up',
                    'glyphicon glyphicon-arrow-down',
                    'glyphicon glyphicon-share-alt',
                    'glyphicon glyphicon-resize-full',
                    'glyphicon glyphicon-resize-small',
                    'glyphicon glyphicon-exclamation-sign',
                    'glyphicon glyphicon-gift',
                    'glyphicon glyphicon-leaf',
                    'glyphicon glyphicon-fire',
                    'glyphicon glyphicon-eye-open',
                    'glyphicon glyphicon-eye-close',
                    'glyphicon glyphicon-warning-sign',
                    'glyphicon glyphicon-plane',
                    'glyphicon glyphicon-calendar',
                    'glyphicon glyphicon-random',
                    'glyphicon glyphicon-comment',
                    'glyphicon glyphicon-magnet',
                    'glyphicon glyphicon-chevron-up',
                    'glyphicon glyphicon-chevron-down',
                    'glyphicon glyphicon-retweet',
                    'glyphicon glyphicon-shopping-cart',
                    'glyphicon glyphicon-folder-close',
                    'glyphicon glyphicon-folder-open',
                    'glyphicon glyphicon-resize-vertical',
                    'glyphicon glyphicon-resize-horizontal',
                    'glyphicon glyphicon-hdd',
                    'glyphicon glyphicon-bullhorn',
                    'glyphicon glyphicon-bell',
                    'glyphicon glyphicon-certificate',
                    'glyphicon glyphicon-thumbs-up',
                    'glyphicon glyphicon-thumbs-down',
                    'glyphicon glyphicon-hand-right',
                    'glyphicon glyphicon-hand-left',
                    'glyphicon glyphicon-hand-up',
                    'glyphicon glyphicon-hand-down',
                    'glyphicon glyphicon-circle-arrow-right',
                    'glyphicon glyphicon-circle-arrow-left',
                    'glyphicon glyphicon-circle-arrow-up',
                    'glyphicon glyphicon-circle-arrow-down',
                    'glyphicon glyphicon-globe',
                    'glyphicon glyphicon-wrench',
                    'glyphicon glyphicon-tasks',
                    'glyphicon glyphicon-filter',
                    'glyphicon glyphicon-briefcase',
                    'glyphicon glyphicon-fullscreen',
                    'glyphicon glyphicon-dashboard',
                    'glyphicon glyphicon-paperclip',
                    'glyphicon glyphicon-heart-empty',
                    'glyphicon glyphicon-link',
                    'glyphicon glyphicon-phone',
                    'glyphicon glyphicon-pushpin',
                    'glyphicon glyphicon-usd',
                    'glyphicon glyphicon-gbp',
                    'glyphicon glyphicon-sort',
                    'glyphicon glyphicon-sort-by-alphabet',
                    'glyphicon glyphicon-sort-by-alphabet-alt',
                    'glyphicon glyphicon-sort-by-order',
                    'glyphicon glyphicon-sort-by-order-alt',
                    'glyphicon glyphicon-sort-by-attributes',
                    'glyphicon glyphicon-sort-by-attributes-alt',
                    'glyphicon glyphicon-unchecked',
                    'glyphicon glyphicon-expand',
                    'glyphicon glyphicon-collapse-down',
                    'glyphicon glyphicon-collapse-up',
                    'glyphicon glyphicon-log-in',
                    'glyphicon glyphicon-flash',
                    'glyphicon glyphicon-log-out',
                    'glyphicon glyphicon-new-window',
                    'glyphicon glyphicon-record',
                    'glyphicon glyphicon-save',
                    'glyphicon glyphicon-open',
                    'glyphicon glyphicon-saved',
                    'glyphicon glyphicon-import',
                    'glyphicon glyphicon-export',
                    'glyphicon glyphicon-send',
                    'glyphicon glyphicon-floppy-disk',
                    'glyphicon glyphicon-floppy-saved',
                    'glyphicon glyphicon-floppy-remove',
                    'glyphicon glyphicon-floppy-save',
                    'glyphicon glyphicon-floppy-open',
                    'glyphicon glyphicon-credit-card',
                    'glyphicon glyphicon-transfer',
                    'glyphicon glyphicon-cutlery',
                    'glyphicon glyphicon-header',
                    'glyphicon glyphicon-compressed',
                    'glyphicon glyphicon-earphone',
                    'glyphicon glyphicon-phone-alt',
                    'glyphicon glyphicon-tower',
                    'glyphicon glyphicon-stats',
                    'glyphicon glyphicon-sd-video',
                    'glyphicon glyphicon-hd-video',
                    'glyphicon glyphicon-subtitles',
                    'glyphicon glyphicon-sound-stereo',
                    'glyphicon glyphicon-sound-dolby',
                    'glyphicon glyphicon-sound-5-1',
                    'glyphicon glyphicon-sound-6-1',
                    'glyphicon glyphicon-sound-7-1',
                    'glyphicon glyphicon-copyright-mark',
                    'glyphicon glyphicon-registration-mark',
                    'glyphicon glyphicon-cloud-download',
                    'glyphicon glyphicon-cloud-upload',
                    'glyphicon glyphicon-tree-conifer',
                    'glyphicon glyphicon-tree-deciduous'
                ])
            }
        })

        Sidebar.prototype.options.data = Mock.mock({
            label: 'root',
            'children|3-5': [{
                label: '@HANZI(2,4)',
                href: '@URL',
                icon: '@ICON',
                'children|3-5': [{
                    label: '@HANZI(2,4)',
                    href: '@URL',
                    icon: '@ICON',
                    'children|0-5': [{
                        label: '@HANZI(2,4)',
                        href: '@URL',
                        icon: '@ICON'
                    }]
                }]
            }]
        })

        return Sidebar
    }
)