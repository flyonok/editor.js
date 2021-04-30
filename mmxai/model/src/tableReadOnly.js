import { create, getCoords, getSideByCoords } from './documentUtils';
import './styles/tableReadOnly.pcss';

const CSS = {
  table: 'tc-readOnlyTable',
  inputField: 'tc-readOnlyTable__inp',
  cell: 'tc-readOnlyTable__cell',
  wrapper: 'tc-readOnlyTable__wrap',
  area: 'tc-readOnlyTable__area',
};

/**
 * Generates and manages _table contents.
 */
export class TableReadOnly {
  /**
   * Creates
   */
  constructor(hiddenTableCallBack = undefined) {
    this._numberOfColumns = 0;
    this._numberOfRows = 0;
    this._element = this._createTableWrapper();
    this._table = this._element.querySelector('table');
    this._svgBtn = undefined;
    this._hiddenTableCallBack = hiddenTableCallBack;
    // comment by xiaowy 2020/09/21
    // this._hangEvents();
  }

  /**
   * Add column in table on index place
   * @param {number} index - number in the array of columns, where new column to insert,-1 if insert at the end
   * @param {boolean} addBtn - add icon button on column
   */
  addColumn(index = -1, addBtn = false) {
    this._numberOfColumns++;
    /** Add cell in each row */
    const rows = this._table.rows;

    for (let i = 0; i < rows.length; i++) {
      const cell = rows[i].insertCell(index);

      this._fillCell(cell, addBtn);
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
    return create('div', [CSS.wrapper], null, [create('table', [CSS.table])]);
  }

  /**
   * @private
   *
   * Create editable area of cell
   * @return {HTMLElement} - the area
   */
  _createContenteditableArea() {
    // comment and modify by xiaowy 2020/09/21
    // return create('div', [CSS.inputField], {contenteditable: 'true'});
    return create('div', [CSS.inputField], { contenteditable: 'false' });
  }

  /**
   * @private
   *
   * Fills the empty cell of the editable area
   * @param {HTMLElement} cell - empty cell
   */
  _fillCell(cell, addBtn = false) {
    cell.classList.add(CSS.cell);
    const content = this._createContenteditableArea();
    if (addBtn) {
      // var icon = '<i class="fa fa-caret-down" aria-hidden="true"></i>'
      // var iconTag = create('i', ['fa', 'fa-caret-up'], { 'aria-hidden': 'true' })
      var iconTag = create('i', ['fa', 'fa-caret-down'], { 'aria-hidden': 'true' })
      this._svgBtn = create('button', null, null, [iconTag]);
      this._svgBtn.addEventListener('click', (event) => {
        // console.log('1111');
        let iconTag = this._svgBtn.querySelectorAll('i')[0];
        if (iconTag) {
          if (iconTag.classList.contains('fa-caret-up')) {
            iconTag.classList.remove('fa-caret-up');
            iconTag.classList.add('fa-caret-down');
            if (this._hiddenTableCallBack) {
              this._hiddenTableCallBack();
            }
          }
          else if (iconTag.classList.contains('fa-caret-down')) {
            iconTag.classList.remove('fa-caret-down');
            iconTag.classList.add('fa-caret-up');
            if (this._hiddenTableCallBack) {
              this._hiddenTableCallBack();
            }
          }
          else {
            console.log('model table read only button no fa-caret-down or fa-caret-up!');
          }
        }
      });
      cell.appendChild(create('div', [CSS.area], null, [content, this._svgBtn]));
    }
    else {
      cell.appendChild(create('div', [CSS.area], null, [content]));
    }
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

    // comment by xiaowy 2021/01/12 for ui together
    // this._table.addEventListener('focus', (event) => {
    //   this._focusEditField(event);
    // }, true);


    // this._table.addEventListener('blur', (event) => {
    //   this._blurEditField(event);
    // }, true);

    // this._table.addEventListener('keydown', (event) => {
    //   this._pressedEnterInEditField(event);
    // });

    // this._table.addEventListener('click', (event) => {
    //   this._clickedOnCell(event);
    // });

    // this._table.addEventListener('mouseover', (event) => {
    //   this._mouseEnterInDetectArea(event);
    //   event.stopPropagation();
    // }, true);
    // comment end
    if (this._svgBtn) {
      this._svgBtn.addEventListener('click', (event) => {
        console.log('1111');
        let iconTag = this._svgBtn.querySelectorAll('i')[0];
        if (iconTag) {
          if (iconTag.classList.contains('fa-caret-up')) {
            iconTag.classList.remove('fa-caret-up');
            iconTag.classList.add('fa-caret-down');
          }
          else if (iconTag.classList.contains('fa-caret-down')) {
            iconTag.classList.remove('fa-caret-down');
            iconTag.classList.add('fa-caret-up');
          }
          else {
            console.log('model table read only button no fa-caret-down or fa-caret-up!');
          }
        }
      });
    }
  }

  /**
   * @private
   *
   * When you focus on an editable field, remembers the cell
   * @param {FocusEvent} event
   */
  _focusEditField(event) {
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    this._selectedCell = event.target.closest('.' + CSS.cell);
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
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    if (event.keyCode === 13 && !event.shiftKey) {
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

  /**
   * get rows of table
   * @return number
   */
  get rows() {
    return this._numberOfRows;
  }
}


