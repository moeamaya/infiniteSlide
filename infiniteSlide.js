//
// infiniteSlide.js
// https://github.com/moeamaya/infiniteSlide
// MIT licensed
//
// version 0.1 - 01/01/2013

;(function($, doc, win) {
  "use strict";

  var name = "js-infiniteSlide";

  var InfiniteSlide = function(el, opts) {
    var self = Object.create(InfiniteSlide.prototype);
    self.$el = $(el);
    self.$el.data(name, self);

    self.defaults = {
      "speed": 700,
      "autoscroll": false
    };

    var meta = self.$el.data(name + "-opts");
    self.opts = $.extend(self.defaults, opts, meta);

    var init = function(){

    };

    init();
    Object.freeze(self);
    return self;
  };

  $.fn.infiniteSlide = function(options) {
    return this.each(function() {
      new InfiniteSlide(this, options);
    });
  };

}(jQuery, document, window));