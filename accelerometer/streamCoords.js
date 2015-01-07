var	tessel = require('tessel'),
		accel = require('accel-mma84').use( tessel.port['B'] );

var showDataAccelerometer = function( timer ){
	// show data from interval
	setInterval(function(){

		// reload data listeners
		accel.removeAllListeners('data');

		accel.on('data', function( coords ){
			
			var	x = coords[0].toFixed(2),
					y = coords[1].toFixed(2),
					z = coords[2].toFixed(2);
			console.info('X: ', x, 'Y: ', y, 'Z: ', z);
		});
	}, timer);
}

accel.on('ready', function( evReady ){

	// set precision and scale
	accel.setOutputRate(1.56, function rateSet() {
		accel.setScaleRange( 8, function scaleSet() {
			showDataAccelerometer( 1000 );
		});
	});
});

accel.on('error', function( evErr ){
	console.error('Error : ', evErr);
});
