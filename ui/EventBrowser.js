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
var react_select_1 = __importDefault(require("react-select"));
var EventBrowser = function () {
    // The useTracker is a meteor developed hook that makes possibleEvents be in
    // sync with what is stored in the Communities collection.
    var possibleEvents = (0, react_meteor_data_1.useTracker)(function () { return communities_1.Communities.find().fetch(); });
    // The selectedEvent state variable will hold what event is being selected
    // on the selector at the moment.
    var _a = (0, react_1.useState)(''), selectedEvent = _a[0], setSelectedEvent = _a[1];
    // The visiblePeople state variable will have an array with all the People
    // objects of people that are registered to a given event. The value of
    // this variable is linked to the value of selectedEvent by the logic
    // implemented in handleChangeEvent
    var _b = (0, react_1.useState)([]), visiblePeople = _b[0], setVisiblePeople = _b[1];
    // The handleChangeEvent function is responsible for fetching all the people
    // data associated to an event once an event is selected.
    var handleChangeEvent = function (e) {
        // ! TODO !
        // Need to implement the request for the apropriate people.
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_select_1["default"], { defaultValue: { label: "Select an event", value: "Select an event" }, options: 
            // In here, for each element in the possibleEvents array
            // we create a corresponding suitable object for the Select
            // component's options attribute.
            possibleEvents.map(function (ev) { return ({ value: ev.name, label: ev.name }); }) })));
};
exports.EventBrowser = EventBrowser;
