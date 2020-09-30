import { create, getCoords, getSideByCoords } from './documentUtils';
import './styles/table.pcss';

const CSS = {
  table: 'tc-modelTable',
  inputField: 'tc-modelTable__inp',
  cell: 'tc-modelTable__cell',
  cellWithBorder: 'tc-modelTable__cellWithBorder',
  wrapper: 'tc-modelTable__wrap',
  area: 'tc-modelTable__area',
};

/**
 * Generates and manages _table contents.
 */
export class Table {
  /**
   * Creates
   */
  constructor() {
    this._numberOfColumns = 0;
    this._numberOfRows = 0;
    this._element = this._createTableWrapper();
    this._table = this._element.querySelector('table');
    this._objSepIndexColl = [];

    this._hangEvents();
  }

  /**
   * Add column in table on index place
   * @param {number} index - number in the array of columns, where new column to insert,-1 if insert at the end
   */
  addColumn(index = -1) {
    this._numberOfColumns++;
    // console.log('this._objSepIndexColl', this._objSepIndexColl);
    /** Add cell in each row */
    const rows = this._table.rows;

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].insertCell(index);
      // if (this._numberOfColumns === 1) {
      //   this._fillReadOnlyCell(cell);
      //   continue;
      // }
      if (this._objSepIndexColl.indexOf(i) >= 0) {
        // console.log('find!!!');
        this._fillCell(cell, true)
      }
      else {
        this._fillCell(cell);
      }
    }
  };

  /**
   * Add row in table on index place
   * @param {number} index - number in the array of columns, where new column to insert,-1 if insert at the end
   * @return {HTMLElement} row
   */
  addRow(index = -1) {
    this._numberOfRows++;
    const row = this._table.insertRow(index);
    if (this._objSepIndexColl.indexOf(this._numberOfRows) > 0){
      this._fillRow(row, true);
    }
    else {
      this._fillRow(row);
    }
    
    return row;
  };

  /**
   * Del row in table on index place
   * 国良增加 2020/09/19
   * @param {number} index - number in the array of columns
   *
  */
  delRow(index = 0) {
    if (index >= this._numberOfRows) return;
    this._table.deleteRow(index);
    this._numberOfRows--;
    // add by xiaowy
    if (this._numberOfRows === 0) {
      this._numberOfColumns = 0;
    }
  };


  /**
   * get html element of table
   * @return {HTMLElement}
   */
  get htmlElement() {
    return this._element;
  }

  /**
   * set object reprate index collect
   * 设置造型列表对象的分隔行集合
   */
  set objSepIndexColl(value) {
    // console.log('enter objSepIndexColl:', value, this._objSepIndexColl);
    this._objSepIndexColl = value;
    // console.log('after objSepIndexColl:', this._objSepIndexColl);
  }

  /**
   * get real table tag
   * @return {HTMLElement}
   */
  get body() {
    return this._table;
  }

  /**
   * get rows of table
   * @return number
   */
  get rows() {
    return this._numberOfRows;
  }

  /**
   * returns selected/editable cell
   * @return {HTMLElement}
   */
  get selectedCell() {
    return this._selectedCell;
  }

  /**
   * @private
   *
   * Creates table structure
   * @return {HTMLElement} tbody - where rows will be
   */
  _createTableWrapper() {
    return create('div', [CSS.wrapper], null, [create('table', [CSS.table])]);
  }

  /**
   * @private
   *
   * Create editable area of cell
   * @return {HTMLElement} - the area
   */
  _createContenteditableArea() {
    return create('div', [CSS.inputField], { contenteditable: 'true' });
    // return create('textarea', [CSS.inputField], { contenteditable: 'true' });
  }

  /**
   * @private
   *
   * Create editable area of cell
   * @return {HTMLElement} - the area
   */
  _createContentReadOnlyArea() {
    return create('div', [CSS.inputField], { contenteditable: 'false' });
  }

  /**
   * @private
   *
   * Fills the empty cell of the editable area
   * @param {HTMLElement} cell - empty cell
   */
  _fillCell(cell, isObjSep = false) {
    if (isObjSep) {
      cell.classList.add(CSS.cellWithBorder);
    }
    else {
      cell.classList.add(CSS.cell);
    }
    const content = this._createContenteditableArea();

    cell.appendChild(create('div', [CSS.area], null, [content]));
  }

  /**
  * @private
  *
  * Fills the empty cell of the readonly area
  * @param {HTMLElement} cell - empty cell
  * added by xiaowy 2020/09/27
  */
  _fillReadOnlyCell(cell) {
    // console.log('call _fillReadOnlyCell');
    cell.classList.add(CSS.cell);
    const content = this._createContentReadOnlyArea();

    cell.appendChild(create('div', [CSS.area], null, [content]));
  }

  /**
   * @private
   *
   * Fills the empty row with cells  in the size of numberOfColumns
   * @param row = the empty row
   */
  _fillRow(row, isObjSep = false) {
    // console.log('_fillRow:', this._numberOfColumns);
    // console.log('this._objSepIndexColl', this._objSepIndexColl);
    for (let i = 0; i < this._numberOfColumns; i++) {
      const cell = row.insertCell();
      this._fillCell(cell, isObjSep);
      // if (i === 0) {
      //   this._fillReadOnlyCell(cell);
      //   continue;
      // }
      // if (this._objSepIndexColl.indexOf(i) >= 0) {
      //   // console.log('find!!!!!!---');
      //   this._fillCell(cell, true);
      // }
      // else {
      //   this._fillCell(cell);
      // }
    }
  }

  /**
   * @private
   *
   * hang necessary events
   */
  _hangEvents() {
    this._table.addEventListener('focus', (event) => {
      this._focusEditField(event);
    }, true);

    this._table.addEventListener('blur', (event) => {
      this._blurEditField(event);
    }, true);

    this._table.addEventListener('keydown', (event) => {
      this._pressedEnterInEditField(event);
    });

    this._table.addEventListener('click', (event) => {
      this._clickedOnCell(event);
    });

    this._table.addEventListener('mouseover', (event) => {
      this._mouseEnterInDetectArea(event);
      event.stopPropagation();
    }, true);
  }

  /**
   * @private
   *
   * When you focus on an editable field, remembers the cell
   * @param {FocusEvent} event
   */
  _focusEditField(event) {
    console.log('enter _focusEditField');
    if (!event.target.classList.contains(CSS.inputField)) {
      console.log('enter _focusEditField11');
      return;
    }
    this._selectedCell = event.target.closest('.' + CSS.cell);
    if (!this._selectedCell) {
      this._selectedCell = event.target.closest('.' + CSS.cellWithBorder);
    }
    console.log('exit _focusEditField');
  }

  /**
   * @private
   *
   * When you blur on an editable field, remembers the cell
   * @param {FocusEvent} event
   */
  _blurEditField(event) {
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    this._selectedCell = null;
  }

  /**
   * @private
   *
   * When enter is pressed when editing a field
   * @param {KeyboardEvent} event
   */
  _pressedEnterInEditField(event) {
    let keycodes = [37, 38, 39, 40, 9]; // 9 is TAB
    // console.log(event.keyCode);
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
    }
    // 处理新需求，单元格跳转 xiaowy 2020/09/22
    else if (keycodes.indexOf(event.keyCode) >= 0 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      // console.log(event.keyCode);
      event.preventDefault();
    }
  }

  /**
   * @private
   *
   * When clicking on a cell
   * @param {MouseEvent} event
   */
  _clickedOnCell(event) {
    if (!( event.target.classList.contains(CSS.cell) || event.target.classList.contains(CSS.cellWithBorder))) {
      return;
    }
    const content = event.target.querySelector('.' + CSS.inputField);
    content.focus();
  }

  /**
   * @private
   *
   * When the mouse enters the detection area
   * @param {MouseEvent} event
   */
  _mouseEnterInDetectArea(event) {
    if (!event.target.classList.contains(CSS.area)) {
      return;
    }

    const coordsCell = getCoords(event.target.closest('TD'));
    const side = getSideByCoords(coordsCell, event.pageX, event.pageY);

    event.target.dispatchEvent(new CustomEvent('mouseInActivatingArea', {
      'detail': {
        'side': side
      },
      'bubbles': true
    }));
  }

  /**
   * @public
   * Get the json object for this table
   * column 0 is the key and column 1 is the value
   */
  getJsonResult() {
    let rows = this._table.rows;
    let listResults = [];
    let modelParaObj = {};
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].cells;
      // console.log(cells);
      const cols = Array.from(cells);
      const inputs = cols.map(cell => cell.querySelector('.' + CSS.inputField));
      // console.log('getJsonResult inputs:', inputs);
      if (cells[0].classList.contains(CSS.cellWithBorder)) {
        // const inputs1 = cell[0].querySelector('.' + CSS.input);
        // const inputs2 = cell[0].querySelector('.' + CSS.input);
        let content = inputs[1].innerHTML;
        // let b = content.replaceAll('<br>', '\n');
        const regrex = /<br>/gi;
        let b = content.replace(regrex, '\n');
        modelParaObj[inputs[0].innerHTML] = b;
        // console.log('getJsonResult:', modelParaObj);
        listResults.push(modelParaObj);
        modelParaObj = {};
      }
      else {
        let content = inputs[1].innerHTML;
        // let b = content.replaceAll('<br>', '\n');
        const regrex = /<br>/gi;
        let b = content.replace(regrex, '\n');
        modelParaObj[inputs[0].innerHTML] = b;
        // console.log('getJsonResult1:', modelParaObj);
      }
    }
    listResults.push(modelParaObj);
    // console.log('getJsonResult2:', listResults);
    return listResults;
  }
}
