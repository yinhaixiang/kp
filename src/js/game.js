sound.init();
window.onkeypress = function (e) {
  console.log(e.keyCode)
  if (e.keyCode == 97 || e.keyCode == 107) {
    press('k')
  }
  else if (e.keyCode == 115 || e.keyCode == 112) {
    press('p');
  }
}

$('#k').on(Hilo.event.POINTER_END, function () {
  press('k');
})
$('#p').on(Hilo.event.POINTER_END, function () {
  press('p');
});

var $audios = $('#audios');


var press = function (enterKey) {
  if (isPlay) {
    var key;
    if (enterKey === 'k') {
      key = 'k1';
      sound.play('k0')
    }
    else if (enterKey === 'p') {
      key = 'p1';
      sound.play('p0');
    }

    var $item = $($audios.children()[keyIndex]);
    $item.html(enterKey);
    $item.addClass(enterKey);
    keyIndex++;

    if (keys.length) {
      if (keys.shift() === key) {
        score++;
      }
      else {
        score--;
        $item.addClass('error');
        setTimeout(function () {
          sound.play('miss' + (Math.random() > .5 ? 0 : 1), 0.3)
        }, 100);
      }
      $('#score').html('score:' + score);
      if (keys.length === 0) {
        level++;
        isPlay = false;
        keyIndex = 0;
        setTimeout(function () {
          startLevel();
        }, 500);
      }
    }
  }
}

var levels = [
  3, 3, 5, 5, 6, 6, 6, 7, 7, 7
];

var level = 0;
var isPlay = false;
var keyIndex = 0;
var keys = [];
var score = 0;

var startGame = function () {
  setTimeout(function () {
    var audio = sound.plays(['ready', 'go']);
    audio.on('end', function () {
      startLevel();
    });
  }, 1000);
}

var startLevel = function (callback) {
  isPlay = false;
  $audios.html('');
  var num = levels[level];
  if (num) {
    keys = [];
    var i = setInterval(function () {
      if (num <= 0) {
        clearInterval(i);
        isPlay = true;
        return;
      }
      var key = Math.random() > 0.5 ? 'k1' : 'p1';
      keys.push(key);
      sound.play(key);
      var div = $('<div class="item">?</div>');
      $audios.append(div);
      num--;
    }, 300);
  }
  else {
    sound.play('gameover');
  }
};

$('#startScene').on(Hilo.event.POINTER_END, function () {
  Hilo.WebAudio.enable();
  console.log('startGame');
  $('#startScene').hide();
  $('#gameScene').show();
  startGame();
});
