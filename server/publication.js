Meteor.publish('user', function publishUser() {
    if (this.userId) {
        console.log('subscribe user: '+ this.userId);
        return Meteor.users.find({_id: this.userId});
    }
    return this.ready()
});