Meteor.publish('user', function publishUser() {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId});
    }
    return this.ready()
});