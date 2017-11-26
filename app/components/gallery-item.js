import Component from '@ember/component';
import { computed } from  '@ember/object';

export default Component.extend({

	tagName: 'figure',
	classNames: ['gallery-item'],
    classNameBindings: ['gallery-item.active:active'],
	attributeBindings: ['itemprop', 'itemtype', 'itemscope'],

	itemprop: 'associatedMedia',
	itemtype: 'http://schema.org/ImageObject',
	itemscope: '',

	isImage: computed('gallery-item', function() {
		let galleryItemType = this.get('gallery-item.type');
        return (galleryItemType == 'image') ? true : false;
    })

});
