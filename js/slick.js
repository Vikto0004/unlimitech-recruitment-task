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
