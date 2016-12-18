/**
 * Created by frankrwu on 2016/12/17.
 */
import {ItemView} from 'marionette';
import Template from './view1.hbs'

require('./view1.scss');

export default ItemView.extend({
    tagName: 'div',
    className: 'view1',
    template: Template,
    triggers: {
        'click #button': 'alarm'
    }
})