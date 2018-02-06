class ValidateUser {
    constructor(message) {
        this.message = message;
    }

    ifUserNotSignedIn(msg = null) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('You not login ' +
                `${msg || this.message}`);
        }
    }
}

export default new ValidateUser('to do operation');