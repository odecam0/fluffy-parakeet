"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.PeopleSummary = void 0;
var react_1 = __importDefault(require("react"));
// This component is responsible for rendering the summary between the selector and
// the list of people in the given Event.
var PeopleSummary = function (props) {
    // This component is implemented as 3 functions that return what will be shown
    // on the 3 lines of the summary, they all depend on the visiblePeople prop that
    // is passed, and will all be rendered every time that visiblePeople is updated
    var peopleOnEventRightNow = function (visiblePeople) { return (visiblePeople.filter(function (item) { return (item.checkInDate && !item.checkOutDate); }).length); };
    var peopleNotCheckedIn = function (visiblePeople) { return (visiblePeople.filter(function (item) { return !item.checkInDate; }).length); };
    var peopleByCompany = function (visiblePeople) {
        // Here we filter the visiblePeople array for the items that have a companyName set
        // and are checked-in right now.
        // Then we create an object like this:
        // { <company_name>: <number_of_people_from_that_company_checked_in>, ... }
        // using reduce.
        var groupedData = visiblePeople.filter(function (item) { return (item.companyName &&
            item.checkInDate &&
            !item.checkOutDate); }).
            reduce(function (acc, item) {
            if (item.companyName in acc) {
                acc[item.companyName] = acc[item.companyName] + 1;
            }
            else {
                acc[item.companyName] = 1;
            }
            return acc;
        }, {});
        // Then we create a string from the object created.
        var result = "";
        for (var item in groupedData) {
            result += item + '(' + groupedData[item] + '), ';
        }
        // And return the string without the last 2 characters, wich would be ' ,'
        return result.slice(0, -2);
    };
    return (react_1["default"].createElement("div", { className: "px-2 text-slate-700 bg-slate-100 rounded-md border-solid border-slate-400 border-2" },
        "People in the event right now: " + peopleOnEventRightNow(props.visiblePeople),
        " ",
        react_1["default"].createElement("br", null),
        "People by company in the event right now: " + peopleByCompany(props.visiblePeople),
        " ",
        react_1["default"].createElement("br", null),
        "People not checked in: " + peopleNotCheckedIn(props.visiblePeople),
        " ",
        react_1["default"].createElement("br", null)));
};
exports.PeopleSummary = PeopleSummary;
