import Component from '@ember/component';

export default Component.extend({

	tagName: 'figure',
	classNames: ['gallery-item'],
	attributeBindings: ['itemprop', 'itemtype', 'itemscope'],

	itemprop: 'associatedMedia',
	itemtype: 'http://schema.org/ImageObject',
	itemscope: '',

	isImage: Ember.computed('gallery-item', function() {
		let galleryItemType = this.get('gallery-item.type');
        return (galleryItemType == 'image') ? true : false;
    }),

    didInsertElement() {
        this._super(...arguments);
    },

});
