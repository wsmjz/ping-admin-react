import { combineReducers } from 'redux';
import marketing from './reducers/marketing';
import coupon from './reducers/coupon';
const baseRootReducerObj = {
    marketing,
    coupon
}
export default combineReducers(baseRootReducerObj);