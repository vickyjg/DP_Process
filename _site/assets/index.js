/* Back to Top 
from Matthew Cain on Codepen
https://codepen.io/matthewcain/pen/ZepbeR
*/

var btn = $('#button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, '300');
});

/* end of Back to Top script */



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
//            width: '100%',
            position: 'fixed',
            top: '0',
            paddingTop: '10px',
            left:'1'
            
        });
    } else {                                   // apply position: static
        $('.article-nav').css({                      // if you scroll above it
            position: 'static',
            paddingTop: '0px'
        });
    }

});


/* Carousel slide based on Kevin Powell's tutorial: https://www.youtube.com/watch?v=VYsVOamdB0g */

const track = document.querySelector('.carousel_track');

const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel_button-right');

const previousButton = document.querySelector('.carousel_button-left');

const nav = document.querySelector('.carousel_nav');

const dots = Array.from(nav.children);

const slideSize = slides[0].getBoundingClientRect();

const slideWidth = slideSize.width;

console.log(slideWidth);

// arrange slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// moves slides 

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('currentSlide');
    targetSlide.classList.add('currentSlide');
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('currentSlide');
    targetDot.classList.add('currentSlide');
};


// left click
previousButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.currentSlide');
    const previousSlide = currentSlide.previousElementSibling;
    const currentDot = nav.querySelector('.currentSlide');
    const prevDot = currentDot.previousElementSibling;

    moveToSlide(track, currentSlide, previousSlide);
    updateDots(currentDot, prevDot);

});


// right click
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.currentSlide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = nav.querySelector('.currentSlide');
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);

});



// indicator click

nav.addEventListener('click', e => {
    // what indicator was clicked on

    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.currentSlide');
    const currentDot = nav.querySelector('.currentSlide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);


});