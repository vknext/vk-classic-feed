const formatPostDate = (timestamp: number = 0, useFullMonthName: boolean = false) => {
	if (!timestamp || !window.getLang) return '';

	const ONE_HOUR_SECONDS = 3600;
	const ONE_SECOND_MS = 1000;
	const dateInMillis = ONE_SECOND_MS * timestamp;
	const inputDate = new Date(dateInMillis);
	const now = new Date();
	const secondsElapsed = (Date.now() - inputDate.getTime()) / 1000;
	const inputYear = inputDate.getFullYear();
	const inputMonth = inputDate.getMonth();

	if (secondsElapsed < 5) {
		return window.getLang('mobile_profile_status_just_now');
	}

	if (secondsElapsed < 60) {
		return window.getLang('mobile_profile_status_secs_ago', Math.ceil(secondsElapsed));
	}

	if (secondsElapsed < ONE_HOUR_SECONDS) {
		const minutesElapsed = Math.ceil(secondsElapsed / 60);
		const minuteLabel = window.getLang('mobile_profile_status_word_mins_ago', 'raw');

		return Array.isArray(minuteLabel) && minutesElapsed < minuteLabel.length
			? minuteLabel[minutesElapsed]
			: window.langNumeric(minutesElapsed, window.getLang('mobile_profile_status_mins_ago', 'raw'));
	}

	if (secondsElapsed / ONE_HOUR_SECONDS < 5) {
		const hoursElapsed = Math.ceil(secondsElapsed / ONE_HOUR_SECONDS);
		const hourLabel = window.getLang('mobile_profile_status_word_hours_ago', 'raw');

		return Array.isArray(hourLabel) && hoursElapsed < hourLabel.length
			? hourLabel[hoursElapsed]
			: window.langNumeric(hoursElapsed, window.getLang('mobile_profile_status_hours_ago', 'raw'));
	}

	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();
	const monthLabels = useFullMonthName ? window.getLang('months_of', 'raw') : window.getLang('months_sm_of', 'raw');

	if (inputYear < currentYear && (currentMonth > 1 || inputMonth < 9 || currentYear - inputYear >= 2)) {
		return window.langDate(dateInMillis, window.getLang('global_short_date_year_time', 'raw'), 0, monthLabels);
	}

	return window.langDate(dateInMillis, window.getLang('global_short_date_time', 'raw'), 0, monthLabels);
};

export default formatPostDate;
