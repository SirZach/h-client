import Ember from 'ember';

const { Controller, inject, run } = Ember;

export default Controller.extend({
  socketService: inject.service('websockets'),

  setupSocket: function () {
    this._super(...arguments);

    //192.168.1.8
    let socket = this.get('socketService').socketFor('ws://192.168.1.3:8888');

    socket.on('open', function(event) {

      console.log('This will be called');
    }, this);

    socket.on('close', function(event) {
      console.log('socket closed');
      console.log(event);
    }, this);
  }.on('init')
});
