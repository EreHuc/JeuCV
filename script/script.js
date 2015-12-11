var support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
              document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
              "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var idFrame, x=0, tab = [];
window.addEventListener('DOMContentLoaded', function () {
  var enTete = document.getElementById('Tete'), mesDiv = document.getElementsByClassName('divmenu'), mesH2 = document.getElementsByTagName('h2'), mesArticle = document.getElementsByTagName('article'), theChoosenDiv = document.getElementById('bloc_page'), myButton = document.getElementById('myButton'), temp = document.getElementById('accueil');
  temp.style.height = window.innerHeight + 'px';
  temp.style.width = window.innerWidth + 'px';
  theChoosenDiv.style.display = 'none';
  myButton.style.left = (window.innerWidth/2 - 75) + 'px';
  temp.children[0].style.paddingTop = (window.innerHeight/2 - 153) + 'px';
  // backAnimation();
  var transfer = function () {
    var a = 1, b = 0, begin;
    var decay = function (timestamp) {
      begin = (begin) ? begin : timestamp;
      var progress = timestamp - begin;
      if (progress > 50) {
        if (a >= 0) {
          a -= 0.1;
          temp.style.opacity = a;
        } else {
          temp.style.display = 'none';
          theChoosenDiv.style.opacity = b;
          theChoosenDiv.style.display = 'block';
          b += 0.1;
        }
        begin = timestamp;
      }
      if (a <= 0 && b >=1) {
      } else {
        idFrame = window.requestAnimationFrame(decay);
      }
    };
    idFrame = window.requestAnimationFrame(decay);
  };

  myButton.addEventListener('click', transfer);

  window.addEventListener('scroll', function () {
    if(window.pageYOffset === 0) {
      enTete.className = 'tete';
    } else {
      enTete.className = 'tete2';
    }
  });
  for (var i = 0; i < mesArticle.length; i++) {
    mesArticle[i].style.height = "18.2px";
    mesArticle[i].style.overflow = "hidden";
  }
  for (var j = 0; j < mesH2.length; j++) {
    tab[j] = usine(mesH2[j], 0);
    mesH2[j].addEventListener('click', tab[j].upDown);
  }
});

var usine = function (arg, arg2) {
  var constructeur = function () {
    this.upDown = function () {
      var parent = arg.parentNode.parentNode;
      var start;
      var down = function (timestamp) {
        start = (start) ? start : timestamp;
        var progress = timestamp - start;
        if (progress > 50) {
          x += 30;
          parent.style.height = x + 'px';
          start = timestamp;
        }
        if (x < 300) {
          idFrame = window.requestAnimationFrame(down);
        } else {
          parent.style.overflow = 'auto';
        }
      };
      var up = function (timestamp) {
        start = (start) ? start : timestamp;
        var progress = timestamp - start;
        if (progress > 50) {
          x -= 28.18;
          parent.style.height = x + 'px';
          start = timestamp;
        }
        if (x > 18.2) {
          idFrame = window.requestAnimationFrame(up);
        }
      };
      if (!arg2) {
        idFrame = window.requestAnimationFrame(down);
        arg2 = 1;
        x=0;
      } else {
        parent.style.overflow = 'hidden';
        idFrame = window.requestAnimationFrame(up);
        arg2 = 0;
        x=300;
      }
    };
  };
  var monObjet = new constructeur();
  return monObjet;
};

// var backAnimation = function () {
//   var start, x=0, y=0;
//   var animation = function (timestamp) {
//     start = (start) ? start : timestamp;
//     var progress = timestamp - start;
//     // if (progress > 10) {
//         x += 0.2;
//         y += 0.2;
//         document.body.style.backgroundPositionX = x + 'px';
//         document.body.style.backgroundPositionY = y + 'px';
//         // start = timestamp;
//     // }
//     idFrame = requestAnimationFrame(animation);
//   };
//   idFrame = requestAnimationFrame(animation);
// };
