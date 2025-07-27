$(document).ready(function () {
  function initSlick() {
    if ($(window).width() < 1200) {
      if (!$(".info-strip").hasClass("slick-initialized")) {
        $(".info-strip").slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 700,
        });
      }
    } else {
      if ($(".info-strip").hasClass("slick-initialized")) {
        $(".info-strip").slick("unslick");
      }
    }
  }

  initSlick();

  $(window).on("resize", function () {
    initSlick();
  });
});

$(document).ready(function () {
  $(".hero__slider").slick({
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    prevArrow: $(".hero__slider-prev"),
    nextArrow: $(".hero__slider-next"),
  });
});

export function initProductFiltersSlider() {
  $(".product-filters__list").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: false,
    prevArrow: $(".product-filters__slider-prev"),
    nextArrow: $(".product-filters__slider-next"),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.35,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2.35,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.35,
          dots: false,
        },
      },
    ],
  });
}
