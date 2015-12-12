import Ember from 'ember';

const { Service, computed, get, set } = Ember;

export default Service.extend({
  users: ['pink', 'red', 'orange', 'green', 'blue'],

  pinks: [
    '#FCE4EC',
    '#F8BBD0',
    '#F48FB1',
    '#F06292',
    '#EC407A',
    '#E91E63',
    '#D81B60',
    '#C2185B',
    '#AD1457',
    '#880E4F'
  ],

  reds: [
    '#FFEBEE',
    '#FFCDD2',
    '#EF9A9A',
    '#E57373',
    '#EF5350',
    '#F44336',
    '#E53935',
    '#D32F2F',
    '#C62828',
    '#B71C1C'
  ],

  oranges: [
    '#FFF3E0',
    '#FFE0B2',
    '#FFCC80',
    '#FFB74D',
    '#FFA726',
    '#FF9800',
    '#FB8C00',
    '#F57C00',
    '#EF6C00',
    '#E65100'
  ],

  greens: [
    '#E8F5E9',
    '#C8E6C9',
    '#A5D6A7',
    '#81C784',
    '#66BB6A',
    '#4CAF50',
    '#43A047',
    '#388E3C',
    '#2E7D32',
    '#1B5E20'
  ],

  blues: [
    '#E3F2FD',
    '#BBDEFB',
    '#90CAF9',
    '#64B5F6',
    '#42A5F5',
    '#2196F3',
    '#1E88E5',
    '#1976D2',
    '#1565C0',
    '#0D47A1'
  ],

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
  }),

  pullColor(pull) {
    let currentUser = get(this, 'currentUser');
    let colors = get(this, `${currentUser}s`);

    return pull ? colors[Math.floor(pull / 10)] : '#fff';
  }
});
