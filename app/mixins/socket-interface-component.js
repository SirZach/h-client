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
    console.log('unsubscribing');
    let socketManager = get(this, 'socketManager');

    socketManager.off('serverConnected', this, this.attrs.serverConnected);
    socketManager.off('serverDisconnected', this, this.attrs.serverDisconnected);
    socketManager.off('changeUser', this, this.attrs.changeUser);
    socketManager.off('changeView', this, this.attrs.changeView);
    socketManager.off('messageReceived', this, this.messageReceived);
  }.on('willDestroyElement')
});
