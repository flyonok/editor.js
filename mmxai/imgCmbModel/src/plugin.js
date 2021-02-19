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
class MmxImgCmbModel {
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="18px" height="14px" viewBox="0 0 18 14"><g><path d="m6.46428,2.71875l-1.21428,0c-0.67165,0 -1.21428,0.30938 -1.21428,0.6875l0,0.6875c0,0.37813 0.54263,0.6875 1.21428,0.6875l1.21428,0c0.67165,0 1.21428,-0.30938 1.21428,-0.6875l0,-0.6875c0,-0.37813 -0.54263,-0.6875 -1.21428,-0.6875zm0,1.375l-1.21428,0l0,-0.6875l1.21428,0l0,0.6875zm10.32143,-3.09375l-14.57143,0c-0.67165,0 -1.21428,0.30938 -1.21428,0.6875l0,9.625c0,0.37813 0.54263,0.6875 1.21428,0.6875l14.57143,0c0.67165,0 1.21428,-0.30938 1.21428,-0.6875l0,-9.625c0,-0.37813 -0.54263,-0.6875 -1.21428,-0.6875zm0,10.3125l-14.57143,0l0,-9.625l14.57143,0l0,9.625zm-2.73214,-5.15625l-4.85714,0c-0.16697,0 -0.30357,0.07734 -0.30357,0.17188l0,0.34375c0,0.09453 0.13661,0.17188 0.30357,0.17188l4.85714,0c0.16697,0 0.30357,-0.07734 0.30357,-0.17188l0,-0.34375c0,-0.09453 -0.13661,-0.17188 -0.30357,-0.17188zm-7.58928,2.0625l-1.21428,0c-0.67165,0 -1.21428,0.30938 -1.21428,0.6875l0,0.6875c0,0.37813 0.54263,0.6875 1.21428,0.6875l1.21428,0c0.67165,0 1.21428,-0.30938 1.21428,-0.6875l0,-0.6875c0,-0.37813 -0.54263,-0.6875 -1.21428,-0.6875zm0,1.375l-1.21428,0l0,-0.6875l1.21428,0l0,0.6875zm7.58928,-0.6875l-4.85714,0c-0.16697,0 -0.30357,0.07734 -0.30357,0.17188l0,0.34375c0,0.09453 0.13661,0.17188 0.30357,0.17188l4.85714,0c0.16697,0 0.30357,-0.07734 0.30357,-0.17188l0,-0.34375c0,-0.09453 -0.13661,-0.17188 -0.30357,-0.17188zm0,-5.5l-4.85714,0c-0.16697,0 -0.30357,0.07734 -0.30357,0.17188l0,0.34375c0,0.09453 0.13661,0.17188 0.30357,0.17188l4.85714,0c0.16697,0 0.30357,-0.07734 0.30357,-0.17188l0,-0.34375c0,-0.09453 -0.13661,-0.17188 -0.30357,-0.17188zm-7.58928,2.0625l-1.21428,0c-0.67165,0 -1.21428,0.30938 -1.21428,0.6875l0,0.6875c0,0.37813 0.54263,0.6875 1.21428,0.6875l1.21428,0c0.67165,0 1.21428,-0.30938 1.21428,-0.6875l0,-0.6875c0,-0.37813 -0.54263,-0.6875 -1.21428,-0.6875zm0,1.375l-1.21428,0l0,-0.6875l1.21428,0l0,0.6875z"/></g></svg>',
      title: 'ImageCombineModel'
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

module.exports = MmxImgCmbModel;
