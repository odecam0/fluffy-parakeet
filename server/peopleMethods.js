"use strict";
exports.__esModule = true;
var meteor_1 = require("meteor/meteor");
var check_1 = require("meteor/check");
var people_1 = require("../people/people");
meteor_1.Meteor.methods({
    'people.checkIn': function (personId) {
        (0, check_1.check)(personId, String);
        people_1.People.update({ _id: personId }, { $set: { checkInDate: new Date } });
    },
    'people.checkOut': function (personId) {
        (0, check_1.check)(personId, String);
        people_1.People.update({ _id: personId }, { $set: { checkOutDate: new Date } });
    }
});
