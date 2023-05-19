import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '../people/people';

Meteor.methods({
    'people.checkIn'( personId : string ) {
        check(personId, String);
        People.update( {_id: personId }, { $set : { checkInDate : new Date } } );
    },

    'people.checkOut'( personId : string ) {
        check(personId, String);
        People.update( {_id: personId }, { $set : { checkOutDate : new Date } } );
    },
});
