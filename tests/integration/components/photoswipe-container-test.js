import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('photoswipe-container', 'Integration | Component | photoswipe container', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{photoswipe-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#photoswipe-container}}
      template block text
    {{/photoswipe-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
