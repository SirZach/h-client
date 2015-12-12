import Ember from 'ember';
import ENV from 'hookah-client/config/environment';

const { Mixin, get, inject } = Ember;

export default Mixin.create({
  socketService: inject.service('websockets'),

  setupSocket: function () {
    console.log('setting up component' + this.toString());
    this._super(...arguments);

    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    socket.on('open', this._onOpen, this);
    socket.on('message', this._messageReceived, this);
    socket.on('close', this._onClose, this);

  }.on('init').on('didInsertElement'),

  willDestroy() {
    this._super(...arguments);
    console.log('destroying component' + this.toString());

    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    socket.off('open', this._onOpen);
    socket.off('message', this._messageReceived);
    socket.off('close', this._onClose);

    get(this, 'socketService').closeSocketFor(ENV.websocketLocation);
  },

  _onOpen() {
    this.send('serverConnected');
  },

  _onClose() {
    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    this.send('serverDisconnected');
    Ember.run.later(this, function() {
      /*
      * This will remove the old socket and try and connect to a new one on the same url.
      * NOTE: that this does not need to be in a Ember.run.later this is just an example on
      * how to reconnect every second.
      */
      socket.reconnect();
    }, 1000);
  },

  _messageReceived(messageEvent) {
    let data = JSON.parse(messageEvent.data);

    if (data.action === 'changeUser') {
      this.send('changeUser', data.value);
      return false;
    }

    if (data.action === 'changeView') {
      this.send('changeView', data.value);
      return false;
    }

    this.messageReceived(data);
  }
});
