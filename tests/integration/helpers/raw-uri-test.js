
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('raw-uri', 'helper:raw-uri', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{raw-uri inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

