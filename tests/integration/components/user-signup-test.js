import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { $, set } = Ember;

moduleForComponent('user-signup', 'Integration | Component | user signup', {
  integration: true
});

test('it invokes passed `registerUser` action when clicking signup button', function(assert) {
  assert.expect(1);

  const user = Ember.Object.create();
  const registerUser = (userArgument) => {
    // a change to make it changeset-aware: userArgument => userArgument._content
    assert.deepEqual(userArgument._content, user,
      'action should be invoked with proper user argument');
  };

  set(this, 'user', user);
  set(this, 'registerUser', registerUser);

  this.render(hbs`{{user-signup user=user registerUser=registerUser}}`);

  $('#signup-submit-btn').click();
});

test('it does not passed `registerUser` action when there is an validation error and displays error messages', function(assert) {
  assert.expect(1);

  const user = Ember.Object.create();
  const registerUser = () => {
    assert.notOk(true, 'action should not be called');
  };

  set(this, 'user', user);
  set(this, 'registerUser', registerUser);

  this.render(hbs`{{user-signup user=user registerUser=registerUser}}`);

  $('#signup-submit-btn').click();

  assert.ok(find('.signup-errors').length, 'errors should be displayed');
});
