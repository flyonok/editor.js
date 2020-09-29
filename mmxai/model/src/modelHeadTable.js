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
};

/**
 * Generates and manages model head _table contents.
 */
export class ModelHeadTable {
  /**
   * Creates
   */
  constructor(data, modelSelCallBack = undefined, parent = null) {
    this._modelSelCallBack = modelSelCallBack;
    this._element = this._createDivWrapper(data);
    this._parent = parent;
    this._hangEvents();
  }

  /**
   * @private
   * 创建整个造型的表头
   */
  _createDivWrapper(data)
  {
    let divChild = create('div', [CSS.divHead], null, [ this._createDivType(data), this._createDivTitle(data), this._createDivAttributes(data)]);
    return create('div', [CSS.article, CSS.group], null, [this._createImageAttr(data), divChild]);
  }

  /**
   * @private
   * 创建属性div元素
   */
  _createDivAttributes(data) {
    let attrContentDefault = !!data.Tags ? data.tags : '属性用空格分开';
    let labelEle = create('label', null);
    labelEle.innerHTML = '属性：';
    this._labelAttrEle = create('label', null);
    this._labelAttrEle.innerHTML = attrContentDefault;
    return create('div', [CSS.table, CSS.center], null, [labelEle, this._labelAttrEle]);
  }

  /**
   * @private
   * 创建造型缩略图
   */
  _createImageAttr(data) {
    let imgUrl = !!data.Thumb ? data.Thumb : './assets/dog1.jpg';
    this._imgEle = create('img', [CSS.imageRight], {alt: 'img', src:imgUrl});
    return this._imgEle;
  }

  /**
   * @private
   * 创建类型div元素
   */
  _createDivType(data) {
    // console.log('enter _createDivType');
    let labelEle = create('label', null, {for:'modelType'});
    let subName = !!data.name ? data.name : '';
    labelEle.innerHTML = '类型：';
    this._inputTypeTxt = create('input', null, {type:'text', name:'modelType'});
    this._inputTypeTxt.value = subName;
    this._modelSelBtn = create('input', null, {type:'button', name:'selectModel', value:'选择模型...'});
    // this._modelSelBtn = inputBtn;
    console.log('_createDivType finished!');
    return create('div', [CSS.table], null, [labelEle, this._inputTypeTxt, this._modelSelBtn]);
    // return divEle;
  }
  /**
   * 创建标题div元素
   */
  _createDivTitle(data) {
    let labelEle = create('label', null, {for:'modelTitle'});
    labelEle.innerHTML = '内部标题：';
    let title = !!data.innerTilte ? data.innerTilte : '';
    this._inputTitleTxt = create('input', null, {type:'text', name:'modelTitle',
                                          placeholder:'造型内部小标题，可空', value:title});
    return create('div', [CSS.table, CSS.center], null, [labelEle, this._inputTitleTxt]);
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
        let returnData = this._modelSelCallBack(event, this._parent);
        this._modifyHeadData(returnData);
      }
    });
  }

  /**
   * @private
   * 修改造型头的各项数据
   */
  _modifyHeadData(data) {
    if (data.name) {
      this._inputTypeTxt.value = data.name;
    }
    if (data.Tags) {
      this._labelAttrEle.innerHTML = data.Tags;
    }
    if (data.Thumb) {
      this._imgEle.src = data.Thumb;
    }
  }

  /**
   * @public
   * get model head parameter json object
   */
  getHeadParam()
  {
    let obj = {};
    obj['板块头'] = this._inputTitleTxt.value;
    obj['属性'] = this._labelAttrEle.innerHTML;
    console.log('getHeadParam', obj);
    return obj;
  }
}
