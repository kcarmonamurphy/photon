import DS from 'ember-data';
import Ember from 'ember';
import RSVP from 'rsvp';

export default DS.Adapter.extend({

    "namespace": 'api/v1/get',
    "host": 'localhost:4567',

    findAll(store, type, sinceToken) {
        return new RSVP.Promise((resolve, reject) => {
            return fetch('http://localhost:4567/api/v1/get').then((response) => {
                resolve(response.json());
            }).catch((failure) => {
                reject(failure);
            });
        });
    },

});
