import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

    classNames: ['gallery-view', 'grey', 'darken-4'],

    store: service(),

    actions: {
        galleryItemClick(galleryItem) {
            this.get('galleryItemClick')(galleryItem);
        },
        galleryItemDoubleClick() {
            this.get('galleryItemDoubleClick')();
        }
    }

});
