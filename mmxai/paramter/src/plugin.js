const TableConstructor = require('./tableConstructor').TableConstructor;
const svgIcon = require('./img/toolboxIcon.svg');

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
      icon: svgIcon,
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
    console.log(toolsContent);
    const table = toolsContent.querySelector('table.tc-paraTable');
    console.log(table);
    const data = {};
    const rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cols = Array.from(row.cells);
      const inputs = cols.map(cell => cell.querySelector('.' + CSS.input));
      const isWorthless = inputs.every(this._isEmpty);

      if (isWorthless) {
        continue;
      }
      // data.push(inputs.map(input => input.innerHTML));
      data[inputs[0].innerHTML] = inputs[1].innerHTML;
    }

    // added by xiaowy 2020/09/21 for  参数名称
    const blockName = toolsContent.querySelector('.mmxParameterDecsTitle');
    if (blockName !== null) {
      return {
        name : blockName.innerHTML,
        content: data
      };
    }
    else {
      return {
        content: data
      }
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
}

module.exports = MmxParameter;
