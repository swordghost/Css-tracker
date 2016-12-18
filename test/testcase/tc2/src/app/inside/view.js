/**
 * Created by frankrwu on 2016/12/17.
 */
import {LayoutView} from 'marionette';
import LayoutTpl from './layout.hbs';

export default LayoutView.extend({
    tagName: 'div',
    id: 'inside-layout',
    template: LayoutTpl,
    regions: {
        region1: '.region1',
        region2: '.region2'
    }
});