var tessel = require('tessel'),
    servolib = require('servo-pca9685'),
    servo = servolib.use(tessel.port['C']),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use( tessel.port['A'] ),
    servo1 = 1, // We have a servo plugged in at position 1
    position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

servo.on('ready', function () {

	servo.configure(servo1, 0.05, 0.12, function(){

			setSoundToClip();
	});

});


var setSoundToClip = function(){
	ambient.on('ready', function () {

			// throw sound trigger event when data = 0.1
		  ambient.setSoundTrigger(0.1);

		  ambient.on('sound-trigger', function(data) {

		  	// move servo
		  	position = ( position === 0 ) ? 1 : 0;
		   servo.move(servo1, position);
		  	
		  	//clear trigger
		   ambient.clearSoundTrigger();

		    //reset sound trigger
		    setTimeout(function () {
		        ambient.setSoundTrigger(0.1);
		    }, 500);
		  });
	});
};