import { create, getCoords, getSideByCoords, checkFiledsIsRepeat } from './documentUtils';
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
    this._firstColumnIsRead = true; // 默认不可以修改对象名称 2020/10/14
    this._repeat = 100; // 对象的重复模式0，1，-1

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
    let cellConfig = { isObjSep: false, isWritable: false };

    for (let i = 0; i < rows.length; i++) {
      let isFirstColumn = false;
      if (rows[i].cells.length === 0) {
        isFirstColumn = true;
      }
      const cell = rows[i].insertCell(index);
      // if (this._numberOfColumns === 1) {
      //   this._fillReadOnlyCell(cell);
      //   continue;
      // }
      if (this._objSepIndexColl && this._objSepIndexColl.indexOf(i) >= 0) {
        // console.log('find!!!');
        // this._fillCell(cell, true)
        cellConfig.isObjSep = true;
      }
      else {
        cellConfig.isObjSep = false;
      }

      if (this._firstColumnIsRead && isFirstColumn) {
        cellConfig.isWritable = false;
      }
      else {
        cellConfig.isWritable = true;
      }
      this._fillCell(cell, cellConfig);
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
    if (this._objSepIndexColl && this._objSepIndexColl.indexOf(this._numberOfRows) > 0) {
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

  set firstColumnIsRead(value) {
    this._firstColumnIsRead = value;
  }

  set repeat(value) {
    this._repeat = value;
    if (this._repeat === -1) {
      this._firstColumnIsRead = false;
    }
    else {
      this._firstColumnIsRead = true;
    }
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
    let tableBr = document.createElement('br');
    return create('div', [CSS.wrapper], null, [create('table', [CSS.table]), tableBr]);
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
   * @param {Object} cellConfig => {isObjSep:false, isWritable:false}
   */
  _fillCell(cell, cellConfig = { isObjSep: false, isWritable: false }) {
    if (cellConfig.isObjSep) {
      cell.classList.add(CSS.cellWithBorder);
    }
    else {
      cell.classList.add(CSS.cell);
    }
    if (cellConfig.isWritable) {
      const content = this._createContenteditableArea();
      // content.onpaste = this._pasteEvent;
      content.addEventListener('paste', this._pasteEvent);

      cell.appendChild(create('div', [CSS.area], null, [content]));
    }
    else {
      const content = this._createContentReadOnlyArea();
      cell.appendChild(create('div', [CSS.area], null, [content]));
    }
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
    clipData.setData('text/plain', dataContent);
    // let ele = event.target;
    // ele.innerHTML += dataContent;
    // console.log(dataContent);
    // 不能去掉默认处理，否则不能ctrl+Z
    // event.preventDefault();
    event.stopPropagation();
    // return true;
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
    let cellConfig = { isObjSep: isObjSep, isWritable: true }
    for (let i = 0; i < this._numberOfColumns; i++) {
      const cell = row.insertCell();
      if (i == 0 && this._firstColumnIsRead)
        cellConfig.isWritable = false;
      else
        cellConfig.isWritable = true;
      this._fillCell(cell, cellConfig);
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
    // console.log('enter _focusEditField');
    if (!event.target.classList.contains(CSS.inputField)) {
      // console.log('enter _focusEditField11');
      return;
    }
    this._selectedCell = event.target.closest('.' + CSS.cell);
    if (!this._selectedCell) {
      this._selectedCell = event.target.closest('.' + CSS.cellWithBorder);
    }
    // console.log('exit _focusEditField');
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
    let leftAndRight = [37, 39];
    // console.log(event.keyCode);
    if (!event.target.classList.contains(CSS.inputField)) {
      return;
    }
    // if (event.keyCode === 13 && !event.shiftKey && !event.ctrlKey && !event.altKey) {
    //   event.preventDefault();
    // }
    // 处理新需求，单元格跳转 xiaowy 2020/09/22
    if ((keycodes.indexOf(event.keyCode) >= 0 || leftAndRight.indexOf(event.keyCode) >= 0) &&
      !event.shiftKey && !event.ctrlKey && !event.altKey) {
      console.log('in table ', event.keyCode);
      // event.preventDefault();
      // event.stopPropagation();
    }
  }

  /**
   * @private
   *
   * When clicking on a cell
   * @param {MouseEvent} event
   */
  _clickedOnCell(event) {
    if (!(event.target.classList.contains(CSS.cell) || event.target.classList.contains(CSS.cellWithBorder))) {
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
   * @private
   * get row cells objects pair
   * @param {Array} cells: cells array(length is 2)
   * @return {Array}: [key, value]
   */
  _getObjectFromCells(cells) {
    if (cells.length < 2) {
      console.log('cells lenth must equals 2');
      return ['', ''];
    }
    const cols = Array.from(cells);
    const inputs = cols.map(cell => cell.querySelector('.' + CSS.inputField));
    // console.log('getJsonResult inputs:', inputs);
    // 处理空的div
    // let divs = inputs.map(input1 => input1.querySelector('div'));
    // divs.map((div1) => {
    //   if ((div1 !== null) && div1.innerHTML.trim().length == 0) {
    //     // let parent = div1.parentElement;
    //     // parent.removeChild(div1);
    //     div1.remove();
    //   }
    // });
    let tempInput = inputs[1].cloneNode(true);
    let afterProcessNode = this._processWordContent(tempInput);
    // let content = inputs[1].innerHTML.trim();
    let content = afterProcessNode.innerHTML.trim();
    // let b = content.replaceAll('<br>', '\n');
    // const regrexa = /<div>|<\/div>/gi;
    const regrexa = /<br>|<\/div>/gi;
    let a = content.replace(regrexa, '');
    // const regrex = /<br>/gi;
    const regrex = /<div>/gi;
    let b = a.replace(regrex, '\r');
    const regrexall = /<br>|<\/div>|<div>/gi;
    const regrexone = /<br>|<\/div>/gi;
    let inputs0 = inputs[0].innerHTML.trim();
    let keyOne = inputs0.replace(regrexone, '');
    const regrexTwo = /<div>/gi;
    let key = keyOne.replace(regrexTwo, '\r');
    // console.log('_getObjectFromCells', [key, b]);
    return [key, b];
  }

  /**
   * @private
   * 处理word那边来的内容，会包含很多p和span
   */
  _processWordContent(node) {
    // console.log('_processWordContent', node);
    let pLists = node.querySelectorAll('p');
    let contentsList = [];
    if (pLists) {
      for (let i = 0; i < pLists.length; i++) {
        let p = pLists[i]
        let textContent = p.innerText;
        // contentsList.push(textContent);
        // node.removeChild(p);
        if (i === 0) {
          let div = document.createTextNode(textContent);
          p.parentNode.replaceChild(div, p);
          // node.appendChild(div);
        }
        else {
          let div = document.createElement('div');
          div.innerText = textContent;
          // node.appendChild(div);
          p.parentNode.replaceChild(div, p);
        }
      }
      // for (let j = 0; j < contentsList.length; j++) {
      //   if (j === 0) {
      //     let div = document.createTextNode(contentsList[j]);
      //     node.appendChild(div);
      //   }
      //   else {
      //     let div = document.createElement('div');
      //     div.innerText = contentsList[j];
      //     node.appendChild(div);
      //   }
      // }
    }
    return node;
  }
  /**
   * @public
   * Get the json object for this table
   * column 0 is the key and column 1 is the value
   * @return {Array}
   */
  getJsonResult() {
    let rows = this._table.rows;
    let listResults = [];
    let modelParaObj = {};
    let ret = this._tableIsRpeat();
    // todo：判断表格是否符合repeat规范 xiaowy 2020/10/19
    // if (!this._checkTableFormat(ret.isRepeat)) {
    //   alert('造型的对象名称不符合规范，请检查！');
    //   return [];
    // }
    // 找出重复对象名中的第一个单词
    let firstRepeatWord = ''
    let repeatCnt = 0;
    if (ret.isRepeat) {
      // console.log('repeatWords', ret.repeatWords);
      let wordsColl = ret.repeatWords.trim().split(' ');
      firstRepeatWord = wordsColl[0];
      repeatCnt = wordsColl.length;
      // console.log('repeatWordscnt', repeatCnt);
    }
    // console.log('table getJsonResult repeat ret:', ret, repeatCnt);
    if (ret.isRepeat) {
      for (let j = 0; j < rows.length; j += repeatCnt) {
        let emptyCnt = 0;
        // let childResults = []; // child repeat objects collect
        for (let k = j; k < j + repeatCnt; k++) {
          let cells = rows[k].cells;
          let cell1 = cells[1];
          let temp = cell1.querySelector('.' + CSS.inputField);
          if (temp.innerHTML.trim().length === 0) {
            emptyCnt++;
          }
          let retObj = this._getObjectFromCells(cells);
          if (retObj[0].length > 0) {
            modelParaObj[retObj[0]] = retObj[1];
          }
        }
        if (emptyCnt < repeatCnt) {
          listResults.push(modelParaObj);
        }
        modelParaObj = {};
      }
    }
    else {
      for (let i = 0; i < rows.length; i++) {
        // let jsonCells = JSON.parse(JSON.stringify(rows[i].cells));
        // console.log('jsoncells',jsonCells);
        let cells = rows[i].cells;
        // let cells = jsonCells;
        // 预处理
        // this._preProcessTableCell(cells);
        // console.log(cells);
        // const cols = Array.from(cells);
        // const inputs = cols.map(cell => cell.querySelector('.' + CSS.inputField));
        // // console.log('getJsonResult inputs:', inputs);
        // // 处理空的div
        // // let divs = inputs.map(input1 => input1.querySelector('div'));
        // // divs.map((div1) => {
        // //   if ((div1 !== null) && div1.innerHTML.trim().length == 0) {
        // //     // let parent = div1.parentElement;
        // //     // parent.removeChild(div1);
        // //     div1.remove();
        // //   }
        // // });
        // let content = inputs[1].innerHTML.trim();
        // // let b = content.replaceAll('<br>', '\n');
        // // const regrexa = /<div>|<\/div>/gi;
        // const regrexa = /<br>|<\/div>/gi;
        // let a = content.replace(regrexa, '');
        // // const regrex = /<br>/gi;
        // const regrex = /<div>/gi;
        // let b = a.replace(regrex, '\r');
        // const regrexall = /<br>|<\/div>|<div>/gi;
        // const regrexone = /<br>|<\/div>/gi;
        // let inputs0 = inputs[0].innerHTML.trim();
        // let keyOne = inputs0.replace(regrexone, '');
        // const regrexTwo = /<div>/gi;
        // let key = keyOne.replace(regrexTwo, '\r');
        let retObj = this._getObjectFromCells(cells);
        // 增加容错处理 xiaowy 2020/10/09
        if (retObj[0].length > 0 && retObj[1].length > 0) {
          modelParaObj[retObj[0]] = retObj[1];
          // if (cells[0].classList.contains(CSS.cellWithBorder)) {

          //   // modelParaObj[inputs[0].innerHTML] = b;
          //   modelParaObj[key] = b;
          //   // console.log('getJsonResult:', modelParaObj);
          //   listResults.push(modelParaObj);
          //   modelParaObj = {};
          // }
          // else if (ret.isRepeat) {
          //   if (ret.isRepeat) {
          //     if (key === firstRepeatWord && i > 0) {
          //       listResults.push(modelParaObj);
          //       modelParaObj = {};
          //       modelParaObj[key] = b;
          //     }
          //     else {
          //       modelParaObj[key] = b;
          //     }
          //   }
          //   else {
          //     // 增加容错处理 xiaowy 2020/10/09
          //     modelParaObj[key] = b;
          //     // if (key.length > 0) {
          //     //   modelParaObj[key] = b;
          //     // }
          //     // console.log('getJsonResult1:', modelParaObj);
          //   }
        }
      }
      listResults.push(modelParaObj);
      // console.log('after table getJsonResult:', listResults);
      // return listResults;
    }
    return listResults;
  }

  /**
   * @private
   * check whether table is repeat
   * @param {nothing}
   * @returns {boolean} @see checkFiledsIsRepeat
   */
  _tableIsRpeat() {
    let rows = this._table.rows;
    let listResults = [];
    for (let i = 0; i < rows.length; i++) {
      let cell = rows[i].cells[0];
      let input = cell.querySelector('.' + CSS.inputField);
      let key = input.innerHTML.trim();
      listResults.push(key);
    }
    let ret = checkFiledsIsRepeat(listResults.join(' '));
    // console.log('_tableIsRpeat ret', ret);
    return ret;
  }

  /**
   * @private
   * check table format correct
   * @param {boolean} isRepeat: model object names is repeat
   * @returns {boolean} true: correct, false: not correct
   */
  _checkTableFormat(isRepeat) {
    if (this._repeat === 1) {
      if (!isRepeat) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      if (isRepeat) {
        return false;
      }
      else {
        return true;
      }
    }
  }

  /**
   * @private
   * div预处理，清除不必要的div
   * @param {HtmlTableElement Cell Array} cellsLists
   */
  _preProcessTableCell(cellsLists) {
    const cols = Array.from(cellsLists);
    const inputs = cols.map(cell => cell.querySelector('.' + CSS.inputField));
    let divs = inputs.map(input1 => input1.querySelectorAll('div'));
    // divs.forEach()
    divs.forEach((div1) => {
      // if (div1 !== null) {
      //   console.log('remove11',div1.innerHTML);
      // }
      if (div1 !== null && div1 !== undefined) {
        // let parent = div1.parentElement;
        // parent.removeChild(div1);
        if (div1.innerText !== undefined && div1.innerText.length == 0) {
          div1.remove();
        }
        else {
          div1.forEach(ele => {
            if (ele.innerText !== undefined && ele.innerText.trim().length === 0 && ele.nextSibling === null) {
              // if (div1.textContent.trim().length === 0) {
              ele.remove();
            }
          });
        }
        // console.log('remove from:', div1.parentElement.innerHTML);
      }
    });
  }
}
