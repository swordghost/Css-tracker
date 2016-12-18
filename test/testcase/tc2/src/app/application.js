/**
 * Created by frankrwu on 2016/12/17.
 */
import {Application, RegionManager} from 'marionette';
import LayoutView from './layout_view.js';

import InsideController from './inside/controller.js'

let App = new (Application.extend({
    initialize: function () {
        this.layout = new LayoutView();
        this.layout.render();
    },

    onStart: function () {
        this.controller = new InsideController({container: App.layout.container});
        this.controller.showPage();
    }
}));

export default App;