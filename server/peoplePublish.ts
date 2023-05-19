import { Meteor } from 'meteor/meteor';
import { People } from '../people/people';

Meteor.publish('people', function publishAllPeople() {
    return People.find({});
})
