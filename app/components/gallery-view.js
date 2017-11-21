import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({

    classNames: ['gallery-view', 'grey', 'darken-4'],

    websockets: service(),
    store: service(),

    socketRef: null,

    didInsertElement() {
        this._super(...arguments);

        const socket = this.get('websockets').socketFor('ws://localhost:4567/gallery/');

        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.myMessageHandler, this);
        socket.on('close', this.myCloseHandler, this);

        this.set('socketRef', socket);
    },

    willDestroyElement() {
        this._super(...arguments);

        const socket = this.get('socketRef');

        socket.off('open', this.myOpenHandler);
        socket.off('message', this.myMessageHandler);
        socket.off('close', this.myCloseHandler);
    },

    myOpenHandler(event) {
        const socket = this.get('socketRef');

        socket.send('parse_path');
    },

    myMessageHandler(event) {
        
        let { name, description, type, size, uri } = JSON.parse(event.data);

        console.log(name);

        this.get('store').push({
            data: [{
                id: name,
                type: 'gallery-item',
                attributes: {
                    name: name,
                    description: description,
                    type: type,
                    size: size,
                    uri: uri,
                },
                relationships: {}
            }]
        });
    },

    myCloseHandler(event) {
        console.log(`On close event has been called: ${event}`);
    }

});
