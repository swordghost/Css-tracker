/**
 * Created by frankrwu on 2016/12/17.
 */
import {LayoutView} from 'marionette';
import template from './layout.hbs';

export default LayoutView.extend({
    el: 'body',
    template: template,

    regions: {
        container: '#app-main'
    }
});