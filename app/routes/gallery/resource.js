import Route from '@ember/routing/route';

export default Route.extend({

    model({ relative_path }) {
        console.log(relative_path)
        console.log(this.get('store').peekRecord('gallery-item', relative_path));
        return this.get('store').peekRecord('gallery-item', relative_path);
    }

});
