var tessel = require('tessel'),
    servolib = require('servo-pca9685'),
    servo = servolib.use(tessel.port['C']),
    servo1 = 1, // We have a servo plugged in at position 1
    position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

servo.on('ready', function () {
  // rotationByRange();
  rotationByStep();
});

// move rotation by range and return to init position
var rotationByRange = function(){
  servo.configure(servo1, 0.05, 0.12, function () {
    setInterval(function () {
      console.log('Position (in range 0-1):', position);
      //  Set servo #1 to position pos.
      servo.move(servo1, position);

      // Increment by 10% (~18 deg for a normal servo)
      position += 0.1;
      if (position > 1) {
        position = 0; // Reset servo position
      }
    }, 500); // Every 500 milliseconds
  });
}

//Make the servo turn all the way to position 1 in one fell swoop, and then back to position 0.
var rotationByStep = function(){
  servo.configure(servo1, 0.05, 0.12, function(){
    setInterval(function(){
      
      position = ( position === 0 ) ? 1 : 0;
      servo.move(servo1, position);
      console.log("moved");
    }, 1000);
  });
}