class UserModel {
    update(userId,selector){
        if(userId) {
            return Meteor.users.update({_id: userId}, selector);
        }
        throw new Meteor.Error("You must login to update user");
    }

}

export default new UserModel();