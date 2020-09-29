import './styles/table-constructor.pcss';
import { create, getCoords, getSideByCoords } from './documentUtils';
import { HorizontalBorderToolBar, VerticalBorderToolBar } from './borderToolBar';
import { Table } from './table';
import { TableReadOnly } from './tableReadOnly'

const CSS = {
  editor: 'tc-editor',
  toolBarHor: 'tc-toolbar--hor',
  toolBarVer: 'tc-toolbar--ver',
  inputField: 'tc-paraTable__inp',
  readOnlyTable_inputField: 'tc-readOnlyParaTable__inp' // for readOnlyTable
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
    /** creating table */
    console.log('tableConstructor begin!');
    this._table = new Table();
    // add by xiaowy 增加参数说明 2020/09/19
    // if (data && data.title) {
    this._titleWrapper = document.createElement('div');
    this._descTitle = document.createElement('H3');
    if (data.name !== undefined )
    {
      // this._descTitle.innerHTML = '【' + data.name + '】';
      this._descTitle.innerHTML = data.name;
    }
    else
    {
      this._descTitle.innerHTML = '【参数】';
    }
    this._descTitle.classList.add('mmxParameterDecsTitle');
    console.log('_descTitle.classList.add');
    let desc = document.createElement('p');
    desc.innerHTML = '说明： 每个参数占一行， 左边是参数名称， 右边是其数值。 没有值的， 右边可以不填。';
    desc.classList.add('mmxParameterDesc');
    desc.appendChild(document.createElement('br'));
    this._titleWrapper.appendChild(this._descTitle);
    this._titleWrapper.appendChild(desc);
    // }
    // end
    // add by xiaowy 同时融合单击和双击事件 2020/09/19
    this._clickTimeId = -1;
    // end
    let _innerData = this._cdrJsonConvert(data);
    const size = this._resizeTable(_innerData, config);

    this._fillTable(_innerData, size);

    /** creating container around table */
    // modified by xiaowy
    // this._container = create('div', [CSS.editor, api.styles.block], null, [this._table.htmlElement]);
    // added by xiaowy 2020/09/21
    this._readOnlyTable = new TableReadOnly();
    this._makeReadOnlyTable();
    let tablebr = document.createElement('br');
    // end
    this._container = create('div', [CSS.editor, api.styles.block], null, [this._titleWrapper, this._readOnlyTable.htmlElement, this._table.htmlElement, tablebr]);
    // this._container = create('div', [CSS.editor, api.styles.block], null, [this._title, this._table.htmlElement]);

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
   * json数据转换
   * 从cdr的json到内部json
   */
  _cdrJsonConvert(cdrData) {
    // console.log('cdrData ', cdrData)
    let _innerData = {};
    if (cdrData.name) {
      _innerData.name = cdrData.name;
    }
    // console.log(cdrData['板块头']);
    // if (cdrData['板块头']) {
    //   _innerData.innerTitle = cdrData['板块头']
    // }

    // console.log(cdrData['列表']);
    if (cdrData['content']) {
      _innerData['content'] = [];
      let item = cdrData['content'];
      for (let prop in item) {
        if (item.hasOwnProperty(prop)) {
          let rowArr = [];
          // console.log('prop:', item[prop])
          rowArr.push(prop);
          rowArr.push(item[prop]);
          console.log('parameter _cdrJsonConvert rowArr', rowArr);
          _innerData['content'].push(rowArr);
        }
      }
    }
    console.log('parameter _innerData:', _innerData);
    return _innerData;
  }

  /**
   * 构建只读的table，只有一行和两列，为了和后面构建的参数table兼容，改造了原有的Table类
   * xiaowy 2020/09/21
   */
  _makeReadOnlyTable() {
    // overwrite config
    let config = {rows:'1', cols:'2'};
    this._readOnlyTable = new TableReadOnly();
    let data = { content: [['参数名称', '参数值']] };
    const size = this._resizeReadOnlyTable(data, config);

    this._fillReadOnlyTable(data, size);

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
      this._table.addRow();
    }
    for (let i = 0; i < cols; i++) {
      this._table.addColumn();
    }

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
    if (elem === null)
    {
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
    else if (keycodes.indexOf(event.keyCode) >= 0 && !event.shiftKey && !event.ctrlKey && !event.altKey)
    {
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
   * @param {KeyboardEvent} event
   */
  _containerEnterPressed(event) {
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
    else{
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
   * process down, up, left, right arrow event for table
   * @param {KeyboardEvent} event
   * added by xiaowy 2020/09/22
   */
  _containerArrowKeyPressed(event) {
    if (!(this._table.selectedCell !== null && !event.shiftKey && !event.ctrlKey && !event.altKey)) {
      return;
    }
    switch(event.keyCode) {
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
    else{
      const cells = indicativeRow.cells;
      if (currentCellIndex == 0) { // 左边列
        console.log('move up');
        const previous_row = table_rows[currentRowIndex - 1];
        previous_row.cells[previous_row.cells.length - 1].click();
      }
      else{
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
}
