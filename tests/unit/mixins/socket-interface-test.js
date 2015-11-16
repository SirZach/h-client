import Ember from 'ember';
import SocketInterfaceMixin from '../../../mixins/socket-interface';
import { module, test } from 'qunit';

module('Unit | Mixin | socket interface');

// Replace this with your real tests.
test('it works', function(assert) {
  let SocketInterfaceObject = Ember.Object.extend(SocketInterfaceMixin);
  let subject = SocketInterfaceObject.create();
  assert.ok(subject);
});
