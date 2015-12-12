import Ember from 'ember';

const { Mixin, inject, get } = Ember;

export default Mixin.create({
  socketManager: inject.service(),

  setup: function() {
    let socketManager = get(this, 'socketManager');

    socketManager.on('serverConnected', this.attrs.serverConnected);
    socketManager.on('serverDisconnected', this.attrs.serverDisconnected);
    socketManager.on('changeUser', this.attrs.changeUser);
    socketManager.on('changeView', this.attrs.changeView);
    socketManager.on('messageReceived', this.messageReceived.bind(this));
  }.on('didInsertElement'),

  teardown: function() {
    let socketManager = get(this, 'socketManager');

    socketManager.off('serverConnected');
    socketManager.off('serverDisconnected');
    socketManager.off('changeUser');
    socketManager.off('changeView');
    socketManager.off('messageReceived');
  }.on('willDestroyElement')
});
