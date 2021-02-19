// import {create, getCoords, getSideByCoords} from './documentUtils';
import { create } from './documentUtils';
import './styles/modelHeadTable.pcss';

const CSS = {
  article: 'mmxModelArticle',
  imageRight: 'mmxModelImage__right',
  imageLeft: 'mmxModelImage__left',
  table: 'mmxModelTable',
  center: 'mmxModelCenter',
  group: 'mmxModelGroup',
  divHead: 'mmxModelHead',
  imageParentDiv: 'mmxModelImageDiv',
  noDisplay: 'mmxModelNoDisplay',
};

/**
 * Generates and manages model head _table contents.
 */
export class ModelHeadTable {
  /**
   * Creates
   */
  constructor(data, modelSelCallBack = undefined) {
    this._modelSelCallBack = modelSelCallBack;
    try {
      this._element = this._createDivWrapper(data);
      this._divHeadDisplay = true;
    }
    catch (e) {
      alert(e);
    }
    // this._parent = parent;
    this._hangEvents();
  }

  /**
   * @private
   * 创建整个造型的表头
   */
  _createDivWrapper(data) {
    // 2021/01/11,界面整合
    this._createModelNameTitle(data);
    this._divHead = create('div', [CSS.divHead], null, [this._createDivType(data), this._createDivTitle(data), this._createDivAttributes(data)]);
    return create('div', [CSS.article, CSS.group], null, [this._titleWrapper, this._createImageAttr(data), this._divHead]);
  }

  /**
   * @private
   * 创建属性div元素
   */
  _createDivAttributes(data) {
    let attrContentDefault = !!data.Tags ? data.Tags : '';
    let labelEle = create('label', null, { for: 'modelAttr' });
    labelEle.innerHTML = '属性：';
    this._labelAttrEle = create('input', null, { type: 'text', name: 'modelAttr' });
    this._labelAttrEle.placeholder = '属性用空格分开';
    this._labelAttrEle.value = attrContentDefault;
    return create('div', [CSS.table, CSS.center], null, [labelEle, this._labelAttrEle]);
  }

  /**
   * @private
   * 创建造型缩略图
   */
  _createImageAttr(data) {
    // if (data.Thumb === undefined && data.imgByteStr === undefined) {
    if (data.imgBase64 === undefined && data.imgByteStr === undefined) {
      this._imgEle = undefined;
      return undefined;
    }
    // let imgUrl = !!data.imgByteStr ? data.imgByteStr.changingThisBreaksApplicationSecurity : !!data.Thumb? data.Thumb : './assets/dog1.jpg';
    // let imgUrl = !!data.Thumb ? 'file://' + data.Thumb : !!data.imgByteStr.changingThisBreaksApplicationSecurity ? data.imgByteStr.changingThisBreaksApplicationSecurity : './assets/dog1.jpg';
    let imgUrl = !!data.imgBase64 ? data.imgBase64 : !!data.imgByteStr.changingThisBreaksApplicationSecurity ? data.imgByteStr.changingThisBreaksApplicationSecurity : './assets/dog1.jpg';
    // let imgUrl = !!data.Thumb ? data.Thumb : './assets/dog1.jpg';
    this._imgEle = create('img', [CSS.imageRight], { alt: 'img', src: imgUrl });
    this._divImg = create('div', [CSS.imageParentDiv], null, [this._imgEle]);
    return this._divImg;
  }

