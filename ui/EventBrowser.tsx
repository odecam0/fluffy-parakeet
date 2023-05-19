import React, { useState, useEffect } from 'react';

import { useTracker } from 'meteor/react-meteor-data';

import { Communities } from '../communities/communities';
import { People } from '../people/people';

import Select, { SelectOptionActionMeta } from 'react-select';

import ScrollArea from 'react-scrollbar';

import { PeopleInterface, Event } from './CollectionTypes';

import { PeopleLine } from './PeopleLine';

interface peopleByCompany {
  _id: string;
  count: number;
}

const PeopleOnEventByCompany = new Mongo.Collection<peopleByCompany>('PeopleOnEventByCompany');

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

  // gePeopleOnEventCursor returns a mongodb cursor corresponding to all people
  // associated with the event passed as parameter. This is suposed to be passed
  // as callback to useTracker and connect the visiblePeople variable to the
  // selectedEvent variable.
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
      <PeopleSummary selectedEvent={selectedEvent} visiblePeople={visiblePeople}/>
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

// - `People in the event right now: 10`;
// - `People by company in the event right now: Green Group (10), Hoppe Group (5)`;
// - `People not checked-in: 200`;
const PeopleSummary = (props) => {
  const peopleOnEventRightNow : number = useTracker(() => {
    Meteor.subscribe('people');
    Meteor.subscribe('communities');
    const community_object = Communities.find({name: props.selectedEvent}).fetch()[0];
    let community_id:string;
    if (community_object) {
      community_id = community_object._id;
    }
    return People.find({
      communityId: community_id,
      checkInDate: { $exists : true },
      checkOutDate: { $exists : false }
    }).count();
  });

  const peopleByCompany=(visiblePeople)=>{
    const groupedData = visiblePeople.filter(item => (
      item.companyName &&
      item.checkInDate &&
      !item.checkOutDate)).reduce((acc, item) => {
      if (item.companyName in acc) {
        acc[item.companyName] = acc[item.companyName] + 1;
      } else {
        acc[item.companyName] = 1;
      }
      return acc;
    }, {})
    let result = "";
    for (const item in groupedData) {
      result += item + '(' +  groupedData[item] + ') ,'
    }
    return result.slice(0, -2);
  };

  const peopleNotCheckedIn=(visiblePeople) => {
    return visiblePeople.filter(item => !item.checkInDate).length;
  }

  return (
    <div>
      {"- People in the event right now: " + peopleOnEventRightNow } <br />
      {"- People by company in the event right now: " + peopleByCompany(props.visiblePeople)} <br />
      {"- People not checked in: " + peopleNotCheckedIn(props.visiblePeople)} <br />
    </div>
  );
}
