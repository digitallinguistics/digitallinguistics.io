(() => {

  const throttle = (fn, delay) => {
    delay = delay || 250; // eslint-disable-line
    var allowSample = true;
    return ev => {
      if (allowSample) {
        allowSample = false;
        setTimeout(() => { allowSample = true; }, delay);
        fn(ev);
      }
    };
  };

  const resize = () => {

    const width = 700;

    const mobile = window.matchMedia && window.matchMedia('(max-device-width: 699px)').matches || screen.width < width || window.innerWidth < width;

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
