/**
 * Created by frankrwu on 2016/12/17.
 */
import * as Marionette from 'marionette';
import BaseView from './view.js';
import View1 from './view1/view1.js';
import View2 from './view2/view2.js';

export default Marionette.Object.extend({
    initialize: function (options) {
        this.container = options.container;
    },

    showPage: function () {
        this.view = new BaseView();
        this.container.show(this.view);
        this.view.region1.show(new View1());
        this.view.region1.currentView.on('alarm', function () {
            alert('来自View1的Alert')
        });
        this.view.region2.show(new View2());
    }
});