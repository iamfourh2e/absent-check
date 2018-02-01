export const Attension = new Mongo.Collection('attension');
const Attension_schema = new SimpleSchema({
    stringDate: {
        type: String,
        index: true
    },
    date: {
        type: Date,
        index: true
    },
    studentId: {
        type: String,
        index: true
    }
});