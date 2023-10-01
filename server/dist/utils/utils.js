"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDay = exports.addWeeks = exports.addMonths = void 0;
const addMonths = (date, months) => {
    date.setMonth(date.getMonth() + months);
    return date;
};
exports.addMonths = addMonths;
const addWeeks = (date, weeks) => {
    const millisecondsInAWeek = 604800000; // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
    const millisecondsToAdd = weeks * millisecondsInAWeek;
    const updatedDate = new Date(date.getTime() + millisecondsToAdd);
    return updatedDate;
};
exports.addWeeks = addWeeks;
const isDay = (date, day) => {
    return date.getDay() === day; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
};
exports.isDay = isDay;
//# sourceMappingURL=utils.js.map