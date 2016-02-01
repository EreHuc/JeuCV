/**********Blocage du scroll sur les flèches************/
$(document).ready(function () {
  $(window).keydown(function (e) {
    if((e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40)) {
      e.preventDefault();
    }
  });
  $(window).on('scroll', function () {
    if(window.pageYOffset === 0) {
      enTete.className = 'tete';
    } else {
      enTete.className = 'tete2';
    }
  });
});
/**********Alignement du menu**************/
$('#menuJeu').css({left: $('#accJeu').width()/2 - $('#menuJeu').width()/2, top: $('#accJeu').height()/2 - $('#menuJeu').height()/2});
$('#howTo').css({top: $('#accJeu').height()/2 - $('#howTo').outerHeight()/2});
$('#credits').css({left: $('#accJeu').width()/2 - $('#credits').outerWidth()/2 -15, top: $('#accJeu').height()/2 - $('#credits').outerHeight()/2});
$('#ufo').css({top: $('#accJeu').height()/2 - $('#ufo').height()/2});
$('#select').css({top: $('#accJeu').height()/2 - $('#select').outerHeight()/2, left: $('#accJeu').width()/2 - $('#select').outerWidth()/2});
/**********Customisation des liens**************/
$('#menuJeu ul li').hover(function () {
  $(this).prepend($('<img src="ressource/jeu/bjorn/bjorn.png" alt="Bjorn" height=30px;><span> </span></img>')).append('<span> </span><img src="ressource/jeu/bjorn/bjorn.png" alt="Bjorn" height=30px;></img>');
  $('#menuJeu').css({left: $('#accJeu').width()/2 - $('#menuJeu').width()/2, top: $('#accJeu').height()/2 - $('#menuJeu').height()/2});
}, function () {
  $(this).find('img').remove();
  $('#menuJeu').css({left: $('#accJeu').width()/2 - $('#menuJeu').width()/2, top: $('#accJeu').height()/2 - $('#menuJeu').height()/2});
});
$('#howTo p:last-child').hover(function () {
  $(this).prepend($('<img src="ressource/jeu/bjorn/bjorn.png" alt="Bjorn" height=30px;><span> </span></img>')).append('<span> </span><img src="ressource/jeu/bjorn/bjorn.png" alt="Bjorn" height=30px;></img>');
  $('#howTo').css({top: $('#accJeu').height()/2 - $('#howTo').outerHeight()/2});
}, function () {
  $(this).find('img').remove();
  $('#howTo').css({top: $('#accJeu').height()/2 - $('#howTo').outerHeight()/2});
});
$('#credits p:last-child').hover(function () {
  $(this).prepend($('<img src="ressource/jeu/bjorn/bjorn.png" alt="Bjorn" height=30px;><span> </span></img>')).append('<span> </span><img src="ressource/jeu/bjorn/bjorn.png" alt="Bjorn" height=30px;></img>');
  $('#credits').css({left: $('#accJeu').width()/2 - $('#credits').outerWidth()/2, top: $('#accJeu').height()/2 - $('#credits').outerHeight()/2});
}, function () {
  $(this).find('img').remove();
  $('#credits').css({left: $('#accJeu').width()/2 - $('#credits').outerWidth()/2, top: $('#accJeu').height()/2 - $('#credits').outerHeight()/2});
});
/**********Changement de menu**************/
$('#menuJeu ul li:first-child').click(function () {
  $('#menuJeu').fadeOut("slow", function () {
    $('#select').fadeIn("slow");
  });
});
$('#left').click(function () {
  switch($('.display').attr('id')) {
    case 'bjorn':
      $('#bjorn').toggleClass('display').fadeOut("fast", function () {
        $('#charlie').toggleClass('display').fadeIn("fast");
        $('#select').css({borderColor: '#8DB5E7'});
      });
      break;
      case 'charlie':
      $('#charlie').toggleClass('display').fadeOut("fast", function () {
        $('#roxy').toggleClass('display').fadeIn("fast");
        $('#select').css({borderColor: '#F19CB7'});
      });
      break;
      case 'roxy':
      $('#roxy').toggleClass('display').fadeOut("fast", function () {
        $('#bjorn').toggleClass('display').fadeIn("fast");
        $('#select').css({borderColor: '#6EC3A8'});
      });
        break;
    }
});
$('#right').click(function () {
  switch($('.display').attr('id')) {
    case 'bjorn':
      $('#bjorn').toggleClass('display').fadeOut("fast", function () {
        $('#roxy').toggleClass('display').fadeIn("fast");
        $('#select').css({borderColor: '#F19CB7'});
      });
      break;
      case 'roxy':
      $('#roxy').toggleClass('display').fadeOut("fast", function () {
        $('#charlie').toggleClass('display').fadeIn("fast");
        $('#select').css({borderColor: '#8DB5E7'});
      });
        break;
      case 'charlie':
      $('#charlie').toggleClass('display').fadeOut("fast", function () {
        $('#bjorn').toggleClass('display').fadeIn("fast");
        $('#select').css({borderColor: '#6EC3A8'});
      });
      break;
    }
});
$('#button').click(function () {
  $('#accJeu').fadeOut("slow");
  $('#canvasJeu').fadeIn("slow");
  var alienPlay = $('.display').attr('id');
  var obs = [], joueurT = new player(alienPlay, ctx2, obs);
  $('#canvasJoueur').fadeIn("slow", function () {
    $('#musiqueOpt').css({zIndex: 13});
    $('#fxOpt').css({zIndex: 13});
    joueurT.drawChar(joueurT.sprite[0], 0, 418.5);
    startGame = 1;
    joueurT = null;
    game(alienPlay);
  });
});
$('#menuJeu ul li:nth-child(2)').click(function () {
  $('#menuJeu').fadeOut("slow", function () {
      $('#howTo').fadeIn("slow");
  });
});
$('#menuJeu ul li:last-child').click(function () {
  $('#menuJeu').fadeOut("slow", function () {
    $('#credits').fadeIn("slow");
  });
});
$('#howTo p:last-child').click(function () {
  $('#howTo').fadeOut("slow", function () {
    $('#menuJeu').fadeIn("slow");
  });
});
$('#credits p:last-child').click(function () {
  $('#credits').fadeOut("slow", function () {
    $('.comp').fadeOut("slow");
    $('#menuJeu').fadeIn("slow");
  });
});
/****************Gestion des bruitage*****************/
mySound.volume = 0.7;
for (var i = 0; i < soundJump.length; i++) {
  soundJump[i].volume = 0.4;
}
for (var i = 0; i < soundWalk.length; i++) {
  soundWalk[i].volume = 0.5;
}
$('#musiqueOpt i').click(function () {
  if ($('#musiqueOpt i').attr('class') == 'fi-volume') {
    mySound.pause();
  } else {
    mySound.play();
  }
  $('#musiqueOpt i').toggleClass('fi-volume fi-volume-strike');
});
$('#fxOpt i').click(function () {
  if ($('#fxOpt i').attr('class') == 'fi-volume') {
    grab.volume = 0.0;
    for (var i = 0; i < soundJump.length; i++) {
      soundJump[i].volume = 0.0;
    }
    for (var j = 0; j < soundWalk.length; j++) {
      soundWalk[j].volume = 0.0;
    }
  } else {
    grab.volume = 1.0;
    for (var i = 0; i < soundJump.length; i++) {
      soundJump[i].volume = 0.4;
    }
    for (var j = 0; j < soundWalk.length; j++) {
      soundWalk[j].volume = 0.5;
    }
  }
  $('#fxOpt i').toggleClass('fi-volume fi-volume-strike');
});
/**********Gestion du la perte de focus de la page************/
$(window).on('focusout', function () {
  if (startGame) {
    if (firstTimeOut) {
      firstTimeOut = 0;
    } else {
      grab.volume = 0.0;
      mySound.pause();
      for (var i = 0; i < soundJump.length; i++) {
        soundJump[i].volume = 0.0;
      }
      for (var j = 0; j < soundWalk.length; j++) {
        soundWalk[j].volume = 0.0;
      }
    }
  }
});
$(window).on('focusin', function () {
  if (startGame) {
    if (firstTimeIn) {
      firstTimeIn = 0;
    } else {
      if ($('#musiqueOpt i').attr('class') == 'fi-volume') {
        mySound.play();
      }
      if ($('#fxOpt i').attr('class') == 'fi-volume') {
        grab.volume = 1.0;
        for (var i = 0; i < soundJump.length; i++) {
          soundJump[i].volume = 0.4;
        }
        for (var j = 0; j < soundWalk.length; j++) {
          soundWalk[j].volume = 0.5;
        }
      }
    }
  }
});
