import ScheduleModel from '../../imports/models/Schedule';

Meteor.methods({
    schedule_insertDefault(user){
        return ScheduleModel.insertDefault(user);
    },
    schedule_update(querySelector, selector){
        return ScheduleModel.update(querySelector,selector);
    },
    schedule_findOne(querySelector){
        return ScheduleModel.findOne(querySelector);
    }
});