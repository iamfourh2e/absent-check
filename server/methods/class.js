import KlassModel from '../../imports/models/Class';
import ValidateUser from '../../imports/models/validateUser';
Meteor.methods({
    klass_insert(doc){
        return KlassModel.insert(doc);
    },
    klass_upsert(querySelector,selector){
        ValidateUser.ifUserNotSignedIn();
        selector.$set.userId = Meteor.userId();
        return KlassModel.upsert(querySelector,selector);
    },
    klass_fetch(selector){
        ValidateUser.ifUserNotSignedIn();
        selector.userId =  Meteor.userId();
        return KlassModel.fetch(selector);
    },
    klass_findeOne(selector){
        ValidateUser.ifUserNotSignedIn();
        return KlassModel.findDoc(selector);
    }
});