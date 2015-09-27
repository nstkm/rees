
/* Код для статуса */
function selRadio(val) {
	var select = document.getElementsByName("select")[0];
	var rad = document.getElementsByName("switch");
	select.onchange = function () {
		for (var i = 0; i < rad.length; i++) {
		rad[i].checked = rad[i].id == "switch-" + this.value;
		}
	};
}
	window.onload = selRadio;

/* Код для вывода таблицы и данных*/
"use strict";
$(document).ready(function () {

	var dates = {
			monthes: {},
			days: {},
			all: {
				"count": 0,
				"total": 0,
				"recommended": 0,
				"typical": 0
			}
		},
		$tbBody = $("#my-ajax-table tbody"),
		$howMatch = $("#how_match"),
		$recommendChx = $('#is_recommended'),
		$daysList = $("#days_list");

	$.ajax({
		url: "./data.json",
		method: "GET",
		dataType: "json"
	}).done(function(json) {
		console.time('each');
			for (var i = 0, len = json.length; i < len; i++) {
				var val = json[i];

				val['date'] = DateUtils.formatDate(val['timestamp']);
				setValue(dates.monthes, DateUtils.getMonthAndYear(val['date']), val);
				setValue(dates.days, DateUtils.formatForShow(val['date']), val);

				dates.all["count"]++;
				dates.all["total"] += val['total'];
				dates.all["typical"] += val['typical'];
				dates.all["recommended"] += val['recommended'];
			}

		console.timeEnd('each');

		$howMatch.trigger('change');
		$daysList.find('a:first').trigger('click');
	}).fail(function (jqXHR, status, error) {
		console.log(jqXHR, status, error);
		alert('Sorry, error!!!');
	});


	$daysList.on('click', 'a', function (e) {
		e.preventDefault();
		var $this = $(this),
			cls = 'active';
		$daysList.find('a').removeClass(cls);
		$this.addClass(cls);

		showTable(dates.days[$this.attr("data-date")]['days'], $tbBody, $recommendChx);
	});

	$recommendChx.on('change', function () {
		$daysList.find('a.active').trigger('click');
	});

	$howMatch.on('change', function (e) {
		e.preventDefault();

		var $this = $(this),
			val = $this.find('option:selected').val(),
			days = {},
			i;

		if (val !== "all") {
			i = (val === "two_week") ? 14 : 7;

			for (var date in dates.days) {
				if ( ! i--) { break; }
				days[date] = dates.days[date];
			}
		} else {
			days = dates.days;
		}

		showDayGraphic(days, $daysList);
	});


});

function setValue(obj, key, val) {
	if (typeof obj[key] === 'undefined') {
		obj[key] = {
			"count": 0,
			"total": 0,
			"recommended": 0,
			"typical": 0,
			"days": []
		};
	}

	obj[key]["count"]++;
	obj[key]["total"] += val['total'];
	obj[key]["typical"] += val['typical'];
	obj[key]["recommended"] += val['recommended'];
	obj[key]["days"].push(val);
}

function showDayGraphic(items, $box) {
	var html = "";
	for (var date in items) {
		html += "<li><a href='#' \
						data-count="+ items[date]['count'] +" \
						data-recommended="+ items[date]['recommended'] +" \
						data-typical="+ items[date]['typical'] +" \
						data-date='"+ date +"'>"+ date +"</a></li>";
	}
	$box.html(html);
}

function showTable(items, $box, $recommendChx) {
	var html = "";
	for (var i = 0, len = items.length; i < len; i++) {
		if ($recommendChx.prop('checked') && ! items[i]['recommended']) { continue; }

		html += "<tr>\
			<td>" + items[i]['id'] + "</td>\
			<td>" + DateUtils.formatForShow(items[i]["date"]) + "</td>\
			<td>" + items[i]['user_id'] + "</td>\
			<td>" + items[i]['typical']+ "</td>\
			<td>" + items[i]['recommended'] + "</td>\
		</tr>";
	}
	$box.html(html);
}