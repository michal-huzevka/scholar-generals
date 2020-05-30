import _ from 'underscore';

/**
 * Create a deep clone of provided object
 * @param obj
 */
var cloneDeep = function (obj) {
    var clone, key;

    if (!obj || (typeof obj !== 'object')) {
        return obj; // by value
    } else if (_.isString(obj)) {
        return String.prototype.slice.call(obj);
    } else if (_.isDate(obj)) {
        return new Date(obj.valueOf());
    } else if (_.isFunction(obj.clone)) {
        return obj.clone();
    }

    if (_.isArray(obj)) {
        clone = Array.prototype.slice.call(obj);
    } else if (obj.constructor !== {}.constructor) {
        return obj; // by reference
    } else {
        clone = {};
    }

    // recurse for all values
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = cloneDeep(obj[key]);
        }
    }

    return clone;
};

export default cloneDeep;