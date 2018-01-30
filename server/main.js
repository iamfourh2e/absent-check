import { Meteor } from 'meteor/meteor';
import {Schedule} from '../imports/collections/schedule';
Meteor.startup(() => {
  // code to run on server at startup
  if(Schedule.find({}).count() === 0){
    Schedule.insert({
      dayOffStart: null,
      dayOffEnd: null,
      exceptionDays: [],
      holidays:[]
    })
  } 
});
