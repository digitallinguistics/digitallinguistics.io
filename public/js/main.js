'use strict';

var main = {

  menuButton: document.getElementById('menuButton'),
  nav: document.querySelector('#nav ul'),

  resize: function resize() {

    var mobile = window.matchMedia && window.matchMedia('(max-device-width: 699px)').matches || screen.width < 700 || window.innerWidth < 700;

    if (mobile) {
      document.body.classList.add('mobile');
      document.body.classList.remove('desktop');
      main.menuButton.style.display = 'flex';
      main.nav.style.display = 'none';
    } else {
      document.body.classList.add('desktop');
      document.body.classList.remove('mobile');
      main.menuButton.style.display = 'none';
      main.nav.style.display = 'flex';
    }
  },

  toggle: function toggle(el) {
    el.style.display = getComputedStyle(el).display === 'flex' ? 'none' : 'flex';
  }
};

main.resize();

main.menuButton.addEventListener('click', function () {
  return main.toggle(main.nav);
});
window.addEventListener('resize', throttle(main.resize));