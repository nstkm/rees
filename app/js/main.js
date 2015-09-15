var myModule = (function() {

		var init = function() {
			_setUpListeners();
		};

		var _setUpListeners = function() {
			//_select();
			$('form').on('click', '.select-choose__recomend' , _select);
		};
			/* select */
		var _select = function() {
			$('.select__order').addClass('select__long');
		};
			return {
		init : init
	};

}());

myModule.init();

$(function() {
	$.getJSON("data.json", function(data) {
		var html = "";
		$.each(data, function(key, val) {
			html += "<tr><td>" + val.id + "</td><td>" + val.user_id + "</td><td>" + val.timestamp + "</td><td>" + val.typical + "</td><td>" + val.recommended + "</td><tr>"
		}),
		$("#my-ajax-table").append(html)
	})
});






