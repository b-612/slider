'use strict';

(function () {
  var START_TIMEOUT = 5000;

  var startSlider = function () {
    var $startBtn = $('.start-btn');

    $startBtn.click(function () {
      $startBtn.addClass().fadeOut();
      $('.loading-wait').fadeIn();
      window.setTimeout(function () {
        $('.preloader').fadeOut();
      }, START_TIMEOUT);
    })
  };

  startSlider();
})();
