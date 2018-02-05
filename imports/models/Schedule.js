import {Schedule} from '../collections/schedule';
class ScheduleModel {
    insertDefault(user){
        return Schedule.insert({
            dayOffStart: null,
            dayOffEnd: null,
            exceptionDays: [],
            holidays:[],
            userId: user._id
        });
    }
    update(querySelector, selector){
        Schedule.update(querySelector, selector)
    }
    findOne(querySelector){
        return Schedule.findOne(querySelector);
    }
}

export default new ScheduleModel();