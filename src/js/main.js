const main = {

  resize () {

    console.log('ran');

    const mobile = window.matchMedia && window.matchMedia('(max-device-width: 699px)').matches || screen.width < 700 || window.innerWidth < 700;

    if (mobile) {
      document.body.classList.add('mobile');
      document.body.classList.remove('desktop');
    } else {
      document.body.classList.add('desktop');
      document.body.classList.remove('mobile');
    }
  }

};

main.resize();

window.addEventListener('resize', throttle(main.resize));
