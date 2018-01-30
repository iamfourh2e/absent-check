import {Schedule} from '../collections/schedule';
class ScheduleModel { 
    update(querySelector, selector){
        Schedule.update(querySelector, selector)
    }
    findOne(querySelector){
        return Schedule.findOne(querySelector);
    }
}

export default new ScheduleModel();