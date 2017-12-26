/*global server*/
import { test } from 'qunit';
import Ember from 'ember';
import moduleForAcceptance from 'ember-test-driven/tests/helpers/module-for-acceptance';

const { $ } = Ember;

moduleForAcceptance('Acceptance | sign in sign up');

test('user can successfully sign up', function(assert) {
  assert.expect(1);

  server.post('/users', function(schema) {
    const attributes = this.normalizedRequestAttrs();

    const expectedAttributes = {
      email: 'example@email.com',
      password: 'password123',
      passwordConfirmation: 'password123'
    };

    assert.deepEqual(attributes, expectedAttributes,
      'attributes don\'t match the expected ones');

    return schema.users.create(attributes);
  });

  visit('/');

  andThen(() => {
    click($('#signup-link'));
  });

  andThen(() => {
    fillIn($('#signup-email'), 'example@email.com');
    fillIn($('#signup-password'), 'password123');
    fillIn($('#signup-passwordConfirmation'), 'password123');

    click($('#signup-submit-btn'));
  });
});

test('user cannot signup if there is an error', function(assert) {
  assert.expect(1);

  server.post('/users', () => {
    assert.notOk(true, 'request should not be performed');
  });

  visit('/');

  andThen(() => {
    click($('#signup-link'));
  });

  andThen(() => {
    fillIn($('#signup-email'), 'example@email.com');
    fillIn($('#signup-password'), 'password123');

    click($('#signup-submit-btn'));
  });

  andThen(() => {
    assert.ok(find('signup-errors').length, 'errors should be displayed');
  });
});
