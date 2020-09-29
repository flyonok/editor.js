import './styles/table-constructor.pcss';
import { create, getCoords, getSideByCoords } from './documentUtils';
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
    // /** creating table */
    // this._table = new Table();

    // // }
    // // end
    // // add by xiaowy 同时融合单击和双击事件
    // this._clickTimeId = -1;
    // // end
    // const size = this._resizeTable(data, config);

    // this._fillTable(data, size);

    // this._makeModelNameTitle(data);

    // /** creating container around table */
    // // modified by xiaowy
    // // this._container = create('div', [CSS.editor, api.styles.block], null, [this._table.htmlElement]);
    // // added by xiaowy 2020/09/21
    // // this._readOnlyTable = new TableReadOnly();
    // this._makeReadOnlyTable();
    // this._isReadOnlyTableVisible(data);
    // let tablebr = document.createElement('br');
    // // end
    // this._makeModelHeadTable();
    // // console.log('after _makeModelHeadTable');
    // this._container = create('div', [CSS.editor, api.styles.block], null, [this._titleWrapper, this._modelHeadTable.htmlElement, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
    // // this._container = create('div', [CSS.editor, api.styles.block], null, [this._titleWrapper, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
    // // this._container = create('div', [CSS.editor, api.styles.block], null, [this._title, this._table.htmlElement]);

    // /** creating ToolBars */
    // this._verticalToolBar = new VerticalBorderToolBar();
    // this._horizontalToolBar = new HorizontalBorderToolBar();
    // this._table.htmlElement.appendChild(this._horizontalToolBar.htmlElement);
    // this._table.htmlElement.appendChild(this._verticalToolBar.htmlElement);

    // /** Activated elements */
    // this._hoveredCell = null;
    // this._activatedToolBar = null;
    // this._hoveredCellSide = null;

    // /** Timers */
    // this._plusButDelay = null;
    // this._toolbarShowDelay = null;

    // this._hangEvents();
    this._api = api; // add by xiaowy
    let _innerData = this._cdrJsonConvert(data);
    console.log('config:', config);
    this._makeModelTables(_innerData, config);
  }

  /**
   * @private
   * json数据转换
   * 从cdr的json到内部json
   */
  _cdrJsonConvert(cdrData) {
    // console.log('cdrData ', cdrData)
    let _innerData = {};
    if (cdrData.Name) {
      _innerData.Name = cdrData.Name;
    }
    // console.log(cdrData['板块头']);
    if (cdrData['板块头']) {
      _innerData.innerTitle = cdrData['板块头']
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
        arr.forEach((item, index) => {
          // console.log('item:', item);
          if (repeatRowIndex > 0) {
            _innerData['contentSeprateIndex'].push(repeatRowIndex);
          }
          for (let prop in item) {
            if (item.hasOwnProperty(prop)) {
              let rowArr = [];
              // console.log('prop:', item[prop])
              rowArr.push(prop);
              rowArr.push(item[prop]);
              // console.log('_cdrJsonConvert', rowArr);
              _innerData['content'].push(rowArr);
            }
          }
          repeatRowIndex++;
        });
      }
    }
    // console.log('_innerData:', _innerData);
    return _innerData;
  }

  /**
   * @private
   * Initial para table toolbar and event process
   * @returns {none}
   */
  _initToolBarAndEvent() {
     /** creating ToolBars */
     this._verticalToolBar = new VerticalBorderToolBar();
     this._horizontalToolBar = new HorizontalBorderToolBar();
     this._table.htmlElement.appendChild(this._horizontalToolBar.htmlElement);
     this._table.htmlElement.appendChild(this._verticalToolBar.htmlElement);

     /** Activated elements */
     this._hoveredCell = null;
     this._activatedToolBar = null;
     this._hoveredCellSide = null;

     /** Timers */
     this._plusButDelay = null;
     this._toolbarShowDelay = null;

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
    if (dataNotEmpty && fromContructor) {
      this._makeModelNameTitle(data); // 造型标题
      console.log('after _makeModelNameTitle');
      this._makeModelHeadTable(data); // 造型头
      console.log('after _makeModelHeadTable');
      this._makeReadOnlyTable(); // 造型表格头
      console.log('after _makeReadOnlyTable');
      // 造型表格和其他组件的换行
      // 具体的造型参数
      this._table = new Table();
      const size = this._resizeTable(data, config);

      this._fillTable(data, size);
      let tablebr = document.createElement('br');
      // 构建造型容器
      this._container = create('div', [CSS.editor, this._api.styles.block], null, [this._titleWrapper, this._modelHeadTable.htmlElement, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
      // this._container = create('div', [CSS.editor, api.styles.block], null, [this._titleWrapper, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
      // this._container = create('div', [CSS.editor, api.styles.block], null, [this._title, this._table.htmlElement]);
      this._initToolBarAndEvent();
     
    }
    else if (!dataNotEmpty && fromContructor) { // 如果没有具体的造型参数数据
      this._makeModelNameTitle(data); // 造型标题
      this._makeModelHeadTable(data); // 造型头
      this._container = create('div', [CSS.editor, this._api.styles.block], null, [this._titleWrapper, this._modelHeadTable.htmlElement]);
    }
    else if (dataNotEmpty && !fromContructor) {
      /**
       * 这里要实现用户选择具体造型的情况
       */
      if (this._readOnlyTable === undefined) {
        this._makeReadOnlyTable();
        this._container.appendChild(this._readOnlyTable.htmlElement)
      }
      this._recontructParaTable(data);
      this._initToolBarAndEvent();
    }
    else {
      console.log('not implemented!');
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
    }
    else {
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
    if (data.Name !== undefined) {
      this._descTitle.innerHTML = '【' + data.Name + '】';
      // this._descTitle.innerHTML = data.Name;
    }
    else {
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
    this._readOnlyTable = new TableReadOnly();
    let data = { content: [['元素名称', '内容']] };
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
    this._modelHeadTable = new ModelHeadTable(data, this._getModelDataFromDbDemo, this);

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
      for (let i = 0; i < size.rows && i < data.content.length; i++) {
        for (let j = 0; j < size.cols && j < data.content[i].length; j++) {
          // get current cell and her editable part
          const input = this._table.body.rows[i].cells[j].querySelector('.' + CSS.inputField);

          input.innerHTML = data.content[i][j];
        }
      }
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
  _resizeTable(data, config) {
    console.log('_resizeTable', data.contentSeprateIndex);
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
    console.log('set objSepIndexColl');
    this._table.objSepIndexColl = data.contentSeprateIndex;

    for (let i = 0; i < rows; i++) {
      // if (contentSeprateIndexColl.indexOf() > -1) {
      //   this._table.addRow(-1, true);
      // }
      // else {
      //   this._table.addRow();
      // }
      this._table.addRow();
    }
    for (let i = 0; i < cols; i++) {
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
      this._readOnlyTable.addColumn();
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
    this._hideToolBar();
    this._activatedToolBar = toolBar;
    toolBar.showIn(coord);
  }

  /**
   * @private
   *
   * Hide all of toolbars
   */
  _hideToolBar() {
    if (this._activatedToolBar !== null) {
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
      console.log('doubleclick event!');
      this._dblclickToolbar(event);
      // alert('doubleclick event!');
    });

    this._container.addEventListener('input', () => {
      this._hideToolBar();
    });

    this._container.addEventListener('keydown', (event) => {
      this._containerKeydown(event);
    });

    this._container.addEventListener('mouseout', (event) => {
      this._leaveDetectArea(event);
    });

    this._container.addEventListener('mouseover', (event) => {
      this._mouseEnterInDetectArea(event);
    });
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

    if (this._hoveredCellSide === 'top') {
      this._showToolBar(this._horizontalToolBar, areaCoords.y1 - containerCoords.y1 - 2);
    }
    if (this._hoveredCellSide === 'bottom') {
      this._showToolBar(this._horizontalToolBar, areaCoords.y2 - containerCoords.y1 - 1);
    }
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
    let keycodes = [37, 38, 39, 40, 9]; // 9 for tab key
    if (event.keyCode === 13) {
      this._containerEnterPressed(event);
    }
    // 处理新需求，单元格跳转 xiaowy 2020/09/22
    else if (keycodes.indexOf(event.keyCode) >= 0 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      console.log(event.keyCode);
      this._containerArrowKeyPressed(event);
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
    const indicativeRow = this._hoveredCell.closest('TR');
    let index = this._getHoveredSideOfContainer();

    if (index === 1) {
      index = indicativeRow.sectionRowIndex;
      // if inserting after hovered cell
      index = index + this._isBottomOrRight();
    }

    this._table.addRow(index);
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
    console.log('Enter _containerEnterPressed');
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
    }
    else {
      if (currentCellIndex < indicativeRow.cells.length - 1) {
        // let paraent = this._table.selectedCell.paraent;
        // console.log(indicativeRow);
        // paraent.cells[1].click();
        indicativeRow.cells[currentCellIndex + 1].click();
      }
      else {
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
    console.log('_containerEnterPressed finished!');
  }

  /**
   * @private
   * process Enter key function, see _containerEnterPressOld
   * @param {KeyboardEvent} event
   * added by xiaowy 2020/09/23
   */
  _containerEnterPressed(event) {
    console.log('Enter _containerEnterPressed');
    if (!(this._table.selectedCell !== null && !event.shiftKey)) {
      return;
    }
    this._processDownArrowKey(event);
    console.log('_containerEnterPressed finished!');
  }

  /**
   * @private
   * process down, up, left, right arrow event for table
   * @param {KeyboardEvent} event
   * added by xiaowy 2020/09/22
   */
  _containerArrowKeyPressed(event) {
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
    event.preventDefault();
    event.stopPropagation();
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
    const indicativeRow = this._table.selectedCell.closest('TR');
    const currentRowIndex = indicativeRow.sectionRowIndex;
    const currentCellIndex = this._table.selectedCell.cellIndex;
    const table = this._table.body;
    const table_rows = table.rows;
    if (currentRowIndex < table_rows.length - 1) {
      const cells = indicativeRow.cells;
      // current row left cell
      if (currentCellIndex < cells.length - 1) {
        cells[currentCellIndex + 1].click();
      }
      else { // next row
        table_rows[currentRowIndex + 1].cells[currentCellIndex - 1].click();
      }
    }
    else { // bottom row
      const cells = indicativeRow.cells;
      if (currentCellIndex < cells.length - 1) {
        cells[currentCellIndex + 1].click();
      }
      else { // first row
        table_rows[0].cells[currentCellIndex - 1].click();
      }
    }
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
    console.log('Enter _processLeftArrowKey');
    const indicativeRow = this._table.selectedCell.closest('TR');
    const currentRowIndex = indicativeRow.sectionRowIndex;
    // console.log('currentRowIndex:' + currentRowIndex);
    const currentCellIndex = this._table.selectedCell.cellIndex;
    // console.log('currentCellIndex:' + currentCellIndex);
    const table = this._table.body;
    const table_rows = table.rows;
    if (currentRowIndex == 0) {// 在顶部行
      const cells = indicativeRow.cells;
      if (currentCellIndex == 0) { // 左边列
        const last_row = table_rows[table_rows.length - 1];
        last_row.cells[last_row.cells.length - 1].click();
      }
      else {
        cells[currentCellIndex - 1].click();
      }
    }
    else {
      const cells = indicativeRow.cells;
      if (currentCellIndex == 0) { // 左边列
        console.log('move up');
        const previous_row = table_rows[currentRowIndex - 1];
        previous_row.cells[previous_row.cells.length - 1].click();
      }
      else {
        console.log('move left');
        cells[currentCellIndex - 1].click();
      }
    }
    console.log('_processLeftArrowKey finished!');
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
    console.log('Enter _processDownArrowKey');
    const indicativeRow = this._table.selectedCell.closest('TR');
    const currentRowIndex = indicativeRow.sectionRowIndex;
    console.log('currentRowIndex:' + currentRowIndex);
    const currentCellIndex = this._table.selectedCell.cellIndex;
    console.log('currentCellIndex:' + currentCellIndex);
    const table = this._table.body;
    const table_rows = table.rows;
    if (currentRowIndex < table_rows.length - 1) { // not table bottom
      const next_row = table_rows[currentRowIndex + 1];
      console.log('nextRowIndex:', currentRowIndex + 1);
      next_row.cells[currentCellIndex].click()
    }
    else {
      const next_row = table_rows[0]
      next_row.cells[currentCellIndex].click();
    }
    console.log('_processDownArrowKey finished!');
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
    console.log('Enter _processUpArrowKey');
    const indicativeRow = this._table.selectedCell.closest('TR');
    const currentRowIndex = indicativeRow.sectionRowIndex;
    console.log('currentRowIndex:' + currentRowIndex);
    const currentCellIndex = this._table.selectedCell.cellIndex;
    console.log('currentCellIndex:' + currentCellIndex);
    const table = this._table.body;
    const table_rows = table.rows;
    if (currentRowIndex != 0) { // not table top
      const nextRowIndex = currentRowIndex - 1;
      console.log('nextRowIndex:', nextRowIndex);
      const nextRow = table_rows[nextRowIndex];
      nextRow.cells[currentCellIndex].click();
    }
    else {
      const nextRowIndex = table_rows.length - 1;
      console.log('nextRowIndex:', nextRowIndex);
      const nextRow = table_rows[nextRowIndex];
      nextRow.cells[currentCellIndex].click();
    }
    console.log('_processUpArrowKey finished!');
  }

  /**
   * @private
   *
   * When the mouse enters the detection area
   * @param {MouseEvent} event
   */
  _mouseEnterInDetectArea(event) {
    const coords = getCoords(this._container);
    let side = getSideByCoords(coords, event.pageX, event.pageY);

    event.target.dispatchEvent(new CustomEvent('mouseInActivatingArea', {
      'detail': {
        'side': side
      },
      'bubbles': true
    }));
  }

  /**
   * @private
   * 模拟从华安那边获取造型数据
   *  @param {ElementEvent} event:回调的惯用法
   * @param {TableContructor} that:回调的惯用法
   * added by xiaowy 2020/09/27
   */
  _getModelDataFromDbDemo(event, that) {
    const modelDataObj = [
      {
        Name: '正文',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '正文',
        Tags: '正文 智能 自动',
        Thumb: './assets/dog1.jpg'
      },
      {
        Name: '项目符号',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '正文',
        Tags: '项目符号 编号 智能 自动',
        Thumb: './assets/dog2.jpg'
      },
      {
        Name: '页标题',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '标题 副标题 引标',
        Tags: '页标题 标题 智能 自动',
        Thumb: './assets/dog3.jpg'
      },
      {
        Name: '封面标题',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '标题 副标题 口号 引标',
        Tags: '封面标题 封面 标题 智能 自动',
        Thumb: './assets/dog4.jpg'
      },
      {
        Name: '小节',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '标题',
        Tags: '小节 标题 智能 自动',
        Thumb: './assets/dog4.jpg'
      },
      {
        Name: '列表',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '标题 正文 图片',
        Tags: '列表 特性 卖点 排列 智能 自动',
        Thumb: './assets/dog5.jpg'
      },
      {
        Name: '编号',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '标题 正文 图片',
        Tags: '编号 排列 数字 智能 自动',
        Thumb: './assets/dog6.jpg'
      },
      {
        Name: '图片',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '图片',
        Tags: '图片 智能 自动',
        Thumb: './assets/dog6.jpg'
      },
      {
        Name: 'logo',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '图片 标题 副标题 引标',
        Tags: 'logo 公司名称 智能 自动',
        Thumb: './assets/dog7.jpg'
      },
      {
        Name: '二维码',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '图片',
        Tags: '二维码 扫码 智能 自动',
        Thumb: './assets/dog8.jpg'
      },
      {
        Name: '地址',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '图片 正文',
        Tags: '地址 联系方式 电话 公司地址 智能 自动',
        Thumb: './assets/dog9.jpg'
      },
      {
        Name: '强调',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '正文',
        Tags: '强调 文字 智能 自动',
        Thumb: './assets/dog9.jpg'
      },
      {
        Name: '时间线',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '图片 标题 正文',
        Tags: '时间线 智能 自动',
        Thumb: './assets/dog10.jpg'
      },
      {
        Name: '图片集',
        SubName: '智能选择',
        Info: '自动选择造型',
        Fields: '图片 标题 正文 图片 标题 正文',
        Tags: '图片集 图片 logo墙 人员介绍 合作伙伴 智能 自动',
        Thumb: './assets/dog11.jpg'
      }
    ]
    let rnd = Math.random() * 11
    const index = Math.floor(rnd)
    // demo select
    alert('select ' + index);
    
    const obj = modelDataObj[index];
    // for debug
    // const obj = modelDataObj[modelDataObj.length - 1];
    console.log('_getModelDataFromDbDemo:', obj);
    // that._recontructParaTable(obj);
    that._makeModelTables(obj, null, false);
    return obj;
  }

  /**
   * @private
   * 重构参数表格
   * @param {modelObjectInformation} modelObj
   */
  _recontructParaTable(modelObj) {
    if (modelObj.Name) {
      this._descTitle.innerHTML = '【' + modelObj.Name + '】';
    }
    const fields = modelObj.Fields;
    let fieldArr = fields.split(' ');
    if (fieldArr.length > 0) {
      // check table  is empty
      if (this._table === undefined) {
        this._table = new Table();
        this._container.appendChild(this._table.htmlElement);
      }
      else {
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
      let isFielsRepeat = this._checkFiledsIsRepeat(modelObj.Fields);
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
          if (objSepIndex > 0)
          data.contentSeprateIndex.push(objSepIndex - 1); // 上一行！！！
        }
        objSepIndex++;
      });
      let config = { rows: fieldArr.length, cols: 2 }
      const size = this._resizeTable(data, config);
      this._fillTable(data, size);

    }
  }

  /**
   * @private
   * check selected model object fileds is all repeat
   * 检查整个字符串是否完全重复
   */
  _checkFiledsIsRepeat(fields) {
    let fieldsArr = fields.split(' ');
    // find first words(not empty)
    let firstsub = undefined;
    for (let i = 0; i < fieldsArr.length; i++) {
      if (fieldsArr[i].trim().length != 0) {
        firstsub = fieldsArr[i];
        break;
      }
    }
    if (firstsub !== undefined) {
      let findIndexColl = [];
      let findIndex = fields.indexOf(firstsub);
      // collect all find index
      while (findIndex != -1) {
        findIndexColl.push(findIndex);
        findIndex = fields.indexOf(firstsub, findIndex + 1);
      }
      // check find collect substring
      if (findIndexColl.length >= 2 && findIndexColl[0] === 0) {
        let firstSubIndex = findIndexColl[0];
        let subStringColl = [];
        let subStringLenth = 0;
        let firstSubString = ' ';
        // let secondSubStringLength = 0;
        for (let j = 1; j < findIndexColl.length; j++) {
          if (j == 1 && j == findIndexColl.length - 1) {
            subStringLenth = findIndexColl[j] - firstSubIndex;
            firstSubString = fields.substring(firstSubIndex, findIndexColl[j]);
            let last = fields.substring(findIndexColl[j]);
            if (last.trim() != firstSubString.trim()) {
              return {
                isRepeat: false,
                repeatWords: firstsub
              };
            }
            else {
              return {
                isRepeat: true,
                repeatWords: firstsub
              };
            }
            // firstSubIndex = findIndexColl[j];
            // subStringColl.push(firstSubString);
          }
          else if (j == 1) {
            subStringLenth = findIndexColl[j] - firstSubIndex;
            firstSubString = fields.substring(firstSubIndex, findIndexColl[j]);
          }
          else {
            if ((findIndexColl[j] - firstSubIndex) != subStringLenth) {
              return {
                isRepeat: false,
                repeatWords: firstsub
              };
            }
            let temp = firstSubString;
            firstSubString = fields.substring(firstSubIndex, findIndexColl[j])
            // if (j == length - 1) {
            //   firstSubString = fields.substring(findIndexColl[j]);
            // }
            // else {
            //   firstSubString = fields.substring(firstSubIndex, findIndexColl[j])
            // }
            if (temp.trim() != firstSubString.trim()) {
              return {
                isRepeat: false,
                repeatWords: firstsub
              };
            }
          }
          firstSubIndex = findIndexColl[j];
        }
        // last index process
        let final = fields.substring(firstSubIndex);
        if (final.trim() != firstSubString.trim()) {
          return {
            isRepeat: false,
            repeatWords: firstsub
          };
        }
        else {
          return {
            isRepeat: true,
            repeatWords: firstsub
          };
        }
      }
      else {
        return {
          isRepeat: false,
          repeatWords: firstsub
        };
      }
    }
    else {
      return {
        isRepeat: false,
        repeatWords: firstsub
      };
    }
  }

  /**
   * @public
   * get model json object
   * @returns {JsonResult}
   */
  getJsonResult() {
    // let obj = {};
    console.log('enter getJsonResult');
    let temp = this._modelHeadTable.getHeadParam();
    // console.log('temp:', temp);
    let obj = Object.assign({}, temp);
    // console.log("tableConstructor getJsonResult11", obj);
    if (this._table !== undefined) {
      obj['列表'] = this._table.getJsonResult();
    }
    else {
      obj['列表'] = [];
    }
    obj['Name'] = this._descTitle.innerHTML;
    // console.log("tableConstructor getJsonResult", obj);
    return obj;   
  }
}
