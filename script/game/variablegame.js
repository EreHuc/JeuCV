/**********Variables nécéssaires - script.js************/
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, enTete = document.getElementById('tete'), gameWin = $('#jeu'), compWin=$('#comp'), startGame = false, firstTimeIn = 1, firstTimeOut = 1;
gameWin.css({left: $('section').width()/2 - 1015/2});
compWin.css({left: $('section').width()/2 - 1015/2});
/**********Variables nécéssaires - tile.js************/
var canvasSol = document.getElementById('canvasJeu'), ctx = canvasSol.getContext('2d'), lSol = canvasSol.width, hSol = canvasSol.height;
/**********Variables nécéssaires - player.js************/
var canvasPerso = document.getElementById('canvasJoueur'), ctx2 = canvasPerso.getContext('2d'), xChar = 0, yChar = 0, movement, key = [], lChar = canvasPerso.width, hChar = canvasPerso.height, soundJump = document.getElementsByClassName('jump'), soundWalk = document.getElementsByClassName('step'), soundGrab = document.getElementById('grab'), mySound = document.getElementById('musique'), firstTime = 1;
/**********Variables nécéssaires - execute.js************/
var player;
/*********Initialisation des tooltip*********/
var tooltip;
$("img").on("mouseover", function (e) {
  if ($(this).attr("title") !== '' && $(this).attr("title") !== undefined && $(this).attr("class").search('tooltip') > -1) {
    tooltip = $(this).attr("title");
    $(this).removeAttr("title");
    $('body').prepend('<div id="tooltip" class="tooltip"><div id="tooltipCone"></div><!---><div id="tooltipZone"class="tooltip">'+tooltip+'</div></div>');
    $('#tooltipZone').css({backgroundColor: 'rgba(44, 62, 80, 0.7)', display: 'inline-block', position: 'relative', borderRadius: 5+'px', padding : 8+'px'});
    $('#tooltipCone').css({position: 'absolute', height: 0 + 'px', width: 0+'px', display: 'inline-block', borderStyle: 'solid', borderWidth: '0 8px 10px 8px', borderColor: 'transparent transparent rgba(44, 62, 80, 0.7) transparent', zIndex: 3});
    $("#tooltip").css({position: 'absolute', display: 'none', zIndex: 10, color: 'white', height: 42+'px'});
    $('#tooltipZone').css({bottom : -10+'px'});
    $('#tooltipCone').css({left: $('#tooltip').outerWidth()/2 - 8+'px'});
    $('#tooltip').css({top: $(this).offset().top + $(this).height() + 5, left: $(this).offset().left - $("#tooltip").outerWidth()/2 + $(this).innerWidth()/2});
    $('#tooltip').fadeIn("slow");
  }
});
$('img').on("mouseout", function (e) {
  $(this).attr("title", tooltip);
  tooltip = undefined;
  $('#tooltip').remove();
});
/*************requestAnimationFrame for IE ***************/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
