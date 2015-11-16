import Ember from 'ember';
import ENV from 'hookah-client/config/environment';

const { Mixin, get, inject } = Ember;

export default Mixin.create({
  socketService: inject.service('websockets'),

  setupSocket: function () {
    this._super(...arguments);

    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    socket.on('open', function() {
      this.send('serverConnected');
    }, this);

    socket.on('message', this._messageReceived, this);

    socket.on('close', function() {
      this.send('serverDisconnected');
      Ember.run.later(this, function() {
        /*
        * This will remove the old socket and try and connect to a new one on the same url.
        * NOTE: that this does not need to be in a Ember.run.later this is just an example on
        * how to reconnect every second.
        */
        socket.reconnect();
      }, 1000);
    }, this);
  }.on('init'),

  _messageReceived(messageEvent) {
    let data = JSON.parse(messageEvent.data);

    if (data.action === 'changeUser') {
      this.send('changeUser', data.value);
      return false;
    }

    this.messageReceived(data);
  }
});
