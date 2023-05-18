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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var react_scrollbar_1 = __importDefault(require("react-scrollbar"));
var EventBrowser = function () {
    // The useTracker is a meteor developed hook that makes possibleEvents be in
    // sync with what is stored in the Communities collection.
    var possibleEvents = (0, react_meteor_data_1.useTracker)(function () { return communities_1.Communities.find().fetch(); });
    // The selectedEvent state variable will hold what event is being selected
    // on the selector at the moment.
    var _a = (0, react_1.useState)(''), selectedEvent = _a[0], setSelectedEvent = _a[1];
    var getPeopleOnEventCursor = function (community) {
        // Get id of current event
        var event_id;
        var event_object = communities_1.Communities.find({ name: community }).fetch()[0];
        // Error would be thrown the first time this runs, for selectedEvent would
        // be set to "", and the return of the previous query would be an empty array
        if (event_object) {
            event_id = event_object._id;
        }
        // Get all people with a reference to that event
        return people_1.People.find({ communityId: event_id });
    };
    // Set useTracker hook with previous defined function as the callback
    var visiblePeople = (0, react_meteor_data_1.useTracker)(function () { return (getPeopleOnEventCursor(selectedEvent).fetch()); });
    // The handleChangeEvent function is responsible for fetching all the people
    // data associated to an event once an event is selected.
    var handleChangeEvent = function (value, action) {
        setSelectedEvent(value.value);
    };
    return (react_1["default"].createElement("div", { className: "p-6 h-full flex flex-col max-h-screen gap-4" },
        react_1["default"].createElement(react_select_1["default"], { defaultValue: { label: "Select an event", value: "Select an event" }, onChange: handleChangeEvent, options: 
            // In here, for each element in the possibleEvents array
            // we create a corresponding suitable object for the Select
            // component's options attribute.
            possibleEvents.map(function (ev) { return ({ value: ev.name, label: ev.name }); }) }),
        react_1["default"].createElement(react_scrollbar_1["default"], null,
            react_1["default"].createElement("div", { className: "flex flex-col grow p-2 gap-2" },
                react_1["default"].createElement("div", { className: "grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center" },
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
                // This ScrollArea component make a better looking scrollbar than a simple
                // overflow-y-scroll
                visiblePeople.map(function (person, index) { return (react_1["default"].createElement(PeopleLine, { key: index, person: person })); })))));
};
exports.EventBrowser = EventBrowser;
var formatDate = function (date) {
    return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
};
var PeopleLine = function (props) {
    var person = props.person;
    var checkIn = function () {
        people_1.People.update({ _id: person._id }, { $set: { checkInDate: Date() } }, {});
        waitFiveToCheckOut();
    };
    var checkOut = function () {
        people_1.People.update({ _id: person._id }, { $set: { checkOutDate: Date() } }, {});
    };
    // When checkin in, call an async function that waits 5 seconds before setting
    // canCheckOut to true
    var _a = (0, react_1.useState)(false), canCheckOut = _a[0], setCanCheckOut = _a[1];
    var waitFiveToCheckOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Wait for 5 seconds
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 5000); })];
                case 1:
                    // Wait for 5 seconds
                    _a.sent();
                    setCanCheckOut(true);
                    return [2 /*return*/];
            }
        });
    }); };
    // whatCheckInButton has the logic to choose what button to show, and wether to show a
    // button at all.
    var whatCheckInButton = function () {
        var checkWhat = "";
        var onClickCallBack;
        if (!person.checkInDate) {
            checkWhat = "Check in ";
            onClickCallBack = checkIn;
        }
        else if (canCheckOut && !person.checkOutDate) {
            checkWhat = "Check out ";
            onClickCallBack = checkOut;
        }
        else {
            return;
        }
        return (react_1["default"].createElement("button", { onClick: onClickCallBack }, checkWhat + person.firstName + " " + person.lastName));
    };
    return (react_1["default"].createElement("div", { key: props.key, className: "grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center" },
        react_1["default"].createElement("div", { className: "my-auto" }, person.firstName + ' ' + person.lastName),
        react_1["default"].createElement("div", { className: "my-auto" }, person.companyName ? person.companyName : ""),
        react_1["default"].createElement("div", { className: "my-auto" }, person.title ? person.title : ""),
        react_1["default"].createElement("div", { className: "my-auto" }, person.checkInDate ? formatDate(new Date(person.checkInDate)) : "N/A"),
        react_1["default"].createElement("div", { className: "my-auto" }, person.checkOutDate ? formatDate(new Date(person.checkOutDate)) : "N/A"),
        whatCheckInButton()));
};
