import React, { useState, useEffect } from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import { Communities } from '../communities/communities';
import { People } from '../people/people';

import Select, { SelectOptionActionMeta } from 'react-select';

import ScrollArea from 'react-scrollbar';

// This interface defines what possible attributes a People object
// might have. It must have the first and last name, and might have
// a title and companyName.
interface PeopleInterface {
  firstName: string;
  lastName: string;
  title?: string;
  companyName?: string;
}

interface Event {
  name: string;
}

export const EventBrowser = () => {
  // The useTracker is a meteor developed hook that makes possibleEvents be in
  // sync with what is stored in the Communities collection.
  const possibleEvents : Event[] = useTracker(() => Communities.find().fetch());

  // The selectedEvent state variable will hold what event is being selected
  // on the selector at the moment.
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const getPeopleOnEventCursor = (community : string) => {
    // Get id of current event
    let event_id : string;
    const event_object = Communities.find({name: community}).fetch()[0];
    // Error would be thrown the first time this runs, for selectedEvent would
    // be set to "", and the return of the previous query would be an empty array
    if (event_object) {
      event_id = event_object._id;
    }
    // Get all people with a reference to that event
    return People.find({communityId: event_id});
  }

  // Set useTracker hook with previous defined function as the callback
  const visiblePeople: PeopleInterface[] = useTracker(() => (getPeopleOnEventCursor(selectedEvent).fetch()));

  // The handleChangeEvent function is responsible for fetching all the people
  // data associated to an event once an event is selected.
  const handleChangeEvent = ( value : {label: string, value:string},
                              action : SelectOptionActionMeta<{label: string, value:string}> ) => {
    setSelectedEvent(value.value);
  }

  return (
    <div className="p-6 h-full flex flex-col max-h-screen gap-4">
      <Select
        defaultValue={{ label: "Select an event", value: "Select an event" }}
        onChange={handleChangeEvent}
        options={
          // In here, for each element in the possibleEvents array
          // we create a corresponding suitable object for the Select
          // component's options attribute.
          possibleEvents.map((ev) => ({ value: ev.name, label: ev.name }))
        } />
      <ScrollArea>
        <div className="flex flex-col grow p-2 gap-2">
          <div className="grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center">
            <div className="my-auto"><b>Name</b></div>
            <div className="my-auto"><b>Company</b></div>
            <div className="my-auto"><b>Title</b></div>
            <div className="my-auto"><b>Check in</b></div>
            <div className="my-auto"><b>Check out</b></div>
          </div>
          {
            // This ScrollArea component make a better looking scrollbar than a simple
            // overflow-y-scroll
            visiblePeople.map(
              (person, index) => (
                <PeopleLine key={index} person={person}/>
              ))
          }
        </div>
      </ScrollArea>
    </div>
  );
}

interface PeopleLineProps {
  person: People;
  key: number;
}

const formatDate = (date : Date) => {
  return date.getMonth() + '/' + date.getDay() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
}

const PeopleLine = (props: PeopleLineProps) => {
  const person = props.person;

  const checkIn = () => {
    People.update({_id: person._id}, {$set:{checkInDate: Date()}}, {});
    waitFiveToCheckOut()
  }

  const checkOut = () => {
    People.update({_id: person._id}, {$set:{checkOutDate: Date()}}, {});
  }
  // When checkin in, call an async function that waits 5 seconds before setting
  // canCheckOut to true
  const [canCheckOut, setCanCheckOut] = useState<boolean>(false);

  const waitFiveToCheckOut = async () => {
    // Wait for 5 seconds
    await new Promise(r => setTimeout(r, 5000));
    setCanCheckOut(true);
  }

  // whatCheckInButton has the logic to choose what button to show, and wether to show a
  // button at all.
  const whatCheckInButton = () => {
    let checkWhat = ""
    let onClickCallBack;

    if (!person.checkInDate) {
      checkWhat = "Check in ";
      onClickCallBack = checkIn;
    } else if (canCheckOut && !person.checkOutDate) {
      checkWhat = "Check out ";
      onClickCallBack = checkOut;
    } else {
      return;
    }

    return (
      <button onClick={onClickCallBack}>
        {checkWhat + person.firstName + " " + person.lastName}
      </button>
    );
  }

  return(
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
