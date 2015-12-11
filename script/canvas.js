var DIRECTION = {
  "BAS"    : 0,
  "HAUT" : 1,
  "DROITE" : 2,
  "GAUCHE"   : 3,
  "ADROITE" : 6,
  "AGAUCHE" : 7
};

var mesVar = {};
mesVar.canvasSol = document.getElementById('sol');
mesVar.ctx = mesVar.canvasSol.getContext('2d');
mesVar.canvasPerso = document.getElementById('perso');
mesVar.ctx2 = mesVar.canvasPerso.getContext('2d');
mesVar.l = mesVar.canvasPerso.width = mesVar.canvasSol.width = window.innerWidth;
mesVar.h = mesVar.canvasPerso.height = mesVar.canvasSol.height = parseInt(window.innerHeight/3);
mesVar.p = mesVar.canvasPerso.style.position = mesVar.canvasSol.style.position = 'absolute';
mesVar.b = mesVar.canvasPerso.style.bottom = mesVar.canvasSol.style.bottom = 0;

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

window.addEventListener('DOMContentLoaded', function () {
  creeMap(mesVar.ctx, 3);
  persoTest.dessinerPerso(16, mesVar.h-80, DIRECTION.GAUCHE);
  // persoTest.effacerPerso(16, mesVar.h-80).dessinerPerso(48, mesVar.h-80, DIRECTION.DROITE);
  // persoTest.deplacement(16, mesVar.h-80, DIRECTION.DROITE, 1);
});
var construireTuile = function (url) {
  this.image = new Image();
  this.image.src = 'ressource/intro/' + url;
  this.brique = {
    x: 112,
    y: 0,
    l: 16,
    h: 16
  };
};
var creeMap = function (context, lenght) {
  var tuile = new construireTuile('tile.png');
  for (var j = 1; j <= lenght; j++) {
    for (var i = 0; i < (window.innerWidth/16); i++) {
      context.drawImage(tuile.image, tuile.brique.x,tuile.brique.y, tuile.brique.l, tuile.brique.h, i*16, mesVar.h-(j*16), tuile.brique.l, tuile.brique.h);
    }
  }
};
var usinePersonnage = function (url, context) {
  var Personnage = function (url, context) {
    this.image = new Image();
    this.image.src = 'ressource/intro/' + url;
    this.context = context;
  };
  var monPerso = new Personnage(url, context);
  monPerso.dessinerPerso = function (x, y, direction) {
    this.context.drawImage(this.image, Math.floor((direction/4)) * 16, (direction%4) * 16, 16, 16, x, y, 32, 32);
    return this;
  };
  monPerso.effacerPerso = function (x, y) {
    this.context.clearRect(x, y, 32, 32);
    return this;
  };
  monPerso.deplacement = function (x, y, direction, arg) {
    window.cancelAnimationFrame(idFrame);
    var start, perso = this;
    var animation = function (timestamp) {
      start = (start) ? start : timestamp;
      var progress = timestamp-start;
      if (progress > 200) {
        switch (direction) {
          case 2:
            perso.effacerPerso(x, y);
            x += 8;
            perso.dessinerPerso(x, y, direction);
            console.log(direction);
            break;
          case 3:
            perso.effacerPerso(x, y);
            x -= 8;
            perso.dessinerPerso(x, y, direction);
          break;
          case 6:
            perso.effacerPerso(x, y);
            x += 8;
            perso.dessinerPerso(x, y, direction);
            console.log(direction);
          break;
          case 7:
            perso.effacerPerso(x, y);
            x -= 8;
            perso.dessinerPerso(x, y, direction);
          break;
          default:
          break;
        }
        start = timestamp;
        direction = (direction == DIRECTION.DROITE) ? DIRECTION.ADROITE : (direction == DIRECTION.GAUCHE) ? DIRECTION.AGAUCHE : (direction == DIRECTION.ADROITE) ? DIRECTION.DROITE : DIRECTION.GAUCHE;
      }
      if (arg) {
        idFrame = window.requestAnimationFrame(animation);
      }
    };
    idFrame = window.requestAnimationFrame(animation);
    return this;
  };
  return monPerso;
};
var persoTest = usinePersonnage('sacha.png', mesVar.ctx2);

window.addEventListener('keydown', function (e) {
  var code = e.Keycode;
  console.log(code);
});
