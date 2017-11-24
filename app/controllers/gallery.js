import Controller from '@ember/controller';
import { computed } from  '@ember/object';
import { alias } from "@ember/object/computed"

export default Controller.extend({

    // query parameters
    queryParams: ['search', 'sortby', 'direction', 'zoom'],
    search: "",
    sortby: "name",
    direction: "asc",
    zoom: 4,

    sortableAttributes: ['name', 'size'],
    zoomLevelsArray: [1,2,3,4,5,6,8,10],

    filteredGalleryItems: computed.filter('model.gallery-items', function(item, index, array) {
        let searchInput = this.get('search');

        return item.get('name').indexOf(searchInput) > -1;
    }),

    sortAttribute: alias('sortby'),
    sortDirection: alias('direction'),
    zoomLevel: alias('zoom'),

    sortDefinition: computed('sortAttribute', 'sortDirection', function() {
        let typeDef = `type:${this.get('sortDirection')}`;
        let attrDef = `${this.get('sortAttribute')}:${this.get('sortDirection')}`;
        return [typeDef, attrDef];
    }),
    sortedAndFilteredGalleryItems: computed.sort('filteredGalleryItems', 'sortDefinition'),

    zoomClass: computed('zoomLevel', function() {
        return `flex-${this.get('zoomLevel')}`;
    }),

    actions: {
        sortGalleryItemsByAttribute(attribute) {
            this.set('sortAttribute', attribute);
        },
        flipSortDirection() {
            let sortDirection = this.get('sortDirection');
            this.set('sortDirection', sortDirection == 'asc' ? 'desc' : 'asc');
        },
        magnifyZoomLevel() {
            let zoomLevelsArray = this.get('zoomLevelsArray')
            let zoomIndex = zoomLevelsArray.indexOf(this.get('zoomLevel'));
            let nextZoomLevel = zoomLevelsArray.objectAt(zoomIndex-1);
            if (nextZoomLevel != undefined) {
                this.set('zoomLevel', nextZoomLevel);
            }
        },
        demagnifyZoomLevel() {
            let zoomLevelsArray = this.get('zoomLevelsArray')
            let zoomIndex = zoomLevelsArray.indexOf(this.get('zoomLevel'));
            let prevZoomLevel = zoomLevelsArray.objectAt(zoomIndex+1);
            if (prevZoomLevel != undefined) {
                this.set('zoomLevel', prevZoomLevel);
            }
        }

    }

});
