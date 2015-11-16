import Ember from 'ember';

const { Service, computed, get } = Ember;

export default Service.extend({
  users: ['pink', 'red', 'orange', 'green', 'blue'],

  userIndex: 0,

  changeUser() {
    this.incrementProperty('userIndex');
  },

  currentUser: computed('users.[]', 'userIndex', function() {
    let users = get(this, 'users');
    let userIndex = get(this, 'userIndex');

    return users[userIndex % users.length];
  })
});
