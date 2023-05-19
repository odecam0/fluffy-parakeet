import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import './peopleMethods';
import './peoplePublish';
import './communitiesPublish';


Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
