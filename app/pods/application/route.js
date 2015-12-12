import Ember from 'ember';
import ENV from 'hookah-client/config/environment';

const { Route, inject, get } = Ember;

export default Route.extend({
  socketService: inject.service('websockets'),
  socketManager: inject.service('socket-manager'),
  hookahMeta: inject.service(),

  afterModel() {
    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    get(this, 'socketManager').setup(socket);

    this.transitionTo('gauge');
  },

  actions: {
    changeUser(userIndex) {
      this.notifications.addNotification({
        message: 'Changed User',
        type: 'success',
        autoClear: true
      });

      get(this, 'hookahMeta').changeUser(userIndex);
    },

    changeView() {
      let hookahMeta = get(this, 'hookahMeta');
      hookahMeta.changeVisualization();

      this.transitionTo(get(hookahMeta, 'currentVisualization'));
    },

    hookahConnected() {
      this.notifications.addNotification({
        message: 'Hookah connected',
        type: 'success',
        autoClear: true
      });
    },

    serverConnected() {
      this.notifications.addNotification({
        message: 'Server connected',
        type: 'success',
        autoClear: true
      });
    },

    serverDisconnected() {
      this.notifications.addNotification({
        message: 'Server disconnected',
        type: 'error',
        autoClear: true
      });
    }
  }
});
