import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  actions: {
    changeUser(userIndex) {
      this.notifications.addNotification({
        message: 'Changed User',
        type: 'success',
        autoClear: true
      });
    },

    changeVisual() {
      
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
