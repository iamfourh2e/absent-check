import {Class} from '../../imports/collections/class';

Class.after.insert(function(doc){
   Meteor.defer(()=>{
       countStudent(doc);
   }) ;
});


Class.after.update(function(doc){
    Meteor.defer(()=>{
        countStudent(doc);
    })
});


function countStudent(doc){
    let count = Meteor.users.find({'profile.classArr': {$in: [doc._id]}}).count();
    Class.direct.update({_id: doc._id}, {
        $set: {studentCount: count}
    })
}