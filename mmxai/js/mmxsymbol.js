!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mmxSymbol=e():t.mmxSymbol=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n(1).toString();var i=function(){function t(e){var n=e.api;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=n,this.nodes={button:null,list:null},this.listShowed=!1,this.range=null,this.tag="SPAN",this.iconClasses={base:this.api.styles.inlineToolButton,active:this.api.styles.inlineToolButtonActive}}return o(t,null,[{key:"CSS",get:function(){return"cdx-mmxsymbol"}}]),o(t,[{key:"render",value:function(){return this.nodes.button=document.createElement("button"),this.nodes.button.type="button",this.nodes.button.classList.add(this.iconClasses.base),this.nodes.button.innerHTML=this.toolboxIcon,this.nodes.button}},{key:"renderActions",value:function(){var t=this;this.nodes.list=document.createElement("ul"),chineseSymbols="•─…▏┃▕▎←↑→↓↖↗↘↙";var e=function(){var e=chineseSymbols[n],r=document.createElement("li");r.innerText=e,r.addEventListener("click",function(){t.insertSymbol(1,e)}),t.nodes.list.appendChild(r)};for(var n in chineseSymbols)e();wingdingsSymbols="";var r=function(){var e=wingdingsSymbols[n],r=document.createElement("li");r.innerText=e,r.classList.add("cdx-mmxsymbol-wingdings"),r.addEventListener("click",function(){t.insertSymbol(2,e)}),t.nodes.list.appendChild(r)};for(var n in wingdingsSymbols)r();var o=document.createElement("li");return o.innerText="1.",o.addEventListener("click",function(){t.insertSymbol(2,"1.")}),this.nodes.list.appendChild(o),this.nodes.list.classList.add("cdx-mmxsymbol-list"),this.nodes.list}},{key:"insertSymbol",value:function(t,e){if(null!=this.range){window.getSelection().removeAllRanges(),window.getSelection().addRange(this.range),this.range.collapse(!0),1==t?document.execCommand("insertTEXT",!1,e):2==e.length?document.execCommand("insertHTML",!1,'<span class="mmx-listSymbol" style="font-family:\'\';">'+e+"</span>"):document.execCommand("insertHTML",!1,'<span class="mmx-listSymbol" style="font-family:\'wingdings\';">'+e+"</span>");var n=this.range.commonAncestorContainer.children;n||(n=this.range.commonAncestorContainer.parentElement.children);for(var r=0;r<n.length;r++)"SPAN"==n[r].tagName&&(2==t&&n[r].innerText==e&&n[r].classList.add("mmx-listSymbol"),n[r].setAttribute("contenteditable","false"))}}},{key:"surround",value:function(t){if(t){for(var e=document.getElementsByClassName("mmx-showlist"),n=0;n<e.length;n++)e[n].classList.remove("mmx-showlist");0==this.listShowed?(this.nodes.list.classList.add("mmx-showlist"),this.listShowed=!0):(this.nodes.list.classList.remove("mmx-showlist"),this.listShowed=!1);var r=this.api.selection.findParentTag(this.tag,"cdx-mmxsymbol");r?this.unwrap(r):this.range=t}}},{key:"clear",value:function(){null==this.range?(this.nodes.list.classList.remove("mmx-showlist"),this.listShowed=!1):this.range=null}},{key:"wrap",value:function(t){var e=document.createElement(this.tag);e.classList.add("cdx-mmxsymbol"),e.appendChild(t.extractContents()),t.insertNode(e),this.api.selection.expandToTag(e)}},{key:"unwrap",value:function(t){this.api.selection.expandToTag(t);var e=window.getSelection(),n=e.getRangeAt(0),r=n.extractContents();t.parentNode.removeChild(t),n.insertNode(r),e.removeAllRanges(),e.addRange(n)}},{key:"checkState",value:function(){var t=this.api.selection.findParentTag(this.tag,this.CSS);this.nodes.button.classList.toggle(this.iconClasses.active,!!t)}},{key:"toolboxIcon",get:function(){return n(6).default}}],[{key:"isInline",get:function(){return!0}},{key:"sanitize",get:function(){return{span:{style:!0,class:this.CSS}}}}]),t}();t.exports=i},function(t,e,n){var r=n(2);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(4)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,'.cdx-mmxsymbol {\r\n  background: rgba(245,235,111,0.29);\r\n  padding: 3px 0;\r\n}\r\n.cdx-mmxsymbol-list {\r\n\tbackground-color: #fff;\r\n    border: 1px solid #eaeaea;\r\n    -webkit-box-shadow: 0 3px 15px -3px rgba(13,20,33,.13);\r\n    box-shadow: 0 3px 15px -3px rgba(13,20,33,.13);\r\n    border-radius: 4px;\r\n\tlist-style: none;\r\n    position: absolute;\r\n\tmargin: 0px;\r\n\tpadding: 0px;\r\n\tdisplay: none;\r\n}\r\n.cdx-mmxsymbol-list li{\r\n\tfloat:left;\r\n\twidth:20%;\r\n\ttext-align:center;\r\n\tcursor:pointer;\r\n}\r\n.cdx-mmxsymbol-list li span{\r\n\twidth:100%;\r\n}\r\n.cdx-mmxsymbol-wingdings{\r\n\tfont-family:"wingdings";\r\n}\r\n.mmx-showlist {\r\n    display: block;\r\n}\r\n.mmx-listSymbol{}',""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(s=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),i=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(i).concat([o]).join("\n")}var s;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),a=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),l=null,c=0,u=[],d=n(5);function f(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(y(r.parts[s],e))}else{var a=[];for(s=0;s<r.parts.length;s++)a.push(y(r.parts[s],e));i[r.id]={id:r.id,refs:1,parts:a}}}}function p(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=e.base?i[0]+e.base:i[0],a={css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(a):n.push(r[s]={id:s,parts:[a]})}return n}function m(t,e){var n=a(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=u[u.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),u.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=a(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,o)}}function h(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function b(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),v(e,t.attrs),m(t,e),e}function v(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function y(t,e){var n,r,o,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var s=c++;n=l||(l=b(e)),r=w.bind(null,n,s,!1),o=w.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(e,t.attrs),m(t,e),e}(e),r=function(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=d(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}.bind(null,n,e),o=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){h(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return f(n,e),function(t){for(var r=[],o=0;o<n.length;o++){var s=n[o];(a=i[s.id]).refs--,r.push(a)}t&&f(p(t,e),e);for(o=0;o<r.length;o++){var a;if(0===(a=r[o]).refs){for(var l=0;l<a.parts.length;l++)a.parts[l]();delete i[a.id]}}}};var g,x=(g=[],function(t,e){return g[t]=e,g.filter(Boolean).join("\n")});function w(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=x(e,o);else{var i=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,n){"use strict";n.r(e),e.default='<svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path class="fil0" d="M9 13l0 2 4 0 0 -2 1 0 -1 3 -5 0 0 -3c1,-1 2,-1 3,-2 1,-1 1,-2 1,-4 0,-2 -1,-3 -2,-4 -1,-2 -2,-2 -3,-2 -1,0 -2,0 -3,1 -1,2 -2,3 -2,5 0,2 0,3 1,4 1,1 2,2 3,2l0 3 -6 0 0 -3 1 0 0 2 4 0 0 -2c-3,0 -4,-2 -5,-4 0,-3 0,-5 1,-6 2,-2 3,-2 4,-3 2,0 3,0 4,0 2,1 3,2 4,3 1,2 1,4 1,6 -1,2 -2,3 -5,4z"/></svg>'}])});