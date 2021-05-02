
// Credit: W3Schools How to Create a Countdown Timer
// https://www.w3schools.com/howto/howto_js_countdown.asp

// Set the date we're counting down to
var countDownDate = new Date("Apr 27, 2021 09:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "WE DID IT!";
  }
}, 1000);


/*
Copyright (c) 2021 by Billy Csete (https://codepen.io/billycsete/pen/RWPBaX)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/



// raf shim http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// main function
function scrollToElement(element, speed, easing) {
  
  var scrollTargetY = element.offsetTop;
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  var scrollY = window.scrollY,
    scrollTargetY = scrollTargetY || 0,
    speed = speed || 2000,
    easing = easing || 'easeOutSine',
    currentTime = 0;

  // min time .1, max time .8 seconds
  var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var PI_D2 = Math.PI / 2,
    easingEquations = {
      easeOutSine: function(pos) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function(pos) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: function(pos) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);

      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      console.log('scroll done');
      window.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}


// scroll it!
var scrollLinks = document.querySelectorAll('.scroll-link');

for (var i = 0; i < scrollLinks.length; i++) {
  scrollLinks[i].addEventListener('click', function( evt ) {
    var id = evt.target.getAttribute('data-element-id');
    var element = document.getElementById( id );
    scrollToElement( element, 1500, 'easeInOutQuint');
  });
}



// FIXED POSITION AFTER SCROLL

var fixmeTop = $('.article-nav').offset().top;       // get initial position of the element

$(window).scroll(function() {                  // assign scroll event listener

    var currentScroll = $(window).scrollTop(); // get current position

    if (currentScroll >= fixmeTop) {           // apply position: fixed if you
        $('.article-nav').css({                      // scroll to that element or below it
            position: 'fixed',
            top: '0',
            paddingTop: '50px',
            left: '150'
        });
    } else {                                   // apply position: static
        $('.article-nav').css({                      // if you scroll above it
            position: 'static',
            paddingTop: '0px'
        });
    }

});