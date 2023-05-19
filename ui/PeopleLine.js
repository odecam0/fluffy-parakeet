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
exports.__esModule = true;
exports.PeopleLine = void 0;
var react_1 = __importStar(require("react"));
// formatDate will return a string with the date formated as MM/DD/YYYY, HH:mm
var formatDate = function (date) {
    return String(date.getMonth()).padStart(2, '0') + '/' +
        String(date.getDay()).padStart(2, '0') + '/' +
        String(date.getFullYear()).padStart(2, '0') + ', ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0');
};
// This component is responsible for rendering a single line from the list of people
// registered to a given event
var PeopleLine = function (props) {
    var person = props.person;
    // When checkin in, call an async function that waits 5 seconds before setting
    // canCheckOut to true
    var _a = (0, react_1.useState)(false), canCheckOut = _a[0], setCanCheckOut = _a[1];
    // Checking if anyone can check-out one time when rendering the component, because
    // if someone check in and change rerender the page, the canCheckOut would go back
    // to false, and we would not be able to checkthe person out
    (0, react_1.useEffect)(function () {
        if (person.checkInDate && !person.checkOutDate) {
            var date_now = new Date;
            if (date_now.getTime() - person.checkInDate.getTime() > 5000) {
                setCanCheckOut(true);
            }
        }
    });
    // This function implements the waiting of 5 seconds before one can checkout
    // a person after checking in
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
    // functions to be called when clicking the check-in and check-out buttom
    var checkIn = function () {
        Meteor.call('people.checkIn', person._id);
        // Here the 5 seconds waiting is called
        waitFiveToCheckOut();
    };
    var checkOut = function () {
        Meteor.call('people.checkOut', person._id);
    };
    // whatCheckInButton has the logic to choose what button to show, and wether to show a
    // button at all.
    var whatCheckInButton = function () {
        var checkWhat = "";
        var onClickCallBack;
        if (!person.checkInDate) {
            // If person has not been checked in, a check-in button should be shown
            checkWhat = "Check in ";
            onClickCallBack = checkIn;
        }
        else if (canCheckOut && !person.checkOutDate) {
            // if the 5 seconds after checking in has passed, and the person has not been
            // checked out, the check-out button should be shown
            checkWhat = "Check out ";
            onClickCallBack = checkOut;
        }
        else {
            // if person has already been checked in and out, nothing should be shown
            return;
        }
        return (react_1["default"].createElement("button", { onClick: onClickCallBack, className: "border-solid border-2 rounded-lg bg-slate-200 hover:bg-inherit" }, checkWhat + person.firstName + " " + person.lastName));
    };
    return (
    // Each line is a grid with 6 position, one for each field to be shown
    // for each field tha is optional, an inline conditiona (<boolean_expression> ? <true> : <false>)
    // is used
    react_1["default"].createElement("div", { key: props.key, className: "grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center" },
        react_1["default"].createElement("div", { className: "my-auto" }, person.firstName + ' ' + person.lastName),
        react_1["default"].createElement("div", { className: "my-auto" }, person.companyName ? person.companyName : ""),
        react_1["default"].createElement("div", { className: "my-auto" }, person.title ? person.title : ""),
        react_1["default"].createElement("div", { className: "my-auto" }, person.checkInDate ? formatDate(new Date(person.checkInDate)) : "N/A"),
        react_1["default"].createElement("div", { className: "my-auto" }, person.checkOutDate ? formatDate(new Date(person.checkOutDate)) : "N/A"),
        whatCheckInButton()));
};
exports.PeopleLine = PeopleLine;
