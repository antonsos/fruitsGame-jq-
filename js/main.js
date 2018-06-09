$( document ).ready(function() {

  //marker
  var playing = false;
  var score;
  var trialesLives;
  var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
  var step;
  var action;

  //functions
  function addHearts() {
    $('.lives').empty();

    for (var i = 0; i < trialesLives; i++) {
      $('.lives').append('<img src="images/heart.png" class="heart">');
    }
  }
  
  function startAction() {
    $('.fruit').show();

    choseImg();

    $('.fruit').css({
      'left': Math.floor(Math.random() * 525) + 'px', 
      'top': -50 + 'px'
    });

    step = 1 + Math.floor(Math.random() * 10);

    action = setInterval(function() {
      $('.fruit').css(
        'top', 
        $('.fruit').position().top + step
      );

      if($('.fruit').position().top > $('.fruitsContainear').height()) {

        if(trialesLives > 1) {
          trialesLives--;
          addHearts();

          $('.fruit').show();

          choseImg();

          $('.fruit').css({
            'left': Math.floor(Math.random() * 525) + 'px', 
            'top': -50 + 'px'
          });

          step = 1 + Math.floor(Math.random() * 10);
        } else {
          playing = false;
          trialesLives--;
          $('.lives').hide();
          $('.game-over').show();
          $('.game-score').html(score);
          $('.start-reset').html('Start Game');
          stopFruits();
        }
      }
    }, 10);
  }

  function choseImg() {
    $('.fruit').attr(
      'src',
      'images/' + fruits[Math.floor(Math.random() * 5)] + '.png'
    );
  }

  function stopFruits() {
    $('.fruit').hide();
    clearInterval(action);
  }

  //start reset
  $('.start-reset').click(function() {
    $('.game-over').hide();
    // we are playing?
    if(playing) {
      location.reload();

    } else {
      //change marker
      playing = true;

      //reset score
      score = 0;
      $('.score-value').html(score);

      $('.start-reset').html('Reset Game');

      //add lives
      $('.lives').show();
      trialesLives = 3;
      addHearts();

      //start sending fruits
      startAction();
    }
  });
  
  $('.fruit').mouseover(function() {
    score++;
    $('.sound')[0].play();
    $('.score-value').html(score);
    clearInterval(action);
    $(".fruit").hide("explode", 500);
    setTimeout(startAction, 500);
  });
});