const mmxai = function (module) {
    /*
    初始化editorjs,必须首先调用
    参数：：
    container:editor对应的容器id，一般是一个div的id
    toolsConfig:dictionary,初始化工具集，有默认值
    */
    module.initEditor = function (container, toolsConfig =
        {

            /**
             * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
             */
            header: {
                class: Header,
                inlineToolbar: ['link'],
                config: {
                    placeholder: 'Header'
                },
                shortcut: 'CMD+SHIFT+H'
            },

            /**
             * Or pass class directly without any configuration
             */
            image: {
                class: SimpleImage,
            },

            list: {
                class: List,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+L'
            },

            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },

            quote: {
                class: Quote,
                inlineToolbar: true,
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                },
                shortcut: 'CMD+SHIFT+O'
            },

            warning: Warning,

            marker: {
                class: Marker,
                shortcut: 'CMD+SHIFT+M'
            },

            code: {
                class: CodeTool,
                shortcut: 'CMD+SHIFT+C'
            },

            delimiter: Delimiter,

            inlineCode: {
                class: InlineCode,
                shortcut: 'CMD+SHIFT+I'
            },

            // linkTool: LinkTool,

            embed: Embed,
            table: {
                class: Table,
                inlineToolbar: true,
                shortcut: 'CMD+ALT+T'
            },

            model: {
                class: MmxModel,
                inlineToolbar: true,
                shortcut: 'CMD+ALT+M'
            },
            symbol: mmxSymbol,

            parameter: {
                class: MmxParameter,
                inlineToolbar: true,
                shortcut: 'CMD+ALT+P'
            }


        }, onReadyCall = undefined, onChangeCall = undefined) {
        module.Global = {};
        if (onReadyCall !== undefined && onChangeCall !== undefined) {
            module.Global.editor = new EditorJS({ holder: container, tools: toolsConfig, onReady: onReadyCall, onChage: onChangeCall });
        }
        else if (onReadyCall !== undefined) {
            module.Global.editor = new EditorJS({ holder: container, tools: toolsConfig, onReady: onReadyCall });
        }
        else if (onChangeCall !== undefined) {
            module.Global.editor = new EditorJS({ holder: container, tools: toolsConfig, onReady: onReadyCall, onChage: onChangeCall }); module.Global.editor = new EditorJS({ holder: container, tools: toolsConfig, onChage: onChangeCall });
        }
        else {
            module.Global.editor = new EditorJS({ holder: container, tools: toolsConfig });
        }
        module.Global.loadInitData = false;

    };

    /*
    演示加载官方的editor json 数据
    */
    module.loadDemoJson = function () {
        let data = {
            // "time": 1600400191475,
            "blocks": [

                {
                    "type": "model",
                    "data": {
                        "logo": {
                            "板块头": {
                                "标题": ""
                            },
                            "列表": [
                                {
                                    "图片": "logo.svg",
                                    "标题": "天奕设计",
                                    "副标题": "TIANYI DESIGN\r123"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "姓名": {
                            "板块头": {
                                "标题": ""
                            },
                            "列表": [
                                {
                                    "姓名": "秒秒快",
                                    "职务": "高级设计总监",
                                    "电话": "Mob: 133 8866 0000"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "二维码": {
                            "板块头": {
                                "标题": ""
                            },
                            "列表": [
                                {
                                    "图片": "二维码.jpg "
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "公司名称": {
                            "板块头": {
                                "标题": ""
                            },
                            "属性": "666 8888",
                            "列表": [
                                {
                                    "正文": "北京天奕时代创意设计有限公司"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "地址": {
                            "板块头": {
                                "标题": ""
                            },
                            "列表": [
                                {
                                    "图片": "手机.svg",
                                    "正文": "13901218888"
                                },
                                {
                                    "图片": "电话.svg",
                                    "正文": "010-88345678/010-66788899"
                                },
                                {
                                    "图片": "邮箱.svg",
                                    "正文": "Goodmood@tianyi.com"
                                },
                                {
                                    "图片": "地址.svg",
                                    "正文": "北京市朝阳区农展馆南路\r13号瑞辰国际中心1807\r44444"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "横幅": {
                            "板块头": {
                                "标题": ""
                            },
                            "列表": [
                                {
                                    "横幅": "天奕设计，专注智能AI设计服务。"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "正文": {
                            "板块头": {
                                "标题": ""
                            },
                            "列表": [
                                {
                                    "正文": "\n项目咨询\n认证咨询\n法务咨询\n技术经纪\n融资中介\n其他服务\n知识产权\n财税咨询"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "model",
                    "data": {
                        "卖点列表": {
                            "板块头": {
                                "标题": ""
                            },
                            "属性": "",
                            "列表": [
                                {
                                    "主标题": "江河双水湾"
                                },
                                {
                                    "主标题": "江河双水湾",
                                    "副标题": "全程四星"
                                },
                                {
                                    "副标题": "全程四星",
                                    "卖点": "一价全含"
                                },
                                {
                                    "卖点": "一价全含",
                                    "正文": "市区游(占婆塔/五指岩/大教堂外观)+仙境湾+出海三岛（一岛/黑岛/竹岛）')"
                                },
                                {
                                    "正文": "市区游(占婆塔/五指岩/大教堂外观)+仙境湾+出海三岛（一岛/黑岛/竹岛）')",
                                    "卖点": "特别赠送"
                                },
                                {
                                    "卖点": "特别赠送",
                                    "次卖点": "滴滴咖啡，越南特色米粉，海鲜火锅"
                                },
                                {
                                    "次卖点": "滴滴咖啡，越南特色米粉，海鲜火锅"
                                }
                            ]
                        }
                    }
                },
                {
                    "type":"parameter",
                    "data": {
                        "参数": {
                            "垂直对齐": "垂直中部对齐",
                            "logo": [
                                31.13,
                                22.46,
                                68.87,
                                62.46
                            ],
                            "宣传": [
                                10.52,
                                69.72,
                                89.48,
                                94.0
                            ]
                        }
                    }
                }
            ],
            "version": "2.18.0"
        };
        this.Global.editor.render(data).then(() => {
            console.log('editor load json data successful');
        });
    }

    /*
    判断是否是正常页面还是参数页面
    */
    function isRegularPage(obj) {
        for (prop in obj) {
            if (prop == Number(prop)) {
                return true;
            }
        }
        return false;
    }

    /*
    正常页面
    */
    function processRegularPage(obj) {

    }

    /*
    背景和全局参数页面
    */
    function processOtherPage(obj) {

    }

    /*
    分页板块:使用header--level 2
    */
    function processPageBlock(obj) {

    }

    /*
    图片板块：使用simple-image-editorjs
    */
    function processImageBlock(obj) {

    }

    /*
    参数板块:在已有的Table插件上改造而成
    */
    function processParameterBlock(obj) {

    }

    /*
    演示如何分析word版的json数据，构建block集合
    */
    module.loadDemoWordJson = function () {
        let wordJson = {
            "背景图片及文字": {
                "0": {
                    "背景图片": {
                        "背景图片": "deco.png"
                    }
                }
            },
            "正面": [
                {
                    "logo": {
                        "板块头": {
                            "标题": ""
                        },
                        "列表": [
                            {
                                "图片": "logo.svg",
                                "标题": "天奕设计",
                                "副标题": "TIAN DESIGN"
                            }
                        ]
                    }
                },
                {
                    "姓名": {
                        "板块头": {
                            "标题": ""
                        },
                        "列表": [
                            {
                                "姓名": "秒秒学",
                                "职务": "设计师",
                                "电话": "Mob: 1990000 0000"
                            }
                        ]
                    }
                },
                {
                    " 地 址 ": {
                        " 地 址 ": "Tel ： 010-88345678/010-66788899\r 邮 箱 ：Goodmood@tianyi.com\r 北京市朝阳区农展馆南路 13 号瑞辰国际中心 1807"
                    }
                },
                {
                    "二维码": {
                        "二维码": "二维码.jpg"
                    }
                }
            ],
            "背面": [
                {
                    "页面参数": {
                        "页面参数": "垂直中部对齐"
                    }
                },
                {
                    "公司名称": {
                        "板块头": {
                            "标题": ""
                        },
                        "列表": [
                            {
                                "图片": "logo.svg",
                                "标题": "北京天奕时代创意设计有限公司",
                                "副标题": "BEIJING TIANYI DESIGN CREATIVE Co."
                            }
                        ]
                    }
                },
                {
                    "二维码": {
                        "二维码": "二维码.jpg"
                    }
                },
                {
                    "宣传": {
                        "宣传": "人工智能 · 设计师专注于创意"
                    }
                }
            ]
        };

    }
    return module;
} ({});