/**
 * Created by frankrwu on 2016/12/17.
 */
import {ItemView} from 'marionette';
import Template from './view2.hbs'

require('./view2.scss');

export default ItemView.extend({
    tagName: 'div',
    className: 'view2',
    template: Template,
})