import actionTypes from "./action-types";
export function save(names, value) {
    return {
        type: actionTypes.SAVE,
        payload: {
            names,
            value
        }
    };
}