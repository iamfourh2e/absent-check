import {Schedule} from '../imports/collections/schedule';
import {Class} from '../imports/collections/class';

Security.permit(['insert', 'update', 'remove']).collections([
    Schedule,
    Class,
]);
