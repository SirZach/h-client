import Ember from 'ember';

const { Mixin, inject, get, run } = Ember;

export default Mixin.create({
  hookahMeta: inject.service(),

  actions: {
    changeUser(userIndex) {
      this.notifications.addNotification({
        message: 'Changed User',
        type: 'success',
        autoClear: true
      });

      get(this, 'hookahMeta').changeUser();
    },

    changeView() {
      let hookahMeta = get(this, 'hookahMeta');
      hookahMeta.changeVisualization();

      run.schedule(this, function() {
        this.transitionToRoute(get(hookahMeta, 'currentVisualization'));
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
