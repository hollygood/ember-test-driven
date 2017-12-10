import { test } from 'qunit';
import moduleForAcceptance from 'ember-test-driven/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sign in sign up');

test('visiting /sign-in-sign-up', function(assert) {
  visit('/sign-in-sign-up');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in-sign-up');
  });
});
