const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let levelCounter = 0;

$(document).keypress(function(e) {
  if (!gameStarted) {
    nextSequence();
    $("h1").text("Level " + levelCounter);
  }
  gameStarted = true;
});


$(".btn").click(function(event) {
  let userChosenColor = event.target.attributes[1].value;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  let randomNumber = Math.floor((Math.random() * 3)) + 1;
  let randomChosenColour = buttonColours[randomNumber];


  levelCounter += 1;
  $("h1").text("Level " + levelCounter);
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      playSound(gamePattern[i]);
    }, i * 800);
  }

}

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  $("#"+name).fadeOut(150).fadeIn(150);
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {

  // check if user's answer is correct
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");

    // check if the user's answer is at the last item of game pattern.
    if (currentLevel + 1 === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

    //if answer is wrong
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gameStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  levelCounter = 0;
}
