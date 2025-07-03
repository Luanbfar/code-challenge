import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities';
import { People } from '../people/people';

Meteor.publish('communities', function () {
  return Communities.find();
});

Meteor.publish('people', function () {
  return People.find();
});
