var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});
ros.on('connection', function() {
console.log('Connected to websocket server.');
  });
ros.on('error', function(error) {
console.log('Error connecting to websocket server: ', error);
  });
ros.on('close', function() {
console.log('Connection to websocket server closed.');
});

const reading =document.getElementById('vel_reading');


var vel_sub = new ROSLIB.Topic({
ros : ros,
name : '/cmd_vel',
messageType : 'geometry_msgs/Twist'
});
vel_sub.subscribe(function(message) {
reading.textContent=JSON.stringify(message);
    });


var pressurepid_pub = new ROSLIB.Topic({
ros : ros,
name : '/pressure_pid',
messageType : 'std_msgs/Float32MultiArray'
});

var yawpid_pub = new ROSLIB.Topic({
ros : ros,
name : '/yaw_pid',
messageType : 'std_msgs/Float32MultiArray'
});

document.getElementById('send_pressure').addEventListener('click', function() {
var values = document.getElementById('pressure_values').value.trim().split(/[\s,]+/).map(Number);
var pressure_msg = new ROSLIB.Message({
data : values
});
pressurepid_pub.publish(pressure_msg);
console.log('publishing pid values for pressure: ', values);
});

document.getElementById('send_yaw').addEventListener('click', function() {
var values = document.getElementById('yaw_values').value.trim().split(/[\s,]+/).map(Number);
var yaw_msg = new ROSLIB.Message({
data : values
});
yawpid_pub.publish(yaw_msg);
console.log('publishing pid values for yaw: ', values);
});