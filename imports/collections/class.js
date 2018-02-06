export const Class = new Mongo.Collection('class');

const Class_schema = new SimpleSchema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    studentCount: {
        type: Number,
        optional: true
    },
    userId: {
      type: String
    },
    lat: {
        type: Number,
        optional: true,
        index: true
    },
    lng: {
        type: Number,
        optional: true,
        index: true
    }
});

Class.attachSchema(Class_schema);