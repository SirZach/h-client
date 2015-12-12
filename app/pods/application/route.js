import Ember from 'ember';
import ENV from 'hookah-client/config/environment';

const { Route, inject, get } = Ember;

export default Route.extend({
  socketService: inject.service('websockets'),
  socketManager: inject.service('socket-manager'),

  afterModel() {
    let socket = get(this, 'socketService').socketFor(ENV.websocketLocation);

    get(this, 'socketManager').setup(socket);

    this.transitionTo('gauge');
  }
})
