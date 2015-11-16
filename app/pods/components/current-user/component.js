import Ember from 'ember';

const { Component, inject, computed } = Ember;

export default Component.extend({
  hookahMeta: inject.service(),

  classNames: ['current-user'],

  classNameBindings: ['currentUser'],

  currentUser: computed.alias('hookahMeta.currentUser')
});
