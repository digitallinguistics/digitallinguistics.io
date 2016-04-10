'use strict';

(function () {

  var throttle = function throttle(fn, delay) {
    delay = delay || 250; // eslint-disable-line
    var allowSample = true;
    return function (ev) {
      if (allowSample) {
        allowSample = false;
        setTimeout(function () {
          allowSample = true;
        }, delay);
        fn(ev);
      }
    };
  };

  var resize = function resize() {

    var width = 700;

    var mobile = window.matchMedia && window.matchMedia('(max-device-width: 699px)').matches || screen.width < width || window.innerWidth < width;

    if (mobile) {
      document.body.classList.add('mobile');
      document.body.classList.remove('desktop');
    } else {
      document.body.classList.add('desktop');
      document.body.classList.remove('mobile');
    }
  };

  resize();

  window.addEventListener('resize', throttle(resize));
})();