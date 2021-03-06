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
    constructor(tabConfig = {}) {
        /**
         * tabConfig: {
         * repeat:number, // 重复模式 1：全重复模式， -2：单行重复模式, -1:对象名称可修改
         * objSepIndexColl: Array, // 记录重复字段的边界索引，从0开始
         * repeatWordColl：Array, // 记录重复的对象名称
         * }
         */
        this._numberOfColumns = 0;
        this._numberOfRows = 0;
        this._element = this._createTableWrapper();
        this._table = this._element.querySelector('table');
        // this._objSepIndexColl = [];
        this._firstColumnIsRead = true; // 默认不可以修改对象名称 2020/10/14
        // this._repeat = 100; // 对象的重复模式0，1，-1
        this._tabConfig = tabConfig;

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
        let cellConfig = { isObjSep: false, isWritable: false, isFirstColumn: false };

        for (let i = 0; i < rows.length; i++) {
            let isFirstColumn = false;
            if (rows[i].cells.length === 0) {
                isFirstColumn = true;
                cellConfig.isFirstColumn = true;
            } else {
                cellConfig.isFirstColumn = false;
            }
            const cell = rows[i].insertCell(index);
            // if (this._numberOfColumns === 1) {
            //   this._fillReadOnlyCell(cell);
            //   continue;
            // }
            // if (this._objSepIndexColl && this._objSepIndexColl.indexOf(i) >= 0) {
            if (this._tabConfig.objSepIndexColl && this._tabConfig.objSepIndexColl.indexOf(i) >= 0) {
                // console.log('find!!!');
                // this._fillCell(cell, true)
                cellConfig.isObjSep = true;
            } else {
                cellConfig.isObjSep = false;
            }

            if (this._firstColumnIsRead && isFirstColumn) {
                cellConfig.isWritable = false;
            } else {
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
    addRow(index = -1, display = true) {
        this._numberOfRows++;
        const row = this._table.insertRow(index);
        if (display) {
            row.hidden = false;
        } else {
            row.hidden = true;
        }
        let nrows = this._numberOfRows - 1;
        let isInColl = this._tabConfig.objSepIndexColl && this._tabConfig.objSepIndexColl.indexOf(nrows) > 0;
        let isRepeat = this._tabConfig.repeat && this._tabConfig.repeat === 1;
        let objSepCollExist = this._tabConfig.objSepIndexColl && this._tabConfig.objSepIndexColl.length;
        let modularRow = isRepeat && objSepCollExist && (this._numberOfRows % (this._tabConfig.objSepIndexColl[0] + 1) === 0);
        if (isInColl || modularRow) {
            // console.log('isInColl', isInColl);
            // console.log('modularRow', modularRow);
            this._fillRow(row, true);
        } else {
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
        // this._objSepIndexColl = value;
        this._tabConfig.objSepIndexColl = value;
        // console.log('after objSepIndexColl:', this._objSepIndexColl);
    }

    /**
     * 设置表格的配置
     */
    set tabConfig(value) {
        this._tabConfig = value;
    }

    /**
     * 设置造型对象的重复列名集合
     */
    set repeatWordsColl(value) {
        // console.log('repeatWordsColl 0', value)
        this._tabConfig.repeatWordsColl = value;
        // console.log('repeatWordsColl', this._tabConfig.repeatWordsColl)
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
         * get cells of table
         * @return number
         */
    get columns() {
        return this._numberOfColumns;
    }

    set firstColumnIsRead(value) {
        this._firstColumnIsRead = value;
    }

    set repeat(value) {
        this._tabConfig.repeat = value;
        if (this._tabConfig.repeat === -1) {
            this._firstColumnIsRead = false;
        } else {
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
     * Create select option area of cell
     */
    _createSelectOption() {
        // console.log('_createSelectOption',this._tabConfig.repeatWordsColl, this._tabConfig.repeat);
        let isRepeatColl = this._tabConfig.repeatWordsColl && this._tabConfig.repeatWordsColl.length
        let repeatIs2 = this._tabConfig.repeat && this._tabConfig.repeat === 2;
        if (isRepeatColl || repeatIs2) {

            let optionColl = [];
            this._tabConfig.repeatWordsColl.forEach(word => {
                let option = create('option', null, { 'value': word })
                option.innerText = word;
                optionColl.push(option);
            });
            return create('select', [CSS.inputField], null, optionColl);
        }
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
    _fillCell(cell, cellConfig = { isObjSep: false, isWritable: false, isFirstColumn: false }) {
        if (cellConfig.isObjSep) {
            cell.classList.add(CSS.cellWithBorder);
        } else {
            cell.classList.add(CSS.cell);
        }
        if (this._tabConfig.repeat && this._tabConfig.repeat === 2) {
            if (cellConfig.isFirstColumn) {
                let select = this._createSelectOption();
                cell.appendChild(create('div', [CSS.area], null, [select]));
            } else if (cellConfig.isWritable) {
                const content = this._createContenteditableArea();
                // content.onpaste = this._pasteEvent;
                content.addEventListener('paste', this._pasteEvent);

                cell.appendChild(create('div', [CSS.area], null, [content]));
            } else {
                const content = this._createContentReadOnlyArea();
                cell.appendChild(create('div', [CSS.area], null, [content]));
            }
        } else if (cellConfig.isWritable) {
            const content = this._createContenteditableArea();
            // content.onpaste = this._pasteEvent;
            content.addEventListener('paste', this._pasteEvent);

            cell.appendChild(create('div', [CSS.area], null, [content]));
        } else {
            const content = this._createContentReadOnlyArea();
            cell.appendChild(create('div', [CSS.area], null, [content]));
        }
    }

    _pasteEvent_old(event) {
        let clipData = event.clipboardData;
        if (clipData.types != null) {
            let dataContent = clipData.getData('text/plain');
            if (dataContent && dataContent.length) {
                clipData.clearData();
                for (let i = 0; i < clipData.types.length; i++) {
                    // console.log("... types[" + i + "] = " + clipData.types[i]);
                    let data = clipData.getData(clipData.types[i]);
                    console.log('types: ' + clipData.types[i] + ";data: " + data);
                    clipData.setData(clipData.types[i], dataContent);
                    console.log('types1: ' + clipData.types[i] + ";data: " + clipData.getData(clipData.types[i]));
                }
            }
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
            let firstPart = '';
            let secondPart = '';
            if (range) {
                // if (range.startOffset !== range.endOffset) {
                //   firstPart = event.target.innerHTML.substring(0, range.startOffset)
                //   secondPart = event.target.innerHTML.substring(range.endOffset);
                //   range.deleteContents();
                // }
                // else {
                //   firstPart = event.target.innerHTML;
                // }
                range.deleteContents();
                let clipData = event.clipboardData;
                // for debug
                // if (clipData.types != null) {
                //   clipData.clearData();
                //   for (let i = 0; i < clipData.types.length; i++) {
                //     // console.log("... types[" + i + "] = " + clipData.types[i]);
                //     let data = clipData.getData(clipData.types[i]);
                //     console.log('types: '  + clipData.types[i] + ";data: " + data);

                //   }
                // }
                // 只保留文本 2020/11/11
                let dataContent = clipData.getData('text/plain');
                if (dataContent && dataContent.length) {
                    var el = document.createElement("div");
                    el.innerHTML = dataContent;
                    el.contentEditable = true;
                    var frag = document.createDocumentFragment(),
                        node, lastNode;
                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);
                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
                // console.log('dataContent', dataContent);
                // event.target.innerHTML = firstPart + dataContent + secondPart;
                // if (event.target.nodeName === '#text') {
                //   range.setStart(event.target, firstPart.length);
                //   range.setEnd(event.target, firstPart.length + dataContent.length);
                // }
                event.preventDefault();
                event.stopPropagation();
                return;
            }

        }

        /*
    let datahtml = clipData.getData('text/html')
    if (datahtml && datahtml.length) {
      // console.log('html', datahtml);
      let testdiv = document.createElement('div');
      testdiv.innerHTML = datahtml;
      let pColls = testdiv.querySelectorAll('p');
      if (pColls && pColls.length) {
        pColls.forEach((pele) => {
          if (pele.hasAttribute('style')) {
            pele.removeAttribute('style');
          }
          let spans = pele.querySelectorAll('span');
          if (spans.length) {
            spans.forEach((span) => {
              if (span.hasAttribute('style')) {
                span.removeAttribute('style');
   
              }
            });
   
          }
          event.target.appendChild(pele);
        }
        );
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
    else {
      let dataContent = clipData.getData('text/plain');
      if (dataContent && dataContent.length) {
        event.target.innerHTML = dataContent;
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }
    */
        /*
    console.log('paste2', dataContent);
    if (clipData.types != null) {
      clipData.clearData();
      for (let i = 0; i < clipData.types.length; i++) {
        // console.log("... types[" + i + "] = " + clipData.types[i]);
        let data = clipData.getData(clipData.types[i]);
        console.log('types: '  + clipData.types[i] + ";data: " + data);
        clipData.setData(clipData.types[i], dataContent);
        console.log('types1: '  + clipData.types[i] + ";data: " + clipData.getData(clipData.types[i]));
      }
      // for (let i = 0; i < clipData.types.length; i++) {
      //   console.log("... types[" + i + "] = " + clipData.types[i]);
      //   let data = clipData.getData(clipData.types[i]);
      //   console.log('types: '  + clipData.types[i] + ";data: " + data);
      //   // clipData.setData(clipData.types[i], dataContent);
      // }
   
     
   
    }
    if (clipData.items != null) {
      for (var i=0; i < clipData.items.length; i++) {
        console.log("... items[" + i + "].kind = " + clipData.items[i].kind + " ; type = " + clipData.items[i].type);
      }
    }
    // let dataContent = clipData.getData(clipData.types);
    // console.log('types', clipData.types);
    // console.log('paste1', dataContent);
    // word conetent process
    let testdiv = document.createElement('div');
    testdiv.innerHTML = dataContent;
    let spans = testdiv.querySelectorAll('span');
    if (spans.length) {
      spans.forEach((span) => {
        if (span.hasAttribute('style')) {
          span.removeAttribue('style');
        }
      });
      dataContent = testdiv.innerHTML;
      console.log('paste2', dataContent);
    }
    // word content process end
    // clipData.clearData();
    // clipData.setData('text/plain', dataContent);
    // clipData.setData(clipData.types, dataContent);
    // let ele = event.target;
    // ele.innerHTML += dataContent;
    // console.log(dataContent);
    // 不能去掉默认处理，否则不能ctrl+Z
    // event.preventDefault();
    event.stopPropagation();
    // return true;
    */
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
            if (i == 0) {
                cellConfig.isFirstColumn = true;
            } else {
                cellConfig.isFirstColumn = false;
            }
            if (i == 0 && this._firstColumnIsRead) {
                cellConfig.isWritable = false;
            } else {
                cellConfig.isWritable = true;
            }
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
            // console.log('in table ', event.keyCode);
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
     * @param processTag : 是否需要处理div等tag
     * @return {Array}: [key, value]
     */
    _getObjectFromCells(cells, processTag = true) {
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
        if (processTag) {
            let tempInput = inputs[1].cloneNode(true);
            // console.log('_getObjectFromCells tempInput', tempInput);
            let afterProcessNode = this._processWordContent(tempInput);
            // let content = inputs[1].innerHTML.trim();
            let htmlContent = afterProcessNode.innerHTML.trim();
            let content = this._processFontTag(htmlContent);
            // console.log('_getObjectFromCells content', content);
            // let b = content.replaceAll('<br>', '\n');
            // const regrexa = /<div>|<\/div>/gi;
            // const regrexa = /<br>|<div>/gi;
            // 要和加载的时候反过来 xiaowy 2021/01/30
            const regrexa = /<br>|<\/div>/gi;
            let a = content.replace(regrexa, '');
            // const regrex = /<br>/gi;
            // const regrex = /<\/div>/gi;
            const regrex = /<div>/gi;
            let match = regrex.exec(a);
            if (match && match.index === 0) {
                let tmp = a.replace('<div>', '');
                a = tmp;
            }
            let b = a.replace(regrex, '\r');
            // const regrexall = /<br>|<\/div>|<div>/gi;
            const regrexone = /<br>|<\/div>/gi;
            let inputs0 = '';
            if (this._tabConfig.repeat && this._tabConfig.repeat == 2) {
                inputs0 = inputs[0].value.trim();
            } else {
                inputs0 = inputs[0].innerHTML.trim();
            }
            let keyOne = inputs0.replace(regrexone, '');
            const regrexTwo = /<div>/gi;
            let match2 = regrexTwo.exec(keyOne);
            if (match2 && match2.index === 0) {
                let tmp1 = keyOne.replace('<div>', '');
                keyOne = tmp1;
            }
            let key = keyOne.replace(regrexTwo, '\r');
            // console.log('_getObjectFromCells', [key, b]);
            return [key, b];
        } else {
            let inputs0 = '';
            if (this._tabConfig.repeat && this._tabConfig.repeat == 2) {
                inputs0 = inputs[0].value.trim();
            } else {
                inputs0 = inputs[0].innerHTML.trim();
            }
            return [inputs0, inputs[1].innerHTML.trim()];
        }
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
                } else {
                    let div = document.createElement('div');
                    div.innerText = textContent;
                    // node.appendChild(div);
                    p.parentNode.replaceChild(div, p);
                }
            }

            let divList = node.querySelectorAll('div');
            if (divList) {
                divList.forEach(divEle => {
                    if (divEle.hasAttribute('contenteditable')) {
                        divEle.removeAttribute('contenteditable');
                    }
                });
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
     * @private
     * 处理font tag
     */
    _processFontTag(htmlContent) {
            try {
                const regexpWithoutE = /((\<font.*?\>))/ig;
                const match = htmlContent.match(regexpWithoutE);
                if (match) {
                    var str = match[0].replace('<', '[');
                    str = str.replace('>', ']')
                    var b = htmlContent.replace(regexpWithoutE, str);
                    const regexpWithoutE2 = /\<\/font\>/ig;
                    const match2 = b.match(regexpWithoutE2);
                    var str2 = match2[0].replace('<', '[');
                    str2 = str2.replace('>', ']')
                    var b2 = b.replace(regexpWithoutE2, str2);
                    console.log('_processFontTag', b2);
                    return b2
                } else {
                    return htmlContent;
                }
            } catch (e) {
                console.log('_processFontTag:', e);
                return htmlContent;
            }
        }
        /**
         * @public
         * Get the json object for this table
         * column 0 is the key and column 1 is the value
         * @param processTag: 是否处理
         * @return {Array}
         */
    getJsonResult() {
        try {
            let rows = this._table.rows;
            let listResults = [];
            let modelParaObj = {};
            // console.log('getJsonResult11', this._tabConfig);
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
                    for (let k = j; k < j + repeatCnt && k < rows.length; k++) {
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
                    // console.log('table getJsonResult', emptyCnt, repeatCnt);
                    if (emptyCnt < repeatCnt) {
                        listResults.push(modelParaObj);
                    }
                    modelParaObj = {};
                }
            } else {
                for (let i = 0; i < rows.length; i++) {
                    // let jsonCells = JSON.parse(JSON.stringify(rows[i].cells));
                    // console.log('jsoncells',jsonCells);
                    let cells = rows[i].cells;

                    let retObj = this._getObjectFromCells(cells);
                    // 增加容错处理 xiaowy 2020/10/09
                    if (retObj[0].length && retObj[1].length) {
                        // if (this._tabConfig.repeat && this._tabConfig.repeat === 2 && ((i + 1) % this._tabConfig.repeatWordsColl.length === 0)) {
                        if (this._tabConfig.repeat && this._tabConfig.repeat === 2) {
                            // console.log('this._tabConfig.repeat is 2');
                            // check empty
                            for (var prop in modelParaObj) {
                                if (modelParaObj.hasOwnProperty(prop)) {
                                    listResults.push(modelParaObj);
                                    modelParaObj = {};
                                    break;
                                }
                            }
                            // modelParaObj[retObj[0]] = retObj[1];
                        }
                        modelParaObj[retObj[0]] = retObj[1];
                        // alert(modelParaObj);
                    }
                    // 2021/01/21 保留repeat为0的字段空值 xiaowy
                    else if (retObj[0].length && this._tabConfig.repeat !== undefined && this._tabConfig.repeat === 0) {
                        modelParaObj[retObj[0]] = retObj[1];
                        // alert(modelParaObj);
                    }

                }
                // check whether modelParaObj is empty
                for (var prop in modelParaObj) {
                    if (modelParaObj.hasOwnProperty(prop)) {
                        listResults.push(modelParaObj);
                        break;
                    }
                }

                // console.log('after table getJsonResult:', listResults);
                // return listResults;
            }
            return listResults;
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    /**
     * @private
     * check whether table is repeat
     * @param {nothing}
     * @returns {isRepeat: boolean,repeatWords: string} @see checkFiledsIsRepeat
     */
    _tableIsRpeat() {
        if (this._tabConfig.repeat && (this._tabConfig.repeat === 1 || this._tabConfig.repeat === 2)) {
            if (this._tabConfig.repeat === 1) {
                // console.log('_tableIsRpeat', this._tabConfig.repeatWordsColl);
                return {
                    'isRepeat': true,
                    'repeatWords': this._tabConfig.repeatWordsColl.join(' ')
                }
            } else {
                return {
                    'isRepeat': false,
                    'repeatWords': ' '
                }
            }
        } else {
            let rows = this._table.rows;
            let listResults = [];
            for (let i = 0; i < rows.length; i++) {
                let cell = rows[i].cells[0];
                let input = cell.querySelector('.' + CSS.inputField);
                if (this._tabConfig.repeat && this._tabConfig.repeat === 2) {
                    let key = input.value.trim();
                    listResults.push(key);
                } else {
                    let key = input.innerHTML.trim();
                    listResults.push(key);
                }
            }
            // todo:以后可以根据_tabConfig.repeat的值来判断
            let ret = checkFiledsIsRepeat(listResults.join(' '));
            // console.log('_tableIsRpeat ret', ret);
            return ret;
        }
    }

    /**
     * @private
     * check table format correct
     * @param {boolean} isRepeat: model object names is repeat
     * @returns {boolean} true: correct, false: not correct
     */
    _checkTableFormat(isRepeat) {
        if (this._tabConfig.repeat === 1) {
            if (!isRepeat) {
                return false;
            } else {
                return true;
            }
        } else {
            if (isRepeat) {
                return false;
            } else {
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
                } else {
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