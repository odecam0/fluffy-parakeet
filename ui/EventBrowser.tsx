import React, { useState, useEffect } from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import { Communities } from '../communities/communities';
import { People } from '../people/people';

import Select from 'react-select';

// This interface defines what possible attributes a People object
// might have. It must have the first and last name, and might have
// a title and companyName.
interface People {
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

  // The visiblePeople state variable will have an array with all the People
  // objects of people that are registered to a given event. The value of
  // this variable is linked to the value of selectedEvent by the logic
  // implemented in handleChangeEvent
  const [visiblePeople, setVisiblePeople] = useState<Array<People>>([]);

  // The handleChangeEvent function is responsible for fetching all the people
  // data associated to an event once an event is selected.
  const handleChangeEvent = ( e : React.ChangeEvent<HTMLSelectElement>) => {
    // ! TODO !
    // Need to implement the request for the apropriate people.
  }

  return (
    <div>
      <Select
    defaultValue={{label:"Select an event", value:"Select an event"}}
        options={
          // In here, for each element in the possibleEvents array
          // we create a corresponding suitable object for the Select
          // component's options attribute.
          possibleEvents.map((ev) => ({ value: ev.name, label: ev.name }))
        }/>
    </div>
  );
}
