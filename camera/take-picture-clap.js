// RUN CONSOLE : tessel run camera/take-picture-clap.js  --upload-dir ./img
var tesselCard = require('tessel'),
libcamera = require('camera-vc0706')
ambientlib = require('ambient-attx4'),
ambient = ambientlib.use( tesselCard.port['A'] ),

// Resolution : 'vga' (640x480), 'qvga'(320x240) or 'qqvga' (160x120). Default is 'vga'
// Compression : between 0 and 1. Default is 0.4

optionCamera = { compression : 0.4, resolution : 'vga'},
camera = libcamera.use(tesselCard.port['D'], optionCamera);

notificationLED = tesselCard.led[3]; // notify when take a picture
notificationLED.low();

camera.on('ready', function(){

	ambient.on('ready', function(){

	 	ambient.setSoundTrigger(0.1);
		ambient.on('sound-trigger', function(data) {

			camera.takePicture(savePicture);

			//clear trigger
		   ambient.clearSoundTrigger();

			//reset sound trigger
			setTimeout(function () {
				ambient.setSoundTrigger(0.1);
			}, 500);
		});
	} );
});

camera.on('error', function(err){ console.log(err); } );
ambient.on('error', function(err){ console.log(err); } );

var savePicture = function(err, img){

	if( err ) throw err;

	notificationLED.high();
	var date = new Date();
	var name = 'picTessel-' + date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + '-' + date.getHours() + '.jpg';
   process.sendfile(name, img);
   
   // end process from camera connection
   camera.disable();
};