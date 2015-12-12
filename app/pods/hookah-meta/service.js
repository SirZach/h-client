import Ember from 'ember';

const { Service, computed, get, set } = Ember;

export default Service.extend({
  users: ['pink', 'red', 'orange', 'green', 'blue'],

  visualizations: ['gauge', 'lightshow'],

  userIndex: 0,

  visualizationIndex: 0,

  changeUser(userIndex) {
    set(this, 'userIndex', userIndex);
  },

  changeVisualization() {
    this.incrementProperty('visualizationIndex');
  },

  currentUser: computed('users.[]', 'userIndex', function() {
    let users = get(this, 'users');
    let userIndex = get(this, 'userIndex');

    return users[userIndex % users.length];
  }),

  currentVisualization: computed('visualizations.[]', 'visualizationIndex', function() {
    let visualizations = get(this, 'visualizations');
    let visualizationIndex = get(this, 'visualizationIndex');

    return visualizations[visualizationIndex % visualizations.length];
  })
});
