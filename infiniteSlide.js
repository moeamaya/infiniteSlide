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

    self.defaults = {
      "speed": 700,
      "autoscroll": false
    };

    var meta = self.$el.data(name + "-opts");
    self.opts = $.extend(self.defaults, opts, meta);

    //
    //
    var init = function(){
      // get width of all slides combined
      var width = 0;
      $slides.each( function() {
        width += $(this).outerWidth(true);
      });

      // clone list to fill the horizontal width
      // of the screen
      $slideList.width(width*2);
      $slides.clone(true).appendTo( $slideList );

      // set active class on first slide
      // fade rest of slides
      $slides.first().addClass("infinite-active");
    };

    //
    //
    var setSliderPosition = function(position, $el, delta) {
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
      console.log(delta);
      for (var i = 0; i < Math.abs(delta); i++){
        if (delta < 0){
          var moveImg = $("#infinite li:last");
          $("#infinite li:first").before(moveImg);
          var oldLeft = $slideList.offset().left;
          console.log(oldLeft);
          $slideList.offset( {left: oldLeft - moveImg.outerWidth( true )} )
        } else {
          var moveImg = $('#infinite li:first');
          $('#infinite li:last').after( moveImg );
          var oldLeft = $slideList.offset().left;
          $slideList.offset( {left: oldLeft + moveImg.outerWidth( true )} )
        };
      }

    };

    //
    //
    var $next = $("#infinite-next");
    $next.on("click", function() {
      console.log("next");
    });

    $slides.on("click", function(){
      self.next(this);
    });

    //
    //
    self.next = function(el) {
      var $el = $(el);
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