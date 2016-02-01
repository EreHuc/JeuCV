/*********fonction usine pour la création du terrain**************/
var platform = function (url, context) {
  this.terrain = new Image();
  this.terrain.src = 'ressource/jeu/' + url;
  this.context = context;
  this.tile =  [
  {x: 0, y: 144, l: 70, h: 70},     //coinGauche    0
  {x: 0, y: 0, l: 70, h: 70},       //coinDroit     1
  {x: 0, y: 72, l: 70, h: 70},      //sol           2
  {x: 0, y: 216, l: 70, h: 70},     //blocDoreewww  3
  {x: 0, y: 288, l: 70, h: 70},     //blocDoreeGame 4
  {x: 0, y: 360, l: 70, h: 70},     //blocDoreeCV   5
  {x: 0, y: 432, l: 70, h: 70, n: 'html5'},      //html5         6
  {x: 0, y: 504, l: 70, h: 70, n: 'js'},         //JS            7
  {x: 0, y: 576, l: 70, h: 70, n: 'css3'},       //css3          8
  {x: 0, y: 648, l: 70, h: 70, n: 'angularjs'},    //angular       9
  {x: 0, y: 720, l: 70, h: 70, n: 'jquery'},     //jquery        10
  {x: 0, y: 792, l: 70, h: 70, n: 'bootstrap'},  //bootstrap     11
  {x: 0, y: 864, l: 70, h: 70, n: 'mongodb'},    //mongoDB       12
  {x: 72, y: 0, l: 70, h: 70, n: 'nodejs'},      //NodeJS        13
  {x: 72, y: 72, l: 70, h: 70, n: 'meteorjs'},  //meteorJS       14
  {x: 72, y: 144, l: 70, h: 70, n: 'ajax'},      //AJAX          15
  {x: 72, y: 216, l: 70, h: 70},    //fullBloc      16
  {x: 72, y: 288, l: 70, h: 70},    //doorCloseUp   17
  {x: 72, y: 360, l: 70, h: 70},    //doorCloseDown 18
  {x: 72, y: 432, l: 70, h: 70},    //doorOpenUp    19
  {x: 72, y: 504, l: 70, h: 70}];   //doorOpenDown  20
};
platform.prototype.dessinerTile = function (tile, xDebut, xFin, yDest, hauteur) {
  var x, y, l, h, yDebut = yDest;
  x = tile.x;
  y = tile.y;
  l = tile.l;
  h = tile.h;
  if (tile.n) {
    n = tile.n;
  } else {
    n = undefined;
  }
  for (var i = 0; i < hauteur; i++) {
    for (var j = xDebut/35; j < (xFin)/35; j++) {
      this.context.drawImage(this.terrain, x, y, l, h, j*35, yDest, l/2, h/2);
    }
    yDest += 35;
  }
  return {xDebut : xDebut, xFin : xFin, yDebut : yDebut, yFin : yDest, nom: n};
};
