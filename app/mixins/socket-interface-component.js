import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  actions: {
    serverConnected() {
      this.attrs.serverConnected();
    },

    serverDisconnected() {
      this.attrs.serverDisconnected();
    },

    changeUser() {
      this.attrs.changeUser();
    }
  }
});
