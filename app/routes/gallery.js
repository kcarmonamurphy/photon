import Route from '@ember/routing/route';
import { computed } from '@ember/object';

export default Route.extend({

    queryParams: {
        search: {
          refreshModel: true,
          replace: true
        }
    },

    model(params) {
        return {
            'gallery-items': this.get('store').peekAll('gallery-item')
        }
    }
});