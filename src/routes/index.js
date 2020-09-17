import {Promo} from './promo/index';
import Marketing from './marketing/index';

const routes = [
    {
        path: '/promo',
        // component: withIntl('promo')(Promo),
        component: Promo,
        exact: true,
    },
    ...Marketing
]
export default routes;