
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('thumbnail-uri', 'helper:thumbnail-uri', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{thumbnail-uri inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

