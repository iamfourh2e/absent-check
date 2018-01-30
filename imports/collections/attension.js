export const Attension = new Mongo.Collection('attension');
const Attension_schema = new SimpleSchema({
    stringDate: {
        type: String
    },
    date: {
        type: Date
    },
    studentId: {
        type: String
    }
});