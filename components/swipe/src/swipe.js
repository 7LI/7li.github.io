define(function() {
  function Swipe(container, option) {
    this.container = container;
    this.wrap = this.container.children[0];
    this.slides = this.wrap.children;
    this.length = this.slides.length;
    this.width = this.container.offsetWidth;

    if (!option) option = {};
    this.option = option;
    this.speed = option.speed || 300;
    this.threshould = option.threshould || 160;
    this.auto = option.auto || 2000;
    this.index = 0;
    this.offset = 0;
    this.classes = {
      nav: 'swipe-nav',
      navItem: 'swipe-nav-item',
      navOn: 'swipe-nav-item-on'
    };
    this.queue = [];

    this.setup(); 
    this.bind();

    this.set('nav', option.nav !== false);
    this.set('auto', option.auto !== 0);
  }

  Swipe.prototype.setup = function() {
    // Set container
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'relative';

    // Set wrap
    this.wrap.style.position = 'relative';
    this.wrap.style.overflow = 'visible';
    this.wrap.style.height = 'auto';
    this.wrap.style.width = '999999999999999px';

    // Set slides   
    for(var i = 0; i < this.length; i++) {
      var slide = this.slides[i];
      slide.style.position = 'relative';
      slide.style.float = 'left';
      slide.style.height = 'auto';
      this.slides[i].style.width = this.width + 'px';
      this.slides[i].offset = i * this.width;
    }
  }

  Swipe.prototype.slideTo = function(index, callback, direction, queue) {
    // Handling muti-arguments
    if (index > this.length - 1) index = this.length - 1;
    if (index < 0) index = 0;
    if (typeof callback != 'function' && callback != null) {
      queue = direction;
      direction = callback;
      callback = null;
    };
    if (typeof direction != 'string') {
      queue = direction;
      direction = 'right';
    }

    // Not sliding and not enqueue, so do nothing
    if (this.sliding && !queue) return;

    // Sliding, so enqueque
    if (this.sliding && queue) {
      var slide = {
        index: index,
        callback: callback,
        direction: direction
      }
      this.queue.push(slide);
      return;
    }

    // Not sliding, so enforce slide
    if (index == this.index) {
      // Current index, no need to transition, immediately trigger callback
      callback && callback();
      this.dequeue();
      return;
    }

    this.sliding = true;
    this.callback = callback;

    var offset;
    // Relocate slides
    var currentSlide = this.slides[this.index];
    for (var i = 0; i < this.length; i++) {
      if (i == this.index) continue;

      var slide = this.slides[i];
      if (direction == 'right') {
        if (slide.offset < currentSlide.offset) {
          slide.offset += this.width * this.length;
          var calculateOffset = slide.offset - this.width * i;
          slide.style.webkitTransitionDuration = 0;
          slide.style.webkitTransform = 'translate3D(' + calculateOffset + 'px, 0px, 0px)';
        }
      } else if (direction == 'left') {
        if (slide.offset > currentSlide.offset) {
          slide.offset -= this.width * this.length;
          var calculateOffset = slide.offset - this.width * i;
          slide.style.webkitTransitionDuration = 0;
          slide.style.webkitTransform = 'translate3D(' + calculateOffset + 'px, 0px, 0px)';
        }
      }
      
    }
    // Relocate wrap
    offset =  this.slides[this.index].offset - this.slides[index].offset;
    offset += this.offset;

    this.offset = offset;
    this.index = index;

    var style = this.wrap.style;
    style.webkitTransitionDuration = this.speed + 'ms';
    style.webkitTransform = 'translate3D(' + offset + 'px, 0px, 0px)';
  }

  Swipe.prototype.prev = function(callback, queue) {
    // Handling muti-arguments
    if (typeof callback != 'function') { queue = callback; callback = null };

    var index = this.getIndex(queue);
    if (index <= 0) {
      index = this.length - 1;
    } else {
      index = index - 1;
    }
    this.slideTo(index, callback, 'left', queue);
  }

  Swipe.prototype.next = function(callback, queue) {
    // Handling muti-arguments
    if (typeof callback != 'function') { queue = callback; callback = null };

    var index = this.getIndex(queue);
    if (index >= this.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }

    this.slideTo(index, callback, 'right', queue);
  }

  Swipe.prototype.stop = function() {
    return this;
  }

  Swipe.prototype.bind = function() {
    var that = this;
    var start, delta = {x: 0, y: 0};
    this.events = {
      handleEvent: function(e) {
        switch (e.type) {
            case 'touchstart':
              var touches = e.touches[0];
              start = {
                x: touches.pageX,
                y: touches.pageY,
              };
              that.container.addEventListener('touchmove', that.events);
              that.container.addEventListener('touchend', that.events);
              that.autoplay(false);
              break;
            case 'touchmove':
              var touches = e.touches[0];
              delta = {
                x: touches.pageX - start.x,
                y: touches.pageY - start.y
              }
              that.attempSlide(delta);
              break;
            case 'touchend': 
               if (Math.abs(delta.x) > that.threshould) {
                if (delta.x > 0) {
                  that.prev();
                } else {
                  that.next();
                }
              } else {
                that.cancelSlide();
              }
              that.container.removeEventListener('touchmove', that.events);
              that.container.removeEventListener('touchend', that.events);
              that.autoplay(that.option.auto !== 0);
              break;
            case 'transitionend': 
              that.sliding = false;
              that.nav && that.setNav(); // Set nav

              that.callback && that.callback();
              // Enforce the next slide in queue
              that.dequeue();
              break;
            case 'resize':
              that.width = that.container.offsetWidth;
              that.setup();
            break;
         }
      }
    }
    this.container.addEventListener('transitionend', this.events);
    this.container.addEventListener('touchstart', this.events);
    window.addEventListener('resize', this.events);
  }

  Swipe.prototype.dequeue = function() {
     var nextSlide = this.queue.shift();
     nextSlide && this.slideTo(nextSlide.index, nextSlide.callback);
  }

  Swipe.prototype.getIndex = function(queue) {
    var index = this.index;
    if (queue) {
      var lastSlide = this.queue[this.queue.length - 1];
      if (lastSlide) index = lastSlide.index;
    };
    return index;
  }

  Swipe.prototype.set = function(key, value) {
    switch (key) {
      case 'nav':
        if (!this.nav) {
          this.createNav();
        } 
        if (value == true) {
          this.nav.style.display = 'block';
          this.setNav();
        } else {
          this.nav.style.display = 'none';
        }
        break;
      case 'auto':
        this.autoplay(value);
        break;
    }
  }

  Swipe.prototype.attempSlide = function(delta) {
    if (this.sliding) return;

    var style = this.wrap.style;
    style.webkitTransitionDuration = '0ms';
    var offset = this.offset + delta.x;
    style.webkitTransform = 'translate3D(' + offset + 'px, 0px, 0px)';
  }

  Swipe.prototype.cancelSlide = function() {
    var style = this.wrap.style;
    style.webkitTransitionDuration = this.speed + 'ms';
    style.webkitTransform = 'translate3D(' + this.offset + 'px, 0px, 0px)';
  }

  Swipe.prototype.createNav = function() {
    this.nav = document.createElement('div');
    this.nav.className = this.classes.nav;
    for (var i = 0; i < this.length; i++) {
      var navItem = document.createElement('span');
      navItem.className = this.classes.navItem;
      this.nav.appendChild(navItem);
    }
    this.container.appendChild(this.nav);
  }

  Swipe.prototype.setNav = function() {
    for (var i = 0; i < this.length; i++) {
      this.nav.children[i].classList.remove(this.classes.navOn);
    }
    this.nav.children[this.index].classList.add(this.classes.navOn);
  }

  Swipe.getLength = function() {
    return this.length;
  }

  Swipe.prototype.autoplay = function(onOff) {
    if (this.auto == 0) return;

    clearInterval(this.timer);
    var that = this;
    if (onOff) {
      this.timer = setInterval(function() {
        that.next();
      }, this.auto);
    }
  }

  Swipe.prototype.kill = function() {
    this.container.removeChild(this.nav);
    this.container.removeEventListener('transitionend', this.events);
    this.container.removeEventListener('touchstart', this.events);
  }

  Swipe.v = Swipe.version = '1.0.0';
  return Swipe;
})
