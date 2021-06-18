alert("hello js is working");

var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var started = false;
var level = 0;

$(document).keypress(function (){
    if(!started){
        nextSequence();
        started=true;
    }
});


function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play(); 
}

function animatePress(currnetColor){
    $("#"+currnetColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currnetColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor((Math.random()*4))
    var randomChosenColor = buttonColors[randomNumber];
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
}


$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    level=0;
    gamePattern=[];
    started= false;

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
};
