'use strict';

(function () {
  var MOB_MAX = 768;

  var $slide = $('.slide');

  var hideSlideContent = function () {
    $slide.find('.slide__title, .slide__text, .slide__btn').addClass('visually-hidden');
  };

  var disableConedSlides = function () {
    window.setTimeout(function () {
      $('.slide.slick-cloned').find('.slide__title, .slide__text, .slide__btn').addClass('visually-hidden');
    }, 300);
  };

  var showCurrentContent = function () {
    var $currentSlide = $('.slide.slick-current');

    $currentSlide.find('.slide__title, .slide__text, .slide__btn').removeClass('visually-hidden');
  };

  var removeAnimation = function () {
    $slide.find('.slide__title').removeClass('animated faster fadeInUp');
    $slide.find('.slide__text, .slide__btn').removeClass('animated fast fadeInDown');
  };

  var addAnimation = function () {
    var $currentSlide = $('.slide.slick-current');
    $currentSlide.find('.slide__title').addClass('animated faster fadeInUp');
    $currentSlide.find('.slide__text, .slide__btn').addClass('animated fast fadeInDown');
  };

  var animateSlideContent = function () {
    hideSlideContent();
    removeAnimation();
    showCurrentContent();
    addAnimation();
    disableConedSlides();
  };

  var activateSlider = function () {
    $('.slider').slick({
      infinite: true,
      accessibility: true,
      zIndex: 1000,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      prevArrow:
        '<button type="button" class="carousel-control slider__arrow slider__arrow--prev">' +
        '<span class="visually-hidden">Предыдущий слайд</span>' +
        '</button>',
      nextArrow:
        '<button type="button" class="carousel-control slider__arrow slider__arrow--next">' +
        '<span class="visually-hidden">Следующий слайд</span>' +
        '</button>',
      dots: false,

      responsive: [
        {
          breakpoint: MOB_MAX,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            arrows: false,
            dots: true,
            dotsClass: 'slick-dots list-unstyled'
          }
        }
      ]
    });

    hideSlideContent();
    showCurrentContent();
    disableConedSlides();
  };

  var activateCustomPagination = function () {
    $('.slider-pagination').slick({
      slidesToShow: 4,
      asNavFor: '.slider',
      focusOnSelect: true,
      accessibility: true,
      zIndex: 1000,
      slidesPerRow: 4,

      responsive: [
        {
          breakpoint: MOB_MAX,
          settings: "unslick"
        }
      ]
    });
  };

  var onSlideChange = function () {
    var $currentSlideClass = $('.slider .slick-current').attr('class').split('--')[1].split(' ')[0];


    $('.slider-pagination__nav-item').removeClass('slick-current');
    $('.slider-pagination__nav-item' + '--' + $currentSlideClass).addClass('slick-current');
    animateSlideContent();
  };

  var disablePagination = function () {
    $('.slider-pagination').slick('unslick');
  };

  activateSlider();
  activateCustomPagination();
  $('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    onSlideChange();
  });

  $(window).resize(window.util.debounce(function () {
    if ($(window).width() >= MOB_MAX) {
      disablePagination();
      activateCustomPagination();
    } else {
      disablePagination();
    }
  }));
})();
