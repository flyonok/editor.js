import './styles/table-constructor.pcss';
import { create, getCoords, getSideByCoords, checkFiledsIsRepeat } from './documentUtils';
import { HorizontalBorderToolBar, VerticalBorderToolBar } from './borderToolBar';
import { Table } from './table';
import { TableReadOnly } from './tableReadOnly'
import { ModelHeadTable } from './modelHeadTable'

const CSS = {
    editor: 'tc-editor',
    toolBarHor: 'tc-toolbar--hor',
    toolBarVer: 'tc-toolbar--ver',
    inputField: 'tc-modelTable__inp',
    readOnlyTable_inputField: 'tc-readOnlyTable__inp', // for readOnlyTable
    modelAddButton: 'mmxAddModelButton',
    // headTable_inputField:'tc-headTable__inp'
};

/**
 * Entry point. Controls table and give API to user
 */
export class TableConstructor {
    /**
     * Creates
     * @param {TableData} data - previously saved data for insert in table
     * @param {object} config - configuration of table
     * @param {object} api - Editor.js API
     */
    constructor(data, config, api) {
        this._api = api; // add by xiaowy

        this._repeatWordsColl = [];
        this._tableData = { 'content': [], 'hiddenFields': '', 'fields': [] }; // 添加fields保存数据记录
        this._doHiddenField = true; // 默认是隐藏不显示的字段 2021/04/29 xiaowy
        this._modelJson = {}; // 保存造型的数据库记录属性 2021/04/07
        let _innerData = this._cdrJsonConvert(data);
        this._repeat = _innerData.Repeat; // add by xiaowy whether can add table parameter


        // console.log('repeat:', this._repeat);

        this._makeModelTables(_innerData, config);
    }

    /**
     * @private
     * find model thumb from chenhuaan interface
     * 
     */
    _getModelThumbFromParent(data) {
        if (window.mmxaiGetAllModelList !== undefined && data.name !== undefined) {
            try {
                // console.log('enter _getModelThumbFromParent');
                let retArr = window.mmxaiGetAllModelList();
                // console.log('mmxaiGetAllModelList', retArr);
                if (retArr) {
                    let find = retArr.find((item) => {
                        return item.Name === data.name;
                    })
                    if (find !== undefined) {
                        // console.log('find model thumb', data.name);
                        // data.imgByteStr = find.imgByteStr;
                        // data.Thumb = find.Thumb;
                        data.imgBase64 = find.imgBase64;
                        data.Repeat = find.Repeat; // 表示是否可以增加表格参数！！！ 2020/10/07
                        this._repeat = data.Repeat; // 后面不少地方用了这个成员来判断！！！ 2020/11/24
                        this._tableData['hiddenFields'] = find.Hidden; // 记录隐藏字段集合 2021/01/12
                        this._tableData['fields'] = find.Fields.trim().split(' '); // 修正初始化table丢失列 2021/04/29
                        if (find.Repeat && (find.Repeat === 1 || find.Repeat === 2)) {
                            // 以分析json数据优先 2020/11/23
                            let noRepeatWordsColl = !this._repeatWordsColl || !this._repeatWordsColl.length;
                            let fieldsColl = find.Fields.trim().split(' ');
                            if (noRepeatWordsColl || this._repeatWordsColl.length < fieldsColl.length) {
                                this._repeatWordsColl = fieldsColl;
                                // console.log('mmxaiGetAllModelList2', this._repeatWordsColl);
                            }
                        }

                        this._modelJson = find; // 2021/04/07 保存json数据，方便陈华安构建造型属性
                    } else {
                        console.log("Can't find model from chenhuaan api!!!!");
                    }
                }
            } catch (e) {
                console.log('error', e);
            }
            // console.log('exit _getModelThumbFromParent');
            // retArr.forEach((item, index) => {
            //   if (item.Name === data.name) {
            //     console.log('find model thumb', data.name);
            //     data.imgByteStr = item.imgByteStr;
            //     console.log('after ')
            //     return;
            //   }
            // });
        } else {
            // for debug
            const modelDataObj = [{
                Name: '正文',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '正文',
                Tags: '正文 智能 自动',
                Thumb: './assets/dog1.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: '项目符号',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '正文',
                Tags: '项目符号 编号 智能 自动',
                Thumb: './assets/dog2.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: '页标题',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '标题 副标题 引标',
                Tags: '页标题 标题 智能 自动',
                Thumb: './assets/dog3.jpg',
                Repeat: 0,
                Hidden: '标题',
            },
            {
                Name: '封面标题',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '标题 副标题 口号 引标',
                Tags: '封面标题 封面 标题 智能 自动',
                Thumb: './assets/dog4.jpg',
                Repeat: 0,
                Hidden: '副标题',
            },
            {
                Name: '小节',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '标题',
                Tags: '小节 标题 智能 自动',
                Thumb: './assets/dog4.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: '列表',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '标题 正文 图片',
                Tags: '列表 特性 卖点 排列 智能 自动',
                Thumb: './assets/dog5.jpg',
                Repeat: 0,
                Hidden: '图片',
            },
            {
                Name: '编号',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '标题 正文 图片',
                Tags: '编号 排列 数字 智能 自动',
                Thumb: './assets/dog6.jpg',
                Repeat: 0,
                Hidden: '正文',
            },
            {
                Name: '图片',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '图片',
                Tags: '图片 智能 自动',
                Thumb: './assets/dog6.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: 'logo',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '图片 标题 副标题 引标',
                Tags: 'logo 公司名称 智能 自动',
                Thumb: './assets/dog7.jpg',
                Repeat: 1,
                Hidden: '引标',
            },
            {
                Name: '二维码',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '图片',
                Tags: '二维码 扫码 智能 自动',
                Thumb: './assets/dog8.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: '地址',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '图片 正文',
                Tags: '地址 联系方式 电话 公司地址 智能 自动',
                Thumb: './assets/dog9.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: '强调',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '正文',
                Tags: '强调 文字 智能 自动',
                Thumb: './assets/dog9.jpg',
                Repeat: 0,
                Hidden: '',
            },
            {
                Name: '时间线',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '图片 标题 正文',
                Tags: '时间线 智能 自动',
                Thumb: './assets/dog10.jpg',
                Repeat: 0,
                Hidden: '正文',
            },
            {
                Name: '图片集',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '图片 标题 正文 图片 标题 正文',
                Tags: '图片集 图片 logo墙 人员介绍 合作伙伴 智能 自动',
                Thumb: './assets/dog11.jpg',
                Repeat: 0,
                Hidden: '标题',
            },
            {
                Name: '卖点列表',
                SubName: '智能选择',
                Info: '自动选择造型',
                Fields: '主标题 副标题 卖点 次卖点 正文',
                Tags: '主标题 封面标题 标题 卖点 特性 优点 特征 特色 优势 口号 卖点 次卖点 副标题 智能 自动',
                Thumb: './assets/dog11.jpg',
                Repeat: 2,
                Hidden: '副标题',
            }
            ]
            let find = modelDataObj.find((item) => {
                return item.Name === data.name;
            })
            console.log("find model deubg");
            if (find !== undefined) {
                console.log('find model thumb111', data.name);
                // data.imgByteStr = find.imgByteStr;
                // data.Thumb = find.Thumb;
                data.imgBase64 = find.imgBase64;
                data.Repeat = find.Repeat; // 表示是否可以增加表格参数！！！ 2020/10/07
                this._repeat = data.Repeat; // 后面不少地方用了这个成员来判断！！！ 2020/11/24
                this._tableData['hiddenFields'] = find.Hidden; // 记录隐藏字段集合 2021/01/12
                this._tableData['fields'] = find.Fields.trim().split(' '); // 修正初始化table丢失列 2021/04/29
                console.log("this._tableData['hiddenFields']", this._tableData['hiddenFields']);
                if (find.Repeat && (find.Repeat === 1 || find.Repeat === 2)) {
                    // 以分析json数据优先 2020/11/23
                    let noRepeatWordsColl = !this._repeatWordsColl || !this._repeatWordsColl.length;
                    let fieldsColl = find.Fields.trim().split(' ');
                    if (noRepeatWordsColl || this._repeatWordsColl.length < fieldsColl.length) {
                        this._repeatWordsColl = fieldsColl;
                        // console.log('mmxaiGetAllModelList2', this._repeatWordsColl);
                    }
                }

                this._modelJson = find; // 2021/04/07 保存json数据，方便陈华安构建造型属性

            }

        }
    }