  /**
   * @private
   * 创建类型div元素
   */
  _createDivType(data) {
    // console.log('enter _createDivType');
    let labelEle = create('label', null, { for: 'modelType' });
    let subName = !!data.name ? data.name : '';
    labelEle.innerHTML = '类型：';
    // this._inputTypeTxt = create('input', null, { type: 'text', name: 'modelType', readonly:'true' });
    this._inputTypeTxt = create('input', null, { type: 'text', name: 'modelType' });
    this._inputTypeTxt.value = subName;
    // comment by xiaowy 2021/01/11 for head ui together
    // this._modelSelBtn = create('input', null, { type: 'button', name: 'selectModel', value: '选择造型...' });
    // return create('div', [CSS.table], null, [labelEle, this._inputTypeTxt, this._modelSelBtn]);
    return create('div', [CSS.table], null, [labelEle, this._inputTypeTxt]);
    // return divEle;
  }
  /**
   * 创建标题div元素
   */
  _createDivTitle(data) {
    let labelEle = create('label', null, { for: 'modelTitle' });
    labelEle.innerHTML = '内部标题：';
    let title = !!data.innerTilte ? data.innerTilte : '';
    this._inputTitleTxt = create('input', null, {
      type: 'text', name: 'modelTitle',
      placeholder: '造型内部小标题，可空', value: title
    });
    // this._inputTitleTxt = create('input', null, {
    //   type: 'text', name: 'modelTitle',
    //   placeholder: '造型内部小标题，可空'
    // });
    return create('div', [CSS.table, CSS.center], null, [labelEle, this._inputTitleTxt]);
  }

