onmessage = function(ev) {
	transport = new XMLHttpRequest();
	transport.open('GET', '/data.json', true);
	transport.onreadystatechange = function(){
		if(transport.readyState == 4){
			var json = JSON.parse(transport.response);
			postMessage(json);
		}
	};
	transport.send();
};