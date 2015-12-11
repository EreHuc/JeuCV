window.addEventListener('DOMContentLoaded', function () {
  var canvasPerso = document.getElementById('perso');
  var ctx2 = canvasPerso.getContext('2d');
  var lChar = canvasPerso.width = window.innerWidth;
  var hChar = canvasPerso.height = parseInt(window.innerHeight/3);
  canvasPerso.style.position = 'absolute';
  canvasPerso.style.bottom = 0;

  var player = function (char, file) {
    this.character = new Image();
    this.character.src = 'ressource/jeu/player/'+char+'/'+file;
    this.front = {
      x: 0,
      y: 196,
      l: 66,
      h: 92
    };
  };
  player.prototype.drawChar = function (position, context, xDest, yDest) {
    console.log('je dessine');
    var x, y, l, h;
    x = position.x;
    y = position.y;
    l = position.l;
    h = position.h;
    context.drawImage(this.character, x, y, l, h, 0, 0, l/2, h/2);
  };
  var character = new player('Bjorn', 'p1_spritesheet.png');
  character.drawChar(character.front, ctx2, 10, hChar-35-character.front.h/2);
});
