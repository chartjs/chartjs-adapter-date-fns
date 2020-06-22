import Chart from 'chart.js';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import addMilliseconds from 'date-fns/addMilliseconds';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import addQuarters from 'date-fns/addQuarters';
import addSeconds from 'date-fns/addSeconds';
import addWeeks from 'date-fns/addWeeks';
import addYears from 'date-fns/addYears';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInQuarters from 'date-fns/differenceInQuarters';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import differenceInYears from 'date-fns/differenceInYears';
import endOfDay from 'date-fns/endOfDay';
import endOfHour from 'date-fns/endOfHour';
import endOfMinute from 'date-fns/endOfMinute';
import endOfMonth from 'date-fns/endOfMonth';
import endOfQuarter from 'date-fns/endOfQuarter';
import endOfSecond from 'date-fns/endOfSecond';
import endOfWeek from 'date-fns/endOfWeek';
import endOfYear from 'date-fns/endOfYear';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';
import startOfHour from 'date-fns/startOfHour';
import startOfMinute from 'date-fns/startOfMinute';
import startOfMonth from 'date-fns/startOfMonth';
import startOfQuarter from 'date-fns/startOfQuarter';
import startOfSecond from 'date-fns/startOfSecond';
import startOfWeek from 'date-fns/startOfWeek';
import startOfYear from 'date-fns/startOfYear';
import toDate from 'date-fns/toDate';

const FORMATS = {
	datetime: 'MMM d, yyyy, h:mm:ss aaaa',
	millisecond: 'h:mm:ss.SSS aaaa',
	second: 'h:mm:ss aaaa',
	minute: 'h:mm aaaa',
	hour: 'ha',
	day: 'MMM d',
	week: 'PP',
	month: 'MMM yyyy',
	quarter: 'qqq - yyyy',
	year: 'yyyy'
};

Chart._adapters._date.override({
	_id: 'date-fns', // DEBUG

	formats: function() {
		return FORMATS;
	},

	parse: function(value, fmt) {
		if (Chart.helpers.isNullOrUndef(value)) {
			return null;
		}
		const type = typeof value;
		if (type === 'number' || value instanceof Date) {
			value = toDate(value);
		} else if (type === 'string') {
			if (typeof fmt === 'string') {
				value = parse(value, fmt, new Date(), this.options);
			} else {
				value = parseISO(value, this.options);
			}
		}
		return isValid(value) ? value.getTime() : null;
	},

	format: function(time, fmt) {
		return format(time, fmt, this.options);
	},

	add: function(time, amount, unit) {
		switch (unit) {
		case 'millisecond': return addMilliseconds(time, amount);
		case 'second': return addSeconds(time, amount);
		case 'minute': return addMinutes(time, amount);
		case 'hour': return addHours(time, amount);
		case 'day': return addDays(time, amount);
		case 'week': return addWeeks(time, amount);
		case 'month': return addMonths(time, amount);
		case 'quarter': return addQuarters(time, amount);
		case 'year': return addYears(time, amount);
		default: return time;
		}
	},

	diff: function(max, min, unit) {
		switch (unit) {
		case 'millisecond': return differenceInMilliseconds(max, min);
		case 'second': return differenceInSeconds(max, min);
		case 'minute': return differenceInMinutes(max, min);
		case 'hour': return differenceInHours(max, min);
		case 'day': return differenceInDays(max, min);
		case 'week': return differenceInWeeks(max, min);
		case 'month': return differenceInMonths(max, min);
		case 'quarter': return differenceInQuarters(max, min);
		case 'year': return differenceInYears(max, min);
		default: return 0;
		}
	},

	startOf: function(time, unit, weekday) {
		switch (unit) {
		case 'second': return startOfSecond(time);
		case 'minute': return startOfMinute(time);
		case 'hour': return startOfHour(time);
		case 'day': return startOfDay(time);
		case 'week': return startOfWeek(time);
		case 'isoWeek': return startOfWeek(time, { weekStartsOn: +weekday });
		case 'month': return startOfMonth(time);
		case 'quarter': return startOfQuarter(time);
		case 'year': return startOfYear(time);
		default: return time;
		}
	},

	endOf: function(time, unit) {
		switch (unit) {
		case 'second': return endOfSecond(time);
		case 'minute': return endOfMinute(time);
		case 'hour': return endOfHour(time);
		case 'day': return endOfDay(time);
		case 'week': return endOfWeek(time);
		case 'month': return endOfMonth(time);
		case 'quarter': return endOfQuarter(time);
		case 'year': return endOfYear(time);
		default: return time;
		}
	}
});
