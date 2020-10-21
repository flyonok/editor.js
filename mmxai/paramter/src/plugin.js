const TableConstructor = require('./tableConstructor').TableConstructor;
const svgIcon = require('./img/pi.svg');

const CSS = {
  input: 'tc-paraTable__inp'
};

/**
 *  Tool for table's creating
 *  @typedef {object} TableData - object with the data transferred to form a table
 *  @property {string[][]} content - two-dimensional array which contains table content
 */
class MmxParameter {
  /**
   * Allow to press Enter inside the CodeTool textarea
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      // icon: svgIcon,
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="18px" height="14px" viewBox="0 0 18 14"><g transform="translate(0,-283)"><path d="M 17.431732,283.00007 H 2.0779949 c -0.337668,0 -0.661415,0.13403 -0.900049,0.37266 l -0.993117,0.99312 c -0.200453,0.20045 -0.05847,0.54329 0.225112,0.54329 h 5.408251 v 5.48024 c 0,1.91385 -0.689654,3.7215 -1.952825,5.13899 -0.169431,0.19012 -0.171419,0.4729 0.0084,0.65307 l 0.675733,0.67573 c 0.1921,0.1921 0.514655,0.1917 0.696812,-0.01 1.604021,-1.77505 2.481003,-4.04923 2.481003,-6.45785 v -5.48024 h 3.8181511 v 9.38231 c 0,1.13272 0.674539,2.20777 1.748792,2.56651 1.178058,0.39335 2.395491,-0.0565 3.037419,-1.02135 l 0.939821,-1.40993 c 0.146363,-0.21955 0.0871,-0.51545 -0.132442,-0.66181 l -0.794255,-0.52938 c -0.219544,-0.14636 -0.515849,-0.0871 -0.661813,0.13245 l -0.939424,1.41033 a 0.70174425,0.70174425 0 0 1 -0.585449,0.31261 c -0.387781,0 -0.703574,-0.3158 -0.703574,-0.70358 v -9.47816 h 3.977239 c 0.263692,0 0.477269,-0.21358 0.477269,-0.47727 v -0.95453 c 0,-0.2637 -0.213577,-0.47727 -0.477269,-0.47727 z"/></g></svg>',
      title: 'Parameter'
    };
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   * @param {TableData} data — previously saved data
   * @param {object} config - user config for Tool
   * @param {object} api - Editor.js API
   */
  constructor({data, config, api}) {
    this.api = api;

    this._tableConstructor = new TableConstructor(data, config, api);
  }

  /**
   * Return Tool's view
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    return this._tableConstructor.htmlElement;
  }

  /**
   * Extract Tool's data from the view
   * @returns {TableData} - saved data
   * @public
   */
  save(toolsContent) {
    // modified by xiaowy 2020/09/21
    // const table = toolsContent.querySelector('table');
    try {
      console.log(toolsContent);
      const table = toolsContent.querySelector('table.tc-paraTable');
      console.log(table);
      const data = {};
      const rows = table.rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // 预处理
        // this._preProcessTableCell(row.cells);
        const cols = Array.from(row.cells);
        const inputs = cols.map(cell => cell.querySelector('.' + CSS.input));
        const isWorthless = inputs.every(this._isEmpty);

        if (isWorthless) {
          continue;
        }
        // data.push(inputs.map(input => input.innerHTML));
        let content = inputs[1].innerHTML.trim();
        // let b = content.replaceAll('<br>', '\n');
        // const regrexa = /<div>|<\/div>/gi;
        const regrexa = /<br>|<\/div>/gi;
        let a = content.replace(regrexa, '');
        // const regrex = /<br>/gi;
        const regrex = /<div>/gi;
        let b = a.replace(regrex, '\r');
        const regrexone = /<br>|<\/div>/gi;
        let inputs0 = inputs[0].innerHTML.trim();
        let keyOne = inputs0.replace(regrexone, '');
        const regrexTwo = /<div>/gi;
        let key = keyOne.replace(regrexTwo, '\r');

        // data[inputs[0].innerHTML] = inputs[1].innerHTML;
        if (b.indexOf('[') === 0 && b.indexOf(']') === b.length - 1) {
          let result = b.substring(1, b.length - 1)
          let arr = result.split(',');
          let cont = arr.map(ele => parseFloat(ele));
          data[key] = cont;
        }
        else {
          data[key] = b;
        }
      }

      // added by xiaowy 2020/09/21 for  参数名称
      const blockName = toolsContent.querySelector('.mmxParameterDecsTitle');
      let paraName = blockName.innerHTML;
      let leftIndex = paraName.indexOf('【');
      let rightIndex = paraName.indexOf('】');
      let realName = paraName.substring(leftIndex + 1, rightIndex - leftIndex);
      let ret = {};
      ret[realName] = data;
      return ret;
    } catch (e) {
      alert(e);
      return {};
    }
  }

  /**
   * @private
   *
   * Check input field is empty
   * @param {HTMLElement} input - input field
   * @return {boolean}
   */
  _isEmpty(input) {
    return !input.textContent.trim();
  }

  /**
   * @private
   * div预处理，清除不必要的div
   * @param {HtmlTableElement Cell Array} cellsLists
   */
  _preProcessTableCell(cellsLists) {
    const cols = Array.from(cellsLists);
    const inputs = cols.map(cell => cell.querySelector('.' + CSS.input));
    let divs = inputs.map(input1 => input1.querySelectorAll('div'));
    // divs.forEach()
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

module.exports = MmxParameter;
