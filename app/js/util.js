var DateUtils = {
	"CHECK_DAY": 1,
	"CHECK_WEEK": 2,
	"CHECK_MONTH": 3,

	"convertDate": function (tmsmp) {
		return new Date(tmsmp * 1000);
	},
	"addLeadZero": function (numb) {
		return (numb.toString().length === 1 ? "0"+ numb : numb);
	},
	"formatDate": function (tmsmp) {
		var date = this.convertDate(tmsmp);
		return {
			"minutes": date.getMinutes(),
			"hours": date.getHours(),
			"day": this.addLeadZero(date.getDate()),
			"month": this.addLeadZero(date.getMonth()),
			"year": date.getFullYear(),
			"weekDay": date.getDay(),
			"timestamp": date.getTime()
		};
	},
	"formatForShow": function (date) {
		return date["day"] +"."+ date["month"] +"."+ date["year"];
	},
	"checkDateByCond": function (date, period, type) {
		switch (type) {
			case this.CHECK_DAY:
				return date["day"] +"."+ date["month"] +"."+ date["year"] == period;
				break;
			case this.CHECK_WEEK:
				return date["month"] +"."+ date["year"] == period;
				break;
			case this.CHECK_MONTH:
				return date["month"] +"."+ date["year"] == period;
				break;
			default:
				return false;
		}
	},
	"getMonthAndYear": function (date) {
		return date["month"] +"."+ date["year"];
	}
};