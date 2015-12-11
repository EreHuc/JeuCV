window.addEventListener('DOMContentLoaded', function () {
  var canvasSol = document.getElementById('sol');
  var ctx = canvasSol.getContext('2d');
  var lSol = canvasSol.width = window.innerWidth;
  var hSol = canvasSol.height = parseInt(window.innerHeight/3);
  canvasSol.style.position = 'absolute';
  canvasSol.style.bottom = 0;

  var platform = function (url) {
    this.terrain = new Image();
    this.terrain.src = 'ressource/jeu/' + url;
    this.coinGauche = {
      x: 504,
      y: 648,
      l: 70,
      h: 70
    };
    this.coinDroit = {
      x: 504,
      y: 504,
      l: 70,
      h: 70
    };
    this.sol = {
      x: 504,
      y: 576,
      l: 70,
      h: 70
    };
  };
  platform.prototype.dessinerTile = function (tile, context, xDebut, xFin, yDest,  hauteur) {
    var x, y, l, h;
    x = tile.x;
    y = tile.y;
    l = tile.l;
    h = tile.h;
    // console.log('x : '+x+' y : '+y+' l : '+l+' h : '+h+' context : '+context+' xDebut : '+xDebut+' xFin : '+xFin+' yDest : '+yDest+' hauteur : '+hauteur);
    for (var i = 0; i < hauteur; i++) {
      for (var j = 0; j < (xFin-xDebut)/35; j++) {
        console.log('je dessine le sol');
        context.drawImage(this.terrain, x, y, l, h, j*35, yDest, l/2, h/2);
      }
      yDest += 70;
    }
  };
  var ground = new platform('tiles.png');
  ground.dessinerTile(ground.sol, ctx, 0, lSol, hSol-35, 1);
});
