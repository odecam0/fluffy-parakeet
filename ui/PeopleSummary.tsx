import React from 'react';
import { PeopleInterface, Event } from './CollectionTypes';

interface PeopleSummaryProps {
  selectedEvent: string;
  visiblePeople: PeopleInterface[];
}

// This component is responsible for rendering the summary between the selector and
// the list of people in the given Event.
export const PeopleSummary = (props : PeopleSummaryProps) => {
  // This component is implemented as 3 functions that return what will be shown
  // on the 3 lines of the summary, they all depend on the visiblePeople prop that
  // is passed, and will all be rendered every time that visiblePeople is updated

  const peopleOnEventRightNow = (visiblePeople : PeopleInterface[]) => (
    visiblePeople.filter(item => item.checkInDate).length
  );

  const peopleNotCheckedIn = (visiblePeople : PeopleInterface[]) => (
    visiblePeople.filter(item => !item.checkInDate).length
  );

  const peopleByCompany = (visiblePeople : PeopleInterface[]) => {
    // Here we filter the visiblePeople array for the items that have a companyName set
    // and are checked-in right now.
    // Then we create an object like this:
    // { <company_name>: <number_of_people_from_that_company_checked_in>, ... }
    // using reduce.
    const groupedData = visiblePeople.filter(item => (
      item.companyName &&
      item.checkInDate &&
      !item.checkOutDate)).
      reduce((acc, item) => {
        if (item.companyName in acc) {
          acc[item.companyName] = acc[item.companyName] + 1;
        } else {
          acc[item.companyName] = 1;
        }
        return acc;
      }, {})

    // Then we create a string from the object created.
    let result = "";
    for (const item in groupedData) {
      result += item + '(' + groupedData[item] + '), '
    }

    // And return the string without the last 2 characters, wich would be ' ,'
    return result.slice(0, -2);
  };

  return (
    <div className="px-2 text-slate-700 bg-slate-100 rounded-md border-solid border-slate-400 border-2">
      {"People in the event right now: " + peopleOnEventRightNow(props.visiblePeople) } <br />
      {"People by company in the event right now: " + peopleByCompany(props.visiblePeople)} <br />
      {"People not checked in: " + peopleNotCheckedIn(props.visiblePeople)} <br />
    </div>
  );
}