    /**
     * @private
     * json数据转换
     * 从cdr的json到内部json
     */
    _cdrJsonConvert(data) {
        console.log('cdrData ', data)
        let cdrData = undefined;
        let _innerData = {};
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                // console.log('first cdrData1', data[prop]);
                cdrData = Object.assign({}, data[prop]);
                // console.log('first cdrData', cdrData);
                _innerData.name = prop;
                break;
            }
        }



        // if (cdrData.name) {
        //   _innerData.name = cdrData.name;
        // }
        // console.log(cdrData['板块头']);
        if (cdrData === undefined) {
            return _innerData;
        }
        this._getModelThumbFromParent(_innerData);
        // this._tableData = _innerData
        // console.log('after _getModelThumbFromParent', _innerData);
        if (cdrData['板块头'] && cdrData['板块头']['标题']) {
            _innerData.innerTitle = cdrData['板块头']['标题'];
        }

        if (cdrData['属性'] !== undefined) {
            _innerData.Tags = cdrData['属性'];
        }

        // console.log(cdrData['列表']);
        if (cdrData['列表']) {
            _innerData['content'] = [];
            // 对象分隔符，要对应具体的行号
            _innerData['contentSeprateIndex'] = [];
            let arr = cdrData['列表'];
            // todo:处理列表中有多个对象的问题
            if (Array.isArray(arr)) {
                let repeatRowIndex = 0;
                let isRepeat = this._checkModelParaListsIsRepeat(arr);
                if (isRepeat) {
                    if (!_innerData.Repeat) {
                        _innerData.Repeat = 1;
                    }
                }
                arr.forEach((item, index) => {
                    // console.log('item:', item);
                    for (let prop in item) {
                        if (item.hasOwnProperty(prop)) {
                            let rowArr = [];
                            // console.log('prop:', item[prop])
                            rowArr.push(prop);
                            rowArr.push(item[prop]);
                            // console.log('_cdrJsonConvert', rowArr);
                            _innerData['content'].push(rowArr);
                            repeatRowIndex++;
                        }
                    }
                    // if ( isRepeat && repeatRowIndex > 0 && index < arr.length - 1) {
                    if ((!this._repeat && this._repeat != 1) && isRepeat && repeatRowIndex > 0 && index < arr.length - 1) { // 2021/06/10
                        let temp = repeatRowIndex - 1;
                        _innerData['contentSeprateIndex'].push(temp);
                    }
                    else if (_innerData.Repeat == 1) { // 修改不含多个模型数据的bug 2021/06/10
                        _innerData['contentSeprateIndex'].push(this._repeatWordsColl.length - 1);
                    }

                });
                this._tableData['content'] = JSON.parse(JSON.stringify(_innerData['content']));
            }
        }
        console.log('_innerData:', _innerData);
        return _innerData;
    }

    /**
     * check model parameter list is repeat!
     * @param {Array} paraList
     * @return {Boolean} true: is repeat, false: not repeat
     */
    _checkModelParaListsIsRepeat(paraList) {
        // console.log('enter _checkModelParaListsIsRepeat')
        if (Array.isArray(paraList)) {
            let objNamesColl = '';
            paraList.forEach((item, index) => {
                for (let prop in item) {
                    if (item.hasOwnProperty(prop)) {
                        objNamesColl += prop + ' ';
                    }
                }
            });
            // console.log('_checkModelParaListsIsRepeat11', );
            let ret = checkFiledsIsRepeat(objNamesColl.trim());
            // first must initialize 2020/11/24
            if (ret.isRepeat) {
                // let tempArr = ret.repeatWords.trim().split(' ');
                // if (this._repeatWordsColl.length < tempArr.length) {
                //   this._repeatWordsColl = tempArr;
                // }
                this._repeatWordsColl = ret.repeatWords.trim().split(' ');
            } else {
                console.log('_checkModelParaListsIsRepeat1', this._repeat);
                let isRepeatValid = this._repeat && (this._repeat === 1 || this._repeat === 2);
                // 防止冲掉前面的数据 2020/11/24
                if (!isRepeatValid) {
                    this._repeatWordsColl = [];
                }
            }
            // console.log('_checkModelParaListsIsRepeat', ret);
            return ret.isRepeat;
        }
        return false;
    }

    /**
     * @private
     * Initial para table toolbar and event process
     * @returns {none}
     */
    _initToolBarAndEvent() {
        /** creating ToolBars */
        if (this._repeat !== undefined && this._repeat === 1 && this._verticalToolBar === undefined) {
            // 不再需要工具栏添加行了--xiaowy 2020/10/20
            // this._verticalToolBar = new VerticalBorderToolBar();
            // this._horizontalToolBar = new HorizontalBorderToolBar();
            // this._table.htmlElement.appendChild(this._horizontalToolBar.htmlElement);
            // this._table.htmlElement.appendChild(this._verticalToolBar.htmlElement);
            this._verticalToolBar = undefined;
            this._horizontalToolBar = undefined;
            // 不再需要工具栏添加行了 end
            /** Activated elements */
            this._hoveredCell = null;
            this._activatedToolBar = null;
            this._hoveredCellSide = null;

            /** Timers */
            this._plusButDelay = null;
            this._toolbarShowDelay = null;

            // this._hangEvents();
        }
        this._hangEvents();


    }

    /**
     * @private
     * 生成造型组件的所有表格，包含造型头，readOnlyTable, para table 和 toolbar；
     * 1、如果不是从构造函数调用来的，要先把this._contaier remove
     * 然后再构建readOnlyTable, para table 和 toolbar，并依次append；
     * todo:
     * 1、实现json适配
     * 2、实现用户选择
     */

    _makeModelTables(data, config = null, fromContructor = true) {
        let dataNotEmpty = false;
        // add by xiaowy 同时融合单击和双击事件
        this._clickTimeId = -1;
        if (config === null || config === undefined) {
            config = { rows: '1', cols: '2' };
        }
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                dataNotEmpty = true;
                break;
            }
        }
        try {
            if (dataNotEmpty && fromContructor) { // 初始化构造
                // comment 2021/01/11 xiaowy
                // this._makeModelNameTitle(data); // 造型标题
                // console.log('after _makeModelNameTitle');
                this._makeModelHeadTable(data); // 造型头
                // console.log('after _makeModelHeadTable');
                this._makeReadOnlyTable(); // 造型表格头
                // console.log('after _makeReadOnlyTable');
                // 造型表格和其他组件的换行
                // 具体的造型参数
                this._table = new Table();
                this._table.repeat = this._repeat;
                this._table.repeatWordsColl = this._repeatWordsColl;
                // if (this._repeat === -1) {
                //   this._table.firstColumnIsRead = false;
                // }
                // const size = this._resizeTable(data, config);
                // config['rows'] = this._tableData['fields'].length >0 ? this._tableData['fields'].length: 3;
                var size = { 'rows': 0, 'cols': 0 };
                let hiddenFields = [];
                if (this._tableData['hiddenFields']) {
                    hiddenFields = this._tableData['hiddenFields'].split(' ');
                }
                if (this._tableData['fields'].length && hiddenFields.length) {
                    // 修正循环列表丢失的问题 2021/05/07
                    if (data.content && data.content.length > this._tableData['fields'].length) {
                        // let repeatCnt = data.content.length / (this._tableData['fields'].length - hiddenFields.length);
                        let repeatCnt = data.content.length / (this._tableData['fields'].length);
                        console.log('repeatCnt:', repeatCnt);
                        for (var i = 0; i < repeatCnt; i++) {
                            config['rows'] = this._tableData['fields'].length;
                            var size1 = this._resizeTable({
                                'fields': this._tableData['fields'],
                                'contentSeprateIndex': data.contentSeprateIndex
                            }, config); // 修正丢失列bug 2021/04/29
                            size.rows += size1.rows;
                            size.cols = size1.cols;
                        }
                    } else {
                        config['rows'] = this._tableData['fields'].length;
                        size = this._resizeTable({
                            'fields': this._tableData['fields'],
                            'contentSeprateIndex': data.contentSeprateIndex
                        }, config); // 修正丢失列bug 2021/04/29
                    }
                } else {
                    size = this._resizeTable(data, config); // 修正丢失列bug 2021/04/29
                }

                this._fillTable(data, size);
                // let tablebr = document.createElement('br');
                // 构建造型容器
                // this._container = create('div', [CSS.editor, this._api.styles.block], null, [this._titleWrapper, this._modelHeadTable.htmlElement, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
                this._container = create('div', [CSS.editor, this._api.styles.block], null, [this._titleWrapper, this._modelHeadTable.htmlElement,
                this._readOnlyTable.htmlElement, this._table.htmlElement,
                this._createTooltipBtnForModel()
                ]);
                // this._container = create('div', [CSS.editor, api.styles.block], null, [this._titleWrapper, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
                // this._container = create('div', [CSS.editor, api.styles.block], null, [this._title, this._table.htmlElement]);
                this._initToolBarAndEvent();

            } else if (!dataNotEmpty && fromContructor) { // 如果没有具体的造型参数数据，一般是新建造型
                // comment 2021/01/11 xiaowy
                // this._makeModelNameTitle(data); // 造型标题
                this._makeModelHeadTable(data); // 造型头
                this._table = new Table();
                const size = this._resizeTable(data, config);
                this._makeReadOnlyTable(); // 造型表格头
                this._repeat = 1;
                this._table.repeat = this._repeat;
                this._table.repeatWordsColl = this._repeatWordsColl;
                // this._table.firstColumnIsRead = false; // to do 这里以后要注释掉
                this._container = create('div', [CSS.editor, this._api.styles.block], null, [this._titleWrapper, this._modelHeadTable.htmlElement,
                this._readOnlyTable.htmlElement, this._table.htmlElement,
                this._createTooltipBtnForModel()
                ]);
                this._initToolBarAndEvent();
            } else if (dataNotEmpty && !fromContructor) {
                /**
                 * 这里要实现用户选择具体造型的情况
                 */
                if (this._readOnlyTable === undefined) {
                    this._makeReadOnlyTable();
                    this._container.appendChild(this._readOnlyTable.htmlElement)
                }
                // 要重构表头 2021/01/21
                else {
                    this._makeReadOnlyTable();
                }
                this._repeat = data.Repeat;
                // 如果造型名称相同则不重构参数表 2020/10/07
                let mustRecontructParaTable = true;
                // console.log('see data subname', data.Subname);
                // console.log('see _modelJson.subname', this._modelJson.Subname);
                if (data.Name.indexOf(this._modelJson.Subname) == 0 || data.Subname == this._modelJson.Name) {
                    mustRecontructParaTable = !mustRecontructParaTable;
                }
                this._modelJson = data;
                // if (data.Name.trim() !== this._modelHeadTable.modelTypeName) {
                if (mustRecontructParaTable) {
                    console.log('call _recontructParaTable');
                    this._recontructParaTable(data);
                    // 这里会重复注册事件处理，导致注册事件会处理两次
                    // this._initToolBarAndEvent();
                } else { // show all rows
                    console.log('call this._displayAllTableRows()');
                    this._displayAllTableRows();
                }
            } else {
                console.log('not implemented!');
            }
        } catch (e) {
            console.log('_makeModelTables', e);
        }
    }

    /**
     * @private
     * 设置参数表头readOnlyTable是否可见
     * @param {Object} data: 造型参数数据集合
     */
    _isReadOnlyTableVisible(data) {
        console.log("_isReadOnlyTableVisible:", data);
        let dataNotEmpty = false;
        for (let prop in data) {
            if (data.hasOwnProperty(prop)) {
                dataNotEmpty = true;
                break;
            }
        }
        if (!dataNotEmpty) {
            this._readOnlyTable.htmlElement.classList.remove('mmxReadOnlyTableVisible');
            this._readOnlyTable.htmlElement.classList.add('mmxReadOnlyTableInvisible');
        } else {
            this._readOnlyTable.htmlElement.classList.remove('mmxReadOnlyTableInvisible');
            this._readOnlyTable.htmlElement.classList.add('mmxReadOnlyTableVisible');
        }
    }

    /**
     * @private
     * 构造造型大标题
     */
    _makeModelNameTitle(data) {
        // add by xiaowy 增加参数说明 2020/09/19,造型不需要增加注解
        // if (data && data.title) {
        this._titleWrapper = document.createElement('div');
        this._descTitle = document.createElement('H3');
        // let name = undefined;
        // for (prop in data) {
        //   if (data.hasOwnProperty(prop)){
        //     name = prop;
        //     break;
        //   }
        // }
        if (data.name !== undefined) {
            this._descTitle.innerHTML = '【' + '造型-' + data.name + '】';
            // this._descTitle.innerHTML = data.name;
        } else {
            this._descTitle.innerHTML = '【造型】';
        }
        this._descTitle.classList.add('mmxModelDecsTitle');
        // this._descTitle.appendChild(document.createElement('br'));
        this._titleWrapper.appendChild(this._descTitle);
        this._titleWrapper.appendChild(document.createElement('br'));
    }

    /**
     * 构建只读的table，只有一行和两列，为了和后面构建的参数table兼容，改造了原有的Table类
     * xiaowy 2020/09/21
     */
    _makeReadOnlyTable() {
        // overwrite config
        let config = { rows: '1', cols: '2' };
        // 需要增加隐藏按钮，而每个造型有不同的要求 2021/01/21
        if (this._readOnlyTable !== undefined) {
            if (this._readOnlyTable.rows) {
                this._readOnlyTable.delRow();
            }
        } else {
            this._readOnlyTable = new TableReadOnly(this.hiddenTableRowCallBack());
        }
        // let data = { content: [['元素名称', '内容']] };
        let data = {
            content: [
                ['对象', '内容']
            ]
        };
        const size = this._resizeReadOnlyTable(data, config);

        this._fillReadOnlyTable(data, size);

    }

    /**
     * @private
     * 构建造型的表头
     * xiaowy 2020/09/21
     */
    _makeModelHeadTable(data) {
        // overwrite config
        // let config = { rows: '1', cols: '2' };
        this._modelHeadTable = new ModelHeadTable(data, this._getModelDataFromDbDemo(), this._modelJson);
    }

    /**
     * returns html element of TableConstructor;
     * @return {HTMLElement}
     */
    get htmlElement() {
        return this._container;
    }

    /**
     * @private
     *
     *  Fill table data passed to the constructor
     * @param {TableData} data - data for insert in table
     * @param {{rows: number, cols: number}} size - contains number of rows and cols
     * 
     */
    _fillTable(data, size) {
        if (data.content !== undefined) {
            // comment 2021/04/15
            let hiddenFields = [];
            if (this._tableData['hiddenFields']) {
                hiddenFields = this._tableData['hiddenFields'].split(' ');
            }
            // let hiddenFieldCnt = 0;
            if (size.rows == data.content.length || hiddenFields.length == 0) {
                for (let i = 0; i < size.rows && i < data.content.length; i++) {
                    // not necessary 2021/04/15
                    // if (this._doHiddenField && hiddenFields.indexOf(data.content[i][0]) > 0) {
                    //   hiddenFieldCnt++;
                    //   continue;
                    // }
                    for (let j = 0; j < size.cols && j < data.content[i].length; j++) {
                        // get current cell and her editable part
                        // display none
                        // const input = this._table.body.rows[i - hiddenFieldCnt].cells[j].querySelector('.' + CSS.inputField);
                        const input = this._table.body.rows[i].cells[j].querySelector('.' + CSS.inputField);
                        // 处理回车换行和font标签
                        var b;
                        if (j == 0) {
                            b = data.content[i][j]
                            // 处理隐藏列有空数据的情况 2021/06/11
                            if (size.rows == data.content.length && hiddenFields.length > 0) {
                                if (hiddenFields.indexOf(b) >= 0) {
                                    this._table.body.rows[i].hidden = true;
                                }
                            }

                        } else {
                            b = this._convertFromTag(data.content[i][j])
                        }
                        console.log("content111", b);

                        if (this._repeat && this._repeat === 2 && j == 0) { // select tag
                            input.value = b;
                        } else {
                            input.innerHTML = b;
                        }
                    }
                }
            } else { // 有隐藏列
                var rowCnt = this._tableData['fields'].length;
                for (let i = 0; i < size.rows; i++) {
                    console.log('size.rows:', size.rows);
                    console.log('hiddenFields', this._tableData['hiddenFields']);
                    // not necessary 2021/04/15
                    // if (this._doHiddenField && hiddenFields.indexOf(data.content[i][0]) > 0) {
                    //   hiddenFieldCnt++;
                    //   continue;
                    // }
                    let fieldIndex = i % this._tableData['fields'].length;
                    let isRepeat = i >= rowCnt ? true : false;
                    for (let j = 0; j < size.cols; j++) {
                        // get current cell and her editable part
                        // display none
                        // const input = this._table.body.rows[i - hiddenFieldCnt].cells[j].querySelector('.' + CSS.inputField);
                        const input = this._table.body.rows[i].cells[j].querySelector('.' + CSS.inputField);
                        if (this._doHiddenField && hiddenFields.length) {
                            // let hiddenFields = this._tableData['hiddenFields'].split(' ');
                            if (hiddenFields.indexOf(this._tableData['fields'][fieldIndex]) >= 0) {
                                this._table.body.rows[i].hidden = true;
                            }
                        }
                        // 处理回车换行和font标签
                        var b;
                        if (j == 0) {
                            b = this._tableData['fields'][fieldIndex];
                        } else {
                            let findContent = this._findColumnContentFromTableData(data.content, this._tableData['fields'][fieldIndex], isRepeat, i)
                            // console.log('findContent', findContent);
                            if (findContent.length) {
                                b = this._convertFromTag(findContent)
                            } else {
                                b = findContent;
                            }
                        }
                        console.log("cell content112", b);

                        if (this._repeat && this._repeat === 2 && j == 0) { // select tag
                            input.value = b;
                        } else {
                            input.innerHTML = b;
                            // console.log('input.innerHTML', input.innerHTML);
                        }
                    }
                }
            }
        }
    }

    /**
     * @private
     * find correct content from table data array
     */
    _findColumnContentFromTableData(dataArr, columName, isRepeat = false, rowIndex) {
        // dataArr.forEach(element => {
        //   console.log('_findColumnContentFromTableData', columName);
        //   console.log('_findColumnContentFromTableData1', element);
        //   if (element[0].normalize() === columName.normalize()) {
        //     return element[1];
        //   }
        // });
        var i;
        if (isRepeat) {
            if (this._tableData['hiddenFields']) {
                i = Math.floor(rowIndex / this._tableData['fields'].length) * (this._tableData['fields'].length - this._tableData['hiddenFields'].split().length);
            } else {
                i = rowIndex;
            }
        } else {
            i = 0;
        }
        for (; i < dataArr.length; i++) {
            if (dataArr[i][0].normalize() === columName.normalize()) {
                return dataArr[i][1];
            }
        }
        console.log('not find column:' + columName);
        // throw Error('not find column:' + columName);
        return '';
    }

    /**
     * @private
     * convert div and font tag data to html5
     */
    _convertFromTag(tagContent) {
        let content = this._convertFontTag(tagContent);
        // console.log('content', content);
        // console.log("replaceAll", content.replaceAll);
        // let b = content.replaceAll('\n', '<br/>');
        const regrex = /[\r\n]/gi;
        // const regrex = RegExp('\r|\n', 'gi');
        // let b = content.replace(regrex, '<br/>');
        let b = content;
        // wrapper content in div
        let divList = []
        let index = 0;
        let match;
        while ((match = regrex.exec(content)) !== null) {
            // console.log('index', index, match.index);
            // check match is first character or string is empty 2020/11/24
            if (index != match.index) {
                let divContent = content.substring(index, match.index);
                let result = '<div contenteditable="true">' + divContent + '</div>';
                divList.push(result);
            }
            index = regrex.lastIndex;
        }
        // append last content 2020/11/25
        if (content.length > index && index > 0) {
            let lastContent = content.substr(index);
            divList.push('<div contenteditable="true">' + lastContent + '</div>');
        }
        if (divList.length) {
            b = divList.join('');
        }
        return b;
    }

    /**
     * @private
     * 把 [font]=><font> [/font] => </font>
     */
    _convertFontTag(content) {
        try {
            const regexpWithoutE = /((\[font.*?\]))/ig;
            const match = content.match(regexpWithoutE);
            if (match) {
                var str = match[0].replace('[', '<');
                str = str.replace(']', '>')
                var b = content.replace(regexpWithoutE, str);
                const regexpWithoutE2 = /\[\/font\]/ig;
                const match2 = b.match(regexpWithoutE2);
                var str2 = match2[0].replace('[', '<');
                str2 = str2.replace(']', '>')
                var b2 = b.replace(regexpWithoutE2, str2);
                return b2
            } else {
                return content;
            }
        } catch (e) {
            console.log('_convertFontTag:', e);
            return content;
        }
    }

    /**
     * @private
     *
     *  Fill Read only table data passed to the constructor
     * @param {TableData} data - data for insert in table
     * @param {{rows: number, cols: number}} size - contains number of rows and cols
     * 仿照_fillTable而来，只是换成了操作_readOnlyTable
     */
    _fillReadOnlyTable(data, size) {
        if (data.content !== undefined) {
            for (let i = 0; i < size.rows && i < data.content.length; i++) {
                for (let j = 0; j < size.cols && j < data.content[i].length; j++) {
                    // get current cell and her editable part
                    const input = this._readOnlyTable.body.rows[i].cells[j].querySelector('.' + CSS.readOnlyTable_inputField);

                    input.innerHTML = data.content[i][j];
                }
            }
        }
    }

    /**
     * @private
     *
     * resize to match config or transmitted data
     * @param {TableData} data - data for inserting to the table
     * @param {object} config - configuration of table
     * @param {number|string} config.rows - number of rows in configuration
     * @param {number|string} config.cols - number of cols in configuration
     * @return {{rows: number, cols: number}} - number of cols and rows
     */
    _resizeTable(dataContent, config) {
        // console.log('_resizeTable', data.contentSeprateIndex);
        let data = dataContent;
        const isValidArray = Array.isArray(data.content);
        const isNotEmptyArray = isValidArray ? data.content.length : false;
        const contentRows = isValidArray ? data.content.length : undefined;
        const contentCols = isNotEmptyArray ? data.content[0].length : undefined;
        const parsedRows = Number.parseInt(config.rows);
        const parsedCols = Number.parseInt(config.cols);
        // value of config have to be positive number
        const configRows = !isNaN(parsedRows) && parsedRows > 0 ? parsedRows : undefined;
        const configCols = !isNaN(parsedCols) && parsedCols > 0 ? parsedCols : undefined;
        /*
        ** 默认只有一行2列 xiaowy 2020/09/21 **
        const defaultRows = 2;
        const defaultCols = 2;
        */
        const defaultRows = 1;
        const defaultCols = 2;
        const rows = contentRows || configRows || defaultRows;
        const cols = contentCols || configCols || defaultCols;
        // contentSeprateIndexColl = data.contentSeprateIndex;
        if (data.contentSeprateIndex && data.contentSeprateIndex.length) {
            // console.log('set objSepIndexColl', data.contentSeprateIndex);
            this._table.objSepIndexColl = data.contentSeprateIndex;
        }

        let hiddenFields = [];
        if (this._tableData['hiddenFields']) {
            hiddenFields = this._tableData['hiddenFields'].split(' ');
        }

        for (let i = 0; i < rows; i++) {
            if (this._doHiddenField && (isNotEmptyArray && data.content.length > i) && hiddenFields.indexOf(data.content[i][0]) >= 0) {
                this._table.addRow(-1, false);
            } else if (this._doHiddenField && data.length > i && hiddenFields.indexOf(data[i]) >= 0) { // 初始化时可能传的fileds数组
                this._table.addRow(-1, false);
            } else {
                this._table.addRow();
            }
        }
        for (let i = this._table.columns; i < cols; i++) {
            this._table.addColumn();
        }

        // console.log({
        //   rows: rows,
        //   cols: cols
        // });

        return {
            rows: rows,
            cols: cols
        };
    }

    /**
     * @private
     *
     * resize to match config or transmitted data
     * @param {TableData} data - data for inserting to the table
     * @param {object} config - configuration of table
     * @param {number|string} config.rows - number of rows in configuration
     * @param {number|string} config.cols - number of cols in configuration
     * @return {{rows: number, cols: number}} - number of cols and rows
     * 构建table的标题头，参照_resizeTable，只是数据是固定的 xiaowy 2020/09/21
     */
    _resizeReadOnlyTable(data, config) {
        const isValidArray = Array.isArray(data.content);
        const isNotEmptyArray = isValidArray ? data.content.length : false;
        const contentRows = isValidArray ? data.content.length : undefined;
        const contentCols = isNotEmptyArray ? data.content[0].length : undefined;
        const parsedRows = Number.parseInt(config.rows);
        const parsedCols = Number.parseInt(config.cols);
        // value of config have to be positive number
        const configRows = !isNaN(parsedRows) && parsedRows > 0 ? parsedRows : undefined;
        const configCols = !isNaN(parsedCols) && parsedCols > 0 ? parsedCols : undefined;
        /*
        ** 默认只有一行 xiaowy 2020/09/21 **
        const defaultRows = 2;
        const defaultCols = 2;
        */
        const defaultRows = 1;
        const defaultCols = 2;
        const rows = contentRows || configRows || defaultRows;
        const cols = contentCols || configCols || defaultCols;

        for (let i = 0; i < rows; i++) {
            this._readOnlyTable.addRow();
        }
        for (let i = 0; i < cols; i++) {
            if (i === cols - 1) {
                // console.log('readonly table', this._tableData['hiddenFields']);
                if (this._tableData['hiddenFields'] && this._tableData['hiddenFields'].length) {
                    this._readOnlyTable.addColumn(-1, true);
                } else {
                    this._readOnlyTable.addColumn(-1);
                }
            } else {
                this._readOnlyTable.addColumn();
            }
        }

        return {
            rows: rows,
            cols: cols
        };
    }

    /**
     * @private
     *
     * Show ToolBar
     * @param {BorderToolBar} toolBar - which toolbar to show
     * @param {number} coord - where show. x or y depending on the grade of the toolbar
     */
    _showToolBar(toolBar, coord) {
        if (toolBar !== undefined) {
            this._hideToolBar();
            this._activatedToolBar = toolBar;
            toolBar.showIn(coord);
        }
    }

    /**
     * @private
     *
     * Hide all of toolbars
     */
    _hideToolBar(event) {
        if (this._activatedToolBar !== null && this._activatedToolBar !== undefined) {
            this._activatedToolBar.hide();
        }
    }

    /**
     * @private
     *
     * hang necessary events
     */
    _hangEvents() {
        this._container.addEventListener('mouseInActivatingArea', (event) => {
            this._toolbarCalling(event);
        });
        // this._container.addEventListener('mouseInActivatingArea', this._toolbarCalling);
        /* 去掉工具栏添加行功能 xiaowy 2020/10/20
    if (this._repeat !== undefined && this._repeat === 1) {
      this._container.addEventListener('click', (event) => {
        // added by xiaowy 2020/09/19
        clearTimeout(this._clickTimeId);
        let that = this;
        this._clickTimeId = setTimeout(function () {
          that._clickToolbar(event);
        }, 250);
        // end
        // this._clickToolbar(event);
      });
 
      // add by xiaowy test double click event 2020/09/19
      this._container.addEventListener('dblclick', (event) => {
        clearTimeout(this._clickTimeId);
        // console.log('doubleclick event!');
        this._dblclickToolbar(event);
        // alert('doubleclick event!');
      });
    }
    */

        this._container.addEventListener('input', (event) => {
            this._hideToolBar(event);
        });
        // this._container.addEventListener('input', this._hideToolBar);

        this._container.addEventListener('keydown', (event) => {
            this._containerKeydown(event);
        });
        // this._container.addEventListener('keydown', this._containerKeydown);

        this._container.addEventListener('mouseout', (event) => {
            this._leaveDetectArea(event);
        });
        // this._container.addEventListener('mouseout', this._leaveDetectArea);

        this._container.addEventListener('mouseover', (event) => {
            this._mouseEnterInDetectArea(event);
        });

        // this._container.addEventListener('dblclick', (event) => {
        //   this._processDbClick(event);
        // });
        // this._container.addEventListener('mouseover', this._mouseEnterInDetectArea);
    }

    /**
     * @private
     * remove component events
     * @param {nothing}
     */
    _removeAllEvent() {
        this._container.removeEventListener('mouseInActivatingArea', this._toolbarCalling);
    }

    /**
     * @private
     *
     * detects a mouseenter on a special area
     * @param {MouseEvent} event
     */
    _mouseInActivatingAreaListener(event) {
        this._hoveredCellSide = event.detail.side;
        const areaCoords = getCoords(event.target);
        const containerCoords = getCoords(this._table.htmlElement);

        this._hoveredCell = event.target.closest('TD');

        if (this._hoveredCell === null) {
            const paddingContainer = 11;
            this._hoveredCell = this._container;
            areaCoords.x1 += paddingContainer;
            areaCoords.y1 += paddingContainer;
            areaCoords.x2 -= paddingContainer;
            areaCoords.y2 -= paddingContainer;
        }
        /* 不需要工具栏添加行了 xiaowy 2020/10/20
        if (this._hoveredCellSide === 'top') {
          this._showToolBar(this._horizontalToolBar, areaCoords.y1 - containerCoords.y1 - 2);
        }
        if (this._hoveredCellSide === 'bottom') {
          this._showToolBar(this._horizontalToolBar, areaCoords.y2 - containerCoords.y1 - 1);
        }
        */
        /* 
        ** 不需要增加列，秒秒学AI默认就2列  comment by xiaowy 2020/09/19
        if (this._hoveredCellSide === 'left') {
          this._showToolBar(this._verticalToolBar, areaCoords.x1 - containerCoords.x1 - 2);
        }
        if (this._hoveredCellSide === 'right') {
          this._showToolBar(this._verticalToolBar, areaCoords.x2 - containerCoords.x1 - 1);
        }
        */
    }

    /**
     * @private
     *
     * Checks elem is toolbar
     * @param {HTMLElement} elem - element
     * @return {boolean}
     */
    _isToolbar(elem) {
        // add by xiaowy 2020/09/21
        if (elem === null) {
            return null;
        }
        return !!(elem.closest('.' + CSS.toolBarHor) || elem.closest('.' + CSS.toolBarVer));
    }

    /**
     * @private
     *
     * Hide toolbar, if mouse left area
     * @param {MouseEvent} event
     */
    _leaveDetectArea(event) {
        if (this._isToolbar(event.relatedTarget)) {
            return;
        }
        clearTimeout(this._toolbarShowDelay);
        this._hideToolBar();
    }

    /**
     * @private
     *
     * Show toolbar when mouse in activation area
     * Showing
     * @param {MouseEvent} event
     */
    _toolbarCalling(event) {
        if (this._isToolbar(event.target)) {
            return;
        }
        clearTimeout(this._toolbarShowDelay);
        this._toolbarShowDelay = setTimeout(() => {
            this._mouseInActivatingAreaListener(event);
        }, 125);
    }

    /**
     * @private
     *
     * handling clicks on toolbars
     * @param {MouseEvent} event
     */
    _clickToolbar(event) {
        if (!this._isToolbar(event.target)) {
            return;
        }
        let typeCoord;

        if (this._activatedToolBar === this._horizontalToolBar) {
            this._addRow();
            typeCoord = 'y';
        } else {
            // comment by xiaowy 2020/09/19 不需要处理列
            // this._addColumn();
            typeCoord = 'x';
            // return; // added by xiaowy 2020/09/19
        }
        /** If event has transmitted data (coords of mouse) */
        const detailHasData = isNaN(event.detail) && event.detail !== null;

        if (detailHasData) {
            const containerCoords = getCoords(this._table.htmlElement);
            let coord;

            if (typeCoord === 'x') {
                coord = event.detail.x - containerCoords.x1;
            } else {
                coord = event.detail.y - containerCoords.y1;
            }
            this._delayAddButtonForMultiClickingNearMouse(coord);
        } else {
            this._hideToolBar();
        }
    }

    /**
     * @private
     *
     * handling double clicks on toolbars
     * @param {MouseEvent} event
     */
    _dblclickToolbar(event) {
        if (!this._isToolbar(event.target)) {
            return;
        }
        let typeCoord;

        if (this._activatedToolBar === this._horizontalToolBar) {
            this._delRow();
            typeCoord = 'y';
        } else {
            // comment by xiaowy 2020/09/19 不需要处理列
            // this._addColumn();
            typeCoord = 'x';
            // return; // added by xiaowy 2020/09/19
        }
        /** If event has transmitted data (coords of mouse) */
        const detailHasData = isNaN(event.detail) && event.detail !== null;

        if (detailHasData) {
            const containerCoords = getCoords(this._table.htmlElement);
            let coord;

            if (typeCoord === 'x') {
                coord = event.detail.x - containerCoords.x1;
            } else {
                coord = event.detail.y - containerCoords.y1;
            }
            this._delayAddButtonForMultiClickingNearMouse(coord);
        } else {
            this._hideToolBar();
        }
    }

    /**
     * @private
     *
     * detects button presses when editing a table's content
     * @param {KeyboardEvent} event
     */
    _containerKeydown(event) {
        // let keycodes = [37, 38, 39, 40, 9]; // 9 for tab key
        try {
            let keycodes = [38, 40, 9]; // 9 for tab key
            // Todo: process chracter move
            let leftAndRight = [37, 39];
            if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
                // console.log('process enter key');
                this._containerEnterPressed(event);
            }
            // 处理新需求，单元格跳转 xiaowy 2020/09/22
            if ((keycodes.indexOf(event.keyCode) >= 0 || leftAndRight.indexOf(event.keyCode) >= 0) &&
                !event.shiftKey && !event.ctrlKey && !event.altKey) {
                // console.log('in table constructor', event.keyCode);
                this._containerArrowKeyPressed(event);
            }
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    /**
     * @private
     *
     * Leaves the PlusButton active under mouse
     * The timer gives time to press the button again, before it disappears.
     * While the button is being pressed, the timer will be reset
     * @param {number} coord - coords of mouse. x or y depending on the grade of the toolbar
     */
    _delayAddButtonForMultiClickingNearMouse(coord) {
        this._showToolBar(this._activatedToolBar, coord);
        this._activatedToolBar.hideLine();
        clearTimeout(this._plusButDelay);
        this._plusButDelay = setTimeout(() => {
            this._hideToolBar();
        }, 500);
    }

    /**
     * @private
     *
     * Check if the addition is initiated by the container and which side
     * @returns {number} - -1 for left or top; 0 for bottom or right; 1 if not container
     */
    _getHoveredSideOfContainer() {
        if (this._hoveredCell === this._container) {
            return this._isBottomOrRight() ? 0 : -1;
        }
        return 1;
    }

    /**
     * @private
     *
     * check if hovered cell side is bottom or right. (lefter in array of cells or rows than hovered cell)
     * @returns {boolean}
     */
    _isBottomOrRight() {
        return this._hoveredCellSide === 'bottom' || this._hoveredCellSide === 'right';
    }

    /**
     * Adds row in table
     * @private
     */
    _addRow() {
        /*
    ** 这段代码目前不太稳定，暂时屏蔽，统一在表的尾部添加 xiaowy 2020/10/09
    const indicativeRow = this._hoveredCell.closest('TR');
    let index = this._getHoveredSideOfContainer();
 
    if (index === 1) {
      index = indicativeRow.sectionRowIndex;
      // if inserting after hovered cell
      index = index + this._isBottomOrRight();
    }
 
    this._table.addRow(index);
    */
        this._table.addRow(this._table.rows);

    }

    /**
     * Del row in table
     * @private
     * 国良添加 2020/09/19
     */
    _delRow() {
        const indicativeRow = this._hoveredCell.closest('TR');
        let index = this._getHoveredSideOfContainer();

        if (index === 1) {
            index = indicativeRow.sectionRowIndex;
            // if inserting after hovered cell
            index = index + this._isBottomOrRight();
        }

        this._table.delRow(index);
    }

    /**
     * @private
     *
     * Adds column in table
     * 暂时不用该功能
     */
    _addColumn() {
        let index = this._getHoveredSideOfContainer();

        if (index === 1) {
            index = this._hoveredCell.cellIndex;
            // if inserting after hovered cell
            index = index + this._isBottomOrRight();
        }

        this._table.addColumn(index);
    }

    /**
     * @private
     *
     * if "cntrl + Eneter" is pressed then create new line under current and focus it
     * 该方法不适合造型组件，因为造型组件表格主要是方便用户浏览修改，而不是增加行，所以enter的功能
     * 和下箭头类似。xiaowy 2020/09/23
     * _containerEnterPressed => _containerEnterPressedOld
     * @param {KeyboardEvent} event
     */
    _containerEnterPressedOld(event) {
        // console.log('Enter _containerEnterPressed');
        if (!(this._table.selectedCell !== null && !event.shiftKey)) {
            return;
        }
        const indicativeRow = this._table.selectedCell.closest('TR');
        let index = this._getHoveredSideOfContainer();
        /**
         * 修改enter的行为，当是最后一行时才添加新行，否则进行移动。xiaowy 2020/09/22
         */
        // console.log(index);
        // 原有代码
        // if (index === 1) {
        //   index = indicativeRow.sectionRowIndex + 1;
        // }
        // const newstr = this._table.addRow(index);

        // newstr.cells[0].click();
        // 原有代码结束
        const currentRowIndex = indicativeRow.sectionRowIndex;
        const currentCellIndex = this._table.selectedCell.cellIndex;
        if (currentRowIndex == this._table.body.rows.length - 1 &&
            currentCellIndex == indicativeRow.cells.length - 1) { // table 的尾部且在最后一列
            // if (index === 1) {
            //   index = indicativeRow.sectionRowIndex + 1;
            // }
            index = indicativeRow.sectionRowIndex + 1;
            const newstr = this._table.addRow(index);

            newstr.cells[0].click();
        } else {
            if (currentCellIndex < indicativeRow.cells.length - 1) {
                // let paraent = this._table.selectedCell.paraent;
                // console.log(indicativeRow);
                // paraent.cells[1].click();
                indicativeRow.cells[currentCellIndex + 1].click();
            } else {
                let table = this._table.body;
                let row = table.rows[currentRowIndex + 1]
                // console.log(row);
                if (row !== null && row !== undefined) {
                    row.cells[0].click();
                }
            }
        }
        event.preventDefault();
        event.stopPropagation();
        // console.log('_containerEnterPressed finished!');
    }

    /**
     * @private
     * process Enter key function, see _containerEnterPressOld
     * @param {KeyboardEvent} event
     * added by xiaowy 2020/09/23
     */
    _containerEnterPressed(event) {
        // console.log('Enter _containerEnterPressed');
        try {
            if (!(this._table.selectedCell !== null && !event.shiftKey)) {
                // console.log('this._table.selectedCell', this._table.selectedCell);
                return;
            }
            // this._processDownArrowKey(event);
            let input = this._table.selectedCell.querySelector('.' + CSS.inputField);
            // let div = document.createElement('div');
            // input.appendChild(div);
            let selection = window.getSelection();
            if (selection) {
                let node = selection.focusNode;
                let insertNode = node;
                if (node.nodeName === '#text' && !node.nextSibling) {
                    insertNode = node.parentNode;
                }
                // console.log('node', node);
                // let div = document.createElement('div');
                // let textNode = document.createTextNode('11');
                let div = create('div', null, { 'contenteditable': true });
                let textNode = null;
                if (node.nodeName === '#text' && selection.focusOffset < node.textContent.length) {
                    // console.log('for text node');
                    let mmxNode = this._checkEleIsListOrSymbol(node, true);
                    if (mmxNode) {
                        let nodeCopy = mmxNode.cloneNode(true);
                        this._modifyDigitSerialEle(nodeCopy);
                        div.appendChild(nodeCopy);
                        textNode = document.createTextNode(node.textContent.substr(selection.focusOffset));
                        node.textContent = node.textContent.substr(0, selection.focusOffset);
                        div.appendChild(textNode);
                    } else {
                        textNode = document.createTextNode(node.textContent.substr(selection.focusOffset));
                        node.textContent = node.textContent.substr(0, selection.focusOffset);
                        div.appendChild(textNode);
                    }

                    if (insertNode.nextElementSibling && insertNode.nextElementSibling.nodeName !== '#text') {
                        // console.log('add before sibling.');
                        input.insertBefore(div, insertNode.nextElementSibling);
                        // node.appendChild(div);
                        // textNode.focus();

                    } else {
                        // console.log('append end');
                        input.appendChild(div);
                    }
                    let range = selection.getRangeAt(0);
                    range.setStart(textNode, 0);
                } else if (node.nodeName === '#text') {
                    // console.log('for text node content length is 0');
                    // let textNode = document.createElement('br');
                    // div.appendChild(textNode);
                    let mmxNode = this._checkEleIsListOrSymbol(node, true);
                    if (mmxNode) {
                        let nodeCopy = mmxNode.cloneNode(true);
                        // console.log("mmxNode, nodeCopy", mmxNode, nodeCopy);
                        this._modifyDigitSerialEle(nodeCopy);
                        div.appendChild(nodeCopy);
                        // div.appendChild(textNode);
                    }
                    // 不需要回车
                    // else {
                    //   let textNode = document.createElement('br');
                    //   div.appendChild(textNode);
                    // }
                    if (insertNode.nextElementSibling && insertNode.nextElementSibling.nodeName !== '#text') {
                        // console.log('add before sibling.', insertNode.nextElementSibling);
                        input.insertBefore(div, insertNode.nextElementSibling);
                        // node.appendChild(div);
                        // textNode.focus();

                    } else {
                        // console.log('append end');
                        input.appendChild(div);
                    }
                    let range = selection.getRangeAt(0);
                    range.setStart(div, 0);
                } else {
                    // console.log('for other node type');
                    // let textNode = document.createElement('br');
                    // div.appendChild(textNode);
                    let mmxNode = this._checkEleIsListOrSymbol(node);
                    if (mmxNode) {
                        let nodeCopy = mmxNode.cloneNode(true);
                        this._modifyDigitSerialEle(nodeCopy);
                        div.appendChild(nodeCopy);
                        // div.appendChild(textNode);
                    }
                    // 不需要回车
                    // else {
                    //   let textNode = document.createElement('br');
                    //   div.appendChild(textNode);
                    // }
                    if (insertNode.nextElementSibling && insertNode.nextElementSibling.nodeName !== '#text') {
                        // console.log('add before sibling.');
                        input.insertBefore(div, insertNode.nextElementSibling);
                        // node.appendChild(div);
                        // textNode.focus();

                    } else {
                        // console.log('append end');
                        input.appendChild(div);
                    }
                    let range = selection.getRangeAt(0);
                    range.setStart(div, 0);
                }
                // textNode.textContent = ' ';
                event.preventDefault();
                event.stopPropagation();
            }
        } catch (e) {
            console.log('_containerEnterPressed occur exception:');
            console.log(e);
        }
    }
    // console.log('_containerEnterPressed finished!');


    /**
     * @private
     * 处理列表或项目符号元素
     * 检查是否为列表或项目符号
     * @param 
     * @return 具体的符号元素或者null
     */
    _checkEleIsListOrSymbol(ele, isTextNode = false) {
        console.log('_checkEleIsListOrSymbol previoisNode', ele.parentNode);
        if (isTextNode) {
            let parent = ele.parentNode;
            if (parent) {
                let firstChild = parent.childNodes[0]
                if (firstChild.classList && firstChild.classList.contains('mmx-listSymbol')) {
                    return firstChild
                } else {
                    return null;
                }
            }
            /*
            if (isTextNode) {
              let prevNode = ele.previousSibling;
              if (prevNode && prevNode.classList && prevNode.classList.contains('mmx-listSymbol')) {
                console.log('prevNode', prevNode);
                if (prevNode.previousSibling) {
                  if (!prevNode.previousSibling.textContent || prevNode.previousSibling.textContent.length === 0) {
                    return prevNode;
                  }
                  else {
                    return null;
                  }
                }
                return prevNode;
              }
              else {
                return null;
              }
            }*/
            else {
                let child = ele.querySelector('.mmx-listSymbol');
                if (child) {
                    return child
                } else {
                    return null;
                }
            }
        } else {
            let child = ele.querySelector('.mmx-listSymbol');
            if (child) {
                return child
            } else {
                return null;
            }

        }

    }

    /**
     * @private
     * 处理序号，依次累加
     */
    _modifyDigitSerialEle(ele) {
        let content = ele.textContent;
        // console.log('content', content);
        let index = content.indexOf('.');
        if (content.length > 0 && index >= 0 && index === content.length - 1) {
            // console.log('find number xuhao');
            let numStr = content.substr(0, index);
            let newNum = parseInt(numStr) + 1;
            ele.textContent = newNum + '.';
            // console.log('new ele', ele);
        }
    }

    /**
     * @private
     * 处理表格双击事件
     */
    _processDbClick(event) {

        if (!(this._table.selectedCell !== null && !event.shiftKey)) {
            // console.log('this._table.selectedCell', this._table.selectedCell);
            return;
        }
        // if (event.srcElement.getAttribute("contenteditable")=='false') {
        //   return;
        // }
        // console.log("enter _processDbClick");
        // let input = this._table.selectedCell.querySelector('.' + CSS.inputField);
        // if (input.getAttribute(("contenteditable")=='false')) {
        //   return;
        // }
        // let innerHTML = input.innerText.trim();
        // if (innerHTML.length === 0) {
        //   let inlineToolbar = document.querySelector('.ce-inline-toolbar');
        //   if (inlineToolbar) {
        //     inlineToolbar.style.left = event.clientX-event.layerX + 'px';
        //     inlineToolbar.style.top = event.clientY-event.layerY + 'px';
        //     inlineToolbar.classList.add('ce-inline-toolbar--showed');

        //     event.preventDefault();
        //     event.stopPropagation();
        //   }
        if (window.getSelection().rangeCount > 0 && event.srcElement.getAttribute("contenteditable") == 'true') {
            var inlineToolbar = document.getElementsByClassName("ce-inline-toolbar");
            let rangeText = window.getSelection().getRangeAt(0).toString();
            if (inlineToolbar.length > 0 && rangeText.length == 0) {
                var parent = inlineToolbar[0].parentNode.parentNode;
                inlineToolbar[0].style.left = (event.clientX - parent.offsetLeft - event.offsetX) + "px";
                inlineToolbar[0].style.top = (event.clientY - parent.offsetTop + event.offsetY) + "px";
                inlineToolbar[0].classList.add("ce-inline-toolbar--showed");
            }
        }
        event.stopPropagation();
        console.log("exit _processDbClick---");

    }


    /**
     * @private
     * process down, up, left, right arrow event for table
     * @param {KeyboardEvent} event
     * added by xiaowy 2020/09/22
     */
    _containerArrowKeyPressed(event) {
        // console.log('enter _containerArrowKeyPressed');
        if (!(this._table.selectedCell !== null && !event.shiftKey && !event.ctrlKey && !event.altKey)) {
            return;
        }
        switch (event.keyCode) {
            case 37: // left arrow key
                this._processLeftArrowKey(event);
                break;
            case 38: // up arrow key
                this._processUpArrowKey(event);
                break;
            case 39: // right arrow key
                this._processRightArrowKey(event);
                break;
            case 40: // down arrow key
                this._processDownArrowKey(event);
                break;
            case 9: // tab key similar to right arrow key
                this._processRightArrowKey(event);
                break;
            default:
                console.log('not implement!');
                break;
        }
        // prevent default behavior
        // event.preventDefault();
        // event.stopPropagation();
        return;
    }

    /**
     * @private
     * 处理右箭头：
     * 如果在table中间(含顶部)左边列，对应行的右边列获得焦点
     * 如果在table中间(含顶部)右边列，下一行的左边列获得焦点
     * 如果在table的底部右边列，跳到第一行的左边列
     * @param {KeyboardEvent} event
     * added by xiaowy 2020/09/22
     */
    _processRightArrowKey(event) {
        // console.log('enter _processRightArrowKey');
        if (event.keyCode !== 9) {
            let ret = this._moveCharacterInTableCellForRightArrow();
            if (ret) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
        // console.log('process right arrow key begin');
        const indicativeRow = this._table.selectedCell.closest('TR');
        const currentRowIndex = indicativeRow.sectionRowIndex;
        const currentCellIndex = this._table.selectedCell.cellIndex;
        const table = this._table.body;
        const table_rows = table.rows;
        // 考虑隐藏行的情况 2021/06/10
        var isBottom = false;
        var hiddenFields = [];
        if (currentRowIndex == table_rows.length - 1) {
            isBottom = true;
        }

        // 增加判断否则会失败 2021/06/18
        if (this._doHiddenField && this._tableData['hiddenFields'] && this._tableData['hiddenFields'].length > 0) {
            hiddenFields = this._tableData['hiddenFields'].split(' ')
            let hiddenCnt = hiddenFields.length;
            if ((currentRowIndex + hiddenCnt) == table_rows.length - 1) {
                isBottom = true;
            }
        }

        // end
        // if (currentRowIndex < table_rows.length - 1) { comment on 2021/06/10
        if (!isBottom) {
            const cells = indicativeRow.cells;
            // current row left cell
            if (currentCellIndex < cells.length - 1) {
                cells[currentCellIndex + 1].click();
            } else { // next row
                // console.log('right nex row',table_rows[currentRowIndex + 1].cells[currentCellIndex - 1]);
                if (this._repeat !== undefined && this._repeat === 1) {
                    let div = table_rows[currentRowIndex + 1].cells[currentCellIndex - 1];
                    // console.log('right nex row', div);
                    div.click();
                    // let input = div.querySelector('.' + CSS.inputField);
                    // if (input) {
                    //   console.log('right nex row',input);
                    //   input.click();
                    // }
                } else {
                    let div = table_rows[currentRowIndex + 1].cells[currentCellIndex];
                    // console.log('right nex row', div);
                    div.click();
                    // let input = div.querySelector('.' + CSS.inputField);
                    // if (input) {
                    //   console.log('right nex row',input);
                    //   input.click();
                    // }
                }
                // table_rows[currentRowIndex + 1].cells[currentCellIndex - 1].click();
            }
        } else { // bottom row
            const cells = indicativeRow.cells;
            // console.log('bottom');
            if (event.keyCode === 9) {
                // 确认造型是否可以添加新对象属性
                if (this._repeat !== undefined && this._repeat === 1) {
                    let oldSelectCell = this._table.selectedCell;
                    let rowIndexBegin = this._table.body.rows.length;
                    for (let i = 0; i < this._repeatWordsColl.length; i++) {
                        this._table.addRow();
                    }
                    // console.log('rowIndexBegin', rowIndexBegin);
                    // console.log('this._table.rows.length', this._table.body.rows.length);
                    for (let j = rowIndexBegin; j < this._table.body.rows.length; j++) {
                        // console.log('fill data');
                        let row = this._table.body.rows[j];
                        let cell = row.cells[0];
                        const input = cell.querySelector('.' + CSS.inputField);
                        // 要处理隐藏行的情况 2021/06/10
                        let value = this._repeatWordsColl[j - rowIndexBegin];
                        input.innerHTML = value;
                        if (this._doHiddenField && hiddenFields.length && hiddenFields.indexOf(value) >= 0) {
                            row.hidden = true;
                        }
                    }
                    // oldSelectCell.click();
                    cells[currentCellIndex].click();
                } else if (this._repeat !== undefined && this._repeat === 2) {
                    this._table.addRow();
                } else {
                    if (currentCellIndex < cells.length - 1) {
                        cells[currentCellIndex + 1].click();
                    } else { // first row
                        if (this._repeat !== undefined && this._repeat === 1) {
                            table_rows[0].cells[currentCellIndex - 1].click();
                        } else {
                            table_rows[0].cells[currentCellIndex].click();
                        }
                    }
                }
            } else {
                if (currentCellIndex < cells.length - 1) {
                    cells[currentCellIndex + 1].click();
                } else { // first row
                    // console.log('go to first row')
                    if (this._repeat !== undefined && this._repeat === 1) {
                        table_rows[0].cells[currentCellIndex - 1].click();
                    } else {
                        table_rows[0].cells[currentCellIndex].click();
                    }
                }
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * @private
     * 处理左箭头：
     * 如果在table中间右边列，对应行的左边列获得焦点
     * 如果在table中间左边列，上一行的右边列获得焦点
     * 如果在table的顶部左边列，跳到第后一行的右边列
     * @param {KeyboardEvent} event
     * added by xiaowy 2020/09/22
     */
    _processLeftArrowKey(event) {
        // console.log('Enter _processLeftArrowKey');
        let ret = this._moveCharacterInTableCellForLeftArrow();
        if (ret) {
            return;
        }
        const indicativeRow = this._table.selectedCell.closest('TR');
        const currentRowIndex = indicativeRow.sectionRowIndex;
        // console.log('currentRowIndex:' + currentRowIndex);
        const currentCellIndex = this._table.selectedCell.cellIndex;
        // console.log('currentCellIndex:' + currentCellIndex);
        const table = this._table.body;
        const table_rows = table.rows;
        if (currentRowIndex == 0) { // 在顶部行
            const cells = indicativeRow.cells;
            if (currentCellIndex == 0) { // 左边列
                const last_row = table_rows[table_rows.length - 1];
                last_row.cells[last_row.cells.length - 1].click();
            } else {
                if (this._repeat !== undefined && this._repeat === -1) {
                    cells[currentCellIndex - 1].click();
                } else {
                    const last_row = table_rows[table_rows.length - 1];
                    last_row.cells[last_row.cells.length - 1].click();
                }
            }
        } else {
            const cells = indicativeRow.cells;
            if (currentCellIndex == 0) { // 左边列
                // console.log('move up');
                const previous_row = table_rows[currentRowIndex - 1];
                previous_row.cells[previous_row.cells.length - 1].click();
            } else {
                // console.log('move left');
                if (this._repeat !== undefined && this._repeat === -1) {
                    cells[currentCellIndex - 1].click();
                } else {
                    const previous_row = table_rows[currentRowIndex - 1];
                    previous_row.cells[previous_row.cells.length - 1].click();
                }
            }
        }
        event.preventDefault();
        event.stopPropagation();
        // console.log('_processLeftArrowKey finished!');
    }

    /**
     * @private
     * 跳转到下一行
     */
    _gotoNextRow() {
        // console.log("enter _gotoNextRow");
        const indicativeRow = this._table.selectedCell.closest('TR');
        const currentRowIndex = indicativeRow.sectionRowIndex;
        // console.log('currentRowIndex:' + currentRowIndex);
        const currentCellIndex = this._table.selectedCell.cellIndex;
        // console.log('currentCellIndex:' + currentCellIndex);
        const table = this._table.body;
        const table_rows = table.rows;
        if (currentRowIndex < table_rows.length - 1) { // not table bottom
            const next_row = table_rows[currentRowIndex + 1];
            // console.log('nextRowIndex:', currentRowIndex + 1, next_row);
            next_row.cells[currentCellIndex].click()
        } else {
            const next_row = table_rows[0]
            next_row.cells[currentCellIndex].click();
        }
        // console.log("leave _gotoNextRow");
    }

    /**
     * @private
     * 处理下箭头：
     * 如果在table中间（含顶部）右边列，下一行行的右边列获得焦点
     * 如果在table中间（含顶部）左边列，下一行的左边列获得焦点
     * 如果在table的底部左边列，跳到第一行的左边列
     * 如果在table的底部右边列，跳到第一行的右边列
     * @param {KeyboardEvent} event
     * added by xiaowy 2020/09/22
     */
    _processDownArrowKey(event) {
        // todo 默认表格也没处理好，可能要显示设置selection对象
        // console.log('Enter _processDownArrowKey');


        let input = this._table.selectedCell.querySelector('.' + CSS.inputField);
        // let div = document.createElement('div');
        // input.appendChild(div);
        let selection = window.getSelection();
        if (selection) {
            let node = selection.focusNode;
            // console.log('nodename', node.nodeName);
            // console.log('nextElementSibling', node.nodeName);
            if (node.nodeName !== '#text' && !node.nextElementSibling) {
                // console.log('_processDownArrowKey, next row');
                this._gotoNextRow();
                event.preventDefault();
                event.stopPropagation();
            } else if (node.nodeName === '#text') {
                let nodeContent = node.textContent;
                // console.log('offset', selection.focusOffset, nodeContent.length);
                // 到了行尾，但没有邻居了，一般是这个情况
                if (!node.nextElementSibling && selection.focusOffset === nodeContent.length) {
                    let parentNode = node.parentNode;
                    // console.log('patentNode', parentNode.nextSibling, parentNode.nextElementSibling);
                    if (!parentNode || !parentNode.nextElementSibling) {
                        this._gotoNextRow();
                        // process selection again 2020/11/25
                        // let selection2 = window.getSelection();
                        // if (selection2) {
                        //   let node2 = selection2.focusNode;
                        //   let range = selection2.getRangeAt(0);
                        //   if (range && node2.nodeName === '#text') {
                        //     if (range.startOffset === 0) {
                        //       range.setStart(node2, 1);
                        //     }
                        //   }
                        // }
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    // else if (!parentNode.nextElementSibling) {
                    //   this._gotoNextRow();
                    //   event.preventDefault();
                    //   event.stopPropagation();
                    // }
                }
                // 下一个单元
                else if (node.nextElementSibling && node.nextElementSibling.nodeName === '#text') {
                    return;
                } else if (node.parentNode) {
                    // console.log('process default--2!');
                    let nextFocus = node.parentNode.nextElementSibling;
                    if (nextFocus) {
                        // console.log('process default--3!');
                        return;
                    } else if (selection.focusOffset === nodeContent.length) {
                        this._gotoNextRow();
                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        // console.log('process default--4!',selection.focusOffset);
                        let range = selection.getRangeAt(0);
                        // console.log('range', range);
                        if (range.collapsed && range.startOffset === 0) {
                            range.setStart(node, 1);
                        }
                    }
                    // else if (selection.focusOffset < nodeContent.length) {
                    //   console.log('go to line end1.');
                    //   let range = selection.getRangeAt(0);
                    //   if (range) {
                    //     range.setStart(node, nodeContent.length);
                    //     event.preventDefault();
                    //     event.stopPropagation();
                    //   }
                    // }
                }
                // 行尾
                // else if (selection.focusOffset < nodeContent.length) {
                //   console.log('go to line end2.');
                //   let range = selection.getRangeAt(0);
                //   if (range) {
                //     range.setStart(node, nodeContent.length);
                //     event.preventDefault();
                //     event.stopPropagation();
                //   }
                // }
                else {
                    console.log('process default--1!');
                }
            }
        }

        // console.log('_processDownArrowKey finished!');
    }

    /**
     * @private
     * 跳转到上一行
     */
    _gotoPreviousRow() {
        const indicativeRow = this._table.selectedCell.closest('TR');
        const currentRowIndex = indicativeRow.sectionRowIndex;
        // console.log('currentRowIndex:' + currentRowIndex);
        const currentCellIndex = this._table.selectedCell.cellIndex;
        // console.log('currentCellIndex:' + currentCellIndex);
        const table = this._table.body;
        const table_rows = table.rows;
        if (currentRowIndex != 0) { // not table top
            const nextRowIndex = currentRowIndex - 1;
            const nextRow = table_rows[nextRowIndex];
            // console.log('nextRowIndex:', nextRowIndex, nextRow);
            nextRow.cells[currentCellIndex].click();
        } else {
            const nextRowIndex = table_rows.length - 1;
            // console.log('nextRowIndex:', nextRowIndex);
            const nextRow = table_rows[nextRowIndex];
            nextRow.cells[currentCellIndex].click();
        }
    }

    /**
     * @private
     * 处理上箭头：
     * 如果在table中间（含底部）右边列，上一行行的右边列获得焦点
     * 如果在table中间（含底部）左边列，上一行的左边列获得焦点
     * 如果在table的顶部左边列，跳到最后一行的左边列
     * 如果在table的顶部右边列，跳到最后一行的右边列
     * @param {KeyboardEvent} event
     * added by xiaowy 2020/09/22
     */
    _processUpArrowKey(event) {
        // console.log('Enter _processUpArrowKey');

        let input = this._table.selectedCell.querySelector('.' + CSS.inputField);
        // let div = document.createElement('div');
        // input.appendChild(div);
        let selection = window.getSelection();
        if (selection) {
            let node = selection.focusNode;
            // console.log('nodename', node.nodeName);
            // console.log('nextElementSibling', node.nodeName);
            if (node.nodeName !== '#text' && !node.previousElementSibling) {
                // console.log('_processDownArrowKey, next row');
                this._gotoPreviousRow();
                event.preventDefault();
                event.stopPropagation();
            } else if (node.nodeName === '#text') {
                // let nodeContent = node.textContent;
                // console.log('offset', selection.focusOffset, nodeContent.length);
                // console.log('previousElement', node.previousElementSibling, node.previousSibling);
                if (!node.previousElementSibling && selection.focusOffset === 0) {
                    let parentNode = node.parentNode;
                    // console.log('patentNode', parentNode.nextSibling, parentNode.nextElementSibling);
                    if (!parentNode || !parentNode.previousElementSibling) {
                        this._gotoPreviousRow();
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    // else if (!parentNode.previousElementSibling) {
                    //   this._gotoPreviousRow();
                    //   event.preventDefault();
                    //   event.stopPropagation();
                    // }
                }
            }
        }
        // console.log('_processUpArrowKey finished!');
    }

    /**
     * @private
     * move character in table cell for right and left arrow key
     * @return {Boolean} true:don't process later, false: reach cell end and move to next cell
     * xiaowy 2020/10/09
     */
    _moveCharacterInTableCellForLeftArrow() {
        let selection = window.getSelection();
        // console.log(selection.toString());
        let input = this._table.selectedCell.querySelector('.' + CSS.inputField);
        // console.log(this._table.selectedCell);
        // console.log(input);
        if (input) {
            let range = selection.getRangeAt(0)
            if (range) {
                // console.log('range', range);

                if (range.collapsed) {
                    let node = range.endContainer;
                    console.log('node', node.nodeType);
                    if (node.nodeName === "#text") {
                        console.log('node', range.startOffset, node.nodeValue.length);
                        if (range.startOffset === 0) {
                            // go to previous Sibling
                            // console.log('go to previous Sibling',node.parentNode);
                            if (node.previousSibling) {
                                let sibling = node.previousSibling;
                                while (sibling && sibling.nodeName !== '#text') {
                                    console.log('move character left', sibling);
                                    sibling = sibling.previousSibling;
                                }
                                if (sibling) {
                                    let end = sibling.nodeValue.trim().length;
                                    range.setStart(sibling, end);
                                    return true;
                                } else {
                                    return false;
                                }
                            } // go to parent
                            else if (node.parentNode) {
                                let parentNode = node.parentNode;
                                if (parentNode.nodeName === '#text') {
                                    range.setStart(parentNode, 0);
                                    return true;
                                } else if (parentNode.previousSibling) {
                                    let parentPreviousSibling = parentNode.previousSibling;
                                    if (parentPreviousSibling.nodeName === '#text') {
                                        let end1 = parentPreviousSibling.nodeValue.trim().length;
                                        console.log('move parent sibling', parentPreviousSibling.nodeValue, end1);
                                        range.setStart(parentPreviousSibling, end1);
                                        return true;
                                    }
                                    // parent sibling childs
                                    else {
                                        let childs = parentPreviousSibling.childNodes;
                                        for (let i = 0; i < childs.length; i++) {
                                            let child = childs[i];
                                            if (child.nodeName === '#text') {
                                                let childEnd = child.nodeValue.trim().length - 1;
                                                range.setStart(child, childEnd);
                                                return true;
                                            }
                                        }
                                        return false;
                                    }

                                }

                            } else {
                                return false;
                            }
                        } else {
                            range.setStart(node, range.startOffset - 1);
                            return true;
                        }
                    } // other node type for todo
                    else {
                        let innerText = node.innerText.trim();
                        if (range.startOffset === innerText.length && !node.childNodes.length && !node.nextSibling) {
                            return false;
                        } else {
                            return true;
                        }
                    }

                } else {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @private
     * move character in table cell for right and right arrow key
     * @return {Boolean} true:don't process later, false: reach cell end and move to previous cell
     * xiaowy 2020/10/12
     */
    _moveCharacterInTableCellForRightArrow() {
        let selection = window.getSelection();
        // console.log(selection.toString());
        let input = this._table.selectedCell.querySelector('.' + CSS.inputField);
        // console.log(this._table.selectedCell);
        // console.log(input);
        if (input) {
            let range = selection.getRangeAt(0)
            if (range) {
                // console.log('range', range);

                if (range.collapsed) {
                    let node = range.endContainer;
                    console.log('node', node.nodeType);
                    if (node.nodeName === "#text") {
                        console.log('node', range.startOffset, node.nodeValue.length);
                        if (range.startOffset === node.nodeValue.length) {
                            if (node.childNodes.length) {
                                // go to child
                                let firstChild = node.childNodes[0];
                                range.setStart(firstChild, 0);
                                return true;

                            } // go to next Sibling
                            else if (node.nextSibling) {
                                console.log('move node.nextSibling', node.nextSibling);
                                let sibling = node.nextSibling;
                                // while (sibling && sibling.nodeName !== '#text') {
                                //   sibling = sibling.nextSibling;
                                // }
                                if (sibling.nodeName !== '#text') {
                                    console.log('move node.nextSibling ok');
                                    range.setStart(sibling, 0);
                                    return true;
                                } else {
                                    let childs = sibling.childNodes;
                                    for (let i = 0; i < childs.length; i++) {
                                        let child = childs[i];
                                        if (child.nodeName === '#text') {
                                            rang.setStart(child, 0);
                                            return true;
                                        }
                                    }
                                    return false;
                                }
                            } else if (node.parentNode.nextSibling) {
                                let parentNextSibling = node.parentNode.nextSibling;
                                console.log('move parent next sibling', parentNextSibling)
                                if (parentNextSibling.nodeName === '#text') {
                                    range.setStart(parentNextSibling, 0);
                                    return true;
                                }
                                let childs = parentNextSibling.childNodes;
                                for (let i = 0; i < childs.length; i++) {
                                    let child = childs[i];
                                    if (child.nodeName === '#text') {
                                        range.setStart(child, 0);
                                        return true;
                                    }
                                }
                                return false;
                            } // go to next row
                            else {
                                return false;
                            }
                        } else {
                            range.setStart(node, range.startOffset + 1);
                            return true;
                        }
                    } else {
                        console.log('not text node', node);
                        let innerText = node.innerText.trim();
                        if (range.startOffset === innerText.length && !node.childNodes.length && !node.nextSibling) {
                            return false;
                        } else {
                            let childs = node.childNodes;
                            for (let i = 0; i < childs.length; i++) {
                                let child = childs[i];
                                if (child.nodeName === '#text') {
                                    range.setStart(child, range.startOffset + 1);
                                    return true;
                                }
                            }
                            let nextSibling = node.nextSibling;
                            if (nextSibling && nextSibling.nodeName === '#text') {
                                range.setStart(nextSibling, range.startOffset + 1);
                                return true;
                            }
                            return false;
                        }
                    }

                } else {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * @private
     *
     * When the mouse enters the detection area
     * @param {MouseEvent} event
     */
    _mouseEnterInDetectArea(event) {
        if (this._container !== undefined) {
            const coords = getCoords(this._container);
            let side = getSideByCoords(coords, event.pageX, event.pageY);

            event.target.dispatchEvent(new CustomEvent('mouseInActivatingArea', {
                'detail': {
                    'side': side
                },
                'bubbles': true
            }));
        }
    }

    /**
     * @private
     * 模拟从华安那边获取造型数据
     *  @param {ElementEvent} event:回调的惯用法
     * @param {TableContructor} that:回调的惯用法
     * added by xiaowy 2020/09/27
     * todo:使用华安的方法
     */
    _getModelDataFromDbDemo() {
        let that = this;
        // this._repeat === 1000
        // this._repeatWordsColl = [];
        const modelDataObj = [{
            Name: '正文',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '正文',
            Tags: '正文 智能 自动',
            Thumb: './assets/dog1.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: '项目符号',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '正文',
            Tags: '项目符号 编号 智能 自动',
            Thumb: './assets/dog2.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: '页标题',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '标题 副标题 引标',
            Tags: '页标题 标题 智能 自动',
            Thumb: './assets/dog3.jpg',
            Repeat: 0,
            Hidden: '标题',
        },
        {
            Name: '封面标题',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '标题 副标题 口号 引标',
            Tags: '封面标题 封面 标题 智能 自动',
            Thumb: './assets/dog4.jpg',
            Repeat: 0,
            Hidden: '副标题',
        },
        {
            Name: '小节',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '标题',
            Tags: '小节 标题 智能 自动',
            Thumb: './assets/dog4.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: '列表',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '标题 正文 图片',
            Tags: '列表 特性 卖点 排列 智能 自动',
            Thumb: './assets/dog5.jpg',
            Repeat: 0,
            Hidden: '图片',
        },
        {
            Name: '编号',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '标题 正文 图片',
            Tags: '编号 排列 数字 智能 自动',
            Thumb: './assets/dog6.jpg',
            Repeat: 0,
            Hidden: '正文',
        },
        {
            Name: '图片',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '图片',
            Tags: '图片 智能 自动',
            Thumb: './assets/dog6.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: 'logo',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '图片 标题 副标题 引标',
            Tags: 'logo 公司名称 智能 自动',
            Thumb: './assets/dog7.jpg',
            Repeat: 1,
            Hidden: '引标',
        },
        {
            Name: '二维码',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '图片',
            Tags: '二维码 扫码 智能 自动',
            Thumb: './assets/dog8.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: '地址',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '图片 正文',
            Tags: '地址 联系方式 电话 公司地址 智能 自动',
            Thumb: './assets/dog9.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: '强调',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '正文',
            Tags: '强调 文字 智能 自动',
            Thumb: './assets/dog9.jpg',
            Repeat: 0,
            Hidden: '',
        },
        {
            Name: '时间线',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '图片 标题 正文',
            Tags: '时间线 智能 自动',
            Thumb: './assets/dog10.jpg',
            Repeat: 0,
            Hidden: '正文',
        },
        {
            Name: '图片集',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '图片 标题 正文 图片 标题 正文',
            Tags: '图片集 图片 logo墙 人员介绍 合作伙伴 智能 自动',
            Thumb: './assets/dog11.jpg',
            Repeat: 0,
            Hidden: '标题',
        },
        {
            Name: '卖点列表',
            SubName: '智能选择',
            Info: '自动选择造型',
            Fields: '主标题 副标题 卖点 次卖点 正文',
            Tags: '主标题 封面标题 标题 卖点 特性 优点 特征 特色 优势 口号 卖点 次卖点 副标题 智能 自动',
            Thumb: './assets/dog11.jpg',
            Repeat: 2,
            Hidden: '副标题',
        }
        ]
        let processModelSel = function (modelHeadCallBack = undefined) {
            that._repeat === 1000
            that._repeatWordsColl = [];
            if (window.mmxaiModelList !== undefined) {
                that._modelHeadCallBack = modelHeadCallBack;
                window.mmxaiModelList(that._processParentUiResultCall(), that._modelJson);
            } else {
                let rnd = Math.random() * 11
                const index = Math.floor(rnd)
                // demo select
                alert('select ' + index);

                const obj = modelDataObj[index];
                // for debug
                // const obj = modelDataObj[modelDataObj.length - 1];
                // console.log('_getModelDataFromDbDemo:', obj);
                // that._recontructParaTable(obj);
                that._repeat = obj.Repeat;
                that._tableData['hiddenFields'] = obj.Hidden;
                console.log(that._tableData['hiddenFields']);
                that._makeModelTables(obj, null, false);
                if (modelHeadCallBack !== undefined) {
                    modelHeadCallBack(obj);
                }
                // return obj;
            }
        }
        return processModelSel;
    }

    /**
     * @private
     * 回调函数
     * 处理华安那边的ui结果数据
     * @param {jsonObject} obj
     */
    _processParentUiResultCall() {
        let that = this;
        let _processParentUiResult = function (obj) {
            // console.log('enter _processParentUiResult');
            // console.log('_processParentUiResult obj', obj);
            // added by xiaowy 2021/01/21
            that._repeat = obj.Repeat;
            // that._modelJson = obj;
            that._tableData['hiddenFields'] = obj.Hidden;
            that._makeModelTables(obj, null, false);
            if (that._modelHeadCallBack !== undefined) {
                that._modelHeadCallBack(obj);
            }
            // console.log('exit _processParentUiResult');
        };
        return _processParentUiResult;
    }

    /**
     * @private
     * 重构参数表格
     * @param {modelObjectInformation} modelObj
     */
    _recontructParaTable(modelObj) {
        // commnent by xiaowy 2021/01/11
        // if (modelObj.Name) {
        //   // console.log("modelObj.Name", modelObj.Name);
        //   this._descTitle.innerHTML = '【' + '造型-' + modelObj.Name + '】';
        // }
        const fields = modelObj.Fields.trim();
        let fieldArr = fields.split(' ');
        if (fieldArr.length > 0) {
            // check table  is empty
            if (this._table === undefined) {
                this._table = new Table();
                // let tablebr = document.createElement('br');
                // this._table.htmlElement.appendChild(tablebr);
                this._container.appendChild(this._table.htmlElement);
            } else {
                // let paraRows = !!this._table.body.rows ? this._table.body.rows : []
                // console.log('paraRows1:', paraRows);
                // paraRows = !!paraRows? paraRows : []; 
                // console.log('paraRows:', paraRows);
                while (this._table.rows > 0) {
                    this._table.delRow();
                }
            }
            let data = {};
            data.content = [];
            data.contentSeprateIndex = [];
            let isFielsRepeat = checkFiledsIsRepeat(modelObj.Fields);
            if (isFielsRepeat.isRepeat) {
                this._repeatWordsColl = isFielsRepeat.repeatWords.trim().split(' ');
                data.contentSeprateIndex.push(this._repeatWordsColl.length - 1);
            } else if (modelObj.Repeat && (modelObj.Repeat === 1 || modelObj.Repeat === 2)) {
                this._repeatWordsColl = modelObj.Fields.trim().split(' ');
                // bug 修正初始化时，没有对表格最后一行加粗
                if (this._repeat === 1) {
                    data.contentSeprateIndex.push(this._repeatWordsColl.length - 1);
                }
            } else if (this._repeat !== undefined && (this._repeat === 1 || this._repeat === 2)) {
                this._repeatWordsColl = modelObj.Fields.trim().split(' ');
                // bug 修正初始化时，没有对表格最后一行加粗
                if (this._repeat === 1) {
                    data.contentSeprateIndex.push(this._repeatWordsColl.length - 1);
                }
                // let arr = modelObj.Fields.trim();
                // if (arr.length === 1) {
                //   this._repeatWordsColl = arr;
                // }
            }
            let objSepIndex = 0;
            fieldArr.forEach((item, index) => {
                let temp = item.trim();
                if (temp.length === 0) {
                    return;
                }
                let objArr = [];
                objArr.push(temp);
                objArr.push(' ');
                data.content.push(objArr);
                // fields is repeat
                if (isFielsRepeat.isRepeat && temp === isFielsRepeat.repeatWords) {
                    if (objSepIndex > 0) {
                        if (data.contentSeprateIndex.indexOf(objSepIndex - 1) < 0) {
                            data.contentSeprateIndex.push(objSepIndex - 1); // 上一行！！！
                        }
                    }
                }
                objSepIndex++;
            });
            let config = { rows: fieldArr.length, cols: 2 }
            // if (this._repeat === -1) {
            //   this._table.firstColumnIsRead = false;
            // }
            // 要重构表头 2021/01/21
            this._tableData['hiddenFields'] = modelObj['Hidden'];
            this._makeReadOnlyTable();
            // end
            this._table.repeat = this._repeat;
            this._table.repeatWordsColl = this._repeatWordsColl;
            // this._tableData['hiddenFields'] = modelObj['Hidden'];
            this._tableData['content'] = JSON.parse(JSON.stringify(data.content));
            const size = this._resizeTable(data, config);
            this._fillTable(data, size);

        }
    }

    _collectTableData() {
        this._tableData.content = []
    }

    /**
     * @private
     * 防止用户在选择造型族时有些造型不需要隐藏列
     * 2021/04/29
     */
    _displayAllTableRows() {
        if (this._doHiddenField && !this._tableData['hiddenFields'].length) {
            let rowsColl = this._table.body.rows;

            for (let i = 0; i < rowsColl.length; i++) {
                let row = rowsColl[i];
                if (row.hidden) {
                    row.hidden = false;
                }
            }
            this._doHiddenField = false;
        } else if (this._doHiddenField && this._tableData['hiddenFields'].length) { // 增加造型族的隐藏列的不同设置处理 2021/06/18
            this._processTableRowVisible();
        }
    }

    /**
     * @public
     * hidden table row and reconstructor table
     */
    hiddenTableRowCallBack() {
        let that = this;
        let callBack = function () {

            that._doHiddenField = !that._doHiddenField;
            if (that._table === undefined) {
                that._table = new Table();
                // let tablebr = document.createElement('br');
                // this._table.htmlElement.appendChild(tablebr);
                that._container.appendChild(that._table.htmlElement);
                let config = { rows: that._tableData.content.length, cols: 2 }
                const size = that._resizeTable(that._tableData, config);
                that._fillTable(that._tableData, size);
            } else {
                that._processTableRowVisible(); // make old code to a function 2021/06/18
            }
            // that._doHiddenField = !that._doHiddenField;

            // console.log('test hidden callback', that._tableData.content);
        };
        return callBack;
    }

    _processTableRowVisible() {
        let hiddenFields = [];
        if (this._tableData['hiddenFields']) {
            hiddenFields = this._tableData['hiddenFields'].split(' ');
        }
        let rowsColl = this._table.body.rows;

        for (let i = 0; i < rowsColl.length; i++) {
            let row = rowsColl[i];
            let cells = row.cells;
            let htmlValue = ''
            // 2021/05/17 增加下拉列表框的处理
            if (this._repeat && this._repeat === 2) { // select tag
                let selectNode = cells[0].querySelector('.' + CSS.inputField);
                // let selectNode = cellNode.querySelector('select');
                htmlValue = selectNode.value;

            } else {
                htmlValue = cells[0].querySelector('.' + CSS.inputField).innerHTML.trim();
            }
            // console.log('hidden row', htmlValue);
            if (this._doHiddenField && hiddenFields.indexOf(htmlValue) >= 0) {
                row.hidden = true;
            } else {
                row.hidden = false;
            }
        }
    }

    /**
     * @private
     * add toolbar button for add model
     *
     */
    _createTooltipBtnForModel() {
        let btn = create('button', [CSS.modelAddButton]);
        btn.innerHTML = '添加造型';
        btn.addEventListener('click', (event) => {
            this._api.blocks.insert('model');
        });
        return btn;
    }

    /**
     * @private
     * copy toolbar button for add model
     * 
     */
    _createCopyBtnForModel() {
        let btn = create('button', [CSS.modelAddButton]);
        btn.innerHTML = '复制造型';
        btn.addEventListener('click', (event) => {
            this._api.blocks.insert('model');
        });
        return btn;
    }

    /**
     * @public
     * get model json object
     * @returns {JsonResult}
     */
    getJsonResult() {
        // let obj = {};
        // console.log('enter getJsonResult');
        let temp = this._modelHeadTable.getHeadParam();
        // console.log('temp:', temp);
        let ret = {};
        if (temp) {
            try {
                let obj = {};
                // obj['板块头'] = temp['板块头'];
                obj['属性'] = temp['属性'];
                // let obj = Object.assign({}, temp['板块头']);
                // console.log("tableConstructor getJsonResult11", obj);
                if (this._table !== undefined) {
                    obj['列表'] = this._table.getJsonResult();
                } else {
                    obj['列表'] = [];
                }
                ret[temp.name] = obj;

                // let paraName = this._descTitle.innerHTML;
                // let leftIndex = paraName.indexOf('【');
                // let rightIndex = paraName.indexOf('】');
                // let realName = paraName.substring(leftIndex + 1, rightIndex - leftIndex);
                // obj['name'] = this._descTitle.innerHTML;
                console.log("tableConstructor getJsonResult", ret);
                return ret;
            } catch (e) {
                console.log('getJsonResule occur exception:', e);
                return ret;
            }
        } else {
            // console.log("tableConstructor getJsonResult", ret);
            return ret;
        }
    }
}