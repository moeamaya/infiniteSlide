/*global jQuery, console, document, window */
//
// infiniteSlide.js
// https://github.com/moeamaya/infiniteSlide
// MIT licensed
//
// version 0.1 - 01/01/2013

;(function($, document, window) {
  "use strict";

  var name = "js-infiniteSlide";

  var InfiniteSlide = function(el, opts) {
    var self = Object.create(InfiniteSlide.prototype);
    self.$el = $(el);
    self.$el.data(name, self);

    var $slideList = self.$el.find("ul");
    var $slides = $slideList.children();
    var $currentSlide;
    var $prev = $("#infinite-prev");
    var $next = $("#infinite-next");

    self.defaults = {
      "speed": 700,
      "autoscroll": false
    };

    var meta = self.$el.data(name + "-opts");
    self.opts = $.extend(self.defaults, opts, meta);


    //
    //
    var init = function(){
      // get orig length of slides
      var length = $slides.length;

      // clone slides
      cloneSlides();

      // reset $slides to include cloned objects
      $slides = $slideList.children();

      // set first slide to first object in cloned group
      $currentSlide = $slides.eq( length ).addClass("infinite-active");

      var position = $currentSlide.position().left;

      //move slider to first object in cloned group
      var newLeft = position * -1;
      $slideList.css("left", newLeft + "px");
    };

    //
    // Clone slides to fill the full width of screen
    var cloneSlides = function() {
      var windowWidth = $(window).width();

      // get width of all slides combined
      var width = 0;
      $slides.each( function() {
        width += $(this).outerWidth(true);
      });

      // determine number of clones needed
      var clones = Math.ceil(windowWidth / width);

      // set slideList width so floated elements stay
      // in a single row
      $slideList.width(width * (clones + 1));

      // cloning and adding to DOM
      for (var i = 0; i < clones; i++) {
        $slides.clone(true).appendTo($slideList);
      }
    };

    //
    //
    var setSliderPosition = function(position, $el, delta) {
      // set the global currentSlide

      $slideList.animate({"left": position}, {
        duration: self.defaults.speed,
        complete: function(){
          makeInfinite($el, delta);
        }
      });
    };

    //
    //
    var makeInfinite = function($el, delta) {
      var moveImg, oldLeft;
      for (var i = 0; i < Math.abs(delta); i++){
        if (delta < 0){
          moveImg = $("#infinite li:last");
          $("#infinite li:first").before(moveImg);
          oldLeft = $slideList.offset().left;
          $slideList.offset( {left: oldLeft - moveImg.outerWidth( true )} );
        } else {
          moveImg = $("#infinite li:first");
          $("#infinite li:last").after( moveImg );
          oldLeft = $slideList.offset().left;
          $slideList.offset( {left: oldLeft + moveImg.outerWidth( true )} );
        }
      }
    };

    // click handlers
    //
    $prev.on("click", function() {
      console.log("prev");
      self.prev();
    });

    $next.on("click", function() {
      console.log("next");
      self.next();
    });

    $slides.on("click", function(){
      console.log("select");
      self.select(this);
    });

    //
    //
    self.select = function(el) {
      var $el = $(el);
      $currentSlide = $el;
      var newIndex = $el.index();
      var oldIndex = $(".infinite-active").index();
      var delta = newIndex - oldIndex;

      $el.siblings().removeClass("infinite-active");
      $el.addClass("infinite-active");

      var position = $el.position().left * -1;
      setSliderPosition(position, $el, delta);
    };

    //
    //
    self.prev = function() {
      var $el = $currentSlide.prev();
      console.log($el);
      $currentSlide = $el;

      $el.siblings().removeClass("infinite-active");
      $el.addClass("infinite-active");

      var delta = -1;
      var position = $el.position().left * -1;
      setSliderPosition(position, $el, delta);
    };

    //
    //
    self.next = function() {
      var $el = $currentSlide.next();
      $currentSlide = $el;

      $el.siblings().removeClass("infinite-active");
      $el.addClass("infinite-active");

      var delta = 1;
      var position = $el.position().left * -1;
      setSliderPosition(position, $el, delta);
    };

    init();
    Object.freeze(self);
    return self;
  };

  $.fn.infiniteSlide = function(options) {
    console.log("launched");
    return this.each(function() {
      new InfiniteSlide(this, options);
    });
  };

}(jQuery, document, window));