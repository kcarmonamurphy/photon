import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

	classNames: ['gallery-controls'],

    didInsertElement() {
        $(".dropdown-button").dropdown();
    },

    actions: {
        sortDropdownModified(attribute) {
            this.get('sortGalleryItemsByAttribute')(attribute);
            this.set('currentSortAttribute', attribute);
        },
        flipSortDirection() {
            this.get('flipSortDirection')();
        }
    }

});
