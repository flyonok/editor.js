import {create, getCoords, getSideByCoords} from './documentUtils';
import './styles/table.pcss';

const CSS = {
  table: 'tc-paraTable',
  inputField: 'tc-paraTable__inp',
  cell: 'tc-paraTable__cell',
  wrapper: 'tc-paraTable__wrap',
  area: 'tc-paraTable__area',
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

    this._hangEvents();
  }

  /**
   * Add column in table on index place
   * @param {number} index - number in the array of columns, where new column to insert,-1 if insert at the end
   */
  addColumn(index = -1) {
    this._numberOfColumns++;
    /** Add cell in each row */
    const rows = this._table.rows;

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].insertCell(index);

      this._fillCell(cell);
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

    this._fillRow(row);
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
  };


  /**
   * get html element of table
   * @return {HTMLElement}
   */
  get htmlElement() {
    return this._element;
  }

  /**
   * get count of table rows
   * @return {number}
   */
  get rows() {
    return this._numberOfRows;
  }

  /**
   * get real table tag
   * @return {HTMLElement}
   */
  get body() {
    return this._table;
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
    // add by xiaowy 2020/09/21
    // const brEle = document.createElement('br');
    return create('div', [CSS.wrapper], null, [create('table', [CSS.table])]);
  }

  /**
   * @private
   *
   * Create editable area of cell
   * @return {HTMLElement} - the area
   */
  _createContenteditableArea() {
    return create('div', [CSS.inputField], {contenteditable: 'true'});
  }

  /**
   * @private
   *
   * Fills the empty cell of the editable area
   * @param {HTMLElement} cell - empty cell
   */
  _fillCell(cell) {
    cell.classList.add(CSS.cell);
    const content = this._createContenteditableArea();
    // content.onpaste = this._pasteEvent;
    content.addEventListener('paste', this._pasteEvent);

    cell.appendChild(create('div', [CSS.area], null, [content]));
  }

  /**
   * @private
   * process table input cell paste event
   * @returns {boolean}
   */
  _pasteEvent(event) {
    let selection = window.getSelection();
    if (selection && selection.rangeCount) {
      let range = selection.getRangeAt(0);
      if (range) {
        range.deleteContents();
      }
    }
    let clipData = event.clipboardData;
    let dataContent = clipData.getData('text/plain');
    let ele = event.target;
    ele.innerHTML += dataContent;
    // console.log(dataContent);
    // event.preventDefault();
    event.stopPropagation();
    // return true;
    // return;
  }

  /**
   * @private
   *
   * Fills the empty row with cells  in the size of numberOfColumns
   * @param row = the empty row
   */
  _fillRow(row) {
    for (let i = 0; i < this._numberOfColumns; i++) {
      const cell = row.insertCell();

      this._fillCell(cell);
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
    console.log('Enter _focusEditField');
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    this._selectedCell = event.target.closest('.' + CSS.cell);
    console.log('selected cell index:', this._selectedCell.cellIndex);
    console.log('_focusEditField finished!');
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
    // let keycodes = [37, 38, 39, 40, 9]; // 9 is TAB
    let keycodes = [38, 40, 9]; // 9 for tab key
    // console.log(event.keyCode);
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    if (event.keyCode === 13 && !event.shiftKey) {
      // event.preventDefault();
    }
    // 处理新需求，单元格跳转 xiaowy 2020/09/22
    if (keycodes.indexOf(event.keyCode) >= 0 && !event.shiftKey && !event.ctrlKey && !event.altKey)
    {
      // console.log(event.keyCode);
      event.preventDefault();
    }
    // else {
    //   return;
    // }
  }

  /**
   * @private
   *
   * When clicking on a cell
   * @param {MouseEvent} event
   */
  _clickedOnCell(event) {
    if (!event.target.classList.contains(CSS.cell)) {
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
}
