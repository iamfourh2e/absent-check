export const CheckRoles = ({roles,currentUser}) => {
    if(currentUser) {
        return Roles.userIsInRole(currentUser._id, roles);
    }
};