import { module, test } from 'qunit';
import validateUserSignup from 'ember-test-driven/validators/user-signup';

module('Unit | Validator | user-signup');

test('it validates email format', function(assert) {
  assert.equal(validateUserSignup.email('email', 'invalid'),
    'Email must be a valid email address');
  assert.ok(validateUserSignup.email('email', 'test@test.com'));
});

test('it validates password length', function(assert) {
  assert.equal(validateUserSignup.password('password', 'invalid'),
    'Password is too short (minimum is 8 characters)');
  assert.ok(validateUserSignup.password('password', 'password123'));
});

test('it validates password confirmation', function(assert) {
  assert.equal(validateUserSignup.passwordConfirmation('passwordConfirmation',
    'invalid', '', { password: 'password123'}),
    'Password confirmation doesn\'t match password');
  assert.ok(validateUserSignup.passwordConfirmation('passwordConfirmation',
    'passowrd123', '', { password: 'password123'}),
  );
});
