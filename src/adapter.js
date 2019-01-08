import { _adapters, helpers } from 'chart.js';
import {
	parse, format,
	startOfSecond, startOfMinute, startOfHour, startOfDay,
	startOfWeek, startOfMonth, startOfQuarter, startOfYear,
	addMillisencods, addSeconds, addMinutes, addHours,
	addDays, addWeeks, addMonths, addQuarters, addYears,
	differenceInMillisencods, differenceInSeconds, differenceInMinutes,
	differenceInHours, differenceInDays, differenceInWeeks,
	differenceInMonths, differenceInQuarters, differenceInYears,
	endOfSecond, endOfMinute, endOfHour, endOfDay,
	endOfWeek, endOfMonth, endOfQuarter, endOfYear
} from 'date-fns';

var FORMATS = {
	millisecond: 'h:mm:ss.SSS a',
	second: 'h:mm:ss a',
	minute: 'h:mm a',
	hour: 'ha',
	day: 'MMM d',
	week: 'DD',
	month: 'MMM yyyy',
	quarter: "'Q'q - yyyy",
	year: 'yyyy'
};

var PRESETS = {
	full: 'MMM d, yyyy h:mm:ss.SSS a',
	time: 'MMM d, yyyy h:mm:ss a',
	date: 'MMM d, yyyy'
};

helpers.merge(_adapters._date, {
	_id: 'date-fns', // DEBUG

	formats: function() {
		return FORMATS;
	},

	presets: function() {
		return PRESETS;
	},

	parse: function(value/* , format */) {
		if (helpers.isNullOrUndef(value)) {
			return null;
		}

		return parse(value);
	},

	format: function(time, fmt) {
		return format(time, fmt);
	},

	add: function(time, amount, unit) {
		switch (unit) {
		case 'millisecond': return addMillisencods(time, amount);
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
		case 'millisecond': return differenceInMillisencods(max, min);
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
		case 'isoWeek': return startOfWeek(time, { weekStartsOn: weekday });
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
