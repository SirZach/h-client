import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    changeUser(userIndex) {
      this.notifications.addNotification({
        message: 'Changed User',
        type: 'success',
        autoClear: true
      });
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
