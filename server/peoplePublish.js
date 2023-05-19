"use strict";
exports.__esModule = true;
var meteor_1 = require("meteor/meteor");
var people_1 = require("../people/people");
meteor_1.Meteor.publish('people', function publishAllPeople() {
    return people_1.People.find({});
});
