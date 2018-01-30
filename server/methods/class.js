import KlassModel from '../../imports/models/Class';

Meteor.methods({
    klass_insert(doc){
        return KlassModel.insert(doc);
    },
    klass_upsert(querySelector,selector){
        return KlassModel.upsert(querySelector,selector);
    },
    klass_fetch(selector){
        return KlassModel.fetch(selector);
    }
});