import Controller from '@ember/controller';
import { computed } from  '@ember/object';

export default Controller.extend({

    queryParams: ['search'],
    search: "",

    filteredGalleryItems: computed.filter('model.gallery-items', function(item, index, array) {
        let searchInput = this.get('search');

        return item.get('name').indexOf(searchInput) > -1;
    }),

    sortDefinition: ['type:asc', 'name:asc'],
    sortedAndFilteredGalleryItems: computed.sort('filteredGalleryItems', 'sortDefinition')

});
