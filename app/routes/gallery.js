import Route from '@ember/routing/route';

export default Route.extend({

    queryParams: {
        search: {
          refreshModel: true,
          replace: true
        }
    },

    model() {
        return {
            'gallery-items': this.get('store').peekAll('gallery-item')
        }
    }
});