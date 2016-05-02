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
