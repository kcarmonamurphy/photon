import DS from 'ember-data';

export default DS.Model.extend({
    'resource_name': DS.attr('string'),
    'type': DS.attr('string'),
    'uri': DS.attr('string'),
    'parent_uri': DS.attr('string'),

    'title': DS.attr('string'),
    'name': DS.attr('string'),
    'last_modified': DS.attr('string'),
    'description': DS.attr('string'),
    'size': DS.attr('string'),
    'thumbnail_uri': DS.attr('string'),
    'full_image_uri': DS.attr('string')
});