'use strict';

(function () {
  var MD_MIN = 768;

  $('.slider').slick({
    infinite: true,
    accessibility: true,
    zIndex: 1000,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: MD_MIN,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          draggable: true,
          arrows: false,
          dots: true,
          dotsClass: 'slick-dots list-unstyled'
        }
      }
    ]
  });

  // $('.slider-pagination--mobile').slick({
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   asNavFor: '.slider',
  //   arrows: false,
  //   focusOnSelect: true,
  //   infinite: true,
  //   accessibility: true,
  //   zIndex: 1000,
  // });
})();
