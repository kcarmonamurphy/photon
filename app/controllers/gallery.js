import Controller from '@ember/controller';
import { computed } from  '@ember/object';
import { alias } from "@ember/object/computed"
import { inject as service } from '@ember/service';

export default Controller.extend({

    keypress: service(),
    store: service(),

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

    lastHighlightedObject: null,
    galleryItemsHighlighter: computed('sortedAndFilteredGalleryItems', function() {
        let array = this.get('sortedAndFilteredGalleryItems'),
            activeItem = array.findBy('active', true);

        let currentIndex = array.indexOf(activeItem),
            lastHighlightedIndex = array.indexOf(this.get('lastHighlightedObject')),
            galleryItem;

        if (lastHighlightedIndex != -1) {
            this.deActivateAllGalleryItems();
            this.getGalleryItemFromStore(array, lastHighlightedIndex).set('active', true);
        }
        else if (currentIndex == -1 && array.length) {
            this.deActivateAllGalleryItems();
            this.getGalleryItemFromStore(array, 0).set('active', true);
        }

        return array;
    }),

    zoomClass: computed('zoomLevel', function() {
        return `flex-${this.get('zoomLevel')}`;
    }),

    galleryItemsFinal: alias('galleryItemsHighlighter'),

    // currentIndex: computed('sortedAndFilteredGalleryItems', function() {
    //     let array = this.get('sortedAndFilteredGalleryItems');
    //     return array.indexOf(array.findBy('active', true));
    // }),

    getGalleryItemFromStore(array, index) {
        return this.get('store').peekRecord(
            'gallery-item', 
            array.objectAt(index).id
        );
    },

    deActivateAllGalleryItems() {
        this.get('model.gallery-items').forEach(function(galleryItem) {
            galleryItem.set('active', undefined);
        });
    },

    init() {
        let controller = this;
        let listener = new window.keypress.Listener();

        listener.simple_combo("shift _", function() {
            controller.send('demagnifyZoomLevel');
        });

        listener.simple_combo("shift +", function() {
            controller.send('magnifyZoomLevel');
        });

        listener.simple_combo("right", function() {
            controller.send('selectItemRight');
        });

        listener.simple_combo("left", function() {
            controller.send('selectItemLeft');
        });

        listener.simple_combo("down", function() {
            controller.send('selectItemDown');
        });

        listener.simple_combo("up", function() {
            controller.send('selectItemUp');
        });

        listener.simple_combo("enter", function() {
            console.log(controller.get('currentIndex'));
        });
    },

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
        },
        selectItemRight() {
            this.send('selectItem', "next", 1);
        },
        selectItemLeft() {
            this.send('selectItem', "prev", 1);
        },
        selectItemDown() {
            this.send('selectItem', "next", this.get('zoomLevel'));
        },
        selectItemUp() {
            this.send('selectItem', "prev", this.get('zoomLevel'));
        },
        galleryItemClick(galleryItem) {
            let array = this.get('galleryItemsHighlighter'),
                newIndex = array.indexOf(galleryItem);

            this.deActivateAllGalleryItems();

            galleryItem = this.getGalleryItemFromStore(array, newIndex);
            galleryItem.set('active', true);
            this.set('lastHighlightedObject', galleryItem);
        },
        galleryItemDoubleClick(galleryItem) {

        },
        selectItem(direction, number) {
            let array = this.get('galleryItemsHighlighter'),
                activeItem = array.findBy('active', true);

            let currentIndex = array.indexOf(activeItem),
                newIndex,
                galleryItem;

            let operator = (direction == 'next') ? '+' : '-';
            newIndex = eval(`${currentIndex} ${operator} ${number}`);

            if (array.objectAt(newIndex) != undefined) {
                this.getGalleryItemFromStore(array, currentIndex).set('active', undefined);

                galleryItem = this.getGalleryItemFromStore(array, newIndex);
                galleryItem.set('active', true);
                this.set('lastHighlightedObject', galleryItem);
            }
            
        }
    }

});
