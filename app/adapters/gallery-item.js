import DS from 'ember-data';
import Ember from 'ember';

export default DS.Adapter.extend({

    findAll(store, type, sinceToken) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            resolve({ 'data': 'hello' });
        });
    },

});