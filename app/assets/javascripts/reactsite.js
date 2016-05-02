
jQuery( document ).ready(function() {

	//IE doesn't like Google fonts...apparently it's Google's fault
	//at the moment, but whatever...load Web Safe font for IE users
	var gbr = FUSION.get.browser();
	if(gbr.browser && gbr.browser == "IE")
	{
		document.body.style.setProperty("font-family", "'Trebuchet MS', Helvetica, sans-serif", "important");
	}

	$( ".navlink" ).click(function() {
		FUSION.set.overlayMouseWait();
	});

	$( ".btn-primary" ).click(function() {
		FUSION.set.overlayMouseWait();
	});

});


function closeNotice(t)
{
	try {
		if(t && FUSION.lib.isElement(t)) {
			$( t.parentNode ).fadeOut( "slow", function() {});
		}
	}
	catch(err) { FUSION.error.logError(err); }
}




// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
	try {
		// First check for the pattern
		if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
		{ return false; }

		// Parse the date parts to integers
		var parts = dateString.split("/");
		var day   = 0;
		var month = 0;
		var year  = 0;

		if(parts.length == 3)
		{
			day   = parseInt(parts[1], 10);
			month = parseInt(parts[0], 10);
			year  = parseInt(parts[2], 10);
		}
		else
		{ return false; }

		// Check the ranges of month and year
		if(year < 2000 || year > 2100 || month < 1 || month > 12)
		{ return false; }

		var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

		// Adjust for leap years
		if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		{ monthLength[1] = 29; }

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	}
	catch(err) {
		FUSION.error.logError(err);
		return false;
	}
}


function ignoreEnter(event)
{
	var keynum = -1;
	if(window.event){ // IE
		keynum = event.keyCode;
	}
	else if(event.which) { // Chrome/Firefox/Opera
		keynum = event.which;
	}

	if(keynum == 13)
	{
		event.preventDefault();
	}
}


function sortUl(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
}