  _createModelNameTitle(data) {
    // add by xiaowy 把标题整理到题头中，统一管理 2021/01/08
    // if (data && data.title) {
    // this._titleWrapper = document.createElement('div');
    
    this._descTitle = document.createElement('H3');
    // let name = undefined;
    // for (prop in data) {
    //   if (data.hasOwnProperty(prop)){
    //     name = prop;
    //     break;
    //   }
    // }
    if (data.name !== undefined) {
      this._descTitle.innerHTML = '【' + '造型-' + data.name + '】';
      // this._descTitle.innerHTML = data.name;
    }
    else {
      this._descTitle.innerHTML = '【造型】';
    }
    this._descTitle.classList.add('mmxModelDecsTitle');
    // this._descTitle.appendChild(document.createElement('br'));
    this._modelSelBtn = create('input', null, { type: 'button', name: 'selectModel', value: '更 改 ' });
    var icon = '<i class="fa fa-caret-down" aria-hidden="true"></i>'
    var iconTag = create('i', ['fa', 'fa-caret-up'], { 'aria-hidden': 'true'})
    // this._svgImg = document.createElement('img');
    this._svgImg = create('button', null, null, [iconTag]);
    var svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="80" height="40" viewBox="0 0 80 40" xml:space="preserve">
    <desc>Created with Fabric.js 4.2.0</desc>
    <defs>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="transparent"></rect>
    <g transform="matrix(Infinity NaN NaN Infinity 0 0)" id="e71293ed-9ff0-42c4-98c4-c8c04bfec071"  >
    </g>
    <g transform="matrix(1 0 0 1 40 20)" id="7466d196-1549-41eb-bc91-7738340de544"  >
    <rect style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  x="-40" y="-20" rx="0" ry="0" width="80" height="40" />
    </g>
    <g transform="matrix(0.06 0 0 0.02 40 20)" id="9c9b8676-4234-45a8-9031-3817f52165ce"  >
      <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAACWCAYAAABXaT+3AAAE+UlEQVR4Xu3cTehUVRzG8a+WusllIOaiReCiFtY+bKEblUjCtBckgmhRRLuCtoK4MwURNxGEby3+ohhBRNAqKnftgkClpSsXgiXGL2ZoHOflnDvn3ufc+39mJ52Z55zPPJ378p+ZDfghEdggSXUohheVwPCGFwmIYt14w4sERLFuvOFFAqJYN97wIgFRrBtveJGAKNaNN7xIQBTrxhteJCCKdeMNLxIQxbrxhhcJiGLdeMOLBESxbrzhRQKiWDfe8CIBUawbb3iRgCjWjTe8SEAU68YbXiQginXjDS8SEMW68YYXCYhi3XjDiwREsW684UUColg33vAiAVGsG294kYAo1o03vEhAFDuv8buA14GXgeeAZ0Tz62vsX8AfwE/AN8Dv0wuZht8KnATe6+uKK533aeBT4N54fpPwTwM/As9XOvm+T+sXYA9wNxYyho+m/wrs7PvqKp//z8Bu4P4Y/iJwuPJJD2V6XwCfBPyzwJ8T7R/KAmtdx31gW8AfAz6vdZYDnddHAX8DeGmgC6x1WdcCPo6yT9U6w4HO63bAP0xYXFwAfJw4NuHlBjskPE8BLyxZ4b0YeBvYkUARZz5vGX+u1BPA18CRBMubAX8NOJAwOIYYfzZUoMetgYOJjmsB/wFwNvEJMew88HbG+PUwNEzezFjouwG/ZXQevz3jiWvAIeBBxnOGODS36WFwK248jq9c9wHXM2UuJe5nmS/bq+FNrvjjfs0PkzfJzgHvZy57vTa/SdODNu5SxtnhIz/qvGnU+r3GXyjQFP17YD/w9zR8/Nv4i1tXBH0WvPHnwxdDnwdv/Mfxi6Ivgjf+//jF0ZfBGx+eBC5nXJGO365HDqSzdq+Uz9Ws1wNuoF8ZnYnknOjF9VDcOvjv7GXeIwV+PTZ/FfTXgH+WvVOp8Kviv5EymWWT7ei/t46essdPrzW2nbhajQuBnEf875fUhJwXbWFsJ+hN4OM5nU2uBdhFL9npunK2mslJdzrJDt6AztfTFH5Ize8cvelWM6TmS9BLwPe5+TL0UvB9xJeil4TvE34Vp8SrHFxnnWzIm7TkDKjp7Y/i1yGl4WtuflP0uGAsfuXdBnyN+Kugt/Jpirbga8KvDr30wbX0nr/01mrCFW2V6F3Ar9L8pX9MaOlA2slHVtrcakpc4TbFr7bpY5Su4MfNb+XPaFPNrx69q61m0qWVPxxPBPQCXQEfmW3hx4dv4yPnvfgkXJdbTZvND/TvgFcSznQmh3RyIJ01JxV8yeb3Dl211ZRs/sa+NV1xVrNoF4jP2sf9kJzHt8Dm0e8D5Dzvwui7XDnPKT5WudWUaH4uSHyR4J0avslSC/wqe34qflVfnKsJvk38qtBrOLjOamvT8/x5za8OvVb4ks2vEr1m+BL41aLXDj/eOr4CjqYeQUfjvqz9d9VqO7jO8/0MOJ6IH2NPJI6VDesLfADFj9V9CLwKvDgl9htwFTgD3JFpZgT3CT5jWfUPNbzoPTK84UUColg33vAiAVGsG294kYAo1o03vEhAFOvGG14kIIp14w0vEhDFuvGGFwmIYt14w4sERLFuvOFFAqJYN97wIgFRrBtveJGAKNaNN7xIQBTrxhteJCCKdeMNLxIQxbrxhhcJiGLdeMOLBESxbrzhRQKiWDfe8CIBUawbb3iRgCjWjTe8SEAU68YbXiQginXjDS8SEMW68SL4fwHtoweemjCVMAAAAABJRU5ErkJggg==" x="-47" y="-75" width="94" height="150"></image>
    </g>
    <g transform="matrix(0.27 0 0 0.27 40 20)" id="2216f00b-85c4-4f2f-a0c5-33198357c7b9"  >
      <image style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAACWCAYAAABXaT+3AAAE+UlEQVR4Xu3cTehUVRzG8a+WusllIOaiReCiFtY+bKEblUjCtBckgmhRRLuCtoK4MwURNxGEby3+ohhBRNAqKnftgkClpSsXgiXGL2ZoHOflnDvn3ufc+39mJ52Z55zPPJ378p+ZDfghEdggSXUohheVwPCGFwmIYt14w4sERLFuvOFFAqJYN97wIgFRrBtveJGAKNaNN7xIQBTrxhteJCCKdeMNLxIQxbrxhhcJiGLdeMOLBESxbrzhRQKiWDfe8CIBUawbb3iRgCjWjTe8SEAU68YbXiQginXjDS8SEMW68YYXCYhi3XjDiwREsW684UUColg33vAiAVGsG294kYAo1o03vEhAFDuv8buA14GXgeeAZ0Tz62vsX8AfwE/AN8Dv0wuZht8KnATe6+uKK533aeBT4N54fpPwTwM/As9XOvm+T+sXYA9wNxYyho+m/wrs7PvqKp//z8Bu4P4Y/iJwuPJJD2V6XwCfBPyzwJ8T7R/KAmtdx31gW8AfAz6vdZYDnddHAX8DeGmgC6x1WdcCPo6yT9U6w4HO63bAP0xYXFwAfJw4NuHlBjskPE8BLyxZ4b0YeBvYkUARZz5vGX+u1BPA18CRBMubAX8NOJAwOIYYfzZUoMetgYOJjmsB/wFwNvEJMew88HbG+PUwNEzezFjouwG/ZXQevz3jiWvAIeBBxnOGODS36WFwK248jq9c9wHXM2UuJe5nmS/bq+FNrvjjfs0PkzfJzgHvZy57vTa/SdODNu5SxtnhIz/qvGnU+r3GXyjQFP17YD/w9zR8/Nv4i1tXBH0WvPHnwxdDnwdv/Mfxi6Ivgjf+//jF0ZfBGx+eBC5nXJGO365HDqSzdq+Uz9Ws1wNuoF8ZnYnknOjF9VDcOvjv7GXeIwV+PTZ/FfTXgH+WvVOp8Kviv5EymWWT7ei/t46essdPrzW2nbhajQuBnEf875fUhJwXbWFsJ+hN4OM5nU2uBdhFL9npunK2mslJdzrJDt6AztfTFH5Ize8cvelWM6TmS9BLwPe5+TL0UvB9xJeil4TvE34Vp8SrHFxnnWzIm7TkDKjp7Y/i1yGl4WtuflP0uGAsfuXdBnyN+Kugt/Jpirbga8KvDr30wbX0nr/01mrCFW2V6F3Ar9L8pX9MaOlA2slHVtrcakpc4TbFr7bpY5Su4MfNb+XPaFPNrx69q61m0qWVPxxPBPQCXQEfmW3hx4dv4yPnvfgkXJdbTZvND/TvgFcSznQmh3RyIJ01JxV8yeb3Dl211ZRs/sa+NV1xVrNoF4jP2sf9kJzHt8Dm0e8D5Dzvwui7XDnPKT5WudWUaH4uSHyR4J0avslSC/wqe34qflVfnKsJvk38qtBrOLjOamvT8/x5za8OvVb4ks2vEr1m+BL41aLXDj/eOr4CjqYeQUfjvqz9d9VqO7jO8/0MOJ6IH2NPJI6VDesLfADFj9V9CLwKvDgl9htwFTgD3JFpZgT3CT5jWfUPNbzoPTK84UUColg33vAiAVGsG294kYAo1o03vEhAFOvGG14kIIp14w0vEhDFuvGGFwmIYt14w4sERLFuvOFFAqJYN97wIgFRrBtveJGAKNaNN7xIQBTrxhteJCCKdeMNLxIQxbrxhhcJiGLdeMOLBESxbrzhRQKiWDfe8CIBUawbb3iRgCjWjTe8SEAU68YbXiQginXjDS8SEMW68SL4fwHtoweemjCVMAAAAABJRU5ErkJggg==" x="-47" y="-75" width="94" height="150"></image>
    </g>
    </svg>`;
    // this._svgImg.src = "data:image/svg+xml;utf8," + svgContent;
    
    // this._titleWrapper.appendChild(this._descTitle);
    // this._titleWrapper.appendChild(this._modelSelBtn);
    // this._titleWrapper.appendChild(document.createElement('br'));
    this._titleWrapper = create('div', [CSS.table], null, [this._descTitle, this._modelSelBtn, this._svgImg, document.createElement('br')])
  }


  /**
   * get model type name
   * @return {string}
   */
  get modelTypeName() {
    return this._inputTypeTxt.value.trim();
  }
  /**
   * get html element of table
   * @return {HTMLElement}
   */
  get htmlElement() {
    return this._element;
  }

  /**
   * @private
   *
   * hang necessary events
   */
  _hangEvents() {
    this._modelSelBtn.addEventListener('click', (event) => {
      // console.log('enter modelSelBtn click event');
      if (this._modelSelCallBack !== undefined) {
        // console.log('begin call _modelSelCallBack funtion');
        let returnData = this._modelSelCallBack(this._modifyHeadDataCall());
        // console.log('after call _modelSelCallBack funtion');
        event.preventDefault();
        event.stopPropagation();
        // this._modifyHeadData(returnData);
      }
    });
    this._svgImg.addEventListener('click', (evnet) => {
      // alert('svg clicked');
      if (this._divHeadDisplay) {
        this._divHead.classList.add(CSS.noDisplay);
        if (this._divImg) {
          this._divImg.classList.remove(CSS.imageParentDiv);
          this._divImg.classList.add(CSS.imageLeft);
        }
        let iconTag = this._svgImg.querySelectorAll('i')[0];
        if (iconTag) {
          iconTag.classList.remove('fa-caret-up');
          iconTag.classList.add('fa-caret-down');
          this._divHeadDisplay = false;
      }
      }
      else {
        this._divHead.classList.remove(CSS.noDisplay);
        if (this._divImg) {
          this._divImg.classList.add(CSS.imageParentDiv);
          this._divImg.classList.remove(CSS.imageLeft);
        }
        let iconTag = this._svgImg.querySelectorAll('i')[0];
        if (iconTag) {
          iconTag.classList.remove('fa-caret-down');
          iconTag.classList.add('fa-caret-up');
        }
        this._divHeadDisplay = true;
      }
    });
  }

  /**
   * @private
   * 修改造型头的各项数据
   * 闭包回调
   */
  _modifyHeadDataCall() {
    let that = this;
    let _modifyHeadData = function (data) {
      try {
        if (data.Name) {
          that._inputTypeTxt.value = data.Name;
          // added by xiaowy 2021/01/11 for head ui together
          that._descTitle.innerHTML = '【' + '造型-' + data.Name + '】'
        }
        // if (data.Tags) {
        //   that._labelAttrEle.innerHTML = data.Tags;
        // }
        // if (data.Thumb !== undefined || data.imgByteStr !== undefined) {
        if (data.imgBase64 !== undefined || data.imgByteStr !== undefined) {
          if (that._imgEle !== undefined) {
            // let imgUrl = !!data.imgByteStr ? data.imgByteStr.changingThisBreaksApplicationSecurity : data.Thumb;
            // let imgUrl = !!data.Thumb ? 'file://' + data.Thumb : data.imgByteStr.changingThisBreaksApplicationSecurity;
            let imgUrl = !!data.imgBase64 ? data.imgBase64 : data.imgByteStr.changingThisBreaksApplicationSecurity;
            that._imgEle.src = imgUrl;
          }
          else {
            let img = that._createImageAttr(data);
            // that._element.appendChild(img);
            that._divHead.insertAdjacentElement('beforebegin', img);
          }
        }
      }
      catch (e) {
        alert(e);
      }
    }
    return _modifyHeadData;
  }

  /**
   * @public
   * get model head parameter json object
   */
  getHeadParam() {
    try {
      let obj = {};
      obj['板块头'] = {};
      obj['板块头']['标题'] = this._inputTitleTxt.value.trim();
      obj['属性'] = this._labelAttrEle.value.trim();
      obj.name = this._inputTypeTxt.value.trim();
      // obj['属性'] = this._labelAttrEle.innerHTML;
      console.log('getHeadParam', obj);
      return obj;
    }
    catch (e) {
      console.log('getHeadParam exception:', e);
      alert(e);
      return undefined;
    }
  }
}
