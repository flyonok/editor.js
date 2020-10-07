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
    this._element = this._createDivWrapper(data);
    // this._parent = parent;
    this._hangEvents();
  }

  /**
   * @private
   * 创建整个造型的表头
   */
  _createDivWrapper(data) {
    this._divHead = create('div', [CSS.divHead], null, [this._createDivType(data), this._createDivTitle(data), this._createDivAttributes(data)]);
    return create('div', [CSS.article, CSS.group], null, [this._createImageAttr(data), this._divHead]);
  }

  /**
   * @private
   * 创建属性div元素
   */
  _createDivAttributes(data) {
    let attrContentDefault = !!data.Tags ? data.tags : '';
    let labelEle = create('label', null, { for: 'modelAttr' });
    labelEle.innerHTML = '属性：';
    this._labelAttrEle = create('input', null, {type:'text', name:'modelAttr'});
    this._labelAttrEle.placeholder = '属性用空格分开';
    this._labelAttrEle.value = attrContentDefault;
    return create('div', [CSS.table, CSS.center], null, [labelEle, this._labelAttrEle]);
  }

  /**
   * @private
   * 创建造型缩略图
   */
  _createImageAttr(data) {
    if (data.Thumb === undefined && data.imgByteStr === undefined) {
      this._imgEle = undefined;
      return undefined;
    }
    // let imgUrl = !!data.imgByteStr ? data.imgByteStr.changingThisBreaksApplicationSecurity : !!data.Thumb? data.Thumb : './assets/dog1.jpg';
    let imgUrl = !!data.Thumb ? 'file://' + data.Thumb : !!data.imgByteStr.changingThisBreaksApplicationSecurity ? data.imgByteStr.changingThisBreaksApplicationSecurity : './assets/dog1.jpg';
    // let imgUrl = !!data.Thumb ? data.Thumb : './assets/dog1.jpg';
    this._imgEle = create('img', [CSS.imageRight], { alt: 'img', src: imgUrl });
    let divImg = create('div', [CSS.imageParentDiv], null, [this._imgEle]);
    return divImg;
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
    this._inputTypeTxt = create('input', null, { type: 'text', name: 'modelType'});
    this._inputTypeTxt.value = subName;
    this._modelSelBtn = create('input', null, { type: 'button', name: 'selectModel', value: '选择造型...' });
    // this._modelSelBtn = inputBtn;
    // console.log('_createDivType finished!');
    return create('div', [CSS.table], null, [labelEle, this._inputTypeTxt, this._modelSelBtn]);
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
      if (this._modelSelCallBack !== undefined) {
        let returnData = this._modelSelCallBack(this._modifyHeadDataCall());
        // this._modifyHeadData(returnData);
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
    let _modifyHeadData = function(data) {
      if (data.Name) {
        that._inputTypeTxt.value = data.Name;
      }
      if (data.Tags) {
        that._labelAttrEle.innerHTML = data.Tags;
      }
      if (data.Thumb !== undefined || data.imgByteStr !== undefined) {
        if (that._imgEle !== undefined) {
          // let imgUrl = !!data.imgByteStr ? data.imgByteStr.changingThisBreaksApplicationSecurity : data.Thumb;
          let imgUrl = !!data.Thumb ? 'file://' + data.Thumb : data.imgByteStr.changingThisBreaksApplicationSecurity;
          that._imgEle.src = imgUrl;
        }
        else {
          let img = that._createImageAttr(data);
          // that._element.appendChild(img);
          that._divHead.insertAdjacentElement('beforebegin', img);
        }
      }
    }
    return _modifyHeadData;
  }

  /**
   * @public
   * get model head parameter json object
   */
  getHeadParam() {
    let obj = {};
    obj['板块头'] = {};
    obj['板块头']['标题'] = this._inputTitleTxt.value.trim();
    obj.name = this._inputTypeTxt.value.trim();
    // obj['属性'] = this._labelAttrEle.innerHTML;
    console.log('getHeadParam', obj);
    return obj;
  }
}
