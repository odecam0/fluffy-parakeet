import React, { useState } from 'react';

import { PeopleInterface, Event } from './CollectionTypes';

// formatDate will return a string with the date formated as MM/DD/YYYY, HH:mm
const formatDate = (date: Date) => {
    return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
}

// Defining what possible props Peopleline can receive
interface PeopleLineProps {
    // person brings all the data to be used in the component line
    person: PeopleInterface;
    // key sets a key argument to de list of divs rendered, so React can
    // perform better
    key: number;
}

// This component is responsible for rendering a single line from the list of people
// registered to a given event
export const PeopleLine = (props: PeopleLineProps) => {
    const person = props.person;

    // When checkin in, call an async function that waits 5 seconds before setting
    // canCheckOut to true
    const [canCheckOut, setCanCheckOut] = useState<boolean>(false);

    // This function implements the waiting of 5 seconds before one can checkout
    // a person after checking in
    const waitFiveToCheckOut = async () => {
        // Wait for 5 seconds
        await new Promise(r => setTimeout(r, 5000));
        setCanCheckOut(true);
    }

    // functions to be called when clicking the check-in and check-out buttom
    const checkIn = () => {
        Meteor.call('people.checkIn', person._id)
        // Here the 5 seconds waiting is called
        waitFiveToCheckOut()
    }
    const checkOut = () => {
        Meteor.call('people.checkOut', person._id)
    }

    // whatCheckInButton has the logic to choose what button to show, and wether to show a
    // button at all.
    const whatCheckInButton = () => {
        let checkWhat = ""
        let onClickCallBack;

        if (!person.checkInDate) {
            // If person has not been checked in, a check-in button should be shown
            checkWhat = "Check in ";
            onClickCallBack = checkIn;
        } else if (canCheckOut && !person.checkOutDate) {
            // if the 5 seconds after checking in has passed, and the person has not been
            // checked out, the check-out button should be shown
            checkWhat = "Check out ";
            onClickCallBack = checkOut;
        } else {
            // if person has already been checked in and out, nothing should be shown
            return;
        }

        return (
            <button onClick={onClickCallBack} className="border-solid border-2 rounded-lg bg-slate-200 hover:bg-inherit">
                {checkWhat + person.firstName + " " + person.lastName}
            </button>
        );
    }

    return (
        // Each line is a grid with 6 position, one for each field to be shown
        // for each field tha is optional, an inline conditiona (<boolean_expression> ? <true> : <false>)
        // is used
        <div key={props.key} className="grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center">
            <div className="my-auto">{person.firstName + ' ' + person.lastName}</div>
            <div className="my-auto">{person.companyName ? person.companyName : ""}</div>
            <div className="my-auto">{person.title ? person.title : ""}</div>
            <div className="my-auto">{person.checkInDate ? formatDate(new Date(person.checkInDate)) : "N/A"}</div>
            <div className="my-auto">{person.checkOutDate ? formatDate(new Date(person.checkOutDate)) : "N/A"}</div>
            {whatCheckInButton()}
        </div>
    );
}
