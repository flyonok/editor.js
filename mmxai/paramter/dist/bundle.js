!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MmxParameter=t():e.MmxParameter=t()}(window,function(){return function(e){var t={};function o(l){if(t[l])return t[l].exports;var n=t[l]={i:l,l:!1,exports:{}};return e[l].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,l){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(o.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(l,n,function(t){return e[t]}.bind(null,n));return l},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=3)}([function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=function(e,t){var o=e[1]||"",l=e[3];if(!l)return o;if(t&&"function"==typeof btoa){var n=(r=l,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),i=l.sources.map(function(e){return"/*# sourceURL="+l.sourceRoot+e+" */"});return[o].concat(i).concat([n]).join("\n")}var r;return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var l={},n=0;n<this.length;n++){var i=this[n][0];"number"==typeof i&&(l[i]=!0)}for(n=0;n<e.length;n++){var r=e[n];"number"==typeof r[0]&&l[r[0]]||(o&&!r[2]?r[2]=o:o&&(r[2]="("+r[2]+") and ("+o+")"),t.push(r))}},t}},function(e,t,o){var l,n,i={},r=(l=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===n&&(n=l.apply(this,arguments)),n}),s=function(e){var t={};return function(e,o){if("function"==typeof e)return e();if(void 0===t[e]){var l=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,o);if(window.HTMLIFrameElement&&l instanceof window.HTMLIFrameElement)try{l=l.contentDocument.head}catch(e){l=null}t[e]=l}return t[e]}}(),a=null,c=0,d=[],h=o(6);function u(e,t){for(var o=0;o<e.length;o++){var l=e[o],n=i[l.id];if(n){n.refs++;for(var r=0;r<n.parts.length;r++)n.parts[r](l.parts[r]);for(;r<l.parts.length;r++)n.parts.push(m(l.parts[r],t))}else{var s=[];for(r=0;r<l.parts.length;r++)s.push(m(l.parts[r],t));i[l.id]={id:l.id,refs:1,parts:s}}}}function _(e,t){for(var o=[],l={},n=0;n<e.length;n++){var i=e[n],r=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};l[r]?l[r].parts.push(s):o.push(l[r]={id:r,parts:[s]})}return o}function p(e,t){var o=s(e.insertInto);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var l=d[d.length-1];if("top"===e.insertAt)l?l.nextSibling?o.insertBefore(t,l.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),d.push(t);else if("bottom"===e.insertAt)o.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=s(e.insertAt.before,o);o.insertBefore(t,n)}}function b(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=d.indexOf(e);t>=0&&d.splice(t,1)}function f(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var l=function(){0;return o.nc}();l&&(e.attrs.nonce=l)}return g(t,e.attrs),p(e,t),t}function g(e,t){Object.keys(t).forEach(function(o){e.setAttribute(o,t[o])})}function m(e,t){var o,l,n,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var r=c++;o=a||(a=f(t)),l=w.bind(null,o,r,!1),n=w.bind(null,o,r,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",g(t,e.attrs),p(e,t),t}(t),l=function(e,t,o){var l=o.css,n=o.sourceMap,i=void 0===t.convertToAbsoluteUrls&&n;(t.convertToAbsoluteUrls||i)&&(l=h(l));n&&(l+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var r=new Blob([l],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(r),s&&URL.revokeObjectURL(s)}.bind(null,o,t),n=function(){b(o),o.href&&URL.revokeObjectURL(o.href)}):(o=f(t),l=function(e,t){var o=t.css,l=t.media;l&&e.setAttribute("media",l);if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,o),n=function(){b(o)});return l(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;l(e=t)}else n()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var o=_(e,t);return u(o,t),function(e){for(var l=[],n=0;n<o.length;n++){var r=o[n];(s=i[r.id]).refs--,l.push(s)}e&&u(_(e,t),t);for(n=0;n<l.length;n++){var s;if(0===(s=l[n]).refs){for(var a=0;a<s.parts.length;a++)s.parts[a]();delete i[s.id]}}}};var v,y=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function w(e,t,o,l){var n=o?"":l.css;if(e.styleSheet)e.styleSheet.cssText=y(t,n);else{var i=document.createTextNode(n),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(i,r[t]):e.appendChild(i)}}},function(e,t){e.exports='<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#388AE5"></circle><path fill="#FFF" d="M10.9 9.1h3.7a.9.9 0 1 1 0 1.8h-3.7v3.7a.9.9 0 1 1-1.8 0v-3.7H5.4a.9.9 0 0 1 0-1.8h3.7V5.4a.9.9 0 0 1 1.8 0v3.7z"></path></svg>'},function(e,t,o){const l=o(14).TableConstructor,n=o(13),i={input:"tc-table__inp"};e.exports=class{static get enableLineBreaks(){return!0}static get toolbox(){return{icon:n,title:"Parameter"}}constructor({data:e,config:t,api:o}){this.api=o,this._tableConstructor=new l(e,t,o)}render(){return this._tableConstructor.htmlElement}save(e){const t=e.querySelector("table.tc-table");console.log(t);const o=[],l=t.rows;for(let e=0;e<l.length;e++){const t=l[e],n=Array.from(t.cells).map(e=>e.querySelector("."+i.input));n.every(this._isEmpty)||o.push(n.map(e=>e.innerHTML))}const n=e.querySelector(".mmxParameterDecsTitle");return null!==n?{name:n.innerHTML,content:o}:{content:o}}_isEmpty(e){return!e.textContent.trim()}}},function(e,t,o){var l=o(5);"string"==typeof l&&(l=[[e.i,l,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o(1)(l,n);l.locals&&(e.exports=l.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-editor{padding:10px;position:relative;box-sizing:content-box;width:100%;left:-10px}.mmxParameterDecsTitle{color:red}.mmxParameterDesc{color:#7b7b7b}",""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var o=t.protocol+"//"+t.host,l=o+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var n,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(n=0===i.indexOf("//")?i:0===i.indexOf("/")?o+i:l+i.replace(/^\.\//,""),"url("+JSON.stringify(n)+")")})}},function(e,t,o){var l=o(8);"string"==typeof l&&(l=[[e.i,l,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o(1)(l,n);l.locals&&(e.exports=l.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-toolbar{background:#368be6;}.tc-toolbar--hidden{visibility:hidden}.tc-toolbar--hor{width:100%;height:21px;flex-direction:row;left:0;top:1px}.tc-toolbar--hor,.tc-toolbar--ver{display:flex;align-items:center;position:absolute;z-index:100}.tc-toolbar--ver{height:100%;width:21px;flex-direction:column;top:0;left:-1px}.tc-toolbar__plus{height:21px;width:21px;margin-top:0;}.tc-toolbar__plus--hor{margin-left:-10px}.tc-toolbar__plus--ver{margin-top:-10px}.tc-toolbar__shine-line--hor{min-height:1px;width:100%}.tc-toolbar__shine-line--ver{min-width:1px;height:100%}",""])},function(e,t,o){var l=o(10);"string"==typeof l&&(l=[[e.i,l,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o(1)(l,n);l.locals&&(e.exports=l.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-paraTable{width:100%;height:100%;border-collapse:collapse;table-layout:fixed;}.tc-paraTable__wrap{border-radius:3px;position:relative;height:100%;width:100%;box-sizing:border-box;border:none}.tc-paraTable__cell{border:1px solid #349d34;padding:0;vertical-align:top}.tc-paraTable__area{padding:10px;height:100%}.tc-paraTable__inp{outline:none;flex-grow:100;min-height:1.5em;height:100%;overflow:hidden;font-size:12px}.tc-paraTable tbody tr:first-child td{border-top:none}.tc-paraTable tbody tr:last-child td{border-bottom:none}.tc-paraTable tbody tr td:last-child{border-right:none}.tc-paraTable tbody tr td:first-child{border-left:none}",""])},function(e,t,o){var l=o(12);"string"==typeof l&&(l=[[e.i,l,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};o(1)(l,n);l.locals&&(e.exports=l.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-readOnlyParaTable{width:100%;height:100%;border-collapse:collapse;table-layout:fixed;}.tc-readOnlyParaTable__wrap{position:relative;height:100%;width:100%;box-sizing:border-box;border:none}.tc-readOnlyParaTable__cell{border:1px solid #349d34;padding:0;vertical-align:top}.tc-readOnlyParaTable__area{padding:10px;height:100%}.tc-readOnlyParaTable__inp{outline:none;flex-grow:100;min-height:1.5em;height:100%;overflow:hidden;font-size:12px}.tc-readOnlyParaTable tbody tr:first-child td{border-top:none}.tc-readOnlyParaTable tbody tr:last-child td{border-bottom:2px solid #349d34}.tc-readOnlyParaTable tbody tr td:last-child{border-right:none}.tc-readOnlyParaTable tbody tr td:first-child{border-left:none}",""])},function(e,t){e.exports='<svg width="18" height="14"><path d="M2.833 8v1.95a1.7 1.7 0 0 0 1.7 1.7h3.45V8h-5.15zm0-2h5.15V2.35h-3.45a1.7 1.7 0 0 0-1.7 1.7V6zm12.3 2h-5.15v3.65h3.45a1.7 1.7 0 0 0 1.7-1.7V8zm0-2V4.05a1.7 1.7 0 0 0-1.7-1.7h-3.45V6h5.15zM4.533.1h8.9a3.95 3.95 0 0 1 3.95 3.95v5.9a3.95 3.95 0 0 1-3.95 3.95h-8.9a3.95 3.95 0 0 1-3.95-3.95v-5.9A3.95 3.95 0 0 1 4.533.1z"></path></svg>'},function(e,t,o){"use strict";o.r(t);o(4);function l(e){return!(null==e)}function n(e,t=null,o=null,n=null){const i=document.createElement(e);if(l(t))for(let e=0;e<t.length;e++)l(t[e])&&i.classList.add(t[e]);if(l(o))for(let e in o)i.setAttribute(e,o[e]);if(l(n))for(let e=0;e<n.length;e++)l(n[e])&&i.appendChild(n[e]);return i}function i(e){const t=e.getBoundingClientRect();return{y1:Math.floor(t.top+window.pageYOffset),x1:Math.floor(t.left+window.pageXOffset),x2:Math.floor(t.right+window.pageXOffset),y2:Math.floor(t.bottom+window.pageYOffset)}}function r(e,t,o){let l;return t-e.x1>=-1&&t-e.x1<=11&&(l="left"),e.x2-t>=-1&&e.x2-t<=11&&(l="right"),o-e.y1>=-1&&o-e.y1<=11&&(l="top"),e.y2-o>=-1&&e.y2-o<=11&&(l="bottom"),l}o(7);var s=o(2),a=o.n(s);const c={highlightingLine:"tc-toolbar",hidden:"tc-toolbar--hidden",horizontalToolBar:"tc-toolbar--hor",horizontalHighlightingLine:"tc-toolbar__shine-line--hor",verticalToolBar:"tc-toolbar--ver",verticalHighlightingLine:"tc-toolbar__shine-line--ver",plusButton:"tc-toolbar__plus",horizontalPlusButton:"tc-toolbar__plus--hor",verticalPlusButton:"tc-toolbar__plus--ver",area:"tc-table__area"};class d{constructor(){this._plusButton=this._generatePlusButton(),this._highlightingLine=this._generateHighlightingLine(),this._toolbar=this._generateToolBar([this._plusButton,this._highlightingLine])}hide(){this._toolbar.classList.add(c.hidden)}show(){this._toolbar.classList.remove(c.hidden),this._highlightingLine.classList.remove(c.hidden)}hideLine(){this._highlightingLine.classList.add(c.hidden)}get htmlElement(){return this._toolbar}_generatePlusButton(){const e=n("div",[c.plusButton]);return e.innerHTML=a.a,e.addEventListener("click",e=>{e.stopPropagation();const t=new CustomEvent("click",{detail:{x:e.pageX,y:e.pageY},bubbles:!0});this._toolbar.dispatchEvent(t)}),e}_generateHighlightingLine(){const e=n("div",[c.highlightingLine]);return e.addEventListener("click",e=>{e.stopPropagation();const t=new CustomEvent("click",{bubbles:!0});this._toolbar.dispatchEvent(t)}),e}_generateToolBar(e){const t=n("div",[c.hidden],null,e);return t.addEventListener("mouseleave",e=>{this._recalcMousePos(e)}),t}_recalcMousePos(e){this.hide();const t=document.elementFromPoint(e.pageX,e.pageY);if(null!==t&&t.classList.contains(c.area)){const o=new MouseEvent("mouseover",{clientX:e.pageX,clientY:e.pageY});t.dispatchEvent(o)}}}class h extends d{constructor(){super(),this._toolbar.classList.add(c.horizontalToolBar),this._plusButton.classList.add(c.horizontalPlusButton),this._highlightingLine.classList.add(c.horizontalHighlightingLine)}showIn(e){const t=Math.floor(Number.parseInt(window.getComputedStyle(this._toolbar).height)/2);this._toolbar.style.top=e-t+"px",this.show()}}class u extends d{constructor(){super(),this._toolbar.classList.add(c.verticalToolBar),this._plusButton.classList.add(c.verticalPlusButton),this._highlightingLine.classList.add(c.verticalHighlightingLine)}showIn(e){const t=Math.floor(Number.parseInt(window.getComputedStyle(this._toolbar).width)/2);this._toolbar.style.left=e-t+"px",this.show()}}o(9);const _={table:"tc-paraTable",inputField:"tc-paraTable__inp",cell:"tc-paraTable__cell",wrapper:"tc-paraTable__wrap",area:"tc-paraTable__area"};class p{constructor(){this._numberOfColumns=0,this._numberOfRows=0,this._element=this._createTableWrapper(),this._table=this._element.querySelector("table"),this._hangEvents()}addColumn(e=-1){this._numberOfColumns++;const t=this._table.rows;for(let o=0;o<t.length;o++){const l=t[o].insertCell(e);this._fillCell(l)}}addRow(e=-1){this._numberOfRows++;const t=this._table.insertRow(e);return this._fillRow(t),t}delRow(e=0){e>=this._numberOfRows||(this._table.deleteRow(e),this._numberOfRows--)}get htmlElement(){return this._element}get body(){return this._table}get selectedCell(){return this._selectedCell}_createTableWrapper(){return n("div",[_.wrapper],null,[n("table",[_.table])])}_createContenteditableArea(){return n("div",[_.inputField],{contenteditable:"true"})}_fillCell(e){e.classList.add(_.cell);const t=this._createContenteditableArea();e.appendChild(n("div",[_.area],null,[t]))}_fillRow(e){for(let t=0;t<this._numberOfColumns;t++){const t=e.insertCell();this._fillCell(t)}}_hangEvents(){this._table.addEventListener("focus",e=>{this._focusEditField(e)},!0),this._table.addEventListener("blur",e=>{this._blurEditField(e)},!0),this._table.addEventListener("keydown",e=>{this._pressedEnterInEditField(e)}),this._table.addEventListener("click",e=>{this._clickedOnCell(e)}),this._table.addEventListener("mouseover",e=>{this._mouseEnterInDetectArea(e),e.stopPropagation()},!0)}_focusEditField(e){console.log("Enter _focusEditField"),e.target.classList.contains(_.inputField)&&(this._selectedCell=e.target.closest("."+_.cell),console.log("selected cell index:",this._selectedCell.cellIndex),console.log("_focusEditField finished!"))}_blurEditField(e){e.target.classList.contains(_.inputField)&&(this._selectedCell=null)}_pressedEnterInEditField(e){e.target.classList.contains(_.inputField)&&(13!==e.keyCode||e.shiftKey?[37,38,39,40,9].indexOf(e.keyCode)>=0&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&e.preventDefault():e.preventDefault())}_clickedOnCell(e){if(!e.target.classList.contains(_.cell))return;e.target.querySelector("."+_.inputField).focus()}_mouseEnterInDetectArea(e){if(!e.target.classList.contains(_.area))return;const t=r(i(e.target.closest("TD")),e.pageX,e.pageY);e.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:t},bubbles:!0}))}}o(11);const b={table:"tc-readOnlyParaTable",inputField:"tc-readOnlyParaTable__inp",cell:"tc-readOnlyParaTable__cell",wrapper:"tc-readOnlyParaTable__wrap",area:"tc-readOnlyParaTable__area"};class f{constructor(){this._numberOfColumns=0,this._numberOfRows=0,this._element=this._createTableWrapper(),this._table=this._element.querySelector("table")}addColumn(e=-1){this._numberOfColumns++;const t=this._table.rows;for(let o=0;o<t.length;o++){const l=t[o].insertCell(e);this._fillCell(l)}}addRow(e=-1){this._numberOfRows++;const t=this._table.insertRow(e);return this._fillRow(t),t}delRow(e=0){e>=this._numberOfRows||(this._table.deleteRow(e),this._numberOfRows--)}get htmlElement(){return this._element}get body(){return this._table}get selectedCell(){return this._selectedCell}_createTableWrapper(){return n("div",[b.wrapper],null,[n("table",[b.table])])}_createContenteditableArea(){return n("div",[b.inputField],{contenteditable:"false"})}_fillCell(e){e.classList.add(b.cell);const t=this._createContenteditableArea();e.appendChild(n("div",[b.area],null,[t]))}_fillRow(e){for(let t=0;t<this._numberOfColumns;t++){const t=e.insertCell();this._fillCell(t)}}_hangEvents(){this._table.addEventListener("focus",e=>{this._focusEditField(e)},!0),this._table.addEventListener("blur",e=>{this._blurEditField(e)},!0),this._table.addEventListener("keydown",e=>{this._pressedEnterInEditField(e)}),this._table.addEventListener("click",e=>{this._clickedOnCell(e)}),this._table.addEventListener("mouseover",e=>{this._mouseEnterInDetectArea(e),e.stopPropagation()},!0)}_focusEditField(e){e.target.classList.contains(b.inputField)&&(this._selectedCell=e.target.closest("."+b.cell))}_blurEditField(e){e.target.classList.contains(b.inputField)&&(this._selectedCell=null)}_pressedEnterInEditField(e){e.target.classList.contains(b.inputField)&&(13!==e.keyCode||e.shiftKey||e.preventDefault())}_clickedOnCell(e){if(!e.target.classList.contains(b.cell))return;e.target.querySelector("."+b.inputField).focus()}_mouseEnterInDetectArea(e){if(!e.target.classList.contains(b.area))return;const t=r(i(e.target.closest("TD")),e.pageX,e.pageY);e.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:t},bubbles:!0}))}}o.d(t,"TableConstructor",function(){return m});const g={editor:"tc-editor",toolBarHor:"tc-toolbar--hor",toolBarVer:"tc-toolbar--ver",inputField:"tc-paraTable__inp",readOnlyTable_inputField:"tc-readOnlyParaTable__inp"};class m{constructor(e,t,o){console.log("tableConstructor begin!"),this._table=new p,this._titleWrapper=document.createElement("div"),this._descTitle=document.createElement("H3"),void 0!==e.name?this._descTitle.innerHTML=e.name:this._descTitle.innerHTML="【参数】",this._descTitle.classList.add("mmxParameterDecsTitle"),console.log("_descTitle.classList.add");let l=document.createElement("p");l.innerHTML="说明： 每个参数占一行， 左边是参数名称， 右边是其数值。 没有值的， 右边可以不填。",l.classList.add("mmxParameterDesc"),l.appendChild(document.createElement("br")),this._titleWrapper.appendChild(this._descTitle),this._titleWrapper.appendChild(l),this._clickTimeId=-1;const i=this._resizeTable(e,t);this._fillTable(e,i),this._readOnlyTable=new f,this._makeReadOnlyTable();let r=document.createElement("br");this._container=n("div",[g.editor,o.styles.block],null,[this._titleWrapper,this._readOnlyTable.htmlElement,this._table.htmlElement,r]),this._verticalToolBar=new u,this._horizontalToolBar=new h,this._table.htmlElement.appendChild(this._horizontalToolBar.htmlElement),this._table.htmlElement.appendChild(this._verticalToolBar.htmlElement),this._hoveredCell=null,this._activatedToolBar=null,this._hoveredCellSide=null,this._plusButDelay=null,this._toolbarShowDelay=null,this._hangEvents()}_makeReadOnlyTable(){this._readOnlyTable=new f;let e={content:[["参数名称","参数值"]]};const t=this._resizeReadOnlyTable(e,{rows:"1",cols:"2"});this._fillReadOnlyTable(e,t)}get htmlElement(){return this._container}_fillTable(e,t){if(void 0!==e.content)for(let o=0;o<t.rows&&o<e.content.length;o++)for(let l=0;l<t.cols&&l<e.content[o].length;l++){this._table.body.rows[o].cells[l].querySelector("."+g.inputField).innerHTML=e.content[o][l]}}_fillReadOnlyTable(e,t){if(void 0!==e.content)for(let o=0;o<t.rows&&o<e.content.length;o++)for(let l=0;l<t.cols&&l<e.content[o].length;l++){this._readOnlyTable.body.rows[o].cells[l].querySelector("."+g.readOnlyTable_inputField).innerHTML=e.content[o][l]}}_resizeTable(e,t){const o=Array.isArray(e.content),l=!!o&&e.content.length,n=o?e.content.length:void 0,i=l?e.content[0].length:void 0,r=Number.parseInt(t.rows),s=Number.parseInt(t.cols),a=!isNaN(r)&&r>0?r:void 0,c=!isNaN(s)&&s>0?s:void 0,d=n||a||1,h=i||c||2;for(let e=0;e<d;e++)this._table.addRow();for(let e=0;e<h;e++)this._table.addColumn();return{rows:d,cols:h}}_resizeReadOnlyTable(e,t){const o=Array.isArray(e.content),l=!!o&&e.content.length,n=o?e.content.length:void 0,i=l?e.content[0].length:void 0,r=Number.parseInt(t.rows),s=Number.parseInt(t.cols),a=!isNaN(r)&&r>0?r:void 0,c=!isNaN(s)&&s>0?s:void 0,d=n||a||1,h=i||c||2;for(let e=0;e<d;e++)this._readOnlyTable.addRow();for(let e=0;e<h;e++)this._readOnlyTable.addColumn();return{rows:d,cols:h}}_showToolBar(e,t){this._hideToolBar(),this._activatedToolBar=e,e.showIn(t)}_hideToolBar(){null!==this._activatedToolBar&&this._activatedToolBar.hide()}_hangEvents(){this._container.addEventListener("mouseInActivatingArea",e=>{this._toolbarCalling(e)}),this._container.addEventListener("click",e=>{clearTimeout(this._clickTimeId);let t=this;this._clickTimeId=setTimeout(function(){t._clickToolbar(e)},250)}),this._container.addEventListener("dblclick",e=>{clearTimeout(this._clickTimeId),console.log("doubleclick event!"),this._dblclickToolbar(e)}),this._container.addEventListener("input",()=>{this._hideToolBar()}),this._container.addEventListener("keydown",e=>{this._containerKeydown(e)}),this._container.addEventListener("mouseout",e=>{this._leaveDetectArea(e)}),this._container.addEventListener("mouseover",e=>{this._mouseEnterInDetectArea(e)})}_mouseInActivatingAreaListener(e){this._hoveredCellSide=e.detail.side;const t=i(e.target),o=i(this._table.htmlElement);if(this._hoveredCell=e.target.closest("TD"),null===this._hoveredCell){const e=11;this._hoveredCell=this._container,t.x1+=e,t.y1+=e,t.x2-=e,t.y2-=e}"top"===this._hoveredCellSide&&this._showToolBar(this._horizontalToolBar,t.y1-o.y1-2),"bottom"===this._hoveredCellSide&&this._showToolBar(this._horizontalToolBar,t.y2-o.y1-1)}_isToolbar(e){return null===e?null:!(!e.closest("."+g.toolBarHor)&&!e.closest("."+g.toolBarVer))}_leaveDetectArea(e){this._isToolbar(e.relatedTarget)||(clearTimeout(this._toolbarShowDelay),this._hideToolBar())}_toolbarCalling(e){this._isToolbar(e.target)||(clearTimeout(this._toolbarShowDelay),this._toolbarShowDelay=setTimeout(()=>{this._mouseInActivatingAreaListener(e)},125))}_clickToolbar(e){if(!this._isToolbar(e.target))return;let t;if(this._activatedToolBar===this._horizontalToolBar?(this._addRow(),t="y"):t="x",isNaN(e.detail)&&null!==e.detail){const o=i(this._table.htmlElement);let l;l="x"===t?e.detail.x-o.x1:e.detail.y-o.y1,this._delayAddButtonForMultiClickingNearMouse(l)}else this._hideToolBar()}_dblclickToolbar(e){if(!this._isToolbar(e.target))return;let t;if(this._activatedToolBar===this._horizontalToolBar?(this._delRow(),t="y"):t="x",isNaN(e.detail)&&null!==e.detail){const o=i(this._table.htmlElement);let l;l="x"===t?e.detail.x-o.x1:e.detail.y-o.y1,this._delayAddButtonForMultiClickingNearMouse(l)}else this._hideToolBar()}_containerKeydown(e){13===e.keyCode?this._containerEnterPressed(e):[37,38,39,40,9].indexOf(e.keyCode)>=0&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&(console.log(e.keyCode),this._containerArrowKeyPressed(e))}_delayAddButtonForMultiClickingNearMouse(e){this._showToolBar(this._activatedToolBar,e),this._activatedToolBar.hideLine(),clearTimeout(this._plusButDelay),this._plusButDelay=setTimeout(()=>{this._hideToolBar()},500)}_getHoveredSideOfContainer(){return this._hoveredCell===this._container?this._isBottomOrRight()?0:-1:1}_isBottomOrRight(){return"bottom"===this._hoveredCellSide||"right"===this._hoveredCellSide}_addRow(){const e=this._hoveredCell.closest("TR");let t=this._getHoveredSideOfContainer();1===t&&(t=e.sectionRowIndex,t+=this._isBottomOrRight()),this._table.addRow(t)}_delRow(){const e=this._hoveredCell.closest("TR");let t=this._getHoveredSideOfContainer();1===t&&(t=e.sectionRowIndex,t+=this._isBottomOrRight()),this._table.delRow(t)}_addColumn(){let e=this._getHoveredSideOfContainer();1===e&&(e=this._hoveredCell.cellIndex,e+=this._isBottomOrRight()),this._table.addColumn(e)}_containerEnterPressed(e){if(console.log("Enter _containerEnterPressed"),null===this._table.selectedCell||e.shiftKey)return;const t=this._table.selectedCell.closest("TR");let o=this._getHoveredSideOfContainer();const l=t.sectionRowIndex,n=this._table.selectedCell.cellIndex;if(l==this._table.body.rows.length-1&&n==t.cells.length-1){o=t.sectionRowIndex+1,this._table.addRow(o).cells[0].click()}else if(n<t.cells.length-1)t.cells[n+1].click();else{let e=this._table.body.rows[l+1];null!=e&&e.cells[0].click()}e.preventDefault(),e.stopPropagation(),console.log("_containerEnterPressed finished!")}_containerArrowKeyPressed(e){if(!(null===this._table.selectedCell||e.shiftKey||e.ctrlKey||e.altKey)){switch(e.keyCode){case 37:this._processLeftArrowKey(e);break;case 38:this._processUpArrowKey(e);break;case 39:this._processRightArrowKey(e);break;case 40:this._processDownArrowKey(e);break;case 9:this._processRightArrowKey(e);break;default:console.log("not implement!")}e.preventDefault(),e.stopPropagation()}}_processRightArrowKey(e){const t=this._table.selectedCell.closest("TR"),o=t.sectionRowIndex,l=this._table.selectedCell.cellIndex,n=this._table.body.rows;if(o<n.length-1){const e=t.cells;l<e.length-1?e[l+1].click():n[o+1].cells[l-1].click()}else{const e=t.cells;l<e.length-1?e[l+1].click():n[0].cells[l-1].click()}}_processLeftArrowKey(e){console.log("Enter _processLeftArrowKey");const t=this._table.selectedCell.closest("TR"),o=t.sectionRowIndex,l=this._table.selectedCell.cellIndex,n=this._table.body.rows;if(0==o){const e=t.cells;if(0==l){const e=n[n.length-1];e.cells[e.cells.length-1].click()}else e[l-1].click()}else{const e=t.cells;if(0==l){console.log("move up");const e=n[o-1];e.cells[e.cells.length-1].click()}else console.log("move left"),e[l-1].click()}console.log("_processLeftArrowKey finished!")}_processDownArrowKey(e){console.log("Enter _processDownArrowKey");const t=this._table.selectedCell.closest("TR").sectionRowIndex;console.log("currentRowIndex:"+t);const o=this._table.selectedCell.cellIndex;console.log("currentCellIndex:"+o);const l=this._table.body.rows;if(t<l.length-1){const e=l[t+1];console.log("nextRowIndex:",t+1),e.cells[o].click()}else{l[0].cells[o].click()}console.log("_processDownArrowKey finished!")}_processUpArrowKey(e){console.log("Enter _processUpArrowKey");const t=this._table.selectedCell.closest("TR").sectionRowIndex;console.log("currentRowIndex:"+t);const o=this._table.selectedCell.cellIndex;console.log("currentCellIndex:"+o);const l=this._table.body.rows;if(0!=t){const e=t-1;console.log("nextRowIndex:",e),l[e].cells[o].click()}else{const e=l.length-1;console.log("nextRowIndex:",e),l[e].cells[o].click()}console.log("_processUpArrowKey finished!")}_mouseEnterInDetectArea(e){let t=r(i(this._container),e.pageX,e.pageY);e.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:t},bubbles:!0}))}}}])});