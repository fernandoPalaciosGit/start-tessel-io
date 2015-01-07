var	tessel = require('tessel'),
		accel = require('accel-mma84').use( tessel.port['A'] );

accel.on('ready', function( evReady ){

	setInterval(function(){

		accel.on('data', function( coords ){
			var	x = coords[0].toFixed(2),
					y = coords[1].toFixed(2),
					z = coords[2].toFixed(2);
			console.info('X: ', x, 'Y: ', y, 'Z: ', z);

		}); // ready to show
	}, 500); // show interval data
});

accel.on('error', function( evErr ){
	console.error('Error : ', evErr);
});