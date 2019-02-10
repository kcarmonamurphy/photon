import Route from '@ember/routing/route';

export default Route.extend({

    queryParams: {
        search: {
            refreshModel: true,
            replace: true
        },
        sortby: {
            refreshModel: true,
            replace: true
        },
        direction: {
            refreshModel: true,
            replace: true
        },
        zoom: {
            replace: true
        }
    },

    model() {
        return {
            'gallery-items': this.get('store').findAll('gallery-item')
        }
    }
});