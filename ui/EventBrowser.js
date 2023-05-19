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
// Imported react components
var react_select_1 = __importDefault(require("react-select"));
var react_scrollbar_1 = __importDefault(require("react-scrollbar"));
// Database objects
var communities_1 = require("../communities/communities");
var people_1 = require("../people/people");
// Developed components
var PeopleLine_1 = require("./PeopleLine");
var PeopleSummary_1 = require("./PeopleSummary");
// This component will render the selector, and use other 2 components to render
// the summary and each line of the list o people.
var EventBrowser = function () {
    // The useTracker is a meteor developed hook that makes possibleEvents be in
    // sync with what is stored in the Communities collection.
    var possibleEvents = (0, react_meteor_data_1.useTracker)(function () {
        Meteor.subscribe('communities');
        return communities_1.Communities.find().fetch();
    });
    // The selectedEvent state variable will hold what event is being selected
    // on the selector at the moment.
    var _a = (0, react_1.useState)(''), selectedEvent = _a[0], setSelectedEvent = _a[1];
    // Linking visiblePeople with selectedEvent using useTracker hook
    // This way, visiblePeople will be update every time selectedEvent change
    var visiblePeople = (0, react_meteor_data_1.useTracker)(function () {
        Meteor.subscribe('communities');
        Meteor.subscribe('people');
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
    });
    // The handleChangeEvent function is responsible for setting the selectedEvent, wich
    // upon change, will have the effect of updating the visiblePeople variable, since it
    // is using a tracker witch a callback that depends on this value.
    var handleChangeEvent = function (value, action) {
        setSelectedEvent(value.value);
    };
    return (react_1["default"].createElement("div", { className: "p-6 h-full flex flex-col max-h-screen gap-2" },
        react_1["default"].createElement(react_select_1["default"], { defaultValue: { label: "Select an event", value: "Select an event" }, onChange: handleChangeEvent, options: 
            // In here, for each element in the possibleEvents array
            // we create a corresponding suitable object for the Select
            // component's options attribute.
            possibleEvents.map(function (ev) { return ({ value: ev.name, label: ev.name }); }) }),
        selectedEvent != '' ? react_1["default"].createElement(PeopleSummary_1.PeopleSummary, { selectedEvent: selectedEvent, visiblePeople: visiblePeople }) : null,
        react_1["default"].createElement("div", { className: "grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center m-2" },
            react_1["default"].createElement("div", { className: "my-auto" },
                react_1["default"].createElement("b", null, "Name")),
            react_1["default"].createElement("div", { className: "my-auto" },
                react_1["default"].createElement("b", null, "Company")),
            react_1["default"].createElement("div", { className: "my-auto" },
                react_1["default"].createElement("b", null, "Title")),
            react_1["default"].createElement("div", { className: "my-auto" },
                react_1["default"].createElement("b", null, "Check in")),
            react_1["default"].createElement("div", { className: "my-auto" },
                react_1["default"].createElement("b", null, "Check out"))),
        react_1["default"].createElement(react_scrollbar_1["default"], null,
            react_1["default"].createElement("div", { className: "flex flex-col grow p-2 gap-2" }, 
            // This ScrollArea component make a better looking scrollbar than a simple
            // overflow-y-scroll
            // A set of PeopleLine components is created from the visiblePeople array.
            visiblePeople.map(function (person, index) { return (react_1["default"].createElement(PeopleLine_1.PeopleLine, { key: index, person: person })); })))));
};
exports.EventBrowser = EventBrowser;
