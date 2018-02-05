import UserModel from '../../imports/models/User';

Meteor.methods({
    user_updateUser(seletor) {
        let userId = Meteor.userId();
        return UserModel.update(userId,seletor);
    }
});