!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.MmxParameter=t():e.MmxParameter=t()}(window,function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,o),l.l=!0,l.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)o.d(n,l,function(t){return e[t]}.bind(null,l));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=3)}([function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var o=function(e,t){var o=e[1]||"",n=e[3];if(!n)return o;if(t&&"function"==typeof btoa){var l=(r=n,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),i=n.sources.map(function(e){return"/*# sourceURL="+n.sourceRoot+e+" */"});return[o].concat(i).concat([l]).join("\n")}var r;return[o].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+o+"}":o}).join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},l=0;l<this.length;l++){var i=this[l][0];"number"==typeof i&&(n[i]=!0)}for(l=0;l<e.length;l++){var r=e[l];"number"==typeof r[0]&&n[r[0]]||(o&&!r[2]?r[2]=o:o&&(r[2]="("+r[2]+") and ("+o+")"),t.push(r))}},t}},function(e,t,o){var n,l,i={},r=(n=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===l&&(l=n.apply(this,arguments)),l}),s=function(e){var t={};return function(e,o){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,o);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),a=null,c=0,d=[],h=o(6);function u(e,t){for(var o=0;o<e.length;o++){var n=e[o],l=i[n.id];if(l){l.refs++;for(var r=0;r<l.parts.length;r++)l.parts[r](n.parts[r]);for(;r<n.parts.length;r++)l.parts.push(m(n.parts[r],t))}else{var s=[];for(r=0;r<n.parts.length;r++)s.push(m(n.parts[r],t));i[n.id]={id:n.id,refs:1,parts:s}}}}function p(e,t){for(var o=[],n={},l=0;l<e.length;l++){var i=e[l],r=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};n[r]?n[r].parts.push(s):o.push(n[r]={id:r,parts:[s]})}return o}function _(e,t){var o=s(e.insertInto);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var n=d[d.length-1];if("top"===e.insertAt)n?n.nextSibling?o.insertBefore(t,n.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),d.push(t);else if("bottom"===e.insertAt)o.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var l=s(e.insertAt.before,o);o.insertBefore(t,l)}}function f(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=d.indexOf(e);t>=0&&d.splice(t,1)}function b(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var n=function(){0;return o.nc}();n&&(e.attrs.nonce=n)}return g(t,e.attrs),_(e,t),t}function g(e,t){Object.keys(t).forEach(function(o){e.setAttribute(o,t[o])})}function m(e,t){var o,n,l,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var r=c++;o=a||(a=b(t)),n=w.bind(null,o,r,!1),l=w.bind(null,o,r,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",g(t,e.attrs),_(e,t),t}(t),n=function(e,t,o){var n=o.css,l=o.sourceMap,i=void 0===t.convertToAbsoluteUrls&&l;(t.convertToAbsoluteUrls||i)&&(n=h(n));l&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(l))))+" */");var r=new Blob([n],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(r),s&&URL.revokeObjectURL(s)}.bind(null,o,t),l=function(){f(o),o.href&&URL.revokeObjectURL(o.href)}):(o=b(t),n=function(e,t){var o=t.css,n=t.media;n&&e.setAttribute("media",n);if(e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}.bind(null,o),l=function(){f(o)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else l()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=r()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var o=p(e,t);return u(o,t),function(e){for(var n=[],l=0;l<o.length;l++){var r=o[l];(s=i[r.id]).refs--,n.push(s)}e&&u(p(e,t),t);for(l=0;l<n.length;l++){var s;if(0===(s=n[l]).refs){for(var a=0;a<s.parts.length;a++)s.parts[a]();delete i[s.id]}}}};var v,y=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function w(e,t,o,n){var l=o?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,l);else{var i=document.createTextNode(l),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(i,r[t]):e.appendChild(i)}}},function(e,t){e.exports='<svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#388AE5"></circle><path fill="#FFF" d="M10.9 9.1h3.7a.9.9 0 1 1 0 1.8h-3.7v3.7a.9.9 0 1 1-1.8 0v-3.7H5.4a.9.9 0 0 1 0-1.8h3.7V5.4a.9.9 0 0 1 1.8 0v3.7z"></path></svg>'},function(e,t,o){const n=o(14).TableConstructor,l=o(13),i={input:"tc-paraTable__inp"};e.exports=class{static get enableLineBreaks(){return!0}static get toolbox(){return{icon:l,title:"Parameter"}}constructor({data:e,config:t,api:o}){this.api=o,this._tableConstructor=new n(e,t,o)}render(){return this._tableConstructor.htmlElement}save(e){console.log(e);const t=e.querySelector("table.tc-paraTable");console.log(t);const o={},n=t.rows;for(let e=0;e<n.length;e++){const t=n[e],l=Array.from(t.cells).map(e=>e.querySelector("."+i.input));l.every(this._isEmpty)||(o[l[0].innerHTML]=l[1].innerHTML)}let l=e.querySelector(".mmxParameterDecsTitle").innerHTML,r=l.indexOf("【"),s=l.indexOf("】"),a=l.substring(r+1,s-r);return null!==a?{name:a,content:o}:{content:o}}_isEmpty(e){return!e.textContent.trim()}}},function(e,t,o){var n=o(5);"string"==typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};o(1)(n,l);n.locals&&(e.exports=n.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-editor{padding:10px;position:relative;box-sizing:content-box;width:100%;left:-10px}.mmxParameterDecsTitle{color:red}.mmxParameterDesc{color:#7b7b7b}",""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var o=t.protocol+"//"+t.host,n=o+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var l,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(l=0===i.indexOf("//")?i:0===i.indexOf("/")?o+i:n+i.replace(/^\.\//,""),"url("+JSON.stringify(l)+")")})}},function(e,t,o){var n=o(8);"string"==typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};o(1)(n,l);n.locals&&(e.exports=n.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-toolbar{background:#368be6;}.tc-toolbar--hidden{visibility:hidden}.tc-toolbar--hor{width:100%;height:21px;flex-direction:row;left:0;top:1px}.tc-toolbar--hor,.tc-toolbar--ver{display:flex;align-items:center;position:absolute;z-index:100}.tc-toolbar--ver{height:100%;width:21px;flex-direction:column;top:0;left:-1px}.tc-toolbar__plus{height:21px;width:21px;margin-top:0;}.tc-toolbar__plus--hor{margin-left:-10px}.tc-toolbar__plus--ver{margin-top:-10px}.tc-toolbar__shine-line--hor{min-height:1px;width:100%}.tc-toolbar__shine-line--ver{min-width:1px;height:100%}",""])},function(e,t,o){var n=o(10);"string"==typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};o(1)(n,l);n.locals&&(e.exports=n.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-paraTable{width:100%;height:100%;border-collapse:collapse;table-layout:fixed;}.tc-paraTable__wrap{position:relative;height:100%;width:100%;box-sizing:border-box;border:none}.tc-paraTable__cell{border:1px solid #349d34;padding:0;vertical-align:top}.tc-paraTable__area{padding:10px;height:100%}.tc-paraTable__inp{outline:none;flex-grow:100;min-height:1.5em;height:100%;overflow:hidden;font-size:14px}.tc-paraTable tbody tr:first-child td{border-top:none}.tc-paraTable tbody tr:last-child td{border-bottom:none}.tc-paraTable tbody tr td:last-child{border-right:none}.tc-paraTable tbody tr td:first-child{border-left:none}",""])},function(e,t,o){var n=o(12);"string"==typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0,transform:void 0,insertInto:void 0};o(1)(n,l);n.locals&&(e.exports=n.locals)},function(e,t,o){(e.exports=o(0)(!1)).push([e.i,".tc-readOnlyParaTable{width:100%;height:100%;border-collapse:collapse;table-layout:fixed;}.tc-readOnlyParaTable__wrap{position:relative;height:100%;width:100%;box-sizing:border-box;border:none}.tc-readOnlyParaTable__cell{border:1px solid #349d34;padding:0;vertical-align:top}.tc-readOnlyParaTable__area{padding:10px;height:100%}.tc-readOnlyParaTable__inp{outline:none;flex-grow:100;min-height:1.5em;height:100%;overflow:hidden;font-size:16px;font-weight:700}.tc-readOnlyParaTable tbody tr:first-child td{border-top:none}.tc-readOnlyParaTable tbody tr:last-child td{border-bottom:2px solid #349d34}.tc-readOnlyParaTable tbody tr td:last-child{border-right:none}.tc-readOnlyParaTable tbody tr td:first-child{border-left:none}",""])},function(e,t){e.exports='<svg width="18" height="14"><path d="M2.833 8v1.95a1.7 1.7 0 0 0 1.7 1.7h3.45V8h-5.15zm0-2h5.15V2.35h-3.45a1.7 1.7 0 0 0-1.7 1.7V6zm12.3 2h-5.15v3.65h3.45a1.7 1.7 0 0 0 1.7-1.7V8zm0-2V4.05a1.7 1.7 0 0 0-1.7-1.7h-3.45V6h5.15zM4.533.1h8.9a3.95 3.95 0 0 1 3.95 3.95v5.9a3.95 3.95 0 0 1-3.95 3.95h-8.9a3.95 3.95 0 0 1-3.95-3.95v-5.9A3.95 3.95 0 0 1 4.533.1z"></path></svg>'},function(e,t,o){"use strict";o.r(t);o(4);function n(e){return!(null==e)}function l(e,t=null,o=null,l=null){const i=document.createElement(e);if(n(t))for(let e=0;e<t.length;e++)n(t[e])&&i.classList.add(t[e]);if(n(o))for(let e in o)i.setAttribute(e,o[e]);if(n(l))for(let e=0;e<l.length;e++)n(l[e])&&i.appendChild(l[e]);return i}function i(e){const t=e.getBoundingClientRect();return{y1:Math.floor(t.top+window.pageYOffset),x1:Math.floor(t.left+window.pageXOffset),x2:Math.floor(t.right+window.pageXOffset),y2:Math.floor(t.bottom+window.pageYOffset)}}function r(e,t,o){let n;return t-e.x1>=-1&&t-e.x1<=11&&(n="left"),e.x2-t>=-1&&e.x2-t<=11&&(n="right"),o-e.y1>=-1&&o-e.y1<=11&&(n="top"),e.y2-o>=-1&&e.y2-o<=11&&(n="bottom"),n}o(7);var s=o(2),a=o.n(s);const c={highlightingLine:"tc-toolbar",hidden:"tc-toolbar--hidden",horizontalToolBar:"tc-toolbar--hor",horizontalHighlightingLine:"tc-toolbar__shine-line--hor",verticalToolBar:"tc-toolbar--ver",verticalHighlightingLine:"tc-toolbar__shine-line--ver",plusButton:"tc-toolbar__plus",horizontalPlusButton:"tc-toolbar__plus--hor",verticalPlusButton:"tc-toolbar__plus--ver",area:"tc-table__area"};class d{constructor(){this._plusButton=this._generatePlusButton(),this._highlightingLine=this._generateHighlightingLine(),this._toolbar=this._generateToolBar([this._plusButton,this._highlightingLine])}hide(){this._toolbar.classList.add(c.hidden)}show(){this._toolbar.classList.remove(c.hidden),this._highlightingLine.classList.remove(c.hidden)}hideLine(){this._highlightingLine.classList.add(c.hidden)}get htmlElement(){return this._toolbar}_generatePlusButton(){const e=l("div",[c.plusButton]);return e.innerHTML=a.a,e.addEventListener("click",e=>{e.stopPropagation();const t=new CustomEvent("click",{detail:{x:e.pageX,y:e.pageY},bubbles:!0});this._toolbar.dispatchEvent(t)}),e}_generateHighlightingLine(){const e=l("div",[c.highlightingLine]);return e.addEventListener("click",e=>{e.stopPropagation();const t=new CustomEvent("click",{bubbles:!0});this._toolbar.dispatchEvent(t)}),e}_generateToolBar(e){const t=l("div",[c.hidden],null,e);return t.addEventListener("mouseleave",e=>{this._recalcMousePos(e)}),t}_recalcMousePos(e){this.hide();const t=document.elementFromPoint(e.pageX,e.pageY);if(null!==t&&t.classList.contains(c.area)){const o=new MouseEvent("mouseover",{clientX:e.pageX,clientY:e.pageY});t.dispatchEvent(o)}}}class h extends d{constructor(){super(),this._toolbar.classList.add(c.horizontalToolBar),this._plusButton.classList.add(c.horizontalPlusButton),this._highlightingLine.classList.add(c.horizontalHighlightingLine)}showIn(e){const t=Math.floor(Number.parseInt(window.getComputedStyle(this._toolbar).height)/2);this._toolbar.style.top=e-t+"px",this.show()}}class u extends d{constructor(){super(),this._toolbar.classList.add(c.verticalToolBar),this._plusButton.classList.add(c.verticalPlusButton),this._highlightingLine.classList.add(c.verticalHighlightingLine)}showIn(e){const t=Math.floor(Number.parseInt(window.getComputedStyle(this._toolbar).width)/2);this._toolbar.style.left=e-t+"px",this.show()}}o(9);const p={table:"tc-paraTable",inputField:"tc-paraTable__inp",cell:"tc-paraTable__cell",wrapper:"tc-paraTable__wrap",area:"tc-paraTable__area"};class _{constructor(){this._numberOfColumns=0,this._numberOfRows=0,this._element=this._createTableWrapper(),this._table=this._element.querySelector("table"),this._hangEvents()}addColumn(e=-1){this._numberOfColumns++;const t=this._table.rows;for(let o=0;o<t.length;o++){const n=t[o].insertCell(e);this._fillCell(n)}}addRow(e=-1){this._numberOfRows++;const t=this._table.insertRow(e);return this._fillRow(t),t}delRow(e=0){e>=this._numberOfRows||(this._table.deleteRow(e),this._numberOfRows--)}get htmlElement(){return this._element}get body(){return this._table}get selectedCell(){return this._selectedCell}_createTableWrapper(){return l("div",[p.wrapper],null,[l("table",[p.table])])}_createContenteditableArea(){return l("div",[p.inputField],{contenteditable:"true"})}_fillCell(e){e.classList.add(p.cell);const t=this._createContenteditableArea();e.appendChild(l("div",[p.area],null,[t]))}_fillRow(e){for(let t=0;t<this._numberOfColumns;t++){const t=e.insertCell();this._fillCell(t)}}_hangEvents(){this._table.addEventListener("focus",e=>{this._focusEditField(e)},!0),this._table.addEventListener("blur",e=>{this._blurEditField(e)},!0),this._table.addEventListener("keydown",e=>{this._pressedEnterInEditField(e)}),this._table.addEventListener("click",e=>{this._clickedOnCell(e)}),this._table.addEventListener("mouseover",e=>{this._mouseEnterInDetectArea(e),e.stopPropagation()},!0)}_focusEditField(e){console.log("Enter _focusEditField"),e.target.classList.contains(p.inputField)&&(this._selectedCell=e.target.closest("."+p.cell),console.log("selected cell index:",this._selectedCell.cellIndex),console.log("_focusEditField finished!"))}_blurEditField(e){e.target.classList.contains(p.inputField)&&(this._selectedCell=null)}_pressedEnterInEditField(e){e.target.classList.contains(p.inputField)&&(13!==e.keyCode||e.shiftKey?[37,38,39,40,9].indexOf(e.keyCode)>=0&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&e.preventDefault():e.preventDefault())}_clickedOnCell(e){if(!e.target.classList.contains(p.cell))return;e.target.querySelector("."+p.inputField).focus()}_mouseEnterInDetectArea(e){if(!e.target.classList.contains(p.area))return;const t=r(i(e.target.closest("TD")),e.pageX,e.pageY);e.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:t},bubbles:!0}))}}o(11);const f={table:"tc-readOnlyParaTable",inputField:"tc-readOnlyParaTable__inp",cell:"tc-readOnlyParaTable__cell",wrapper:"tc-readOnlyParaTable__wrap",area:"tc-readOnlyParaTable__area"};class b{constructor(){this._numberOfColumns=0,this._numberOfRows=0,this._element=this._createTableWrapper(),this._table=this._element.querySelector("table")}addColumn(e=-1){this._numberOfColumns++;const t=this._table.rows;for(let o=0;o<t.length;o++){const n=t[o].insertCell(e);this._fillCell(n)}}addRow(e=-1){this._numberOfRows++;const t=this._table.insertRow(e);return this._fillRow(t),t}delRow(e=0){e>=this._numberOfRows||(this._table.deleteRow(e),this._numberOfRows--)}get htmlElement(){return this._element}get body(){return this._table}get selectedCell(){return this._selectedCell}_createTableWrapper(){return l("div",[f.wrapper],null,[l("table",[f.table])])}_createContenteditableArea(){return l("div",[f.inputField],{contenteditable:"false"})}_fillCell(e){e.classList.add(f.cell);const t=this._createContenteditableArea();e.appendChild(l("div",[f.area],null,[t]))}_fillRow(e){for(let t=0;t<this._numberOfColumns;t++){const t=e.insertCell();this._fillCell(t)}}_hangEvents(){this._table.addEventListener("focus",e=>{this._focusEditField(e)},!0),this._table.addEventListener("blur",e=>{this._blurEditField(e)},!0),this._table.addEventListener("keydown",e=>{this._pressedEnterInEditField(e)}),this._table.addEventListener("click",e=>{this._clickedOnCell(e)}),this._table.addEventListener("mouseover",e=>{this._mouseEnterInDetectArea(e),e.stopPropagation()},!0)}_focusEditField(e){e.target.classList.contains(f.inputField)&&(this._selectedCell=e.target.closest("."+f.cell))}_blurEditField(e){e.target.classList.contains(f.inputField)&&(this._selectedCell=null)}_pressedEnterInEditField(e){e.target.classList.contains(f.inputField)&&(13!==e.keyCode||e.shiftKey||e.preventDefault())}_clickedOnCell(e){if(!e.target.classList.contains(f.cell))return;e.target.querySelector("."+f.inputField).focus()}_mouseEnterInDetectArea(e){if(!e.target.classList.contains(f.area))return;const t=r(i(e.target.closest("TD")),e.pageX,e.pageY);e.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:t},bubbles:!0}))}}o.d(t,"TableConstructor",function(){return m});const g={editor:"tc-editor",toolBarHor:"tc-toolbar--hor",toolBarVer:"tc-toolbar--ver",inputField:"tc-paraTable__inp",readOnlyTable_inputField:"tc-readOnlyParaTable__inp"};class m{constructor(e,t,o){console.log("parameter tableConstructor begin!"),this._table=new _,this._titleWrapper=document.createElement("div"),this._descTitle=document.createElement("H3"),void 0!==e.name?this._descTitle.innerHTML="【"+e.name+"】":this._descTitle.innerHTML="【参数】",this._descTitle.classList.add("mmxParameterDecsTitle"),console.log("_descTitle.classList.add");let n=document.createElement("p");n.innerHTML="说明： 每个参数占一行， 左边是参数名称， 右边是其数值。 没有值的， 右边可以不填。",n.classList.add("mmxParameterDesc"),n.appendChild(document.createElement("br")),this._titleWrapper.appendChild(this._descTitle),this._titleWrapper.appendChild(n),this._clickTimeId=-1;let i=this._cdrJsonConvert(e);const r=this._resizeTable(i,t);this._fillTable(i,r),this._readOnlyTable=new b,this._makeReadOnlyTable();let s=document.createElement("br");this._container=l("div",[g.editor,o.styles.block],null,[this._titleWrapper,this._readOnlyTable.htmlElement,this._table.htmlElement,s]),this._verticalToolBar=new u,this._horizontalToolBar=new h,this._table.htmlElement.appendChild(this._horizontalToolBar.htmlElement),this._table.htmlElement.appendChild(this._verticalToolBar.htmlElement),this._hoveredCell=null,this._activatedToolBar=null,this._hoveredCellSide=null,this._plusButDelay=null,this._toolbarShowDelay=null,this._hangEvents()}_cdrJsonConvert(e){let t={};if(e.name&&(t.name=e.name),e.content){t.content=[];let o=e.content;for(let e in o)if(o.hasOwnProperty(e)){let n=[];n.push(e),n.push(o[e]),console.log("parameter _cdrJsonConvert rowArr",n),t.content.push(n)}}return console.log("parameter _innerData:",t),t}_makeReadOnlyTable(){this._readOnlyTable=new b;let e={content:[["参数名称","参数值"]]};const t=this._resizeReadOnlyTable(e,{rows:"1",cols:"2"});this._fillReadOnlyTable(e,t)}get htmlElement(){return this._container}_fillTable(e,t){if(void 0!==e.content)for(let o=0;o<t.rows&&o<e.content.length;o++)for(let n=0;n<t.cols&&n<e.content[o].length;n++){this._table.body.rows[o].cells[n].querySelector("."+g.inputField).innerHTML=e.content[o][n]}}_fillReadOnlyTable(e,t){if(void 0!==e.content)for(let o=0;o<t.rows&&o<e.content.length;o++)for(let n=0;n<t.cols&&n<e.content[o].length;n++){this._readOnlyTable.body.rows[o].cells[n].querySelector("."+g.readOnlyTable_inputField).innerHTML=e.content[o][n]}}_resizeTable(e,t){const o=Array.isArray(e.content),n=!!o&&e.content.length,l=o?e.content.length:void 0,i=n?e.content[0].length:void 0,r=Number.parseInt(t.rows),s=Number.parseInt(t.cols),a=!isNaN(r)&&r>0?r:void 0,c=!isNaN(s)&&s>0?s:void 0,d=l||a||1,h=i||c||2;for(let e=0;e<d;e++)this._table.addRow();for(let e=0;e<h;e++)this._table.addColumn();return{rows:d,cols:h}}_resizeReadOnlyTable(e,t){const o=Array.isArray(e.content),n=!!o&&e.content.length,l=o?e.content.length:void 0,i=n?e.content[0].length:void 0,r=Number.parseInt(t.rows),s=Number.parseInt(t.cols),a=!isNaN(r)&&r>0?r:void 0,c=!isNaN(s)&&s>0?s:void 0,d=l||a||1,h=i||c||2;for(let e=0;e<d;e++)this._readOnlyTable.addRow();for(let e=0;e<h;e++)this._readOnlyTable.addColumn();return{rows:d,cols:h}}_showToolBar(e,t){this._hideToolBar(),this._activatedToolBar=e,e.showIn(t)}_hideToolBar(){null!==this._activatedToolBar&&this._activatedToolBar.hide()}_hangEvents(){this._container.addEventListener("mouseInActivatingArea",e=>{this._toolbarCalling(e)}),this._container.addEventListener("click",e=>{clearTimeout(this._clickTimeId);let t=this;this._clickTimeId=setTimeout(function(){t._clickToolbar(e)},250)}),this._container.addEventListener("dblclick",e=>{clearTimeout(this._clickTimeId),console.log("doubleclick event!"),this._dblclickToolbar(e)}),this._container.addEventListener("input",()=>{this._hideToolBar()}),this._container.addEventListener("keydown",e=>{this._containerKeydown(e)}),this._container.addEventListener("mouseout",e=>{this._leaveDetectArea(e)}),this._container.addEventListener("mouseover",e=>{this._mouseEnterInDetectArea(e)})}_mouseInActivatingAreaListener(e){this._hoveredCellSide=e.detail.side;const t=i(e.target),o=i(this._table.htmlElement);if(this._hoveredCell=e.target.closest("TD"),null===this._hoveredCell){const e=11;this._hoveredCell=this._container,t.x1+=e,t.y1+=e,t.x2-=e,t.y2-=e}"top"===this._hoveredCellSide&&this._showToolBar(this._horizontalToolBar,t.y1-o.y1-2),"bottom"===this._hoveredCellSide&&this._showToolBar(this._horizontalToolBar,t.y2-o.y1-1)}_isToolbar(e){return null===e?null:!(!e.closest("."+g.toolBarHor)&&!e.closest("."+g.toolBarVer))}_leaveDetectArea(e){this._isToolbar(e.relatedTarget)||(clearTimeout(this._toolbarShowDelay),this._hideToolBar())}_toolbarCalling(e){this._isToolbar(e.target)||(clearTimeout(this._toolbarShowDelay),this._toolbarShowDelay=setTimeout(()=>{this._mouseInActivatingAreaListener(e)},125))}_clickToolbar(e){if(!this._isToolbar(e.target))return;let t;if(this._activatedToolBar===this._horizontalToolBar?(this._addRow(),t="y"):t="x",isNaN(e.detail)&&null!==e.detail){const o=i(this._table.htmlElement);let n;n="x"===t?e.detail.x-o.x1:e.detail.y-o.y1,this._delayAddButtonForMultiClickingNearMouse(n)}else this._hideToolBar()}_dblclickToolbar(e){if(!this._isToolbar(e.target))return;let t;if(this._activatedToolBar===this._horizontalToolBar?(this._delRow(),t="y"):t="x",isNaN(e.detail)&&null!==e.detail){const o=i(this._table.htmlElement);let n;n="x"===t?e.detail.x-o.x1:e.detail.y-o.y1,this._delayAddButtonForMultiClickingNearMouse(n)}else this._hideToolBar()}_containerKeydown(e){13===e.keyCode?this._containerEnterPressed(e):[37,38,39,40,9].indexOf(e.keyCode)>=0&&!e.shiftKey&&!e.ctrlKey&&!e.altKey&&(console.log(e.keyCode),this._containerArrowKeyPressed(e))}_delayAddButtonForMultiClickingNearMouse(e){this._showToolBar(this._activatedToolBar,e),this._activatedToolBar.hideLine(),clearTimeout(this._plusButDelay),this._plusButDelay=setTimeout(()=>{this._hideToolBar()},500)}_getHoveredSideOfContainer(){return this._hoveredCell===this._container?this._isBottomOrRight()?0:-1:1}_isBottomOrRight(){return"bottom"===this._hoveredCellSide||"right"===this._hoveredCellSide}_addRow(){const e=this._hoveredCell.closest("TR");let t=this._getHoveredSideOfContainer();1===t&&(t=e.sectionRowIndex,t+=this._isBottomOrRight()),this._table.addRow(t)}_delRow(){const e=this._hoveredCell.closest("TR");let t=this._getHoveredSideOfContainer();1===t&&(t=e.sectionRowIndex,t+=this._isBottomOrRight()),this._table.delRow(t)}_addColumn(){let e=this._getHoveredSideOfContainer();1===e&&(e=this._hoveredCell.cellIndex,e+=this._isBottomOrRight()),this._table.addColumn(e)}_containerEnterPressed(e){if(console.log("Enter _containerEnterPressed"),null===this._table.selectedCell||e.shiftKey)return;const t=this._table.selectedCell.closest("TR");let o=this._getHoveredSideOfContainer();const n=t.sectionRowIndex,l=this._table.selectedCell.cellIndex;if(n==this._table.body.rows.length-1&&l==t.cells.length-1){o=t.sectionRowIndex+1,this._table.addRow(o).cells[0].click()}else if(l<t.cells.length-1)t.cells[l+1].click();else{let e=this._table.body.rows[n+1];null!=e&&e.cells[0].click()}e.preventDefault(),e.stopPropagation(),console.log("_containerEnterPressed finished!")}_containerArrowKeyPressed(e){if(!(null===this._table.selectedCell||e.shiftKey||e.ctrlKey||e.altKey)){switch(e.keyCode){case 37:this._processLeftArrowKey(e);break;case 38:this._processUpArrowKey(e);break;case 39:this._processRightArrowKey(e);break;case 40:this._processDownArrowKey(e);break;case 9:this._processRightArrowKey(e);break;default:console.log("not implement!")}e.preventDefault(),e.stopPropagation()}}_processRightArrowKey(e){const t=this._table.selectedCell.closest("TR"),o=t.sectionRowIndex,n=this._table.selectedCell.cellIndex,l=this._table.body.rows;if(o<l.length-1){const e=t.cells;n<e.length-1?e[n+1].click():l[o+1].cells[n-1].click()}else{const e=t.cells;n<e.length-1?e[n+1].click():l[0].cells[n-1].click()}}_processLeftArrowKey(e){console.log("Enter _processLeftArrowKey");const t=this._table.selectedCell.closest("TR"),o=t.sectionRowIndex,n=this._table.selectedCell.cellIndex,l=this._table.body.rows;if(0==o){const e=t.cells;if(0==n){const e=l[l.length-1];e.cells[e.cells.length-1].click()}else e[n-1].click()}else{const e=t.cells;if(0==n){console.log("move up");const e=l[o-1];e.cells[e.cells.length-1].click()}else console.log("move left"),e[n-1].click()}console.log("_processLeftArrowKey finished!")}_processDownArrowKey(e){console.log("Enter _processDownArrowKey");const t=this._table.selectedCell.closest("TR").sectionRowIndex;console.log("currentRowIndex:"+t);const o=this._table.selectedCell.cellIndex;console.log("currentCellIndex:"+o);const n=this._table.body.rows;if(t<n.length-1){const e=n[t+1];console.log("nextRowIndex:",t+1),e.cells[o].click()}else{n[0].cells[o].click()}console.log("_processDownArrowKey finished!")}_processUpArrowKey(e){console.log("Enter _processUpArrowKey");const t=this._table.selectedCell.closest("TR").sectionRowIndex;console.log("currentRowIndex:"+t);const o=this._table.selectedCell.cellIndex;console.log("currentCellIndex:"+o);const n=this._table.body.rows;if(0!=t){const e=t-1;console.log("nextRowIndex:",e),n[e].cells[o].click()}else{const e=n.length-1;console.log("nextRowIndex:",e),n[e].cells[o].click()}console.log("_processUpArrowKey finished!")}_mouseEnterInDetectArea(e){let t=r(i(this._container),e.pageX,e.pageY);e.target.dispatchEvent(new CustomEvent("mouseInActivatingArea",{detail:{side:t},bubbles:!0}))}}}])});