import Ember from 'ember';
import SocketInterfaceComponent from 'hookah-client/mixins/socket-interface-component';

const { Component, inject, get, $ } = Ember;

export default Component.extend(SocketInterfaceComponent, {
  hookahMeta: inject.service(),

  messageReceived(data) {
    let pull = data.value;
    let hookahMeta = get(this, 'hookahMeta');

    $('body').css('background-color', hookahMeta.pullColor(pull));
  },

  revert: function() {
    $('body').css('background-color', '#fff');
  }.on('willDestroyElement')
});
