function init() {
      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
    
      var canvas = document.getElementById('drops');
      var context = canvas.getContext('2d');
      
      context.canvas.width  = window.innerWidth;
      //context.canvas.height  = window.innerHeight - ((window.innerHeight * 70) / 100);
   
      //works with images
      context.globalAlpha = 0.7;
      
      var drops = []; 
      drops.push (getDrop(canvas)); 
      animateCircles(drops, canvas, context, 1);
}

function animateCircles(drops, canvas, context, interval) {

    var runAnimation = true;
    drops.forEach (function (e) {
       e.forEach (function (el) {
         el.radius = el.radius + 1;   
       });
      
    });
    
     // clear
    if (runAnimation) { 
    context.clearRect(0, 0, canvas.width, canvas.height); 
    drops.forEach (function (e, i) { 
       e.forEach (function (el, i) { 
           el.line = el.line - 0.01; 
           drawCircle(el, context);
           if (el.line < 0.1) {
             e.splice(i,1);
           }
       });   
       if (e.length === 0) {
         drops.splice (i, 1);
       }
    });
    }
     if (interval > 25) {
     drops.push (getDrop(canvas));
     interval = 1;
     }
        // request new frame
    if (runAnimation) {
      interval++;
      setTimeout(function() {
        requestAnimFrame(function() {
           animateCircles(drops, canvas, context, interval);
        });
      }, 1000 / 60);

    }
}

function getDrop (canvas) {
  var x = Math.floor(Math.random()*canvas.width),
      y = Math.floor(Math.random()*canvas.height);
      var drop = [];
      for (var i = 0; i<10; i++) {
        var circle = {
        x: x,
        y: y,
        radius: i*5.5,
        line: 1
      };
      drop.push (circle);
      }
    return drop;
}
  

function drawCircle (circle, context) { 
    context.beginPath(); 
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false); 
    context.lineWidth = circle.line;
    context.strokeStyle = '#ffffff';
    context.stroke();
}

