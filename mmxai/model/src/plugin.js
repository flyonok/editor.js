const TableConstructor = require('./tableConstructor').TableConstructor;
const svgIcon = require('./img/shapes.svg');

const CSS = {
  input: 'tc-table__inp'
};

/**
 *  Tool for table's creating
 *  @typedef {object} TableData - object with the data transferred to form a table
 *  @property {string[][]} content - two-dimensional array which contains table content
 */
class MmxModel {
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="18px" height="14px" viewBox="0 0 18 14"><g transform="translate(0,-283)"><path d="M 15.125,290.875 H 10.75 c -0.483164,0 -0.875,0.39184 -0.875,0.875 v 4.375 c 0,0.48316 0.391836,0.875 0.875,0.875 h 4.375 C 15.608164,297 16,296.60816 16,296.125 v -4.375 c 0,-0.48316 -0.391836,-0.875 -0.875,-0.875 z m -0.4375,4.8125 h -3.5 v -3.5 h 3.5 z M 5.5,290 C 3.56707,290 2,291.56707 2,293.5 2,295.43293 3.56707,297 5.5,297 7.43293,297 9,295.43293 9,293.5 9,291.56707 7.43293,290 5.5,290 Z m 0,5.6875 c -1.206133,0 -2.1875,-0.98137 -2.1875,-2.1875 0,-1.20613 0.981367,-2.1875 2.1875,-2.1875 1.206133,0 2.1875,0.98137 2.1875,2.1875 0,1.20613 -0.981367,2.1875 -2.1875,2.1875 z m 10.362734,-7.18758 -2.923321,-4.9998 C 12.744726,283.1668 12.403476,283 12.0625,283 c -0.340977,0 -0.682227,0.1668 -0.876914,0.50012 l -2.92332,4.9998 C 7.872344,289.16656 8.359606,290 9.139179,290 h 5.846641 c 0.77957,0 1.266836,-0.83344 0.876914,-1.50008 z m -6.189805,0.18758 2.389571,-4.08707 2.38957,4.08707 z"/></g></svg>',
      title: 'Model'
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
    // const table = toolsContent.querySelector('table.tc-table');
    // // console.log(table);
    // const data = [];
    // const rows = table.rows;

    // for (let i = 0; i < rows.length; i++) {
    //   const row = rows[i];
    //   const cols = Array.from(row.cells);
    //   const inputs = cols.map(cell => cell.querySelector('.' + CSS.input));
    //   const isWorthless = inputs.every(this._isEmpty);

    //   if (isWorthless) {
    //     continue;
    //   }
    //   data.push(inputs.map(input => input.innerHTML));
    // }

    // // added by xiaowy 2020/09/21 for 板块名称
    // const blockName = toolsContent.querySelector('.mmxModelDecsTitle');
    // if (blockName !== null) {
    //   return {
    //     name : blockName.innerHTML,
    //     content: data
    //   };
    // }
    // else {
    //   return {
    //     content: data
    //   }
    // }
    // return {
    //       content: this._tableConstructor.getJsonResult()
    //     };
    return this._tableConstructor.getJsonResult();
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
}

module.exports = MmxModel;
