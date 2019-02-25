import DS from 'ember-data';
import Ember from 'ember';
import RSVP from 'rsvp';

const host = 'http://localhost:4567';
const namespace = 'api/v1';

export default DS.Adapter.extend({

    findAll(store, type, sinceToken) {
        return new RSVP.Promise((resolve, reject) => {
            fetch(`${host}/${namespace}/get`).then(
                // success
                (response) => {
                    resolve(response.json());
                },
                // failure
                (failure) => {
                    reject(failure)
                }
            );
        });
    },

});
