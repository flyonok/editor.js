/**
 * Checks the item is not missed or messed
 * @param {object|string[]|Element[]|HTMLElement|string} elem - element
 * @returns {boolean} true if element is correct
 * @private
 */
function _isNotMissed(elem) {
  return (!(elem === undefined || elem === null));
}

/**
 * Create DOM element with set parameters
 * @param {string} tagName - Html tag of the element to be created
 * @param {string[]} cssClasses - Css classes that must be applied to an element
 * @param {object} attrs - Attributes that must be applied to the element
 * @param {Element[]} children - child elements of creating element
 * @returns {HTMLElement} the new element
 */
export function create(tagName, cssClasses = null, attrs = null, children = null) {
  const elem = document.createElement(tagName);
  if (_isNotMissed(cssClasses)) {
    for (let i = 0; i < cssClasses.length; i++) {
      if (_isNotMissed(cssClasses[i])) {
        elem.classList.add(cssClasses[i]);
      }
    }
  }
  if (_isNotMissed(attrs)) {
    for (let key in attrs) {
      elem.setAttribute(key, attrs[key]);
    }
  }
  if (_isNotMissed(children)) {
    for (let i = 0; i < children.length; i++) {
      if (_isNotMissed(children[i])) {
        elem.appendChild(children[i]);
      }
    }
  }
  return elem;
}

/**
 * Get item position relative to document
 * @param {HTMLElement} elem - item
 * @returns {{x1: number, y1: number, x2: number, y2: number}} coordinates of the upper left (x1,y1) and lower right(x2,y2) corners
 */
export function getCoords(elem) {
  const rect = elem.getBoundingClientRect();

  return {
    y1: Math.floor(rect.top + window.pageYOffset),
    x1: Math.floor(rect.left + window.pageXOffset),
    x2: Math.floor(rect.right + window.pageXOffset),
    y2: Math.floor(rect.bottom + window.pageYOffset)
  };
}

/**
 * Recognizes which side of the container  is closer to (x,y)
 * @param {{x1: number, y1: number, x2: number, y2: number}} coords - coords of container
 * @param x - x coord
 * @param y - y coord
 * @return {string}
 */
export function getSideByCoords(coords, x, y) {
  let side;
  const sizeArea = 10;

  // a point is close to the boundary if the distance between them is less than the allowed distance.
  // +1px on each side due to fractional pixels
  if (x - coords.x1 >= -1 && x - coords.x1 <= sizeArea + 1) {
    side = 'left';
  }
  if (coords.x2 - x >= -1 && coords.x2 - x <= sizeArea + 1) {
    side = 'right';
  }
  if (y - coords.y1 >= -1 && y - coords.y1 <= sizeArea + 1) {
    side = 'top';
  }
  if (coords.y2 - y >= -1 && coords.y2 - y <= sizeArea + 1) {
    side = 'bottom';
  }

  return side;
}

/**
* 
* check selected model object fileds is all repeat
* 检查整个字符串是否完全重复, 比如 ‘1 2 3 4 1 2 3 4’
* @param {string} fileds
* @returns {Object} {isRepeat: boolean,repeatWords: string}
*/
export function checkFiledsIsRepeat(fields) {
  console.log('enter checkFiledsIsRepeat', fields);
  // let filedsArr = undefined;
  // if ( fields.push !== undefined && Array.isArray(fields)) {
  //   filedsArr = fields;
  // }
  // else {
  //   fieldsArr = fields.split(' ');
  // }
  // find first words(not empty)
  let b = fields.trim().split(' ');
  if (b.length < 2) {
    return {
      isRepeat: false,
      repeatWords: ' '
    };
  }
  // console.log(fields.trim().split(' '));
  // let a = fields.split.trim().split(' ');
  // console.log('a', a);
  // let fieldsArr = fields.split(' ');
  // console.log(filedsArr);
  let firstSubString = '';
  for (let i = 0; i < b.length; i++) {
    if (b[i].trim().length != 0) {
      firstSubString = b[i].trim();
      // console.log('1', firstSubString);
      break;
    }
  }
  // console.log(firstSubString);
  if (firstSubString !== undefined) {
    let findIndexColl = [];
    let findIndex = fields.indexOf(firstSubString);
    // collect all find index
    while (findIndex != -1) {
      findIndexColl.push(findIndex);
      findIndex = fields.indexOf(firstSubString, findIndex + 1);
    }
    // check find collect substring
    if (findIndexColl.length >= 2 && findIndexColl[0] === 0) {
      let firstSubIndex = findIndexColl[0];
      let subStringColl = [];
      let subStringLenth = 0;
      let firstSubStringColl = ' ';
      // let secondSubStringLength = 0;
      for (let j = 1; j < findIndexColl.length; j++) {
        if (j === 1 && j === findIndexColl.length - 1) {
          subStringLenth = findIndexColl[j] - firstSubIndex;
          firstSubStringColl = fields.substring(firstSubIndex, findIndexColl[j]);
          let last = fields.substring(findIndexColl[j]);
          if (last.trim() != firstSubStringColl.trim()) {
            return {
              isRepeat: false,
              repeatWords: ' '
            };
          }
          else {
            return {
              isRepeat: true,
              repeatWords: firstSubStringColl
            };
          }
          // firstSubIndex = findIndexColl[j];
          // subStringColl.push(firstSubString);
        }
        else if (j == 1) {
          subStringLenth = findIndexColl[j] - firstSubIndex;
          firstSubStringColl = fields.substring(firstSubIndex, findIndexColl[j]);
        }
        else {
          if ((findIndexColl[j] - firstSubIndex) != subStringLenth) {
            return {
              isRepeat: false,
              repeatWords: ''
            };
          }
          let temp = firstSubStringColl;
          firstSubStringColl = fields.substring(firstSubIndex, findIndexColl[j])
          // if (j == length - 1) {
          //   firstSubString = fields.substring(findIndexColl[j]);
          // }
          // else {
          //   firstSubString = fields.substring(firstSubIndex, findIndexColl[j])
          // }
          if (temp.trim() != firstSubStringColl.trim()) {
            return {
              isRepeat: false,
              repeatWords: ' '
            };
          }
        }
        firstSubIndex = findIndexColl[j];
      }
      // last index process
      let final = fields.substring(firstSubIndex);
      if (final.trim() != firstSubStringColl.trim()) {
        return {
          isRepeat: false,
          repeatWords: ' '
        };
      }
      else {
        return {
          isRepeat: true,
          repeatWords: firstSubStringColl
        };
      }
    }
    else {
      return {
        isRepeat: false,
        repeatWords: ' '
      };
    }
  }
  else {
    return {
      isRepeat: false,
      repeatWords: ' '
    };
  }
}
