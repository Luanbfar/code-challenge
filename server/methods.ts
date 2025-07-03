import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '../people/people';

Meteor.methods({
  async 'people.checkIn'(personId, communityId) {
    check(personId, String);
    check(communityId, String);

    const person = await People.findOneAsync(personId);
    if (!person) {
      throw new Meteor.Error('person-not-found', 'Person not found');
    }

    if (person.checkInTime) {
      throw new Meteor.Error(
        'already-checked-in',
        'Person is already checked in'
      );
    }

    const result = await People.updateAsync(personId, {
      $set: {
        checkInTime: new Date(),
        checkOutTime: null,
        communityId,
      },
    });

    if (!result) {
      throw new Meteor.Error('check-in-failed', 'Failed to check in person');
    }

    return { success: true };
  },

  async 'people.checkOut'(personId) {
    check(personId, String);

    const person = await People.findOneAsync(personId);
    if (!person) {
      throw new Meteor.Error('person-not-found', 'Person not found');
    }

    if (!person.checkInTime) {
      throw new Meteor.Error('not-checked-in', 'Person is not checked in');
    }

    if (person.checkOutTime) {
      throw new Meteor.Error(
        'already-checked-out',
        'Person is already checked out'
      );
    }

    const result = await People.updateAsync(personId, {
      $set: {
        checkOutTime: new Date(),
      },
    });

    if (!result) {
      throw new Meteor.Error('check-out-failed', 'Failed to check out person');
    }

    return { success: true };
  },
});
