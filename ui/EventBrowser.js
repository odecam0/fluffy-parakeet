"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.EventBrowser = void 0;
var react_1 = __importStar(require("react"));
var react_meteor_data_1 = require("meteor/react-meteor-data");
var communities_1 = require("../communities/communities");
var people_1 = require("../people/people");
var react_select_1 = __importDefault(require("react-select"));
var EventBrowser = function () {
    // The useTracker is a meteor developed hook that makes possibleEvents be in
    // sync with what is stored in the Communities collection.
    var possibleEvents = (0, react_meteor_data_1.useTracker)(function () { return communities_1.Communities.find().fetch(); });
    // The selectedEvent state variable will hold what event is being selected
    // on the selector at the moment.
    var _a = (0, react_1.useState)(''), selectedEvent = _a[0], setSelectedEvent = _a[1];
    var queryPeopleFromSelectedEvent = function () {
        // Get id of current event
        var event_id;
        var event_object = communities_1.Communities.find({ name: selectedEvent }).fetch()[0];
        // Error would be thrown the first time this runs, for selectedEvent would
        // be set to "", and the return of the previous query would be an empty array
        if (event_object) {
            event_id = event_object._id;
        }
        // Get all people with a reference to that event
        return people_1.People.find({ communityId: event_id }).fetch();
    };
    // Set useTracker hook with previous defined function as the callback
    var visiblePeople = (0, react_meteor_data_1.useTracker)(function () { return (queryPeopleFromSelectedEvent()); });
    // The handleChangeEvent function is responsible for fetching all the people
    // data associated to an event once an event is selected.
    var handleChangeEvent = function (value, action) {
        setSelectedEvent(value.value);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_select_1["default"], { defaultValue: { label: "Select an event", value: "Select an event" }, onChange: handleChangeEvent, options: 
            // In here, for each element in the possibleEvents array
            // we create a corresponding suitable object for the Select
            // component's options attribute.
            possibleEvents.map(function (ev) { return ({ value: ev.name, label: ev.name }); }) }),
        react_1["default"].createElement("ul", null, 
        // Create a prototype list from the visiblePeople data
        visiblePeople.map(function (person, index) { return (react_1["default"].createElement("li", { key: index }, person.firstName + ' ' + person.lastName)); }))));
};
exports.EventBrowser = EventBrowser;
