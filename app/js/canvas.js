function getTotal( arr ){
		var j,
				myTotal = 0;
		for( j = 0; j < arr.length; j++) {
				myTotal += ( typeof arr[j] === 'number' ) ? arr[j] : 0;
		}

		return myTotal;
}

function drawPieChart_one( canvasId ) {
	var canvas = document.getElementById("Canvas_one");
	if (canvas.getContext){
	var context = canvas.getContext("2d"),
halfWidth = canvas.width * .5,
halfHeight = canvas.height * .5;


context.fillStyle = "#203541";
context.beginPath();
context.arc(halfWidth,halfHeight,33,0,Math.PI*2,true);
context.closePath();
context.fill();

context.beginPath();
context.arc(halfWidth, halfHeight, 41,  1.7 * Math.PI, 2.1 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#fff";
context.stroke();
context.closePath();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, 0.04 * Math.PI, 0.9 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#00aeef";
context.stroke();
context.closePath();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, 1.55 * Math.PI, 1.71 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#121e25";
context.stroke();
context.closePath();


context.beginPath();
context.arc(halfWidth, halfHeight, 41, 0.9 * Math.PI, 1.56 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#1a2a34";
context.stroke();
context.closePath();


context.textBaseline = "middle";
context.font = "12.75px MyriadProRegular";
context.fillStyle = "#dfe1e2";
context.textAlign = "center";
context.fillText("ЗА", 50, 40);
context.fillText("ДЕНЬ", 50, 55);

 };

};
drawPieChart_one('Canvas_one');


function drawPieChart_two( canvasId ) {
	var canvas = document.getElementById("Canvas_two");
	if (canvas.getContext){
	var context = canvas.getContext("2d"),
halfWidth = canvas.width * .5,
halfHeight = canvas.height * .5;


 context.fillStyle = "#203541";

	context.beginPath();
	context.arc(halfWidth,halfHeight,33,0,Math.PI*2,true);
context.closePath();
context.fill();

context.beginPath();
context.arc(halfWidth, halfHeight, 41,  1.49 * Math.PI, 1.9 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#fff";
context.stroke();
context.closePath();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, -0.15 * Math.PI, 0.75 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#00aeef";
context.stroke();
context.closePath();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, 1.37 * Math.PI, 1.5 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#121e25";
context.stroke();
context.closePath();


context.beginPath();
context.arc(halfWidth, halfHeight, 41, 0.75 * Math.PI, 1.39 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#1a2a34";
context.stroke();
context.closePath();


context.textBaseline = "middle";
context.font = "12.75px MyriadProRegular";
context.fillStyle = "#dfe1e2";
context.textAlign = "center";
context.fillText("ЗА", 50, 40);
context.fillText("НЕДЕЛЮ", 50, 55);



 };

};

drawPieChart_two('myCanvas_two');

function drawPieChart_three( canvasId ) {
	var canvas = document.getElementById("Canvas_three");
	if (canvas.getContext){
	var context = canvas.getContext("2d"),
halfWidth = canvas.width * .5,
halfHeight = canvas.height * .5;


 context.fillStyle = "#203541";
	context.beginPath();
	context.arc(halfWidth,halfHeight,33,0,Math.PI*2,true);
context.closePath();
context.fill();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, 1.47 * Math.PI, 0.4 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#00aeef";
context.stroke();
context.closePath();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, 0.4 * Math.PI, 1.0 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#1a2a34";
context.stroke();
context.closePath();

context.beginPath();
context.arc(halfWidth, halfHeight, 41, 1.14 * Math.PI, 1.47 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "white";
context.stroke();
context.closePath();


context.beginPath();
context.arc(halfWidth, halfHeight, 41,  1.0 * Math.PI, 1.14 * Math.PI, false);
context.lineWidth = 17;
context.strokeStyle = "#121e25";
context.stroke();
context.closePath();


context.textBaseline = "middle";
context.font = "12.75px MyriadProRegular";
context.fillStyle = "#dfe1e2";
context.textAlign = "center";
context.fillText("ЗА", 50, 40);
context.fillText("МЕСЯЦ", 50, 55);

 };

};
drawPieChart_three('myCanvas_three');


