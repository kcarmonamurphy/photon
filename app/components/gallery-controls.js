import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

	classNames: ['gallery-controls', 'grey', 'darken-4'],

    didInsertElement() {
        $(".dropdown-button").dropdown();
    }

});
