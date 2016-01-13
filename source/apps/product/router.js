import {Router} from 'backbone';
import controller from './controller';

export default Router.extend({
    routes: {
        '(/)': controller.homeRoute,
        'card/:id(/)': controller.cardRoute,
        'edit/:id(/)': controller.editRoute,
        'new(/)': controller.newRoute
    }
});
