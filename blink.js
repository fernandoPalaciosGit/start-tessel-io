// import module to work with Tessel
var tessel = require('tessel'),

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
	 led1 = tessel.led[0].output(1),
	 led2 = tessel.led[1].output(2),
	 led3 = tessel.led[2].output(3),
	 led4 = tessel.led[3].output(4);

setInterval(function () {
    console.info("I'm blinking! (Press CTRL + C to stop)");
    
    // Toggle the led states
    led1.toggle();
    led2.toggle();
    led3.toggle();
    led4.toggle();
}, 500);