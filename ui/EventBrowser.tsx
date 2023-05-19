import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

// Imported react components
import Select, { SelectOptionActionMeta } from 'react-select';
import ScrollArea from 'react-scrollbar';

// Database objects
import { Communities } from '../communities/communities';
import { People } from '../people/people';

// Types for dealing with the Database Objects
import { PeopleInterface, Event } from './CollectionTypes';

// Developed components
import { PeopleLine } from './PeopleLine';
import { PeopleSummary } from './PeopleSummary';

// This component will render the selector, and use other 2 components to render
// the summary and each line of the list o people.
export const EventBrowser = () => {
  // The useTracker is a meteor developed hook that makes possibleEvents be in
  // sync with what is stored in the Communities collection.
  const possibleEvents : Event[] = useTracker(() => {
    Meteor.subscribe('communities');
    return Communities.find().fetch();
  });

  // The selectedEvent state variable will hold what event is being selected
  // on the selector at the moment.
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  // Linking visiblePeople with selectedEvent using useTracker hook
  // This way, visiblePeople will be update every time selectedEvent change
  const visiblePeople: PeopleInterface[] = useTracker(() => {
    Meteor.subscribe('communities')
    Meteor.subscribe('people')
    // Get id of current event
    let event_id : string;
    const event_object = Communities.find({name: selectedEvent}).fetch()[0];
    // Error would be thrown the first time this runs, for selectedEvent would
    // be set to "", and the return of the previous query would be an empty array
    if (event_object) {
      event_id = event_object._id;
    }
    // Get all people with a reference to that event
    return People.find({communityId: event_id}).fetch();
  });

  // The handleChangeEvent function is responsible for setting the selectedEvent, wich
  // upon change, will have the effect of updating the visiblePeople variable, since it
  // is using a tracker witch a callback that depends on this value.
  const handleChangeEvent = ( value : {label: string, value:string},
                              action : SelectOptionActionMeta<{label: string, value:string}> ) => {
    setSelectedEvent(value.value);
  }

  return (
    <div className="p-6 h-full flex flex-col max-h-screen gap-2">
      <Select
        defaultValue={{ label: "Select an event", value: "Select an event" }}
        onChange={handleChangeEvent}
        options={
          // In here, for each element in the possibleEvents array
          // we create a corresponding suitable object for the Select
          // component's options attribute.
          possibleEvents.map((ev) => ({ value: ev.name, label: ev.name }))
        } />
      {selectedEvent != '' ? <PeopleSummary selectedEvent={selectedEvent} visiblePeople={visiblePeople}/> : null}
      <div className="grid grid-cols-6 border-solid border-2 rounded-md p-2 content-center m-2">
        <div className="my-auto"><b>Name</b></div>
        <div className="my-auto"><b>Company</b></div>
        <div className="my-auto"><b>Title</b></div>
        <div className="my-auto"><b>Check in</b></div>
        <div className="my-auto"><b>Check out</b></div>
      </div>
      <ScrollArea>
        <div className="flex flex-col grow p-2 gap-2">
          {
            // This ScrollArea component make a better looking scrollbar than a simple
            // overflow-y-scroll
            // A set of PeopleLine components is created from the visiblePeople array.
            visiblePeople.map(
              (person, index) => (
                <PeopleLine key={index} person={person} />
              ))
          }
        </div>
      </ScrollArea>
    </div>
  );
}

