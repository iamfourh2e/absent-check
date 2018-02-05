import {Accounts} from 'meteor/accounts-base';

Accounts.onCreateUser((options,user) => {
    user.profile = {};
    if (user.username === 'h2e') {
        user.profile.approved = true;
        user.roles = ['h2e'];
        user.profile.studentEngaged = true;
        user.profile.classEngaged = true;
        user.profile.memberLevel = 3;
        Roles.addUsersToRoles(user._id, ['h2e']);
    } else {
        user.profile.approved = true;
        user.profile.studentEngaged = true;
        user.profile.classEngaged = false;
        user.profile.memberLevel = 1;
        user.roles = ['student'];
        Roles.addUsersToRoles(user._id, ['student']);
    }
    Meteor.call('schedule_insertDefault',user,(err,result)=>{
        if(err) {
            console.log(err);
        }
    });
    return user;
});