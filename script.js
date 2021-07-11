/*
 * @author Semih Ataman
 * @since 9 July 2021
 */

$("#topOfGrid").hide();
$("#grid .btn").hide();
$("#endOfTheGame").hide();

var allColors = ["orange", "purple", "pink", "yellow", "dark-cyan", "blue", "white", "gray",
  "green", "red", "olive", "brown", "turquoise", "rebecca-purple", "orange-red", "thistle", "lime",
  "magenta", "peru", "sky-blue", "slate-blue", "saddle-brown", "navy", "salmon", "silver", "sienna"
];

var seenColors = []; // This is the array of seen colors on the screen.
var totalPoint = -10;

let strategies = new Map([
  ["threeToThree", arrangeThreeToThreeColors],
  ["fourToFour", arrangeFourToFourColors],
  ["fiveToFive", arrangeFiveToFiveColors]
]);

// Thanks to this strategy, I didn't use any if/else or switch-case statement. Instead I used map.
function action(selection) {
  let strategy = strategies.get(selection);
  strategy();
}

$("#difficulty .btn").click(function() {
  $("#level-title").hide();
  $("#difficulty").hide();
  $("#topOfGrid").show();

  playSound("Start");
  executeTimer();

  var selection = $(this).attr("id");
  var nextColor = nextSequence(selection);

  $("#grid .btn").click(function() {
    animatePress(this);
    if ($(this).attr("id") === nextColor) {
      playSound("Success");
      nextColor = nextSequence(selection);
    } else {
      playSound("Failure");
    }
  });
});

function nextSequence(selection) {
  seenColors = [];
  action(selection);
  var nextColor = getRandomColor(seenColors);
  $("#next").attr("class", "btn next " + nextColor);
  totalPoint += 10;
  console.log(totalPoint);
  return nextColor;
}

function getRandomColor(colors) {
  var randomNumber = Math.floor(Math.random() * colors.length);
  var randomColor = colors[randomNumber];
  return randomColor;
}

// This function provides that one color can only be taken once.
function getValidColor() {
  var randomColor;
  do {
    randomColor = getRandomColor(allColors);
  }
  while (seenColors.includes(randomColor));
  return randomColor;
}

function executeTimer() {
  var counter = 60;
  $("#timer").html(counter);
  var terminationId = setInterval(function() {
    counter--;
    $("#timer").html(counter);

    if (counter == 10) {
      playSound("TimeRunningOut");
    }

    if (counter < 0) {
      clearInterval(terminationId);
      $("#topOfGrid").hide();
      $("#grid").hide();
      $("#endOfTheGame").show();
      $("#point h2").html(totalPoint);
    }
  }, 1000);
}

function arrangeThreeToThreeColors() {
  for (let i = 0; i <= 12; i++) {
    let mod = i % 5;
    if (mod === 0 || mod === 1 || mod === 2) {
      var randomColor = getValidColor();
      manipulateButtons(i, randomColor);
      seenColors.push(randomColor);

    } else {
      continue;
    }
  }
}

function arrangeFourToFourColors() {
  for (let i = 0; i <= 18; i++) {
    let mod = i % 5;
    if (mod === 0 || mod === 1 || mod === 2 || mod === 3) {
      var randomColor = getValidColor();
      manipulateButtons(i, randomColor);
      seenColors.push(randomColor);

    } else {
      continue;
    }
  }
}

function arrangeFiveToFiveColors() {
  for (let i = 0; i <= 24; i++) {
    var randomColor = getValidColor();
    manipulateButtons(i, randomColor);
    seenColors.push(randomColor);
  }
}

function manipulateButtons(index, randomColor) {
  $("#grid .btn:eq(" + index + ")").attr("id", randomColor);
  $("#grid .btn:eq(" + index + ")").attr("class", "btn " + randomColor);
  $("#grid .btn:eq(" + index + ")").show();
}

function playSound(name) {
  var audio = new Audio("Sounds/" + name + ".flac");
  audio.play();
}

function animatePress(clickedButton) {
  $(clickedButton).addClass("pressed");
  setTimeout(function() {
    $(clickedButton).removeClass("pressed");
  }, 100);
}
