import React, { useState, useEffect } from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import { Communities } from '../communities/communities';
import { People } from '../people/people';

import Select, { SelectOptionActionMeta } from 'react-select';

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

  const queryPeopleFromSelectedEvent = () => {
    // Get id of current event
    let event_id;
    const event_object = Communities.find({name: selectedEvent}).fetch()[0];
    // Error would be thrown the first time this runs, for selectedEvent would
    // be set to "", and the return of the previous query would be an empty array
    if (event_object) {
      event_id = event_object._id;
    }
    // Get all people with a reference to that event
    return People.find({communityId: event_id}).fetch();
  }

  // Set useTracker hook with previous defined function as the callback
  const visiblePeople: PeopleInterface[] = useTracker(() => (queryPeopleFromSelectedEvent()));

  // The handleChangeEvent function is responsible for fetching all the people
  // data associated to an event once an event is selected.
  const handleChangeEvent = ( value : {label: string, value:string}, action : SelectOptionActionMeta<{label: string, value:string}> ) => {
    setSelectedEvent(value.value);
  }

  return (
    <div>
      <Select
        defaultValue={{ label: "Select an event", value: "Select an event" }}
        onChange={handleChangeEvent}
        options={
          // In here, for each element in the possibleEvents array
          // we create a corresponding suitable object for the Select
          // component's options attribute.
          possibleEvents.map((ev) => ({ value: ev.name, label: ev.name }))
        } />
      <ul>
        {
          // Create a prototype list from the visiblePeople data
          visiblePeople.map(
            (person, index) => (
              <li key={index}>{person.firstName + ' ' + person.lastName}</li>
            ))
        }
      </ul>
    </div>
  );
}
