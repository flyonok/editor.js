!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.MmxParameter=e():t.MmxParameter=e()}(window,function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=3)}([function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var o=(l=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(l))))+" */"),r=n.sources.map(function(t){return"/*# sourceURL="+n.sourceRoot+t+" */"});return[i].concat(r).concat([o]).join("\n")}var l;return[i].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(n[r]=!0)}for(o=0;o<t.length;o++){var l=t[o];"number"==typeof l[0]&&n[l[0]]||(i&&!l[2]?l[2]=i:i&&(l[2]="("+l[2]+") and ("+i+")"),e.push(l))}},e}},function(t,e,i){var n,o,r={},l=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=n.apply(this,arguments)),o}),s=function(t){var e={};return function(t,i){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,i);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),a=null,c=0,d=[],h=i(6);function u(t,e){for(var i=0;i<t.length;i++){var n=t[i],o=r[n.id];if(o){o.refs++;for(var l=0;l<o.parts.length;l++)o.parts[l](n.parts[l]);for(;l<n.parts.length;l++)o.parts.push(g(n.parts[l],e))}else{var s=[];for(l=0;l<n.parts.length;l++)s.push(g(n.parts[l],e));r[n.id]={id:n.id,refs:1,parts:s}}}}function _(t,e){for(var i=[],n={},o=0;o<t.length;o++){var r=t[o],l=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};n[l]?n[l].parts.push(s):i.push(n[l]={id:l,parts:[s]})}return i}function b(t,e){var i=s(t.insertInto);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=d[d.length-1];if("top"===t.insertAt)n?n.nextSibling?i.insertBefore(e,n.nextSibling):i.appendChild(e):i.insertBefore(e,i.firstChild),d.push(e);else if("bottom"===t.insertAt)i.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(t.insertAt.before,i);i.insertBefore(e,o)}}function p(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=d.indexOf(t);e>=0&&d.splice(e,1)}function f(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var n=function(){0;return i.nc}();n&&(t.attrs.nonce=n)}return m(e,t.attrs),b(t,e),e}function m(t,e){Object.keys(e).forEach(function(i){t.setAttribute(i,e[i])})}function g(t,e){var i,n,o,r;if(e.transform&&t.css){if(!(r="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=r}if(e.singleton){var l=c++;i=a||(a=f(e)),n=w.bind(null,i,l,!1),o=w.bind(null,i,l,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(i=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",m(e,t.attrs),b(t,e),e}(e),n=function(t,e,i){var n=i.css,o=i.sourceMap,r=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||r)&&(n=h(n));o&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var l=new Blob([n],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(l),s&&URL.revokeObjectURL(s)}.bind(null,i,e),o=function(){p(i),i.href&&URL.revokeObjectURL(i.href)}):(i=f(e),n=function(t,e){var i=e.css,n=e.media;n&&t.setAttribute("media",n);if(t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}.bind(null,i),o=function(){p(i)});return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=l()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var i=_(t,e);return u(i,e),function(t){for(var n=[],o=0;o<i.length;o++){var l=i[o];(s=r[l.id]).refs--,n.push(s)}t&&u(_(t,e),e);for(o=0;o<n.length;o++){var s;if(0===(s=n[o]).refs){for(var a=0;a<s.parts.length;a++)s.parts[a]();delete r[s.id]}}}};var v,y=(v=[],function(t,e){return v[t]=e,v.filter(Boolean).join("\n")});function w(t,e,i,n){var o=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=y(e,o);else{var r=document.createTextNode(o),l=t.childNodes;l[e]&&t.removeChild(l[e]),l.length?t.insertBefore(r,l[e]):t.appendChild(r)}}},function(t,e){t.exports='<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#388AE5"></circle><path fill="#FFF" d="M10.9 9.1h3.7a.9.9 0 1 1 0 1.8h-3.7v3.7a.9.9 0 1 1-1.8 0v-3.7H5.4a.9.9 0 0 1 0-1.8h3.7V5.4a.9.9 0 0 1 1.8 0v3.7z"></path></svg>'},function(t,e,i){const n=i(14).TableConstructor,o=i(13),r={input:"tc-table__inp"};t.exports=class{static get enableLineBreaks(){return!0}static get toolbox(){return{icon:o,title:"Parameter"}}constructor({data:t,config:e,api:i}){this.api=i,this._tableConstructor=new n(t,e,i)}render(){return this._tableConstructor.htmlElement}save(t){const e=t.querySelector("table.tc-table");console.log(e);const i=[],n=e.rows;for(let t=0;t<n.length;t++){const e=n[t],o=Array.from(e.cells).map(t=>t.querySelector("."+r.input));o.every(this._isEmpty)||i.push(o.map(t=>t.innerHTML))}const o=t.querySelector(".mmxParameterDecsTitle");return null!==o?{name:o.innerHTML,content:i}:{content:i}}_isEmpty(t){return!t.textContent.trim()}}},function(t,e,i){var n=i(5);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};i(1)(n,o);n.locals&&(t.exports=n.locals)},function(t,e,i){(t.exports=i(0)(!1)).push([t.i,".tc-editor{padding:10px;position:relative;box-sizing:content-box;width:100%;left:-10px}.mmxParameterDecsTitle{color:red}.mmxParameterDesc{color:#7b7b7b}",""])},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var i=e.protocol+"//"+e.host,n=i+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?i+r:n+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,i){var n=i(8);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};i(1)(n,o);n.locals&&(t.exports=n.locals)},function(t,e,i){(t.exports=i(0)(!1)).push([t.i,".tc-toolbar{background:#368be6;}.tc-toolbar--hidden{visibility:hidden}.tc-toolbar--hor{width:100%;height:21px;flex-direction:row;left:0;top:1px}.tc-toolbar--hor,.tc-toolbar--ver{display:flex;align-items:center;position:absolute;z-index:100}.tc-toolbar--ver{height:100%;width:21px;flex-direction:column;top:0;left:-1px}.tc-toolbar__plus{height:21px;width:21px;margin-top:0;}.tc-toolbar__plus--hor{margin-left:-10px}.tc-toolbar__plus--ver{margin-top:-10px}.tc-toolbar__shine-line--hor{min-height:1px;width:100%}.tc-toolbar__shine-line--ver{min-width:1px;height:100%}",""])},function(t,e,i){var n=i(10);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};i(1)(n,o);n.locals&&(t.exports=n.locals)},function(t,e,i){(t.exports=i(0)(!1)).push([t.i,".tc-table{width:100%;height:100%;border-collapse:collapse;table-layout:fixed;}.tc-table__wrap{border:1px solid #dbdbe2;border-radius:3px;position:relative;height:100%;width:100%;box-sizing:border-box}.tc-table__cell{border:1px solid #dbdbe2;padding:0;vertical-align:top}.tc-table__area{padding:10px;height:100%}.tc-table__inp{outline:none;flex-grow:100;min-height:1.5em;height:100%;overflow:hidden}.tc-table tbody tr:first-child td{border-top:none}.tc-table tbody tr:last-child td{border-bottom:none}.tc-table tbody tr td:last-child{border-right:none}.tc-table tbody tr td:first-child{border-left:none}",""])},function(t,e,i){var n=i(12);"string"==typeof n&&(n=[[t.i,n,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};i(1)(n,o);n.locals&&(t.exports=n.locals)},function(t,e,i){(t.exports=i(0)(!1)).push([t.i,".tc-readOnlyTable{width:100%;height:100%;border-collapse:collapse;table-layout:fixed;}.tc-readOnlyTable__wrap{border:1px solid #dbdbe2;border-radius:3px;position:relative;height:100%;width:100%;box-sizing:border-box}.tc-readOnlyTable__cell{border:1px solid #dbdbe2;padding:0;vertical-align:top}.tc-readOnlyTable__area{padding:10px;height:100%}.tc-readOnlyTable__inp{outline:none;flex-grow:100;min-height:1.5em;height:100%;overflow:hidden}.tc-readOnlyTable tbody tr:first-child td{border-top:none}.tc-readOnlyTable tbody tr:last-child td{border-bottom:5px solid #0f0}.tc-readOnlyTable tbody tr td:last-child{border-right:none}.tc-readOnlyTable tbody tr td:first-child{border-left:none}",""])},function(t,e){t.exports='<svg width="18" height="14"><path d="M2.833 8v1.95a1.7 1.7 0 0 0 1.7 1.7h3.45V8h-5.15zm0-2h5.15V2.35h-3.45a1.7 1.7 0 0 0-1.7 1.7V6zm12.3 2h-5.15v3.65h3.45a1.7 1.7 0 0 0 1.7-1.7V8zm0-2V4.05a1.7 1.7 0 0 0-1.7-1.7h-3.45V6h5.15zM4.533.1h8.9a3.95 3.95 0 0 1 3.95 3.95v5.9a3.95 3.95 0 0 1-3.95 3.95h-8.9a3.95 3.95 0 0 1-3.95-3.95v-5.9A3.95 3.95 0 0 1 4.533.1z"></path></svg>'},function(t,e,i){"use strict";i.r(e);i(4);function n(t){return!(null==t)}function o(t,e=null,i=null,o=null){const r=document.createElement(t);if(n(e))for(let t=0;t<e.length;t++)n(e[t])&&r.classList.add(e[t]);if(n(i))for(let t in i)r.setAttribute(t,i[t]);if(n(o))for(let t=0;t<o.length;t++)n(o[t])&&r.appendChild(o[t]);return r}function r(t){const e=t.getBoundingClientRect();return{y1:Math.floor(e.top+window.pageYOffset),x1:Math.floor(e.left+window.pageXOffset),x2:Math.floor(e.right+window.pageXOffset),y2:Math.floor(e.bottom+window.pageYOffset)}}function l(t,e,i){let n;return e-t.x1>=-1&&e-t.x1<=11&&(n="left"),t.x2-e>=-1&&t.x2-e<=11&&(n="right"),i-t.y1>=-1&&i-t.y1<=11&&(n="top"),t.y2-i>=-1&&t.y2-i<=11&&(n="bottom"),n}i(7);var s=i(2),a=i.n(s);const c={highlightingLine:"tc-toolbar",hidden:"tc-toolbar--hidden",horizontalToolBar:"tc-toolbar--hor",horizontalHighlightingLine:"tc-toolbar__shine-line--hor",verticalToolBar:"tc-toolbar--ver",verticalHighlightingLine:"tc-toolbar__shine-line--ver",plusButton:"tc-toolbar__plus",horizontalPlusButton:"tc-toolbar__plus--hor",verticalPlusButton:"tc-toolbar__plus--ver",area:"tc-table__area"};class d{constructor(){this._plusButton=this._generatePlusButton(),this._highlightingLine=this._generateHighlightingLine(),this._toolbar=this._generateToolBar([this._plusButton,this._highlightingLine])}hide(){this._toolbar.classList.add(c.hidden)}show(){this._toolbar.classList.remove(c.hidden),this._highlightingLine.classList.remove(c.hidden)}hideLine(){this._highlightingLine.classList.add(c.hidden)}get htmlElement(){return this._toolbar}_generatePlusButton(){const t=o("div",[c.plusButton]);return t.innerHTML=a.a,t.addEventListener("click",t=>{t.stopPropagation();const e=new CustomEvent("click",{detail:{x:t.pageX,y:t.pageY},bubbles:!0});this._toolbar.dispatchEvent(e)}),t}_generateHighlightingLine(){const t=o("div",[c.highlightingLine]);return t.addEventListener("click",t=>{t.stopPropagation();const e=new CustomEvent("click",{bubbles:!0});this._toolbar.dispatchEvent(e)}),t}_generateToolBar(t){const e=o("div",[c.hidden],null,t);return e.addEventListener("mouseleave",t=>{this._recalcMousePos(t)}),e}_recalcMousePos(t){this.hide();const e=document.elementFromPoint(t.pageX,t.pageY);if(null!==e&&e.classList.contains(c.area)){const i=new MouseEvent("mouseover",{clientX:t.pageX,clientY:t.pageY});e.dispatchEvent(i)}}}class h extends d{constructor(){super(),this._toolbar.classList.add(c.horizontalToolBar),this._plusButton.classList.add(c.horizontalPlusButton),this._highlightingLine.classList.add(c.horizontalHighlightingLine)}showIn(t){const e=Math.floor(Number.parseInt(window.getComputedStyle(this._toolbar).height)/2);this._toolbar.style.top=t-e+"px",this.show()}}class u extends d{constructor(){super(),this._toolbar.classList.add(c.verticalToolBar),this._plusButton.classList.add(c.verticalPlusButton),this._highlightingLine.classList.add(c.verticalHighlightingLine)}showIn(t){const e=Math.floor(Number.parseInt(window.getComputedStyle(this._toolbar).width)/2);this._toolbar.style.left=t-e+"px",this.show()}}i(9);const _={table:"tc-table",inputField:"tc-table__inp",cell:"tc-table__cell",wrapper:"tc-table__wrap",area:"tc-table__area"};class b{constructor(){this._numberOfColumns=0,this._numberOfRows=0,this._element=this._createTableWrapper(),this._table=this._element.querySelector("table"),this._hangEvents()}addColumn(t=-1){this._numberOfColumns++;const e=this._table.rows;for(let i=0;i<e.length;i++){const n=e[i].insertCell(t);this._fillCell(n)}}addRow(t=-1){this._numberOfRows++;const e=this._table.insertRow(t);return this._fillRow(e),e}delRow(t=0){t>=this._numberOfRows||(this._table.deleteRow(t),this._numberOfRows--)}get htmlElement(){return this._element}get body(){return this._table}get selectedCell(){return this._selectedCell}_createTableWrapper(){return o("div",[_.wrapper],null,[o("table",[_.table])])}_createContenteditableArea(){return o("div",[_.inputField],{contenteditable:"true"})}_fillCell(t){t.classList.add(_.cell);const e=this._createContenteditableArea();t.appendChild(o("div",[_.area],null,[e]))}_fillRow(t){for(let e=0;e<this._numberOfColumns;e++){const e=t.insertCell();this._fillCell(e)}}_hangEvents(){this._table.addEventListener("focus",t=>{this._focusEditField(t)},!0),this._table.addEventListener("blur",t=>{this._blurEditField(t)},!0),this._table.addEventListener("keydown",t=>{this._pressedEnterInEditField(t)}),this._table.addEventListener("click",t=>{this._clickedOnCell(t)}),this._table.addEventListener("mouseover",t=>{this._mouseEnterInDetectArea(t),t.stopPropagation()},!0)}_focusEditField(t){t.target.classList.contains(_.inputField)&&(this._selectedCell=t.target.closest("."+_.cell))}_blurEditField(t){t.target.classList.contains(_.inputField)&&(this._selectedCell=null)}_pressedEnterInEditField(t){t.target.classList.contains(_.inputField)&&(13!==t.keyCode||t.shiftKey||t.preventDefault())}_clickedOnCell(t){if(!t.target.classList.contains(_.cell))return;t.target.querySelector("."+_.inputField).focus()}_mouseEnterInDetectArea(t){if(!t.target.classList.contains(_.area))return;const e=l(r(t.target.closest("TD")),t.pageX,t.pageY);t.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:e},bubbles:!0}))}}i(11);const p={table:"tc-readOnlyTable",inputField:"tc-readOnlyTable__inp",cell:"tc-readOnlyTable__cell",wrapper:"tc-readOnlyTable__wrap",area:"tc-readOnlyTable__area"};class f{constructor(){this._numberOfColumns=0,this._numberOfRows=0,this._element=this._createTableWrapper(),this._table=this._element.querySelector("table")}addColumn(t=-1){this._numberOfColumns++;const e=this._table.rows;for(let i=0;i<e.length;i++){const n=e[i].insertCell(t);this._fillCell(n)}}addRow(t=-1){this._numberOfRows++;const e=this._table.insertRow(t);return this._fillRow(e),e}delRow(t=0){t>=this._numberOfRows||(this._table.deleteRow(t),this._numberOfRows--)}get htmlElement(){return this._element}get body(){return this._table}get selectedCell(){return this._selectedCell}_createTableWrapper(){return o("div",[p.wrapper],null,[o("table",[p.table])])}_createContenteditableArea(){return o("div",[p.inputField],{contenteditable:"false"})}_fillCell(t){t.classList.add(p.cell);const e=this._createContenteditableArea();t.appendChild(o("div",[p.area],null,[e]))}_fillRow(t){for(let e=0;e<this._numberOfColumns;e++){const e=t.insertCell();this._fillCell(e)}}_hangEvents(){this._table.addEventListener("focus",t=>{this._focusEditField(t)},!0),this._table.addEventListener("blur",t=>{this._blurEditField(t)},!0),this._table.addEventListener("keydown",t=>{this._pressedEnterInEditField(t)}),this._table.addEventListener("click",t=>{this._clickedOnCell(t)}),this._table.addEventListener("mouseover",t=>{this._mouseEnterInDetectArea(t),t.stopPropagation()},!0)}_focusEditField(t){t.target.classList.contains(p.inputField)&&(this._selectedCell=t.target.closest("."+p.cell))}_blurEditField(t){t.target.classList.contains(p.inputField)&&(this._selectedCell=null)}_pressedEnterInEditField(t){t.target.classList.contains(p.inputField)&&(13!==t.keyCode||t.shiftKey||t.preventDefault())}_clickedOnCell(t){if(!t.target.classList.contains(p.cell))return;t.target.querySelector("."+p.inputField).focus()}_mouseEnterInDetectArea(t){if(!t.target.classList.contains(p.area))return;const e=l(r(t.target.closest("TD")),t.pageX,t.pageY);t.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:e},bubbles:!0}))}}i.d(e,"TableConstructor",function(){return g});const m={editor:"tc-editor",toolBarHor:"tc-toolbar--hor",toolBarVer:"tc-toolbar--ver",inputField:"tc-table__inp",readOnlyTable_inputField:"tc-readOnlyTable__inp"};class g{constructor(t,e,i){console.log("tableConstructor begin!"),this._table=new b,this._titleWrapper=document.createElement("div"),this._descTitle=document.createElement("H3"),void 0!==t.name?this._descTitle.innerHTML=t.name:this._descTitle.innerHTML="【参数】",this._descTitle.classList.add("mmxParameterDecsTitle"),console.log("_descTitle.classList.add");let n=document.createElement("p");n.innerHTML="说明： 每个参数占一行， 左边是参数名称， 右边是其数值。 没有值的， 右边可以不填。",n.classList.add("mmxParameterDesc"),n.appendChild(document.createElement("br")),this._titleWrapper.appendChild(this._descTitle),this._titleWrapper.appendChild(n),this._clickTimeId=-1;const r=this._resizeTable(t,e);this._fillTable(t,r),this._readOnlyTable=new f,this._makeReadOnlyTable(e);let l=document.createElement("br");this._container=o("div",[m.editor,i.styles.block],null,[this._titleWrapper,this._readOnlyTable.htmlElement,this._table.htmlElement,l]),this._verticalToolBar=new u,this._horizontalToolBar=new h,this._table.htmlElement.appendChild(this._horizontalToolBar.htmlElement),this._table.htmlElement.appendChild(this._verticalToolBar.htmlElement),this._hoveredCell=null,this._activatedToolBar=null,this._hoveredCellSide=null,this._plusButDelay=null,this._toolbarShowDelay=null,this._hangEvents()}_makeReadOnlyTable(t){t={rows:"1",cols:"2"},this._readOnlyTable=new f;let e={content:[["参数名称","参数值"]]};const i=this._resizeReadOnlyTable(e,t);this._fillReadOnlyTable(e,i)}get htmlElement(){return this._container}_fillTable(t,e){if(void 0!==t.content)for(let i=0;i<e.rows&&i<t.content.length;i++)for(let n=0;n<e.cols&&n<t.content[i].length;n++){this._table.body.rows[i].cells[n].querySelector("."+m.inputField).innerHTML=t.content[i][n]}}_fillReadOnlyTable(t,e){if(void 0!==t.content)for(let i=0;i<e.rows&&i<t.content.length;i++)for(let n=0;n<e.cols&&n<t.content[i].length;n++){this._readOnlyTable.body.rows[i].cells[n].querySelector("."+m.readOnlyTable_inputField).innerHTML=t.content[i][n]}}_resizeTable(t,e){const i=Array.isArray(t.content),n=!!i&&t.content.length,o=i?t.content.length:void 0,r=n?t.content[0].length:void 0,l=Number.parseInt(e.rows),s=Number.parseInt(e.cols),a=!isNaN(l)&&l>0?l:void 0,c=!isNaN(s)&&s>0?s:void 0,d=o||a||1,h=r||c||2;for(let t=0;t<d;t++)this._table.addRow();for(let t=0;t<h;t++)this._table.addColumn();return{rows:d,cols:h}}_resizeReadOnlyTable(t,e){const i=Array.isArray(t.content),n=!!i&&t.content.length,o=i?t.content.length:void 0,r=n?t.content[0].length:void 0,l=Number.parseInt(e.rows),s=Number.parseInt(e.cols),a=!isNaN(l)&&l>0?l:void 0,c=!isNaN(s)&&s>0?s:void 0,d=o||a||1,h=r||c||2;for(let t=0;t<d;t++)this._readOnlyTable.addRow();for(let t=0;t<h;t++)this._readOnlyTable.addColumn();return{rows:d,cols:h}}_showToolBar(t,e){this._hideToolBar(),this._activatedToolBar=t,t.showIn(e)}_hideToolBar(){null!==this._activatedToolBar&&this._activatedToolBar.hide()}_hangEvents(){this._container.addEventListener("mouseInActivatingArea",t=>{this._toolbarCalling(t)}),this._container.addEventListener("click",t=>{clearTimeout(this._clickTimeId);let e=this;this._clickTimeId=setTimeout(function(){e._clickToolbar(t)},250)}),this._container.addEventListener("dblclick",t=>{clearTimeout(this._clickTimeId),console.log("doubleclick event!"),this._dblclickToolbar(t)}),this._container.addEventListener("input",()=>{this._hideToolBar()}),this._container.addEventListener("keydown",t=>{this._containerKeydown(t)}),this._container.addEventListener("mouseout",t=>{this._leaveDetectArea(t)}),this._container.addEventListener("mouseover",t=>{this._mouseEnterInDetectArea(t)})}_mouseInActivatingAreaListener(t){this._hoveredCellSide=t.detail.side;const e=r(t.target),i=r(this._table.htmlElement);if(this._hoveredCell=t.target.closest("TD"),null===this._hoveredCell){const t=11;this._hoveredCell=this._container,e.x1+=t,e.y1+=t,e.x2-=t,e.y2-=t}"top"===this._hoveredCellSide&&this._showToolBar(this._horizontalToolBar,e.y1-i.y1-2),"bottom"===this._hoveredCellSide&&this._showToolBar(this._horizontalToolBar,e.y2-i.y1-1)}_isToolbar(t){return null===t?null:!(!t.closest("."+m.toolBarHor)&&!t.closest("."+m.toolBarVer))}_leaveDetectArea(t){this._isToolbar(t.relatedTarget)||(clearTimeout(this._toolbarShowDelay),this._hideToolBar())}_toolbarCalling(t){this._isToolbar(t.target)||(clearTimeout(this._toolbarShowDelay),this._toolbarShowDelay=setTimeout(()=>{this._mouseInActivatingAreaListener(t)},125))}_clickToolbar(t){if(!this._isToolbar(t.target))return;let e;if(this._activatedToolBar===this._horizontalToolBar?(this._addRow(),e="y"):e="x",isNaN(t.detail)&&null!==t.detail){const i=r(this._table.htmlElement);let n;n="x"===e?t.detail.x-i.x1:t.detail.y-i.y1,this._delayAddButtonForMultiClickingNearMouse(n)}else this._hideToolBar()}_dblclickToolbar(t){if(!this._isToolbar(t.target))return;let e;if(this._activatedToolBar===this._horizontalToolBar?(this._delRow(),e="y"):e="x",isNaN(t.detail)&&null!==t.detail){const i=r(this._table.htmlElement);let n;n="x"===e?t.detail.x-i.x1:t.detail.y-i.y1,this._delayAddButtonForMultiClickingNearMouse(n)}else this._hideToolBar()}_containerKeydown(t){13===t.keyCode&&this._containerEnterPressed(t)}_delayAddButtonForMultiClickingNearMouse(t){this._showToolBar(this._activatedToolBar,t),this._activatedToolBar.hideLine(),clearTimeout(this._plusButDelay),this._plusButDelay=setTimeout(()=>{this._hideToolBar()},500)}_getHoveredSideOfContainer(){return this._hoveredCell===this._container?this._isBottomOrRight()?0:-1:1}_isBottomOrRight(){return"bottom"===this._hoveredCellSide||"right"===this._hoveredCellSide}_addRow(){const t=this._hoveredCell.closest("TR");let e=this._getHoveredSideOfContainer();1===e&&(e=t.sectionRowIndex,e+=this._isBottomOrRight()),this._table.addRow(e)}_delRow(){const t=this._hoveredCell.closest("TR");let e=this._getHoveredSideOfContainer();1===e&&(e=t.sectionRowIndex,e+=this._isBottomOrRight()),this._table.delRow(e)}_addColumn(){let t=this._getHoveredSideOfContainer();1===t&&(t=this._hoveredCell.cellIndex,t+=this._isBottomOrRight()),this._table.addColumn(t)}_containerEnterPressed(t){if(null===this._table.selectedCell||t.shiftKey)return;const e=this._table.selectedCell.closest("TR");let i=this._getHoveredSideOfContainer();1===i&&(i=e.sectionRowIndex+1),this._table.addRow(i).cells[0].click()}_mouseEnterInDetectArea(t){let e=l(r(this._container),t.pageX,t.pageY);t.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:e},bubbles:!0}))}}}])});