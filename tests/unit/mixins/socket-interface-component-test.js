import Ember from 'ember';
import SocketInterfaceComponentMixin from '../../../mixins/socket-interface-component';
import { module, test } from 'qunit';

module('Unit | Mixin | socket interface component');

// Replace this with your real tests.
test('it works', function(assert) {
  let SocketInterfaceComponentObject = Ember.Object.extend(SocketInterfaceComponentMixin);
  let subject = SocketInterfaceComponentObject.create();
  assert.ok(subject);
});
