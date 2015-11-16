import Ember from 'ember';
import SocketOpenerMixin from '../../../mixins/socket-opener';
import { module, test } from 'qunit';

module('Unit | Mixin | socket opener');

// Replace this with your real tests.
test('it works', function(assert) {
  let SocketOpenerObject = Ember.Object.extend(SocketOpenerMixin);
  let subject = SocketOpenerObject.create();
  assert.ok(subject);
});
