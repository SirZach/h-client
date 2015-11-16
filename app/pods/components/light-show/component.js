import Ember from 'ember';
import SocketOpener from 'hookah-client/mixins/socket-opener';
import SocketInterfaceComponent from 'hookah-client/mixins/socket-interface-component';

const { Component, inject, get, $ } = Ember;

export default Component.extend(SocketOpener, SocketInterfaceComponent, {
  messageReceived(data) {
    let pull = data.value;
    let bc = 'pink';

    if (pull >= 20 && pull < 40) {
      bc = 'red';
    } else if (pull >= 40 && pull < 60) {
      bc = 'orange';
    } else if (pull >= 60 && pull < 80) {
      bc = 'green';
    } else if (pull >= 80){
      bc = 'blue';
    }

    $('body').css('background-color', bc);
  }
});
