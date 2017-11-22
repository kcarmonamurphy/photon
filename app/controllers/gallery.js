import Controller from '@ember/controller';
import { computed } from  '@ember/object';

export default Controller.extend({

    queryParams: ['search', 'sortby', 'direction'],
    search: "",
    sortby: "name",
    direction: "asc",

    sortableAttributes: ['name', 'size'],

    filteredGalleryItems: computed.filter('model.gallery-items', function(item, index, array) {
        let searchInput = this.get('search');

        return item.get('name').indexOf(searchInput) > -1;
    }),

    sortAttribute: 'name',
    sortDirection: 'asc',

    sortDefinition: computed('sortAttribute', 'sortDirection', function() {
        let typeDef = `type:${this.get('sortDirection')}`;
        let attrDef = `${this.get('sortAttribute')}:${this.get('sortDirection')}`;
        return [typeDef, attrDef];
    }),
    sortedAndFilteredGalleryItems: computed.sort('filteredGalleryItems', 'sortDefinition'),

    actions: {
        sortGalleryItemsByAttribute(attribute) {
            this.set('sortAttribute', attribute);
        },
        flipSortDirection() {

        }
    }

});
