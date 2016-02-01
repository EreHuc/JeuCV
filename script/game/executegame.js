var game = function (aliens) {
  if ($('#musiqueOpt i').attr('class') == 'fi-volume') {
    mySound.play();
  }
  var map = carte(1);
  var changerMap = function (arg) {
    joueur.isWalking = 0;
    $('#canvasJeu').fadeOut("slow");
    $('#canvasJoueur').fadeOut("slow", function () {
      ctx.clearRect(0, 0, 1015, 500);
      ctx2.clearRect(0, 0, 1015, 500);
      switch (arg) {
        case 'map1':
          map = carte(2);
          joueur.obstacle = map.obstacle;
          joueur.item = map.objet;
          joueur.mapName = map.nom;
          yChar = map.obstacle[0].yDebut - 93/2;
          xChar = map.obstacle[0].xDebut;
          joueur.drawChar(joueur.sprite[0], xChar, yChar);
            $('#canvasJeu').fadeIn("slow");
            $('#canvasJoueur').fadeIn("slow", function () {
              joueur.isWalking = 1;
            });
        break;
        case 'map2':
          map = carte(3);
          joueur.obstacle = map.obstacle;
          joueur.item = map.objet;
          joueur.mapName = map.nom;
          yChar = map.obstacle[0].yDebut - 93/2;
          xChar = map.obstacle[0].xDebut;
          joueur.drawChar(joueur.sprite[0], xChar, yChar);
            $('#canvasJeu').fadeIn("slow");
            $('#canvasJoueur').fadeIn("slow", function () {
              joueur.isWalking = 1;
            });
          break;
        case 'map3':
          var conf = confirm('Bravo vous avez finis ! Souhaitez vous afficher mon cv ?');
          if (conf) {
            open('ressource/cv/cv_romain_huc.pdf','_self','');
          } else {
            $('#credits').css({display: 'inline-block'});
            $('#select').css({display: 'none'});
            $('#accJeu').fadeIn("slow");
            yChar = map.obstacle[0].yDebut - 93/2;
            xChar = map.obstacle[0].xDebut;
          }
          firstTimeIn = 1;
          firstTimeOut = 1;
          mySound.pause();
          break;
        default:

      }
    });
  };
  /**********Création du joueur**********/
  joueur = new player(aliens, ctx2, map, changerMap);
  console.log(joueur);
  console.log(joueur.canMove);
  $('#alien').html("<p> <img src='ressource/jeu/"+aliens+"/hud.png' style='width:30px; vertical-align: middle'> "+aliens+"</p>");
  yChar = map.obstacle[0].yDebut - 93/2;
  xChar = map.obstacle[0].xDebut;
  /**********Gestion des touches du clavier**********/
  window.addEventListener('keydown', function (e) {
    if (joueur.canMove && startGame) {
      key[e.keyCode] = e.type == 'keydown';
      if(key[39] && !joueur.isWalking && !joueur.isJumping){    //right
        joueur.mooveX('right');
      }
      if(key[37] && !joueur.isWalking && !joueur.isJumping){    //left
        joueur.mooveX('left');
      }
      if(key[38] && !joueur.isJumping){    //jump
        joueur.jump();
      }
    }
  });
  window.addEventListener('keyup', function (e) {
    if (joueur.canMove) {
        key[e.keyCode] = e.type == 'keydown';
        key[e.keyCode] = (key[e.keyCode] == 'undefined') ? 'false' : key[e.keyCode];
        if (e.keyCode == 37|| e.keyCode == 39) {
        joueur.isWalking = 0;
      }
    }
  });
};
