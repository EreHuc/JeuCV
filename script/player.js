/*********fonction usine pour la gestion du perso**************/
var player = function (char, context, map, fonction) {
  this.character = new Image();
  this.character.src = 'ressource/jeu/'+char+'/p1_spritesheet.png';
  this.context = context;
  this.isWalking = 0;
  this.lastDir = '';
  this.isSpeaking = false;
  this.isJumping = false;
  this.movementSpeed = 3;
  this.animationSpeed = 80;
  this.canMove = 1;
  this.obstacle = map.obstacle;
  this.item = map.objet;
  this.score = 0;
  this.alien = char;
  this.changerMap = fonction;
  this.mapName = map.nom;
  this.sprite = [
    {x: 365,y: 94,l: 72,h: 93},     //front
    {x: 0,y: 0,l: 72,h: 93},        //walk01R
    {x: 73,y: 0,l: 72,h: 93},       //walk02R
    {x: 146,y: 0,l: 72,h: 93},      //walk03R
    {x: 0,y: 94,l: 72,h: 93},       //walk04R
    {x: 73,y: 94,l: 72,h: 93},      //walk05R
    {x: 146,y: 94,l: 72,h: 93},     //walk06R
    {x: 219,y: 0,l: 72,h: 93},      //walk07R
    {x: 0,y: 188,l: 72,h: 93},      //walk01L
    {x: 73,y: 188,l: 72,h: 93},     //walk02L
    {x: 146,y: 188,l: 72,h: 93},    //walk03L
    {x: 0,y: 281,l: 72,h: 93},      //walk04L
    {x: 73,y: 281,l: 72,h: 93},     //walk05L
    {x: 146,y: 281,l: 72,h: 93},    //walk06L
    {x: 219,y: 188,l: 72,h: 93},    //walk07L
    {x: 219,y: 94, l: 72,h: 93},    //idle
    {x: 292,y: 94,l: 72,h: 93},     //duckR
    {x: 219,y: 281,l: 72,h: 93},    //duckL
    {x: 292,y: 0,l: 72,h: 93},      //hurtR
    {x: 292,y: 188,l: 72,h: 93},    //hurtL
    {x: 365,y: 0,l: 72,h: 93},      //jumpR
    {x: 365,y: 188,l: 72,h: 93},    //jumpL
    {x: 0,y: 379,l: 268,h: 169}];   //MessageAccueil
};
player.prototype.drawChar = function (position, xDest, yDest) {
  var x = position.x, y = position.y, l = position.l, h = position.h;
  this.context.drawImage(this.character, x, y, l, h, xDest, yDest, l/2, h/2);
};
player.prototype.erase = function (x, y) {
  this.context.clearRect(x, y-1, 72, 93);
};
player.prototype.mooveX = function (direction) {
  var start, alpha, mur, itemi, player = this;
  var wall = function () {
    var returnValue = false;
    for (var i = 0; i < player.obstacle.length; i++) {
      if (direction == 'right') {
        if((xChar+35 >= player.obstacle[i].xDebut && xChar+35 <= player.obstacle[i].xFin) && ((player.obstacle[i].yDebut <= yChar && yChar <= player.obstacle[i].yFin) || (player.obstacle[i].yDebut <= yChar+35 && yChar+35 <= player.obstacle[i].yFin)) || ((xChar+35 > (lChar)))) {
          returnValue = true;
        }
      } else {
        if ((xChar <= player.obstacle[i].xFin && xChar >= player.obstacle[i].xDebut) && ((player.obstacle[i].yDebut <= yChar && yChar <= player.obstacle[i].yFin) || (player.obstacle[i].yDebut <= yChar+35 && yChar+35 <= player.obstacle[i].yFin)) || (xChar < 0)) {
          returnValue = true;
        }
      }
    }
    return returnValue;
  };
  var collideItem = function () {
    var returnValue = -1;
    for (var i = 0; i < player.item.length; i++) {
      if (direction == 'right') {
        if((xChar+35/2 >= player.item[i].xDebut && xChar+35/2 <= player.item[i].xFin) && ((player.item[i].yDebut <= yChar && yChar <= player.item[i].yFin) || (player.item[i].yDebut <= yChar+35 && yChar+35 <= player.item[i].yFin))) {
          returnValue = i;
        }
      } else {
        if ((xChar+35/2 <= player.item[i].xFin && xChar+35/2 >= player.item[i].xDebut) && ((player.item[i].yDebut <= yChar && yChar <= player.item[i].yFin) || (player.item[i].yDebut <= yChar+35 && yChar+35 <= player.item[i].yFin))) {
          returnValue = i;
        }
      }
    }
    if (returnValue >= 0) {
      document.getElementById('grab').play();
    }
    return returnValue;
  };
  var animate = function (timestamp) {
    itemi = collideItem();
    mur = wall();
    player.falling();
    start = (start) ? start : timestamp;
    var progress = timestamp - start;
    if (progress > player.animationSpeed) {
      if (direction == 'right') {
        alpha = (alpha < 7) ? (alpha = alpha + 1) : (alpha = 3);
        if (alpha == 3 && !player.isJumping) {
          document.getElementById(player.alien+'Step').play();
        }
      } else {
        alpha = (alpha < 14) ? (alpha = alpha + 1) : (alpha = 10);
        if (alpha == 10 && !player.isJumping) {
          document.getElementById(player.alien+'Step').play();
        }
      }
      start = timestamp;
    }
    player.erase(xChar, yChar);
    if (direction == 'right') {
      xChar = (!mur) ? (xChar + player.movementSpeed) : (xChar + 0);
    } else {
      xChar = (!mur) ? (xChar - player.movementSpeed) : (xChar + 0);
    }
    player.drawChar(player.sprite[alpha], xChar, yChar);
    if (itemi >= 0) {
      ctx.clearRect(player.item[itemi].xDebut, player.item[itemi].yDebut, player.item[itemi].xFin - player.item[itemi].xDebut, player.item[itemi].yFin - player.item[itemi].yDebut);
      player.score += 1;
      $('#score').text('Score : '+player.score);
      $('#plusUN').css({left: xChar + 10, top: yChar, display: 'inline-block', fontSize: '1.3em'}).animate({top: '-=30'}, 500,function () {
        $('#plusUN').fadeOut("fast");
      });
      $('#'+player.item[itemi].nom).css({display: 'inline-block', opacity: 0}).animate({opacity: 1}, 400);
      player.item.splice(itemi, 1);
      if (!player.item[0]) {
        player.changerMap(player.mapName);
      }
    }
    if (player.isWalking) {
      requestAnimationFrame(animate);
    } else {
      player.erase(xChar, yChar);
      player.drawChar(player.sprite[0], xChar, yChar);
    }
  };
  if (direction == 'right') {
    alpha = 0;
    this.lastDir = 'right';
  } else {
    alpha = 8;
    this.lastDir = 'left';
  }
  requestAnimationFrame(animate);
  this.isWalking = 1;
};
player.prototype.jump = function () {
  var yCharTemp = yChar, x = 0, pos = [false, false], player = this;
  var fl = function () {
    var returnValue = false;
    for (var i = 0; i < player.obstacle.length; i++) {
      if((yChar + 93/2 >= player.obstacle[i].yDebut && yChar+93/2 <= player.obstacle[i].yFin) && (xChar+27 >= player.obstacle[i].xDebut && xChar+7 <= player.obstacle[i].xFin)) {
        returnValue = true;
        yChar = player.obstacle[i].yDebut - 93/2;
      }
    }
    return returnValue;
  };
  var mooveTile = function (arg) {
    player.canMove = 0;
    player.isJumping = true;
    player.isWalking = 0;
    switch (arg) {
      case 1:
        window.setTimeout(function () {
          open('accueil.html','_self','');
        }, 300);
        break;
      case 2:
        window.setTimeout(function () {
          open('game.html','_self','');
        }, 300);
        break;
      case 3:
        window.setTimeout(function () {
          open('ressource/cv/cv_romain_huc.pdf','_self','');
        }, 300);
        break;
    }
  };
  var ceilling = function () {
    for (var i = 0; i < player.obstacle.length; i++) {
      if ((yChar >= player.obstacle[i].yDebut && yChar <= player.obstacle[i].yFin) && (xChar+27 >= player.obstacle[i].xDebut && xChar+7 <= player.obstacle[i].xFin)) {
        if(document.title == "Romain Huc Dev JavaScript") {
          mooveTile(i);
        }
        return true;
      }
    }
  };
  var animateJump = function (timestamp) {
    player.erase(xChar, yChar);
    yChar = x*x -18*x + yCharTemp;
    if (ceilling()) {
      var z = 9 - x;
      x = 9 + z;
    }
    if (x >= 9) {
      pos[0] = pos[1];
      pos[1] = fl();
    }
    x += 0.5;
    if (player.lastDir == "right") {
      player.drawChar(player.sprite[20], xChar, yChar);
    } else {
      player.drawChar(player.sprite[21], xChar, yChar);
    }
    if (pos[0] == pos[1]) {
        requestAnimationFrame(animateJump);
    } else {
      player.erase(xChar, yChar);
      player.drawChar(player.sprite[0], xChar, yChar);
      player.isJumping = false;
    }
  };
  this.isJumping = true;
  if (this.canMove) {
    document.getElementById(player.alien+'Jump').play();
    requestAnimationFrame(animateJump);
  }
};
player.prototype.falling = function () {
  var temp = false, yCharTemp = yChar, x = 0, start, pos, player = this;
  var ground = function () {
    var returnValue =  false;
    for (var j = 0; j < player.obstacle.length; j++) {
      if(((yChar + 94/2) >= player.obstacle[j].yDebut && yChar+94/2 <= player.obstacle[j].yFin) && (xChar+27 >= player.obstacle[j].xDebut && xChar+10 <= player.obstacle[j].xFin)) {
        returnValue = true;
        yChar = player.obstacle[j].yDebut - 93/2;
      }
    }
    return returnValue;
  };
  var anim = function (timestamp) {
      player.erase(xChar, yChar);
      yChar = x*x + yCharTemp;
      x += 0.5;
      player.drawChar(player.sprite[0], xChar, yChar);
    if(!ground()){
      requestAnimationFrame(anim);
    } else {
      player.erase(xChar, yChar);
      player.drawChar(player.sprite[0], xChar, yChar);
      player.isJumping = false;
    }
  };
  for (var i = 0; i < this.obstacle.length; i++) {
    if (yChar + 93/2 >= player.obstacle[i].yDebut-1 && yChar + 93/2 <= player.obstacle[i].yDebut + 1 && (xChar+27 <= this.obstacle[i].xDebut || xChar+7 >= this.obstacle[i].xFin) && !this.isJumping) {
      temp = true;
    }
  }
  var fl = ground();
  if (temp & !fl) {
    this.isJumping = true;
    requestAnimationFrame(anim);
  }
};
