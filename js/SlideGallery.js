var SlideGallery = {

  path: "images/",

  timers: [],

  currItem: 0,

  init: function(outerElem, innerElem, textElem, arrayOfItems) {
    var self = this;

    this.items = arrayOfItems;

    this.outerElem = outerElem;
    this.innerElem = innerElem;
    this.textElem = textElem;

    this.outerElem.style.backgroundImage = "url(" + this.path + this.items[0].file + ")";
    this.innerElem.style.backgroundImage = "";
    this.innerElem.style.backgroundPosition = self.innerElem.offsetWidth + "px center";

    this.slideInTitle()
  },

  slideInTitle: function() {
    var self = this;
    this.timers.push(setTimeout(function() {
      self.textElem.style.left = "30px"
      self.textElem.style.bottom = -(self.innerElem.offsetHeight + self.textElem.offsetHeight + 0) + "px"
      self.textElem.innerHTML = '';

      self.timers.push(setTimeout(function() {
          self.textElem.style.bottom = "10px"
          self.textElem.innerHTML = self.items[self.currItem].string;
        }, 500));
      }, 500));

    this.timers.push(setTimeout(function() {
      self.textElem.style.left = (-(self.textElem.offsetWidth + 700)) + "px"
     }, 4800))
       
     this.timers.push(setTimeout(function() {
      self.slideInNextFrame()
     }, 5000));
  },

  slideInNextFrame: function(isFirstTime) {
     var self = this;
     this.currItem = (this.currItem+1) % this.items.length;

     this.timers = [];

     self.innerElem.style.backgroundImage = "url(" + self.path + self.items[self.currItem].file + ")";

     this.timers.push(setTimeout(function() {
      self.slideInTitle()
     }, 1000));

     this.timers.push(setTimeout(function() {
        self.innerElem.style.backgroundPosition = "center center";
        self.timers.push(setTimeout(function() {
          self.outerElem.style.backgroundImage = self.innerElem.style.backgroundImage;
          self.timers.push(setTimeout(function() {
              self.innerElem.style.backgroundImage = "";
              self.innerElem.style.backgroundPosition = self.innerElem.offsetWidth + "px center";
            }, 400));
          }, 400));
      }, 10));
  },

  stop : function () {
    for(var i=0; i<this.timers.length; i++) {
      clearTimeout(this.timers[i])
    }
  }

};
