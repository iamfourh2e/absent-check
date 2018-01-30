export const Schedule = new Mongo.Collection('schedule');
const  Schedule_schema = new SimpleSchema({
    exceptionDays: {
        type: [Number],
        optional: true
    },
    dayOffStart: {
        type: Date,
        optional: true
    },
    dayOffEnd: {
        type: Date,
        optional: true
    },
    holidays: {
        type: [String]
    }
});
Schedule.attachSchema(Schedule_schema);