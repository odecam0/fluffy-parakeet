"use strict";
exports.__esModule = true;
var meteor_1 = require("meteor/meteor");
var communities_1 = require("../communities/communities");
meteor_1.Meteor.publish('communities', function publishAllCommunities() {
    return communities_1.Communities.find({});
});
