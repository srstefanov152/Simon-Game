var gamePattern = new Array();
var userPattern = new Array();
var buttonColours = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;

$(document).keypress(function () {
    if (!start) {
        start = true;
        $("h1").text("Level 0");
        nextSequence();

    }
});

function clickButton(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
    $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
}


function nextSequence() {
    userPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    clickButton(randomChosenColour);



    // console.log(gamePattern);
}

function checkAnswer(currentLevel) {
    console.log(gamePattern);
    console.log(userPattern);

    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over , Press Any Key To Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");

    userPattern.push(userChosenColour);

    checkAnswer(userPattern.length - 1);

    clickButton(userChosenColour);

    // console.log(userPattern);

    // nextSequence();
});

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}