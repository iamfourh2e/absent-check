export const Class = new Mongo.Collection('class');

const Class_schema = new SimpleSchema({
    name: {
        type: String,
        index: true,
        unique: true
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