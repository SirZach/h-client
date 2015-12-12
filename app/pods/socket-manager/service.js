import Ember from 'ember';
import ENV from 'hookah-client/config/environment';

const { Service, inject, Evented, get, set } = Ember;

export default Service.extend(Evented, {
  socketService: inject.service('websockets'),

  socket: null,

  setup(socket) {
    set(this, 'socket', socket);

    socket.on('open', this._onOpen, this);
    socket.on('message', this._messageReceived, this);
    socket.on('close', this._onClose, this);
  },

  _onOpen() {
    this.trigger('serverConnected');
  },

  _onClose() {
    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    this.trigger('serverDisconnected');
    Ember.run.later(this, function() {
      /*
      * This will remove the old socket and try and connect to a new one on the same url.
      * NOTE: that this does not need to be in a Ember.run.later this is just an example on
      * how to reconnect every second.
      */
      socket.reconnect();
    }, 2000);
  },

  _messageReceived(messageEvent) {
    let data = JSON.parse(messageEvent.data);

    if (data.action === 'changeUser') {
      this.trigger('changeUser', data.value);
      return false;
    }

    if (data.action === 'changeView') {
      this.trigger('changeView', data.value);
      return false;
    }

    this.trigger('messageReceived', data);
  }
});
