var buttoncolors=["red", "blue", "green", "yellow"];
var gamepattern=[];
var userClickedPattern=[];

var start=false;
var level=0;
$(document).keydown(function(){
  if(!start){
    $("#level-title").text("Level "+level);
    nextSequence();
    start=true;
  }
});

$(".btn").click(function(){
var userChosenColour =$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamepattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamepattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over, Press Any Key to Restart <br><br>"+"Your Score : "+level);
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
     var randomnumber=Math.floor(Math.random()*4);
     var randomchosencolor=buttoncolors[randomnumber];
     gamepattern.push(randomchosencolor);
     $("#"+randomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
     playSound(randomchosencolor);
}

function playSound(key){
  var audio=new Audio("sounds/"+key+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}
function startOver(){
  level =0;
  gamepattern=[];
  start=false;
}
