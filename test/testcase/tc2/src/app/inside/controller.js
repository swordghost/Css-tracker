/**
 * Created by frankrwu on 2016/12/17.
 */
import * as Marionette from 'marionette';
import View1 from './view1/view1.js';
import View2 from './view2/view2.js';

export default Marionette.Object.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    showPage: function(){
        this.region1.show(new View1());
        this.region2.show(new View2());
    }
});