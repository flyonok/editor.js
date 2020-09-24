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
  constructor() {
    // this._numberOfColumns = 0;
    // this._numberOfRows = 0;
    this._element = this._createDivWrapper();
    // this._table = this._element.querySelector('table');

    // comment by xiaowy 2020/09/21
    this._hangEvents();
  }

  /**
   * @private
   * 创建整个造型的表头
   */
  _createDivWrapper()
  {
    let divChild = create('div', [CSS.divHead], null, [ this._createDivType(), this._createDivTitle(), this._createDivAttributes()]);
    return create('div', [CSS.article, CSS.group], null, [this._createImageAttr(), divChild]);
  }

  /**
   * @private
   * 创建属性div元素
   */
  _createDivAttributes(attrContent='属性用空格分开') {
    let labelEle = create('label', null);
    labelEle.innerHTML = '属性：';
    let labelEle2 = create('label', null);
    labelEle2.innerHTML = attrContent;
    return create('div', [CSS.table, CSS.center], null, [labelEle, labelEle2]);
  }

  /**
   * @private
   * 创建造型缩略图
   */
  _createImageAttr(img=null) {
    let imgUrl = !!img || 'http://pics5.baidu.com/feed/37d12f2eb9389b501d36b813d8cd8ddbe5116ea0.jpeg?token=df7edb57e432ea574b33f3ac4e393f6d';
    return create('img', [CSS.imageRight], {alt: 'img', src:imgUrl});
  }

  /**
   * @private
   * 创建类型div元素
   */
  _createDivType() {
    console.log('enter _createDivType');
    let labelEle = create('label', null, {for:'modelType'});
    labelEle.innerHTML = '类型：';
    let inputTxt = create('input', null, {type:'text', name:'modelType'});
    let inputBtn = create('input', null, {type:'button', name:'selectModel', value:'选择模型...'});
    console.log('_createDivType finished!');
    return create('div', [CSS.table], null, [labelEle, inputTxt, inputBtn]);
    // return divEle;
  }
  /**
   * 创建标题div元素
   */
  _createDivTitle() {
    let labelEle = create('label', null, {for:'modelTitle'});
    labelEle.innerHTML = '内部标题：';
    let inputTxt = create('input', null, {type:'text', name:'modelTitle',
                                          placeholder:'造型内部小标题，可空'});
    return create('div', [CSS.table, CSS.center], null, [labelEle, inputTxt]);
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
  }
}
